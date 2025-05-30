document.querySelector('.signup-form').addEventListener('submit', function(e) {
  let valid = true;

  document.querySelectorAll('.error-message').forEach(span => span.textContent = '');

  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const studentId = document.getElementById('studentId').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value.trim();

  // Name
  if (/\d/.test(firstName)) {
    document.getElementById('firstNameError').textContent = "The name must not contain any digits.";
    valid = false;
  }

  // Surname
  if (/\d/.test(lastName)) {
    document.getElementById('lastNameError').textContent = "The surname must not contain any digits.";
    valid = false;
  }

  // Student ID
  if (!/^(2022\d{9})$/.test(studentId)) {
    document.getElementById('studentIdError').textContent = "The student id must be 13 digits in length and begin with '2022'";
    valid = false;
  }

  // Tel
  if (!/^\d{10}$/.test(phone)) {
    document.getElementById('phoneError').textContent = "The phone number must be 10 digits in length.";
    valid = false;
  }

  // Password
  if (password.length < 5 || !/[!@#$%^&*]/.test(password)) {
    document.getElementById('passwordError').textContent = "The password must contain at least 5 characters and at least 1 symbol.";
    valid = false;
  }

  // Confirm Password
  if (password !== confirmPassword) {
    document.getElementById('confirmPasswordError').textContent = "The passwords don't match.";
    valid = false;
  }

  // If errors exist, don't submit the form.
  if (!valid) {
    e.preventDefault();
  }
});
