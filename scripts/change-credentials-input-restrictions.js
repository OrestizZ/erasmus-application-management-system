const fieldSelect = document.getElementById('field');
const newValueInput = document.getElementById('newValue');
const togglePasswordEye = document.querySelector(".toggle-password");

const maxlengthMap = {
    'First Name': 50,
    'Last Name': 50,
    'Student ID': 13,
    'Phone': 10,
    'Email': 50,
    'Password': 100
};

fieldSelect.addEventListener('change', () => {
    newValueInput.value = '';
    const selected = fieldSelect.value;
    const max = maxlengthMap[selected] || '';
    newValueInput.setAttribute('maxlength', max);
    newValueInput.type = (selected === 'Password') ? 'password' : 'text';
    if(selected === 'Password') {
        togglePasswordEye.style.display = "block";
        togglePasswordEye.textContent = "👁️";   
    }
    else {
        togglePasswordEye.style.display = "none";
    }
    document.getElementById('changeSuccess').textContent = '';
});