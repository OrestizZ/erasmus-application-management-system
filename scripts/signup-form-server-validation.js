document.querySelector(".signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!validateSignupForm()) {
    return;
  }

  const form = e.target;
  const formData = new FormData(form);

  document.querySelectorAll(".error-message").forEach(span => span.textContent = "");

  try { 
    const response = await fetch("php/signup.php", {
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