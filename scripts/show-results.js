document.addEventListener("DOMContentLoaded", () => {
  const tableWrapper = document.querySelector(".table-wrapper");
  const tbody = document.querySelector("#resultsTable tbody");
  const resultsMessage = document.getElementById('results-message');

  // Ελέγχουμε αν είναι ανοιχτή περίοδος υποβολής
  fetch("php/check_application_period.php")
    .then(res => res.json())
    .then(data => {
      if (data.isOpen) {
        // Περίοδος υποβολής ανοιχτή: κρύβουμε τον πίνακα
        if (tableWrapper) {
          tableWrapper.style.display = "none";
          resultsMessage.style.display = "block";
        }
      } else {
        // Περίοδος υποβολής κλειστή: εμφανίζουμε τα αποτελέσματα
        if (tableWrapper) {
          tableWrapper.style.display = "block";
          resultsMessage.style.display = "none";
        }

        fetch("php/get_public_applications.php")
          .then(res => res.json())
          .then(data => {
            if (!data.success) throw new Error("Failed to load results");

            data.applications.forEach(app => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
              <td>${app.first_name}</td>
              <td>${app.last_name}</td>
              <td>${app.student_id}</td>
              <td>${app.avg_grade}</td>
              <td>${app.pass_rate}%</td>
              <td>${app.english_level}</td>
              <td>${app.university_1}</td>
              <td>${app.university_2 || '-'}</td>
              <td>${app.university_3 || '-'}</td>
            `;
            tbody.appendChild(tr);
          });
          })
          .catch(err => console.error("Error loading results:", err));
      }
    })
    .catch(err => console.error("Error checking application period:", err));
});