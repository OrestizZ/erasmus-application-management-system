function validateSignupForm() {
  let valid = true;
  // let errors = {};

  document.querySelectorAll('.error-message').forEach(span => span.textContent = '');

  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const studentId = document.getElementById('studentId').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirm = document.getElementById('confirmPassword').value.trim();

  // Name/Last name: no digits
  if (/\d/.test(firstName)) {
    valid = false;
    document.getElementById('firstNameError').textContent = "First name cannot contain digits.";
  }

  if (/\d/.test(lastName)) {
    valid = false;
    document.getElementById('lastNameError').textContent = "Last name cannot contain digits.";
  }

  // StudentID: 2022 + 13 digits
  if (!/^2022\d{9}$/.test(studentId)) {
    valid = false;
    document.getElementById('studentIdError').textContent = "Student ID must start with 2022 and have 13 digits.";
  }

  // Phone: exactly 10 digits
  if (!/^\d{10}$/.test(phone)) {
    valid = false;
    document.getElementById('phoneError').textContent = "Phone must be exactly 10 digits.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    valid = false;
    document.getElementById('emailError').textContent = "Please enter a valid email address.";
  }

  // Passwords: match, 5+ characters, 1 symbol
  if (password.length < 5 || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    valid = false;
    document.getElementById('passwordError').textContent = "Password must be at least 5 chars and contain at least 1 symbol.";
  }
  if (password !== confirm) {
    valid = false;
    document.getElementById('confirmPasswordError').textContent = "Passwords do not match.";
  }

  return valid;
}