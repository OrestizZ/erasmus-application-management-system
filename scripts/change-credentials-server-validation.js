document.querySelector('.change-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateChangeCredentials()) {
        return; // Αν υπάρχουν σφάλματα στο client, δεν στέλνουμε τίποτα στον server
    }
    
    const fieldMap = {
        'First Name': 'first_name',
        'Last Name': 'last_name',
        'Student ID': 'student_id',
        'Phone': 'phone',
        'Email': 'email',
        'Password': 'password_hash'
    };

    const getField = document.getElementById('field').value;
    const field = fieldMap[getField];
    const value = document.getElementById('newValue').value;

    try {
        const response = await fetch('php/profile.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `field=${encodeURIComponent(field)}&newValue=${encodeURIComponent(value)}`
        });
        
        const result = await response.json();
        
        if (result.errors) {
            const errMsg = Object.values(result.errors).join(', ');
            document.getElementById('changeError').textContent = errMsg;
        } else {
            document.getElementById('changeSuccess').textContent = 'Update Successfull!';
            document.getElementById('changeError').textContent = '';
        }
    } catch (error) {
        console.error('Error:', error);
    }
});