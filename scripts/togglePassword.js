document.querySelectorAll(".toggle-password").forEach(icon => {
  icon.addEventListener("click", () => {
    const passwordField = icon.previousElementSibling;

    if (passwordField.type === "password") {
      passwordField.type = "text";
      icon.textContent = "🙈";
    } else {
      passwordField.type = "password";
      icon.textContent = "👁️";
    }
  });
});