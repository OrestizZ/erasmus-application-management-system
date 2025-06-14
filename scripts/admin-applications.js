document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("#applicationsTable tbody");
  const minPassRateInput = document.getElementById("minPassRate");
  const universityFilter = document.getElementById("universityFilter");
  const sortByGPA = document.getElementById("sortByGPA");
  const applyFiltersBtn = document.getElementById("applyFilters");

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

        tableBody.innerHTML = ""; // clear previous data

        data.applications.forEach(app => {
          const tr = document.createElement("tr");

          tr.innerHTML = `
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
          `;

          tableBody.appendChild(tr);
        });
      })
      .catch(err => {
        console.error("Error loading applications:", err);
      });
  }

  // Load data on first page load
  fetchApplications();

  // Re-fetch when filters are applied
  applyFiltersBtn.addEventListener("click", fetchApplications);
});