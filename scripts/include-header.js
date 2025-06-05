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

        // Εδώ φορτώνεις όλα τα scripts που αφορούν το header, π.χ.
        const offCanvasScript = document.createElement('script');
        offCanvasScript.src = 'scripts/off-canvas-menu.js';
        document.body.appendChild(offCanvasScript);

        const headerProfileScript = document.createElement('script');
        headerProfileScript.src = 'scripts/header-profile.js';
        document.body.appendChild(headerProfileScript);

        const profileDropdownScript = document.createElement('script');
        profileDropdownScript.src = 'scripts/profile-dropdown.js';
        document.body.appendChild(profileDropdownScript);
      })
      .catch(error => {
        console.error(error);
        el.innerHTML = '<p>Header could not be loaded.</p>';
      });
  });
});