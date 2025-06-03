document.querySelector(".login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  document.querySelectorAll(".error-message").forEach(span => span.textContent = "");

  try {
    const response = await fetch("php/login.php", {
      method: "POST",
      body: formData
    });

    const result = await response.json();

    if (result.errors) {
      document.getElementById("loginError").textContent = result.errors.login;
    } else if (result.success) {
      // Πήγαινε σε protected page ή εμφάνισε μήνυμα
      window.location.href = "index.html";
    }
  } catch (error) {
    console.error("Error:", error);
  }
});