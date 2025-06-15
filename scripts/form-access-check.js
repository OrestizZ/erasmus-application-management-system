document.addEventListener("DOMContentLoaded", async () => {
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

      fetch("php/get_application_period.php")
        .then(res => res.json())
        .then(period => {
          const now = new Date().toISOString().split("T")[0];

          if(period.start_date === null || period.end_date === null) {
            const periodWarning = document.getElementById("period-warning");
            periodWarning.textContent = `The applications period has not been set yet.`;
            periodWarning.style.display = "block";
          }
          else if (now < period.start_date || now > period.end_date) {
            if (form) {
              form.style.opacity = "0.5";
              form.style.pointerEvents = "none";
            }

            const periodWarning = document.getElementById("period-warning");
            periodWarning.textContent = `The applications period begins from ${period.start_date} until ${period.end_date}.`;
            periodWarning.style.display = "block";
          }
        });
    })
    .catch(error => {
      console.error("Error checking login status:", error);
    });
});