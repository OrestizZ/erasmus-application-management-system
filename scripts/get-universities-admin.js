document.addEventListener('DOMContentLoaded', function () {
  fetch('php/get_universities.php')
    .then(response => response.json())
    .then(data => {
      const select = document.getElementById('universityFilter');

      if (!select) return;

      data.forEach(u => {
        const option = document.createElement('option');
        option.value = u.id;
        option.textContent = u.name;
        select.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error loading universities:', error);
    });
});