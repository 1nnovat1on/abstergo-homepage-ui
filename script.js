const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');

toggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
  toggle.innerHTML = isOpen ? 'Close <span aria-hidden="true">×</span>' : 'Menu <span aria-hidden="true">+</span>';
});

document.querySelectorAll('#site-nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle?.setAttribute('aria-expanded', 'false');
  if (toggle) toggle.innerHTML = 'Menu <span aria-hidden="true">+</span>';
}));

document.querySelector('#year').textContent = new Date().getFullYear();
