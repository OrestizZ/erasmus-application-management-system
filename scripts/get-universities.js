document.addEventListener('DOMContentLoaded', function () {
  fetch('php/get_universities.php')
    .then(response => response.json())
    .then(data => {
      const selects = ['uni1', 'uni2', 'uni3'];

      selects.forEach(id => {
        const select = document.getElementById(id);
        data.forEach(u => {
          const option = document.createElement('option');
          option.value = u.id;
          option.textContent = u.name;
          select.appendChild(option);
        });
      });
    })
    .catch(error => {
      console.error('Error loading universities:', error);
    });
});