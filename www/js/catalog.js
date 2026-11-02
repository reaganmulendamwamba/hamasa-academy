(() => {
  'use strict';
  const localUrl = new URL('./data/books.json', document.baseURI).href;
  const remoteUrl = window.AMASA_CONFIG?.catalogUrl?.trim();
  const catalogUrl = remoteUrl || localUrl;
  const labels = {
    entrepreneuriat: 'Entrepreneuriat',
    personnel: 'Développement personnel',
    outils: 'Outils pratiques'
  };
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c =>
    ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function cover(book) {
    if (book.cover) {
      const coverUrl = new URL(book.cover, catalogUrl).href;
      return `<img src="${esc(coverUrl)}" alt="Couverture de ${esc(book.title)}" loading="lazy">`;
    }
    const tone = ['orange','cream','blue'].includes(book.coverTone) ? book.coverTone : '';
    return `<div class="cover-placeholder ${tone}"><small>${esc(book.eyebrow || 'AMASA ACADEMY')}</small><b>${esc(book.title)}</b><em>${esc(book.coverSubtitle || 'Ressource pratique')}</em></div>`;
  }
  function card(book, shop) {
    const category = labels[book.category] || book.categoryLabel || 'Ressource';
    const cls = shop ? 'shop-card reveal in-view' : 'book-card';
    return `<article class="${cls}" data-category="${esc(book.category)}">
      <div class="book-art">${cover(book)}</div>
      <div class="book-info">
        <span class="book-category">${esc(category)}</span>
        <h3>${esc(book.title)}</h3><p>${esc(book.description)}</p>
        <div class="book-meta"><span>${esc(book.statusLabel || 'Disponible sur demande')}</span>
        <a class="text-link" href="#contact">${esc(book.orderLabel || 'En savoir plus')} ↗</a></div>
      </div></article>`;
  }
  async function init() {
    const track = document.getElementById('bookTrack');
    const grid = document.getElementById('shopGrid');
    try {
      const response = await fetch(catalogUrl, {cache:'no-store'});
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      const items = Array.isArray(data.books) ? data.books.filter(b => b.status === 'published') : [];
      if (!items.length) throw new Error('Aucune ressource publiée');
      track.innerHTML = items.map(b => card(b, false)).join('');
      grid.innerHTML = items.map(b => card(b, true)).join('');
      document.getElementById('carouselStatus')?.remove();
      document.getElementById('shopStatus')?.remove();
      document.querySelectorAll('#bookTrack a[href="#contact"], #shopGrid a[href="#contact"]').forEach(a => {
        a.addEventListener('click', e => {
          if (!document.body.classList.contains('shop-mode')) return;
          e.preventDefault();
          document.body.classList.remove('shop-mode');
          document.title = 'AMASA Academy — Le savoir qui vous fait avancer';
          window.scrollTo(0,0);
          setTimeout(() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'}),80);
        });
      });
    } catch (err) {
      console.error('Catalogue AMASA :', err);
      const message = '<p class="catalog-loading">Catalogue indisponible. Vérifiez la connexion et le fichier data/books.json.</p>';
      track.innerHTML = message;
      grid.innerHTML = message;
    }
  }
  document.addEventListener('DOMContentLoaded', init);
})();
