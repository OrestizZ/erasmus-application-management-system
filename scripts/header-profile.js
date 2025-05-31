document.addEventListener("DOMContentLoaded", () => {
  // Check login status
  fetch("status.php")
    .then(response => response.json())
    .then(data => {
      if (data.loggedIn) {
        // Ο χρήστης έχει κάνει login
        document.querySelector(".login-signup-buttons").style.display = "none";
        document.querySelector(".profile").style.display = "block"; // ή block ανάλογα με το CSS σου

        // Προαιρετικά: Δείχνει το όνομα χρήστη στο dropdown
        const profileUsername = document.querySelector(".profile-username");
        if (profileUsername && data.username) {
          profileUsername.textContent = data.username;
        }
      } else {
        // Ο χρήστης είναι visitor
        document.querySelector(".login-signup-buttons").style.display = "block"; // ή block
        document.querySelector(".profile").style.display = "none";
      }
    })
    .catch(error => console.error("Error fetching login status:", error));

  // Handle logout
  const logoutLink = document.getElementById("logout");
  if (logoutLink) {
    logoutLink.addEventListener("click", async (e) => {
      e.preventDefault();
      await fetch("logout.php");
      window.location.reload(); // Refresh page για να επανεμφανίσει τα login/signup κουμπιά
    });
  }
});
