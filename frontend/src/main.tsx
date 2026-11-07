import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import { HomePage } from './pages/home/HomePage';
import './styles/azure-blue.css';
import './styles.scss';

// Lazy loading delle rotte secondarie (code-splitting on-demand)
const AboutPage = React.lazy(() => import('./pages/about/AboutPage').then(m => ({ default: m.AboutPage })));
const ServicesPage = React.lazy(() => import('./pages/services/ServicesPage').then(m => ({ default: m.ServicesPage })));
const BlogPage = React.lazy(() => import('./pages/blog/BlogPage').then(m => ({ default: m.BlogPage })));
const TestimonialsPage = React.lazy(() => import('./pages/testimonials/TestimonialsPage').then(m => ({ default: m.TestimonialsPage })));
const FaqPage = React.lazy(() => import('./pages/faq/FaqPage').then(m => ({ default: m.FaqPage })));
const ContattiPage = React.lazy(() => import('./pages/contatti/ContattiPage').then(m => ({ default: m.ContattiPage })));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="chi-sono" element={<AboutPage />} />
          <Route path="servizi" element={<ServicesPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="contatti" element={<ContattiPage />} />
          <Route path="contact" element={<Navigate to="/contatti" replace />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogPage />} />
          <Route path="testimonianze" element={<TestimonialsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
