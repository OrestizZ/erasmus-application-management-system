document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("universityForm");
  const nameInput = document.getElementById("universityName");
  const idInput = document.getElementById("universityId");
  const tableBody = document.querySelector("#universitiesTable tbody");

  function fetchUniversities() {
    fetch("php/universities_api.php")
      .then(res => res.json())
      .then(data => {
        tableBody.innerHTML = "";
        data.forEach(u => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${u.id}</td>
            <td>${u.name}</td>
            <td>
              <button onclick="editUniversity(${u.id}, '${u.name}')">Edit</button>
              <button onclick="deleteUniversity(${u.id})">Delete</button>
            </td>
          `;
          tableBody.appendChild(row);
        });
      });
  }

  window.editUniversity = (id, name) => {
    idInput.value = id;
    nameInput.value = name;
    nameInput.focus();
  };

  window.deleteUniversity = id => {
    if (!confirm("Are you sure?")) return;
    fetch(`php/universities_api.php?id=${id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(() => fetchUniversities());
  };

  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = nameInput.value.trim();
    if (!name) return;

    const id = idInput.value;
    const method = id ? "PUT" : "POST";
    const url = id ? `php/universities_api.php?id=${id}` : "php/universities_api.php";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    })
      .then(res => res.json())
      .then(() => {
        form.reset();
        fetchUniversities();
      });
  });

  fetchUniversities();
});