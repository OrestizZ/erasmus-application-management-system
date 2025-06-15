document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".application-form");
  if (!form) return; // ασφάλεια
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // form.style.display = "none";

    document.querySelectorAll(".error-message").forEach(span => span.textContent = "");

    const hasClientErrors = validateForm(form);
    if (hasClientErrors) return;

    const formData = new FormData(form);

    // Προσθήκη πολλαπλών αρχείων certificates
    const certInput = form.querySelector('#certificates_path');
    if (certInput && certInput.files.length > 0) {
      for (let i = 0; i < certInput.files.length; i++) {
        formData.append('certificates_path[]', certInput.files[i]);
      }
    }

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