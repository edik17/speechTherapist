import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  FileText,
  GraduationCap,
} from 'lucide-react';
import './ThesisBookReader.scss';

export interface ThesisBookReaderProps {
  title: string;
  subtitle?: string;
  badge: string;
  author: string;
  authorRole?: string;
  htmlContent: string;
}

interface ParsedBlock {
  tag: string;
  className: string;
  html: string;
  text: string;
  isHeading: boolean;
  isFootnote: boolean;
}

interface BookPage {
  kind: 'frontispiece' | 'content' | 'colophon';
  sectionLabel: string;
  htmlChunks: string[];
  hasDropCap: boolean;
  pageNumber: number;
}

interface TurnAnimationState {
  direction: 'next' | 'prev';
  fromIndex: number;
  toIndex: number;
}

const TARGET_PAGE_CHARS = 520;
const FLIP_DURATION_MS = 640;

/**
 * Splits an overly long HTML paragraph into smaller paragraphs along sentence
 * boundaries without breaking inline markup tags.
 */
function splitLongParagraphElement(el: Element, maxChars: number): ParsedBlock[] {
  const fullText = (el.textContent || '').trim();
  const className = el.getAttribute('class') || '';
  const isFootnote = className.includes('footnote');

  if (fullText.length <= maxChars + 80 || isFootnote) {
    return [
      {
        tag: 'p',
        className,
        html: el.outerHTML,
        text: fullText,
        isHeading: false,
        isFootnote,
      },
    ];
  }

  // Tokenize child nodes so inline tags (<strong>, <em>, <sup>) remain atomic.
  const pieces: { html: string; len: number }[] = [];
  el.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const raw = node.textContent || '';
      const sentences = raw.match(/[^.!?]+[.!?]+(?:\s+|$)|[^.!?]+$/g) || [raw];
      sentences.forEach((sentence) => {
        if (sentence.length > 0) {
          pieces.push({ html: sentence, len: sentence.length });
        }
      });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const childEl = node as Element;
      pieces.push({
        html: childEl.outerHTML,
        len: (childEl.textContent || '').length,
      });
    }
  });

  const chunks: ParsedBlock[] = [];
  let currentHtml = '';
  let currentLen = 0;

  const flushChunk = () => {
    const trimmed = currentHtml.trim();
    if (!trimmed) return;
    const classAttr = className ? ` class="${className}"` : '';
    const wrappedHtml = `<p${classAttr}>${trimmed}</p>`;
    chunks.push({
      tag: 'p',
      className,
      html: wrappedHtml,
      text: trimmed.replace(/<[^>]+>/g, ''),
      isHeading: false,
      isFootnote,
    });
    currentHtml = '';
    currentLen = 0;
  };

  pieces.forEach((piece) => {
    const endsSentence = /[.!?]\s*$/.test(currentHtml);
    if (currentLen >= maxChars * 0.72 && endsSentence && currentLen + piece.len > maxChars) {
      flushChunk();
    }
    currentHtml += piece.html;
    currentLen += piece.len;
  });

  flushChunk();
  return chunks.length > 0
    ? chunks
    : [
        {
          tag: 'p',
          className,
          html: el.outerHTML,
          text: fullText,
          isHeading: false,
          isFootnote,
        },
      ];
}

/**
 * Parses raw article HTML into normalized block tokens safe for book pagination.
 */
function parseArticleHtmlBlocks(htmlContent: string): ParsedBlock[] {
  if (!htmlContent.trim()) return [];

  if (typeof DOMParser !== 'undefined') {
    const doc = new DOMParser().parseFromString(htmlContent, 'text/html');
    const children = Array.from(doc.body.children);
    const blocks: ParsedBlock[] = [];

    children.forEach((el) => {
      const tag = el.tagName.toLowerCase();
      const className = el.getAttribute('class') || '';
      const text = (el.textContent || '').trim();
      if (!text) return;

      const isHeading = /^h[1-6]$/.test(tag) || className.includes('intro-section-title');
      const isFootnote = className.includes('footnote');

      if (tag === 'p' && !isFootnote) {
        blocks.push(...splitLongParagraphElement(el, TARGET_PAGE_CHARS));
      } else {
        blocks.push({
          tag,
          className,
          html: el.outerHTML,
          text,
          isHeading,
          isFootnote,
        });
      }
    });

    if (blocks.length > 0) return blocks;
  }

  // Fallback for environments without DOMParser
  const rawMatches = htmlContent.match(/<(h[1-6]|p|ul|ol|blockquote)[\s\S]*?<\/\1>/gi) || [
    `<p>${htmlContent}</p>`,
  ];
  return rawMatches.map((blockHtml) => ({
    tag: 'p',
    className: '',
    html: blockHtml,
    text: blockHtml.replace(/<[^>]+>/g, '').trim(),
    isHeading: /^<h[1-6]/i.test(blockHtml),
    isFootnote: blockHtml.includes('footnote'),
  }));
}

/**
 * Converts HTML blocks into evenly balanced virtual book pages, starting with
 * an academic frontispiece and ending on an even spread.
 */
function paginateBookPages(htmlContent: string): BookPage[] {
  const blocks = parseArticleHtmlBlocks(htmlContent);
  const pages: BookPage[] = [
    {
      kind: 'frontispiece',
      sectionLabel: 'Frontespizio',
      htmlChunks: [],
      hasDropCap: false,
      pageNumber: 1,
    },
  ];

  let activeSection = 'Introduzione';
  let currentChunks: string[] = [];
  let currentChars = 0;
  let pageSection = activeSection;
  let dropCapAssigned = false;

  const commitContentPage = () => {
    if (currentChunks.length === 0) return;
    const isFirstBodyPage = !dropCapAssigned;
    if (isFirstBodyPage) {
      dropCapAssigned = true;
    }
    pages.push({
      kind: 'content',
      sectionLabel: pageSection,
      htmlChunks: currentChunks,
      hasDropCap: isFirstBodyPage,
      pageNumber: pages.length + 1,
    });
    currentChunks = [];
    currentChars = 0;
    pageSection = activeSection;
  };

  blocks.forEach((block, index) => {
    if (block.isHeading) {
      activeSection = block.text;
    }

    const nextBlock = blocks[index + 1];
    const effectiveCost = block.isHeading
      ? block.text.length + (nextBlock ? Math.min(nextBlock.text.length, 200) : 0)
      : block.text.length;

    const wouldOverflow =
      currentChunks.length > 0 && currentChars + effectiveCost > TARGET_PAGE_CHARS;

    if (wouldOverflow) {
      commitContentPage();
    }

    if (currentChunks.length === 0) {
      pageSection = activeSection;
    }

    currentChunks.push(block.html);
    currentChars += block.text.length;
  });

  commitContentPage();

  // Keep total page count even for balanced 2-page spreads on desktop
  if (pages.length % 2 !== 0) {
    pages.push({
      kind: 'colophon',
      sectionLabel: 'Chiusura',
      htmlChunks: [],
      hasDropCap: false,
      pageNumber: pages.length + 1,
    });
  }

  return pages;
}

export const ThesisBookReader: React.FC<ThesisBookReaderProps> = ({
  title,
  subtitle,
  badge,
  author,
  authorRole,
  htmlContent,
}) => {
  const pages = useMemo(() => paginateBookPages(htmlContent), [htmlContent]);
  const totalSpreads = Math.max(1, Math.ceil(pages.length / 2));

  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false
  );
  const [currentSpread, setCurrentSpread] = useState(0);
  const [currentMobilePage, setCurrentMobilePage] = useState(0);
  const [turnState, setTurnState] = useState<TurnAnimationState | null>(null);
  const [continuousMode, setContinuousMode] = useState(false);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const turnTimerRef = useRef<number | null>(null);

  const clearTurnTimer = useCallback(() => {
    if (turnTimerRef.current !== null) {
      window.clearTimeout(turnTimerRef.current);
      turnTimerRef.current = null;
    }
  }, []);

  // Track responsive breakpoint changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 767px)');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
      if (e.matches) {
        setCurrentMobilePage((prev) => Math.min(pages.length - 1, Math.max(prev, currentSpread * 2)));
      } else {
        setCurrentSpread((prev) => Math.min(totalSpreads - 1, Math.floor(currentMobilePage / 2) || prev));
      }
    };
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, [currentSpread, currentMobilePage, pages.length, totalSpreads]);

  // Reset book back to frontispiece whenever the thesis changes
  useEffect(() => {
    clearTurnTimer();
    setTurnState(null);
    setCurrentSpread(0);
    setCurrentMobilePage(0);
    setContinuousMode(false);
  }, [htmlContent, title, clearTurnTimer]);

  // Clean up any pending animation timer on unmount
  useEffect(() => {
    return () => clearTurnTimer();
  }, [clearTurnTimer]);

  const activeIndex = isMobile ? currentMobilePage : currentSpread;
  const maxIndex = isMobile ? pages.length - 1 : totalSpreads - 1;

  const goToIndex = useCallback(
    (targetIndex: number) => {
      const clamped = Math.max(0, Math.min(maxIndex, targetIndex));
      if (clamped === activeIndex || turnState !== null) return;

      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        if (isMobile) {
          setCurrentMobilePage(clamped);
        } else {
          setCurrentSpread(clamped);
        }
        return;
      }

      const direction: 'next' | 'prev' = clamped > activeIndex ? 'next' : 'prev';
      setTurnState({
        direction,
        fromIndex: activeIndex,
        toIndex: clamped,
      });

      clearTurnTimer();
      turnTimerRef.current = window.setTimeout(() => {
        if (isMobile) {
          setCurrentMobilePage(clamped);
        } else {
          setCurrentSpread(clamped);
        }
        setTurnState(null);
        turnTimerRef.current = null;
      }, FLIP_DURATION_MS);
    },
    [activeIndex, clearTurnTimer, isMobile, maxIndex, turnState]
  );

  const handlePrev = useCallback(() => {
    goToIndex(activeIndex - 1);
  }, [activeIndex, goToIndex]);

  const handleNext = useCallback(() => {
    goToIndex(activeIndex + 1);
  }, [activeIndex, goToIndex]);

  // Keyboard navigation while book mode is visible
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (continuousMode) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    },
    [continuousMode, handleNext, handlePrev]
  );

  const renderPageInner = (page: BookPage | undefined) => {
    if (!page) {
      return <div className="book-page-empty" aria-hidden="true" />;
    }

    if (page.kind === 'frontispiece') {
      return (
        <div className="book-frontispiece">
          <div className="frontispiece-crest" aria-hidden="true">
            <GraduationCap size={26} />
          </div>
          <span className="frontispiece-badge">{badge}</span>
          <div className="frontispiece-ornament" aria-hidden="true">
            <span></span>
            <BookOpen size={14} />
            <span></span>
          </div>
          <h2 className="frontispiece-title">{title}</h2>
          {subtitle && <p className="frontispiece-subtitle">{subtitle}</p>}
          <div className="frontispiece-author-block">
            <span className="author-label">Tesi di</span>
            <strong className="author-name">{author}</strong>
            {authorRole && <span className="author-role">{authorRole}</span>}
          </div>
          <footer className="book-page-footer">
            <span className="folio-mark">I</span>
          </footer>
        </div>
      );
    }

    if (page.kind === 'colophon') {
      return (
        <div className="book-colophon">
          <div className="colophon-emblem" aria-hidden="true">
            <BookOpen size={24} />
          </div>
          <p className="colophon-heading">Fine dell&apos;estratto introduttivo</p>
          <p className="colophon-text">
            Puoi continuare l&apos;approfondimento sfogliando le slide della presentazione
            accademica o scaricando il materiale completo nella sezione sottostante.
          </p>
          <div className="colophon-rule" aria-hidden="true"></div>
          <span className="colophon-signature">{author}</span>
          <footer className="book-page-footer">
            <span className="folio-mark">{page.pageNumber}</span>
          </footer>
        </div>
      );
    }

    return (
      <div className="book-content-page">
        <header className="book-page-header">
          <span className="running-title">{page.sectionLabel}</span>
        </header>
        <div
          className={`book-page-body ${page.hasDropCap ? 'has-drop-cap' : ''}`}
          dangerouslySetInnerHTML={{ __html: page.htmlChunks.join('') }}
        />
        <footer className="book-page-footer">
          <span className="folio-mark">{page.pageNumber}</span>
        </footer>
      </div>
    );
  };

  // Compute desktop static pages & turning leaf faces cleanly for zero-flicker flips
  const desktopDisplaySpread = turnState ? turnState.fromIndex : currentSpread;
  const staticLeftPage = turnState
    ? turnState.direction === 'next'
      ? pages[turnState.fromIndex * 2]
      : pages[turnState.toIndex * 2]
    : pages[desktopDisplaySpread * 2];

  const staticRightPage = turnState
    ? turnState.direction === 'next'
      ? pages[turnState.toIndex * 2 + 1]
      : pages[turnState.fromIndex * 2 + 1]
    : pages[desktopDisplaySpread * 2 + 1];

  const leafFrontPage = turnState
    ? turnState.direction === 'next'
      ? pages[turnState.fromIndex * 2 + 1]
      : pages[turnState.toIndex * 2 + 1]
    : undefined;

  const leafBackPage = turnState
    ? turnState.direction === 'next'
      ? pages[turnState.toIndex * 2]
      : pages[turnState.fromIndex * 2]
    : undefined;

  // Mobile single-page state during flip
  const mobileBasePage = turnState
    ? turnState.direction === 'next'
      ? pages[turnState.toIndex]
      : pages[turnState.fromIndex]
    : pages[currentMobilePage];

  const mobileTurningPage = turnState
    ? turnState.direction === 'next'
      ? pages[turnState.fromIndex]
      : pages[turnState.toIndex]
    : undefined;

  const spreadCounterText = isMobile
    ? `Pagina ${currentMobilePage + 1} di ${pages.length}`
    : currentSpread === 0
      ? `Copertina interna · Pag. 1–2 di ${pages.length}`
      : `Pagine ${currentSpread * 2 + 1}–${Math.min(pages.length, currentSpread * 2 + 2)} di ${pages.length}`;

  const totalDots = isMobile ? pages.length : totalSpreads;

  return (
    <section
      className="thesis-book-reader"
      aria-label={`Lettura interattiva: ${title}`}
      onKeyDown={handleKeyDown}
    >
      {/* Top Bar: Counter & Accessibility Toggle */}
      <div className="book-toolbar liquid-glass-bar">
        <div className="toolbar-status">
          <BookOpen size={17} className="toolbar-icon" />
          <span className="toolbar-label">
            {continuousMode ? 'Lettura continua' : spreadCounterText}
          </span>
        </div>

        <div className="toolbar-actions">
          {!continuousMode && !isMobile && (
            <span className="keyboard-hint">Usa le frecce ← → o sfoglia le pagine</span>
          )}
          <button
            type="button"
            className="mode-toggle-btn"
            onClick={() => setContinuousMode((prev) => !prev)}
            aria-pressed={continuousMode}
          >
            {continuousMode ? (
              <>
                <BookOpen size={15} />
                <span>Torna al libro 3D</span>
              </>
            ) : (
              <>
                <FileText size={15} />
                <span>Vista testo continuo</span>
              </>
            )}
          </button>
        </div>
      </div>

      {continuousMode ? (
        <div
          className="article-body reading-prose continuous-fallback liquid-glass-panel"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      ) : (
        <>
          <div
            ref={stageRef}
            className={`thesis-book-stage ${isMobile ? 'is-mobile' : 'is-desktop'}`}
            tabIndex={0}
            aria-roledescription="libro sfogliabile"
          >
            <div className="book-hardcover">
              {/* Left & right paper thickness stacks (desktop) */}
              {!isMobile && (
                <>
                  <div
                    className={`page-stack page-stack-left ${activeIndex > 0 ? 'has-depth' : ''}`}
                    aria-hidden="true"
                  />
                  <div
                    className={`page-stack page-stack-right ${activeIndex < maxIndex ? 'has-depth' : ''}`}
                    aria-hidden="true"
                  />
                </>
              )}

              <div className="book-spread">
                {/* Satin Bookmark Ribbon */}
                <div className="book-ribbon" aria-hidden="true" />

                {isMobile ? (
                  <div className="book-page book-page--single">
                    {renderPageInner(mobileBasePage)}

                    {turnState && mobileTurningPage && (
                      <div
                        className={`book-mobile-leaf is-turning-${turnState.direction}`}
                        aria-hidden="true"
                      >
                        <div className="book-page book-page--single">
                          {renderPageInner(mobileTurningPage)}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    {/* Static Left Page */}
                    <div className="book-page book-page--left">
                      {renderPageInner(staticLeftPage)}
                      {activeIndex > 0 && !turnState && (
                        <button
                          type="button"
                          className="page-corner-hit page-corner-hit--prev"
                          onClick={handlePrev}
                          aria-label="Sfoglia alla pagina precedente"
                          title="Pagina precedente"
                        >
                          <span className="page-curl-visual" aria-hidden="true" />
                        </button>
                      )}
                    </div>

                    {/* Static Right Page */}
                    <div className="book-page book-page--right">
                      {renderPageInner(staticRightPage)}
                      {activeIndex < maxIndex && !turnState && (
                        <button
                          type="button"
                          className="page-corner-hit page-corner-hit--next"
                          onClick={handleNext}
                          aria-label="Sfoglia alla pagina successiva"
                          title="Pagina successiva"
                        >
                          <span className="page-curl-visual" aria-hidden="true" />
                        </button>
                      )}
                    </div>

                    {/* Center Spine Shading */}
                    <div className="book-spine-shadow" aria-hidden="true" />

                    {/* Animated 3D Turning Leaf */}
                    {turnState && (
                      <div
                        className={`book-turning-leaf is-turning-${turnState.direction}`}
                        aria-hidden="true"
                      >
                        <div className="leaf-face leaf-front">
                          <div className="book-page book-page--right leaf-page-surface">
                            {renderPageInner(leafFrontPage)}
                          </div>
                        </div>
                        <div className="leaf-face leaf-back">
                          <div className="book-page book-page--left leaf-page-surface">
                            {renderPageInner(leafBackPage)}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Liquid Glass Navigation Controls */}
          <nav className="book-controls liquid-glass-bar" aria-label="Controlli pagine del libro">
            <button
              type="button"
              className="book-nav-btn"
              onClick={handlePrev}
              disabled={activeIndex === 0 || turnState !== null}
            >
              <ChevronLeft size={18} />
              <span>Precedente</span>
            </button>

            <div className="book-dots" role="tablist" aria-label="Pagine del libro">
              {Array.from({ length: totalDots }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={idx === activeIndex}
                  aria-label={
                    isMobile
                      ? `Vai alla pagina ${idx + 1}`
                      : `Vai alle pagine ${idx * 2 + 1}–${idx * 2 + 2}`
                  }
                  className={`book-dot ${idx === activeIndex ? 'is-active' : ''}`}
                  onClick={() => goToIndex(idx)}
                  disabled={turnState !== null}
                />
              ))}
            </div>

            <button
              type="button"
              className="book-nav-btn"
              onClick={handleNext}
              disabled={activeIndex >= maxIndex || turnState !== null}
            >
              <span>Successiva</span>
              <ChevronRight size={18} />
            </button>
          </nav>
        </>
      )}
    </section>
  );
};
