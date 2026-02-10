// Load remembered username on page load
window.addEventListener('DOMContentLoaded', () => {
    const rememberedUsername = localStorage.getItem('rememberedUsername');
    if (rememberedUsername) {
        document.getElementById('username').value = rememberedUsername;
        document.getElementById('rememberMe').checked = true;
    }
});

// Form submission handler
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const rememberMe = document.getElementById('rememberMe').checked;
    const errorMessage = document.getElementById('errorMessage');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    const loginBtn = document.getElementById('loginBtn');
    const spinner = document.getElementById('spinner');
    const btnText = document.querySelector('.btn-text');

    // Clear previous errors
    errorMessage.textContent = '';
    usernameError.textContent = '';
    passwordError.textContent = '';

    // Validation
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username) {
        usernameError.textContent = 'Username or email is required.';
        isValid = false;
    } else if (username.includes('@') && !emailRegex.test(username)) {
        usernameError.textContent = 'Please enter a valid email.';
        isValid = false;
    }

    if (!password) {
        passwordError.textContent = 'Password is required.';
        isValid = false;
    } else if (password.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters.';
        isValid = false;
    }

    if (!isValid) return;

    // Show loading spinner
    loginBtn.disabled = true;
    btnText.style.display = 'none';
    spinner.style.display = 'block';

    // Simulate API call (replace with real fetch)
    setTimeout(() => {
        // Demo login logic: Check against stored password
        // LOGIN INI GAES
        const storedPassword = localStorage.getItem('userPassword') || 'gantipassword'; // Default demo password
        if (username === 'gantiuser' && password === storedPassword) {
            // Remember username if checked
            if (rememberMe) {
                localStorage.setItem('rememberedUsername', username);
            } else {
                localStorage.removeItem('rememberedUsername');
            }

            // Redirect to change password page after login
            window.location.href = "https://prefesional-portofolio-muhammad-fau-nine.vercel.app/"; // Redirect to change password page
        } else {
            errorMessage.textContent = 'Invalid username or password.';
            loginBtn.disabled = false;
            btnText.style.display = 'inline';
            spinner.style.display = 'none';
        }
    }, 2000); // Simulate 2-second delay
});

// Forgot Password handler
document.getElementById('forgotLink').addEventListener('click', function(e) {
    e.preventDefault();
    const email = prompt('Enter your email to reset password:');
    if (email) {
        // Demo: In real app, send reset email
        alert(`Password reset link sent to ${email}. Check your email and follow the link to change-password.html. (This is a demo.)`);
        // Redirect to change password page for demo
        window.location.href = 'change-password.html';
    }
});

// Keyboard support for form
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.activeElement.tagName !== 'BUTTON') {
        document.getElementById('loginForm').dispatchEvent(new Event('submit'));
    }
});