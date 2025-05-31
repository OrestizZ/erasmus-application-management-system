document.querySelector(".signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Καλούμε το client-side validation
  if (!validateSignupForm()) {
    return; // Αν υπάρχουν σφάλματα στο client, δεν στέλνουμε τίποτα στον server
  }

  const form = e.target;
  const formData = new FormData(form);

  // Καθαρίζουμε παλιά server-side error μηνύματα
  document.querySelectorAll(".error-message").forEach(span => span.textContent = "");

  try {
    const response = await fetch("signup.php", {
      method: "POST",
      body: formData
    });

    const result = await response.json();

    if (result.errors) {
      for (const key in result.errors) {
        const errorSpan = document.getElementById(`${key}Error`);
        if (errorSpan) {
          errorSpan.textContent = result.errors[key];
        }
      }
    } else if (result.success) {
      // Μπορείς να εμφανίσεις μήνυμα επιτυχίας
      const successMessage = document.getElementById("successMessage");
      document.querySelector(".signup-form").style.display = "none";
      document.querySelector(".signup-form-title").style.display = "none";
      document.getElementById("successMessage").style.display = "block";
      form.reset();
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
