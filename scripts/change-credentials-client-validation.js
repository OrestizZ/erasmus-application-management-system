function validateChangeCredentials() {
  let valid = true;

  document.querySelectorAll('.error-message').forEach(span => span.textContent = '');


  const getField = document.getElementById('field').value;
  const value = document.getElementById('newValue').value.trim();

  // Name/Last name: no digits
  if (getField === 'First Name' && /\d/.test(value)) {
    valid = false;
    document.getElementById('changeError').textContent = "First name cannot contain digits.";
  }
  else if (getField === 'Last Name' && /\d/.test(value)) {
    valid = false;
    document.getElementById('changeError').textContent = "Last name cannot contain digits.";
  }
  else if (getField === 'Student ID' && !/^2022\d{9}$/.test(value)) {
    valid = false;
    document.getElementById('changeError').textContent = "Student ID must start with 2022 and have 13 digits.";
  }
  else if (getField === 'Phone' && !/^\d{10}$/.test(value)) {
    valid = false;
    document.getElementById('changeError').textContent = "Phone must be exactly 10 digits.";
  }
  else if (getField === 'Email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    valid = false;
    document.getElementById('changeError').textContent = "Please enter a valid email address.";
  }
  else if (getField === 'Password' && (value.length < 5 || !/[!@#$%^&*(),.?":{}|<>]/.test(value))) {
    valid = false;
    document.getElementById('changeError').textContent = "Password must be at least 5 chars and contain at least 1 symbol.";
  }

  return valid;
}