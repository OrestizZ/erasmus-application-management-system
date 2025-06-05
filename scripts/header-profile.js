const loginButtons = document.querySelector(".login-signup-buttons");
const profileDiv = document.querySelector(".profile");
const logoutLink = document.getElementById("logout");

if (loginButtons && profileDiv && logoutLink) {
  
  // Έλεγχος login status
  fetch("php/status.php")
    .then(response => response.json())
    .then(data => {
      if (data.loggedIn) {
        loginButtons.style.display = "none";
        profileDiv.style.display = "block";

        // Προαιρετικά: εμφάνιση username αν υπάρχει
        const profileUsername = document.querySelector(".profile-username");
        if (profileUsername && data.username) {
          profileUsername.textContent = data.username;
        }
      } else {
        loginButtons.style.display = "block";
        profileDiv.style.display = "none";
      }
    })
    .catch(error => console.error("Error fetching login status:", error));

  // Logout handler
  logoutLink.addEventListener("click", async (e) => {
    e.preventDefault();
    await fetch("php/logout.php");
    window.location.reload();
  });
}