import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../core/services/blog.service';
import { Article, ArticleCategory } from '../../core/models/article.model';
import { FadeUpDirective } from '../../shared/directives/fade-up.directive';
import { MatButtonModule } from '@angular/material/button';
import { 
  LucideClock, 
  LucideCalendar, 
  LucideArrowLeft, 
  LucideArrowRight, 
  LucideCheckCircle2, 
  LucideBookOpen, 
  LucideSparkles
} from '@lucide/angular';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    FadeUpDirective,
    MatButtonModule,
    LucideClock, 
    LucideCalendar, 
    LucideArrowLeft, 
    LucideArrowRight, 
    LucideCheckCircle2, 
    LucideBookOpen, 
    LucideSparkles
  ],
  template: `
  @if (currentArticle) {
    <!-- VISTA DETTAGLIO ARTICOLO (EDITORIALE CENTRATO 720px) -->
    <article class="article-detail-view" appFadeUp>
      <nav class="back-nav" aria-label="Torna al blog">
        <a routerLink="/blog" class="back-link">
          <svg lucideArrowLeft [size]="18"></svg>
          <span>Tutti gli articoli</span>
        </a>
      </nav>

      <header class="article-header">
        <div class="category-meta">
          <span [class]="currentArticle.category === 'Evidenza Scientifica' ? 'badge-evidence' : 'badge-reflection'">
            {{ currentArticle.category }}
          </span>
          <span class="meta-item">
            <svg lucideClock [size]="14"></svg>
            {{ currentArticle.readTime }}
          </span>
          <span class="meta-item">
            <svg lucideCalendar [size]="14"></svg>
            {{ currentArticle.publishedAt }}
          </span>
        </div>

        <h1 class="article-title">{{ currentArticle.title }}</h1>
        @if (currentArticle.subtitle) {
          <p class="article-lead">{{ currentArticle.subtitle }}</p>
        }

        <div class="author-byline">
          <div class="author-avatar-badge">EM</div>
          <div class="author-text">
            <strong>{{ currentArticle.author }}</strong>
            <span>{{ currentArticle.authorRole }}</span>
          </div>
        </div>
      </header>

      <!-- BOX PUNTI CHIAVE (HIGHLIGHT BOX) -->
      @if (currentArticle.keyPoints?.length) {
        <aside class="key-points-box" aria-label="Punti chiave dell'articolo">
          <div class="key-points-header">
            <svg lucideSparkles [size]="20" class="sparkle-icon"></svg>
            <h3>Punti Chiave & Evidenze Cliniche</h3>
          </div>
          <ul class="key-points-list">
            @for (point of currentArticle.keyPoints; track point) {
              <li>
                <svg lucideCheckCircle2 [size]="18" class="check-icon"></svg>
                <span>{{ point }}</span>
              </li>
            }
          </ul>
        </aside>
      }

      <!-- CORPO DELL'ARTICOLO CON TIPOGRAFIA EDITORIALE -->
      <section class="article-body reading-prose" [innerHTML]="currentArticle.content">
      </section>

      <!-- TAGS DELL'ARTICOLO -->
      <footer class="article-footer">
        <div class="article-tags">
          @for (tag of currentArticle.tags; track tag) {
            <span class="tag-chip">#{{ tag }}</span>
          }
        </div>

        <!-- BOX CTA CONCLUSIVO -->
        <div class="article-cta-box card">
          <div class="cta-inner">
            <div class="cta-icon-wrap">
              <svg lucideBookOpen [size]="28"></svg>
            </div>
            <div>
              <h3>Hai una domanda su questo argomento?</h3>
              <p>Ogni persona e situazione è differente. Se desideri chiarimenti per te o per tuo figlio, contattami con serenità.</p>
            </div>
          </div>
          <div class="cta-btn-wrap">
            <a mat-raised-button routerLink="/contatti" class="article-consult-btn">
              <span>Richiedi un Colloquio</span>
              <svg lucideArrowRight [size]="16"></svg>
            </a>
          </div>
        </div>
      </footer>
    </article>

  } @else {
    <!-- VISTA MAGAZINE LISTING -->
    <section class="blog-magazine-container">
      <header class="magazine-hero" appFadeUp>
        <span class="badge-evidence">Divulgazione & Ricerca</span>
        <h1>Quaderni di Logopedia & Divulgazione</h1>
        <p class="magazine-subtitle">
          Riflessioni cliniche, buone pratiche e approfondimenti scientifici su linguaggio, apprendimento, voce e deglutizione nel ciclo di vita.
        </p>

        <!-- FILTRI PER CATEGORIA -->
        <div class="category-filters" role="tablist">
          <button 
            type="button"
            class="filter-tab" 
            [class.active]="selectedCategory === 'ALL'"
            (click)="setCategory('ALL')">
            Tutti gli articoli
          </button>
          <button 
            type="button"
            class="filter-tab evidence-tab" 
            [class.active]="selectedCategory === 'Evidenza Scientifica'"
            (click)="setCategory('Evidenza Scientifica')">
            Evidenza Scientifica
          </button>
          <button 
            type="button"
            class="filter-tab reflection-tab" 
            [class.active]="selectedCategory === 'Riflessioni'"
            (click)="setCategory('Riflessioni')">
            Riflessioni Cliniche
          </button>
        </div>
      </header>

      <!-- GRIGLIA ARTICOLI MAGAZINE -->
      <div class="articles-grid">
        @for (art of filteredArticles; track art.id) {
          <article class="article-card card" appFadeUp>
            <div class="card-meta">
              <span [class]="art.category === 'Evidenza Scientifica' ? 'badge-evidence' : 'badge-reflection'">
                {{ art.category }}
              </span>
              <span class="read-time-pill">
                <svg lucideClock [size]="14"></svg>
                {{ art.readTime }}
              </span>
            </div>

            <h2 class="card-title">
              <a [routerLink]="['/blog', art.slug]">{{ art.title }}</a>
            </h2>

            <p class="card-excerpt">{{ art.excerpt }}</p>

            <div class="card-footer">
              <div class="date-author">
                <span class="publish-date">{{ art.publishedAt }}</span>
              </div>
              <a [routerLink]="['/blog', art.slug]" class="read-more-link" aria-label="Leggi l'articolo: {{ art.title }}">
                <span>Leggi</span>
                <svg lucideArrowRight [size]="16"></svg>
              </a>
            </div>
          </article>
        }
      </div>
    </section>
  }
  `,
  styles: [`
    /* Magazine Listing Styles */
    .blog-magazine-container {
      max-width: 1100px;
      margin: 0 auto;
      padding-bottom: 60px;
    }

    .magazine-hero {
      text-align: center;
      margin-bottom: 48px;
      display: flex;
      flex-direction: column;
      align-items: center;

      h1 {
        margin: 16px 0 12px;
        font-size: clamp(2.2rem, 4.5vw, 3.25rem);
        color: var(--text-primary);
      }

      .magazine-subtitle {
        max-width: 650px;
        font-size: 1.15rem;
        color: var(--text-secondary);
        line-height: 1.6;
        margin-bottom: 28px;
      }
    }

    .category-filters {
      display: inline-flex;
      background: var(--bg-surface);
      padding: 6px;
      border-radius: 999px;
      gap: 6px;
      border: 1px solid var(--border-subtle);
      flex-wrap: wrap;
      justify-content: center;

      .filter-tab {
        border: none;
        background: transparent;
        color: var(--text-secondary);
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 0.9rem;
        font-weight: 600;
        padding: 8px 18px;
        border-radius: 999px;
        cursor: pointer;
        transition: all 0.25s ease;

        &:hover {
          color: var(--text-primary);
        }

        &.active {
          background: var(--bg-elevated);
          color: var(--text-primary);
          box-shadow: 0 4px 12px rgba(27, 59, 54, 0.08);
        }

        &.evidence-tab.active {
          color: #2D5A4C;
        }

        &.reflection-tab.active {
          color: #B24E35;
        }
      }
    }

    .articles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 28px;
    }

    .article-card {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      background: var(--bg-elevated);
      border-radius: var(--radius-md);
      padding: 28px;
      border: 1px solid var(--border-subtle);
      transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
                  box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1);

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 16px 36px -8px rgba(27, 59, 54, 0.12);

        .card-title a {
          color: var(--accent-primary);
        }
      }

      .card-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }

      .read-time-pill {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        font-size: 0.8rem;
        color: var(--text-secondary);
      }

      .card-title {
        font-size: 1.4rem;
        line-height: 1.3;
        margin-bottom: 12px;

        a {
          color: var(--text-primary);
          text-decoration: none;
          transition: color 0.2s ease;
        }
      }

      .card-excerpt {
        color: var(--text-secondary);
        font-size: 0.95rem;
        line-height: 1.6;
        margin-bottom: 24px;
        flex-grow: 1;
      }

      .card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid var(--border-subtle);
        padding-top: 16px;

        .publish-date {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .read-more-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--accent-primary);
          font-weight: 700;
          font-size: 0.9rem;
          text-decoration: none;
          transition: transform 0.2s ease;

          &:hover {
            transform: translateX(4px);
          }
        }
      }
    }

    /* Detail View Styles (Centered 720px) */
    .article-detail-view {
      max-width: 720px;
      margin: 0 auto 60px;

      .back-nav {
        margin-bottom: 32px;

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: color 0.2s ease, transform 0.2s ease;

          &:hover {
            color: var(--accent-primary);
            transform: translateX(-3px);
          }
        }
      }

      .article-header {
        margin-bottom: 36px;

        .category-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 16px;

          .meta-item {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            font-size: 0.85rem;
            color: var(--text-secondary);
          }
        }

        .article-title {
          font-size: clamp(2rem, 4vw, 2.85rem);
          line-height: 1.2;
          margin-bottom: 16px;
          color: var(--text-primary);
        }

        .article-lead {
          font-size: 1.2rem;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 24px;
        }

        .author-byline {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-block: 14px;
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);

          .author-avatar-badge {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: var(--primary-gradient);
            color: #FAF7F2;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-family: 'Fraunces', serif;
            font-size: 1rem;
          }

          .author-text {
            display: flex;
            flex-direction: column;

            strong {
              color: var(--text-primary);
              font-size: 0.95rem;
            }

            span {
              color: var(--text-secondary);
              font-size: 0.82rem;
            }
          }
        }
      }

      /* Key points box */
      .key-points-box {
        background: rgba(124, 157, 142, 0.08);
        border: 1px solid rgba(124, 157, 142, 0.28);
        border-radius: var(--radius-md);
        padding: 24px 28px;
        margin-bottom: 40px;

        .key-points-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;

          .sparkle-icon {
            color: var(--accent-secondary);
          }

          h3 {
            margin: 0;
            font-size: 1.2rem;
            color: var(--text-primary);
          }
        }

        .key-points-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;

          li {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            font-size: 0.95rem;
            line-height: 1.6;
            color: var(--text-primary);

            .check-icon {
              color: var(--accent-secondary);
              flex-shrink: 0;
              margin-top: 3px;
            }
          }
        }
      }

      /* Article body */
      .article-body {
        margin-bottom: 48px;

        p {
          font-size: 1.05rem;
          line-height: 1.75;
          margin-bottom: 1.5rem;
        }

        h3 {
          font-size: 1.5rem;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }
      }

      .article-footer {
        border-top: 1px solid var(--border-subtle);
        padding-top: 28px;

        .article-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 32px;

          .tag-chip {
            background: var(--bg-surface);
            color: var(--text-secondary);
            padding: 4px 12px;
            border-radius: 999px;
            font-size: 0.8rem;
            font-weight: 500;
          }
        }

        .article-cta-box {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 20px;

          .cta-inner {
            display: flex;
            align-items: flex-start;
            gap: 16px;

            .cta-icon-wrap {
              width: 52px;
              height: 52px;
              border-radius: 14px;
              background: rgba(212, 106, 78, 0.12);
              color: var(--accent-primary);
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
            }

            h3 {
              margin: 0 0 6px;
              font-size: 1.25rem;
              color: var(--text-primary);
            }

            p {
              margin: 0;
              font-size: 0.95rem;
              color: var(--text-secondary);
            }
          }

          .article-consult-btn {
            background: var(--accent-primary) !important;
            color: #ffffff !important;
            border-radius: 999px !important;
            font-weight: 700 !important;
            padding: 10px 24px !important;
            display: inline-flex !important;
            align-items: center !important;
            gap: 8px !important;
            text-decoration: none !important;

            &:hover {
              background: var(--accent-primary-hover) !important;
              transform: translateY(-2px);
            }
          }
        }
      }
    }
  `]
})
export class BlogComponent implements OnInit {
  private blogService = inject(BlogService);
  private route = inject(ActivatedRoute);

  articles: Article[] = [];
  filteredArticles: Article[] = [];
  currentArticle?: Article;
  selectedCategory: 'ALL' | ArticleCategory = 'ALL';

  ngOnInit(): void {
    this.blogService.getArticles().subscribe(list => {
      this.articles = list;
      this.filterArticles();
    });

    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.blogService.getArticleBySlug(slug).subscribe(art => {
          this.currentArticle = art;
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      } else {
        this.currentArticle = undefined;
      }
    });
  }

  setCategory(category: 'ALL' | ArticleCategory): void {
    this.selectedCategory = category;
    this.filterArticles();
  }

  private filterArticles(): void {
    if (this.selectedCategory === 'ALL') {
      this.filteredArticles = this.articles;
    } else {
      this.filteredArticles = this.articles.filter(a => a.category === this.selectedCategory);
    }
  }
}
