document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("#applicationsTable tbody");
  const minPassRateInput = document.getElementById("minPassRate");
  const universityFilter = document.getElementById("universityFilter");
  const sortByGPA = document.getElementById("sortByGPA");
  const applyFiltersBtn = document.getElementById("applyFilters");
  const acceptForm = document.getElementById("acceptForm");

  function generateFileLink(path) {
    if (!path) return '-';
    const filename = path.split('/').pop();
    return `<a href="${path}" target="_blank" download>${filename}</a>`;
  }

  function generateMultipleLinks(paths) {
    if (!Array.isArray(paths) || paths.length === 0) return '-';
    return paths.map(path => {
      const filename = path.split('/').pop();
      return `<a href="${path}" target="_blank" download>${filename}</a>`;
    }).join('<br>');
  }

  function fetchApplications() {
    const params = new URLSearchParams();

    if (minPassRateInput.value) {
      params.append("minPassRate", minPassRateInput.value);
    }

    if (universityFilter.value) {
      params.append("university", universityFilter.value);
    }

    if (sortByGPA.checked) {
      params.append("sortByGPA", "true");
    }

    fetch(`php/get_applications.php?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (!data.success) throw new Error("Failed to fetch applications");

        tableBody.innerHTML = "";

        data.applications.forEach(app => {
          const tr = document.createElement("tr");

          tr.innerHTML = `
            <td><input type="checkbox" name="accept[]" value="${app.id}" ${app.accepted ? "checked" : ""}></td>
            <td>${app.firstName}</td>
            <td>${app.lastName}</td>
            <td>${app.studentId}</td>
            <td>${app.avg_grade}</td>
            <td>${app.pass_rate}%</td>
            <td>${app.english_level}</td>
            <td>${app.university_1}</td>
            <td>${app.university_2 || '-'}</td>
            <td>${app.university_3 || '-'}</td>
            <td>${generateFileLink(app.gpa_path)}</td>
            <td>${generateFileLink(app.english_path)}</td>
            <td>${generateMultipleLinks(app.certificates_path)}</td>
            <td>${app.accepted === null ? 'Pending' : app.accepted ? 'Yes' : 'No'}</td>
            <td>${app.public === null ? 'Pending' : app.public ? 'Yes' : 'No'}</td>
          `;

          tableBody.appendChild(tr);
        });
      })
      .catch(err => {
        console.error("Error loading applications:", err);
      });
  }

  // Load initial data
  fetchApplications();

  // Re-fetch with filters
  applyFiltersBtn.addEventListener("click", fetchApplications);

  // Submit acceptances
  acceptForm.addEventListener("submit", e => {
    e.preventDefault();

    const formData = new FormData(acceptForm);

    fetch("php/accept_applications.php", {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        fetchApplications(); // refresh
      })
      .catch(err => {
        console.error("Error submitting acceptances:", err);
      });
  });

  const submitPublicBtn = document.getElementById("submitPublic");

  submitPublicBtn.addEventListener("click", function (e) {
    e.preventDefault();

    if (!confirm("Are you sure you want to publish the accepted applications?")) return;

    fetch("php/publish_applications.php", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        fetchApplications();
      })
      .catch((err) => {
        console.error("Error publishing applications:", err);
      });
  });
});
