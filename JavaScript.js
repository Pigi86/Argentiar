const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const sectionLinks = document.querySelectorAll('[data-section]');
const sections = document.querySelectorAll('.curtain');

navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
});

function showSection(id) {
    sections.forEach(sec => sec.classList.toggle('active', sec.id === id));
    sectionLinks.forEach(link => link.classList.toggle('active', link.dataset.section === id));
    window.scrollTo({ top: 0 });
    history.replaceState(null, '', '#' + id);
}

sectionLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(link.dataset.section);
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

// Open directly on a section if the URL has a hash on load
const initial = location.hash.replace('#', '');
if (initial && document.getElementById(initial)) {
    showSection(initial);
}

// Gallery lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (!img) return;
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = img.alt;
        lightbox.classList.add('open');
    });
});

function closeLightbox() { lightbox.classList.remove('open'); }

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

const footerYear = document.getElementById('footerYear');
if (footerYear) footerYear.textContent = new Date().getFullYear();