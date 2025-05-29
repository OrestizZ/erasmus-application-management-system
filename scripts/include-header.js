window.addEventListener("DOMContentLoaded", () => {
  const includeElements = document.querySelectorAll('[data-include]');

  includeElements.forEach(el => {
    const file = el.getAttribute('data-include');
    fetch(file)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load ' + file);
        }
        return response.text();
      })
      .then(data => {
        el.innerHTML = data;

        const script = document.createElement('script');
        script.src = 'scripts/off-canvas-menu.js';
        document.body.appendChild(script);
      })
      .catch(error => {
        console.error(error);
        el.innerHTML = '<p>Header could not be loaded.</p>';
      });
  });
});
