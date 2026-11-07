import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Clock,
  Calendar,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { FadeUp } from '../../shared/directives/FadeUp';
import { MatButton } from '../../shared/ui/MatButton';
import { blogService } from '../../core/services/blog.service';
import { Article, ArticleCategory } from '../../core/models/article.model';
import './BlogPage.scss';

export function BlogPage() {
  const { slug } = useParams<{ slug?: string }>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [currentArticle, setCurrentArticle] = useState<Article | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | ArticleCategory>('ALL');

  useEffect(() => {
    const list = blogService.getArticlesSync();
    setArticles(list);
    setFilteredArticles(list);
  }, []);

  useEffect(() => {
    if (slug) {
      const art = blogService.getArticleBySlugSync(slug);
      setCurrentArticle(art);
    } else {
      setCurrentArticle(undefined);
    }
  }, [slug]);

  const setCategory = (cat: 'ALL' | ArticleCategory) => {
    setSelectedCategory(cat);
    if (cat === 'ALL') {
      setFilteredArticles(articles);
    } else {
      setFilteredArticles(articles.filter((a) => a.category === cat));
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const getBadgeClass = (category: ArticleCategory): string => {
    switch (category) {
      case 'Tesi Accademica':
        return 'badge-thesis';
      case 'Evidenza Scientifica':
        return 'badge-evidence';
      case 'Riflessioni':
        return 'badge-reflection';
      default:
        return 'badge-evidence';
    }
  };

  if (currentArticle) {
    return (
      <FadeUp as="article" className="article-detail-view">
        <nav className="back-nav" aria-label="Torna a Le mie tesi">
          <Link to="/blog" className="back-link">
            <ArrowLeft size={18} />
            <span>Tutte le tesi &amp; approfondimenti</span>
          </Link>
        </nav>

        <header className="article-header">
          <div className="category-meta">
            <span className={getBadgeClass(currentArticle.category)}>
              {currentArticle.category}
            </span>
            <span className="meta-item">
              <Clock size={14} />
              {currentArticle.readTime}
            </span>
            <span className="meta-item">
              <Calendar size={14} />
              {currentArticle.publishedAt}
            </span>
          </div>

          <h1 className="article-title">{currentArticle.title}</h1>
          {currentArticle.subtitle && (
            <p className="article-lead">{currentArticle.subtitle}</p>
          )}

          <div className="author-byline">
            <div className="author-avatar-badge">EM</div>
            <div className="author-text">
              <strong>{currentArticle.author}</strong>
              <span>{currentArticle.authorRole}</span>
            </div>
          </div>
        </header>

        {/* BOX PUNTI CHIAVE */}
        {currentArticle.keyPoints && currentArticle.keyPoints.length > 0 && (
          <aside className="key-points-box" aria-label="Punti chiave dell'articolo">
            <div className="key-points-header">
              <Sparkles size={20} className="sparkle-icon" />
              <h3>Punti Chiave &amp; Evidenze Cliniche</h3>
            </div>
            <ul className="key-points-list">
              {currentArticle.keyPoints.map((point) => (
                <li key={point}>
                  <CheckCircle2 size={18} className="check-icon" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </aside>
        )}

        {/* CORPO DELL'ARTICOLO CON TIPOGRAFIA EDITORIALE */}
        <section
          className="article-body reading-prose"
          dangerouslySetInnerHTML={{ __html: currentArticle.content }}
        />

        {/* TAGS DELL'ARTICOLO */}
        <footer className="article-footer">
          <div className="article-tags">
            {currentArticle.tags.map((tag) => (
              <span key={tag} className="tag-chip">
                #{tag}
              </span>
            ))}
          </div>

          {/* BOX CTA CONCLUSIVO */}
          <div className="article-cta-box card">
            <div className="cta-inner">
              <div className="cta-icon-wrap">
                <BookOpen size={28} />
              </div>
              <div>
                <h3>Hai una domanda su questo argomento?</h3>
                <p>
                  Ogni persona e situazione è differente. Se desideri chiarimenti per te o per tuo figlio, contattami con serenità.
                </p>
              </div>
            </div>
            <div className="cta-btn-wrap">
              <MatButton variant="raised" to="/contatti" className="article-consult-btn">
                <span>Richiedi un Colloquio</span>
                <ArrowRight size={16} />
              </MatButton>
            </div>
          </div>
        </footer>
      </FadeUp>
    );
  }

  return (
    <section className="blog-magazine-container">
      <FadeUp as="header" className="magazine-hero">
        <h1>Le Mie Tesi &amp; Ricerca Clinica</h1>
        <p className="magazine-subtitle">
          Dalla teoria alla pratica clinica: i lavori di tesi sperimentale, gli studi sulla qualità della vita e la ricerca sul benessere genitoriale.
        </p>

        {/* FILTRI PER CATEGORIA */}
        <div className="category-filters" role="tablist">
          <button
            type="button"
            className={`filter-tab ${selectedCategory === 'ALL' ? 'active' : ''}`}
            onClick={() => setCategory('ALL')}
          >
            Tutti i contenuti
          </button>
          <button
            type="button"
            className={`filter-tab thesis-tab ${
              selectedCategory === 'Tesi Accademica' ? 'active' : ''
            }`}
            onClick={() => setCategory('Tesi Accademica')}
          >
            Le Mie Tesi
          </button>
          <button
            type="button"
            className={`filter-tab evidence-tab ${
              selectedCategory === 'Evidenza Scientifica' ? 'active' : ''
            }`}
            onClick={() => setCategory('Evidenza Scientifica')}
          >
            Evidenza Scientifica
          </button>
          <button
            type="button"
            className={`filter-tab reflection-tab ${
              selectedCategory === 'Riflessioni' ? 'active' : ''
            }`}
            onClick={() => setCategory('Riflessioni')}
          >
            Riflessioni Cliniche
          </button>
        </div>
      </FadeUp>

      {/* GRIGLIA ARTICOLI MAGAZINE */}
      <div className="articles-grid">
        {filteredArticles.map((art) => (
          <FadeUp as="article" key={art.id} className="article-card card">
            <div className="card-meta">
              <span className={getBadgeClass(art.category)}>{art.category}</span>
              <span className="read-time-pill">
                <Clock size={14} />
                {art.readTime}
              </span>
            </div>

            <h2 className="card-title">
              <Link to={`/blog/${art.slug}`}>{art.title}</Link>
            </h2>

            <p className="card-excerpt">{art.excerpt}</p>

            <div className="card-footer">
              <div className="date-author">
                <span className="publish-date">{art.publishedAt}</span>
              </div>
              <Link
                to={`/blog/${art.slug}`}
                className="read-more-link"
                aria-label={`Leggi l'articolo: ${art.title}`}
              >
                <span>Leggi</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
