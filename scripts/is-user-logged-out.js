window.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch('php/status.php');
      const data = await response.json();
      if (!data.loggedIn) {
        window.location.href = 'index.html';
      }
    } catch (err) {
      console.error('Status check failed', err);
    }
});