document.addEventListener("DOMContentLoaded", () => {
  fetch("php/status.php")
    .then(response => response.json())
    .then(data => {
      const form = document.querySelector("form");
      const warning = document.getElementById("login-warning");

      if (!data.loggedIn) {
        if (form) {
          form.style.opacity = "0.5";
          form.style.pointerEvents = "none";
        }
        if (warning) {
          warning.style.display = "block";
        }
      } else {
        
        if (warning) warning.style.display = "none";

        if (data.firstName) {
          const firstNameField = document.getElementById("firstName");
          firstNameField.value = data.firstName;
          firstNameField.readOnly = true;
          firstNameField.style.opacity = "0.5";
          firstNameField.style.pointerEvents = "none";
        }

        if (data.lastName) {
          const lastNameField = document.getElementById("lastName");
          lastNameField.value = data.lastName;
          lastNameField.readOnly = true;
          lastNameField.style.opacity = "0.5";
          lastNameField.style.pointerEvents = "none";
        }

        if (data.studentId) {
          const studentIdField = document.getElementById("studentId");
          studentIdField.value = data.studentId;
          studentIdField.readOnly = true;
          studentIdField.style.opacity = "0.5";
          studentIdField.style.pointerEvents = "none";
        }
      }
    })
    .catch(error => {
      console.error("Error checking login status:", error);
    });
});