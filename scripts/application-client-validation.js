function validateForm(form) {
  let hasErrors = false;

  document.querySelectorAll(".error-message").forEach((span) => {
    span.textContent = "";
  });

  const requiredFields = [
    "passedPercent",
    "gpa",
    "uni1",
    "gpaUpload",
    "englishCertificate",
    "foreignCertificate",
  ];

  requiredFields.forEach((id) => {
    if (id === "foreignCertificate") return;
    const field = form.querySelector(`#${id}`);
    if (!field || !field.value || (field.type === "file" && field.files.length === 0)) {
      const errorSpan = form.querySelector(`#${id}Error`);
      if (errorSpan) {
        errorSpan.textContent = "This field is required";
        errorSpan.style.display = "block";
        hasErrors = true;
      }
      else {
        errorSpan.style.display = "none";
      }
    }
  });

  const radioGroup = form.querySelectorAll('input[name="english_level"]');
  const selectedRadio = Array.from(radioGroup).some((radio) => radio.checked);
  if (!selectedRadio) {
    const radioError = form.querySelector("#radioError");
    if (radioError) {
      radioError.textContent = "This field is required";
      radioError.style.display = "block";
      hasErrors = true;
    }
    else {
      radioError.style.display = "none"; 
    }
  }

  const termsCheckbox = form.querySelector('input[name="terms"]');
  if (!termsCheckbox.checked) {
    const termsError = form.querySelector("#termsError");
    if (termsError) {
      termsError.textContent = "This field is required";
      termsError.style.display = "block";
      hasErrors = true;
    }
    else {
      termsError.style.display = "none";
    }
  }

  return hasErrors;
}