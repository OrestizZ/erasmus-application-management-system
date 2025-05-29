const toggle = document.getElementById('off-canvas-toggle');
const menu = document.getElementById('off-canvas-menu');
const caret = toggle.querySelector('.off-canvas-caret');

toggle.addEventListener('click', () => {
  menu.classList.toggle('show');
  caret.classList.toggle('rotate');
});