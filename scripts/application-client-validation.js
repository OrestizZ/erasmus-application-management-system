document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".application-form");

  form.addEventListener("submit", (e) => {
    let hasErrors = false;

    // Καθάρισε προηγούμενα μηνύματα
    document.querySelectorAll(".error-message").forEach((span) => {
      span.textContent = "";
    });

    // Βασικά input πεδία
    const requiredFields = [
      "passedPercent",
      "gpa",
      "uni1",
      "gpaUpload",
      "englishCertificate",
      "foreignCertificate"
    ];

    requiredFields.forEach((id) => {
      const field = document.getElementById(id);
      if (!field || !field.value || (field.type === "file" && field.files.length === 0)) {
        const errorSpan = document.getElementById(id + "Error");
        if (errorSpan) errorSpan.textContent = "This field is required"; 
        hasErrors = true;
      }
    });

    // Radio buttons (engLevel)
    const radioGroup = document.getElementsByName("engLevel");
    const selectedRadio = Array.from(radioGroup).some((radio) => radio.checked);
    if (!selectedRadio) {
      const radioError = document.getElementById("radioError");
      if (radioError) radioError.textContent = "This field is required";
      hasErrors = true;
    }

    // Terms checkbox
    const termsCheckbox = form.querySelector('input[name="terms"]');
    if (!termsCheckbox.checked) {
      const termsError = document.getElementById("termsError");
      if (termsError) termsError.textContent = "This field is required";
      hasErrors = true;
    }

    if (hasErrors) {
      e.preventDefault();
    }
  });
});