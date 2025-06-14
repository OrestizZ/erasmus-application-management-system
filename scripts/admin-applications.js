
    
    fetch('get_universities.php')
      .then(res => res.json())
      .then(data => {
        const select = document.getElementById('universityFilter');
        data.forEach(u => {
          const option = document.createElement('option');
          option.value = u.id;
          option.textContent = u.name;
          select.appendChild(option);
        });
      });

    
    function loadApplications() {
      const minRate = document.getElementById('minRate').value;
      const univId = document.getElementById('universityFilter').value;
      const sort = document.getElementById('sortByAvg').checked;

      let url = `fetch_applications.php?min_pass_rate=${minRate}`;
      if (univId) url += `&university_id=${univId}`;
      if (sort) url += `&order_by_avg=desc`;

      fetch(url)
        .then(res => res.json())
        .then(data => {
          const tbody = document.querySelector('#resultsTable tbody');
          tbody.innerHTML = ''; 

          data.forEach(app => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
              <td>${app.first_name}</td>
              <td>${app.last_name}</td>
              <td>${app.username}</td>
              <td>${app.student_id}</td>
              <td>${app.avg_grade}</td>
              <td>${app.pass_rate}%</td>
              <td>${app.english_level}</td>
              <td>${app.university_1 || '-'}</td>
              <td>${app.university_2 || '-'}</td>
              <td>${app.university_3 || '-'}</td>
              <td><a href="${app.transcript_path}" target="_blank">PDF</a></td>
              <td><a href="${app.certificates_path}" target="_blank">PDF</a></td>
              <td><input type="checkbox" ${app.accepted == 1 ? 'checked' : ''} disabled></td>
            `;
            tbody.appendChild(tr);
          });
        });
    }

    
    loadApplications();
  
