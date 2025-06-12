document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".application-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // σταμάτα το κανονικό submit

    // Καθάρισε προηγούμενα μηνύματα
    document.querySelectorAll(".error-message").forEach(span => span.textContent = "");

    const hasClientErrors = validateForm(form);
    if (hasClientErrors) return;

    const formData = new FormData(form);

    try {
      const response = await fetch('php/submit_application.php', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        alert('Application submitted successfully!');
        form.reset();
      } else {
        // Εμφάνισε λάθη server
        for (const field in result.errors) {
          const errorSpan = document.getElementById(field + "Error");
          if (errorSpan) {
            errorSpan.textContent = result.errors[field];
          }
        }
      }
    } catch (error) {
      alert('Error submitting form');
      console.error(error);
    }
  });
});
