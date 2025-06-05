const profileIcon = document.getElementById("profileIcon");
const dropdown = document.querySelector(".profile .dropdown");

if (profileIcon && dropdown) {
  profileIcon.addEventListener("click", () => {
    dropdown.classList.toggle("show");
  });

  const logoutLink = document.getElementById("logout");
  if (logoutLink) {
    logoutLink.addEventListener("click", async (e) => {
      e.preventDefault();
      await fetch("php/logout.php");
      window.location.reload();
    });
  }
}