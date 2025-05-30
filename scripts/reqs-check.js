document.querySelector('.quick-check-form').addEventListener('submit', function(e) {
  e.preventDefault(); // Αποφυγή υποβολής φόρμας

  // Παίρνουμε τιμές
  const year = document.getElementById('yearSelect').value;
  const percent = parseFloat(document.getElementById('percentInput').value);
  const gpa = parseFloat(document.getElementById('gpaInput').value);
  const engCert = document.querySelector('input[name="engCert"]:checked')?.value;

  // Καθαρίζουμε προηγούμενο αποτέλεσμα
  let resultDiv = document.getElementById('result');
  if (!resultDiv) {
    resultDiv = document.createElement('div');
    resultDiv.id = 'result';
    document.querySelector('.quick-check-form').appendChild(resultDiv);
  }
  resultDiv.innerHTML = ''; // Καθαρισμός

  let errors = [];

  // Έλεγχοι
  if (year === '1st') {
    errors.push('❌ You need to be at least on your 2nd year of study.');
  }

  if (isNaN(percent) || percent < 70) {
    errors.push('❌ You need to have successfully passed at least 70% of your subjects.');
  }

  if (isNaN(gpa) || gpa < 6.5) {
    errors.push('❌ Your GPA nees to be at least 6.5.');
  }

  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const minLevelIndex = levels.indexOf('B2');

  if (!engCert || levels.indexOf(engCert) < minLevelIndex) {
    errors.push('❌ You need at least B2 knowledge of the English language.');
  }

  // Show results.
  if (errors.length > 0) {
    resultDiv.innerHTML = '<h3>Results:</h3><ul><li>' + errors.join('</li><li>') + '</li></ul>';
    resultDiv.style.color = 'red';
  } else {
    resultDiv.innerHTML = '✅ You can apply for Erasmus+!';
    resultDiv.style.color = 'green';
  }
});