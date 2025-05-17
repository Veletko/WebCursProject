export function setupPasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const passwordRepeatInput = document.getElementById('password_repeat');
    if (passwordInput && passwordRepeatInput) {
        passwordInput.type = 'text';
        passwordRepeatInput.type = 'text';
    }
}

export function generatePassword() {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    const specialChars = '!@#$%^&*';
    
    let password = [
        chars[Math.floor(Math.random() * chars.length)],
        upperChars[Math.floor(Math.random() * upperChars.length)],
        digits[Math.floor(Math.random() * digits.length)],
        specialChars[Math.floor(Math.random() * specialChars.length)]
    ];
    
    const allChars = chars + upperChars + digits + specialChars;
    while (password.length < 12) {
        password.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }
    
    return password.sort(() => Math.random() - 0.5).join('');
}