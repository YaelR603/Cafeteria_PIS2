import ControladorAutenticacion from '../../CONTROLLER/Controlador_Autenticacion.js';

class AuthUI {
    constructor() {
        this.selectedAccountType = 'usuario';
        this.initEventListeners();
    }

    initEventListeners() {
        // Selector de tipo de cuenta
        document.querySelectorAll('.account-type-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.account-type-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.selectedAccountType = btn.dataset.type;
            });
        });

        // Formulario de Login
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.handleLogin();
            });
        }

        // Formulario de Registro
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.handleRegister();
            });
        }
    }

    async handleLogin() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const loginBtn = document.getElementById('loginBtn');

        if (!email || !password) {
            this.showMessage('Por favor completa todos los campos', 'error');
            return;
        }

        try {
            this.toggleLoading(loginBtn, true);
            
            const autenticado = await ControladorAutenticacion.autenticar(
                this.selectedAccountType, 
                email, 
                password
            );

            if (autenticado) {
                this.showMessage('Autenticación exitosa. Redirigiendo...', 'success');
                setTimeout(() => {
                    window.location.href = this.selectedAccountType === 'administrador' 
                        ? '/admin/dashboard.html' 
                        : '/user/dashboard.html';
                }, 1500);
            } else {
                this.showMessage('Credenciales incorrectas', 'error');
            }
        } catch (error) {
            this.showMessage(error.message || 'Error al autenticar', 'error');
            console.error('Error en autenticación:', error);
        } finally {
            this.toggleLoading(loginBtn, false);
        }
    }

    async handleRegister() {
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const registerBtn = document.getElementById('registerBtn');

        if (!fullName || !email || !password || !confirmPassword) {
            this.showMessage('Por favor completa todos los campos', 'error');
            return;
        }

        if (password !== confirmPassword) {
            this.showMessage('Las contraseñas no coinciden', 'error');
            return;
        }

        try {
            this.toggleLoading(registerBtn, true);
            
            const cuenta = await ControladorAutenticacion.crearCuenta(
                this.selectedAccountType,
                fullName,
                email,
                password
            );

            this.showMessage(`Cuenta de ${this.selectedAccountType} creada exitosamente!`, 'success');
            console.log('Cuenta creada:', cuenta);
            
            // Redirigir a login después de 2 segundos
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } catch (error) {
            this.showMessage(error.message || 'Error al registrar la cuenta', 'error');
            console.error('Error en registro:', error);
        } finally {
            this.toggleLoading(registerBtn, false);
        }
    }

    toggleLoading(button, isLoading) {
        const btnText = button.querySelector('.btn-text');
        const btnLoader = button.querySelector('.btn-loader');
        
        if (isLoading) {
            button.disabled = true;
            btnText.style.display = 'none';
            btnLoader.style.display = 'block';
        } else {
            button.disabled = false;
            btnText.style.display = 'block';
            btnLoader.style.display = 'none';
        }
    }

    showMessage(text, type) {
        const messageContainer = document.getElementById('messageContainer');
        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                ${type === 'success' ? 
                    '<path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' : 
                    '<path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'}
            </svg>
            <span>${text}</span>
        `;
        
        messageContainer.innerHTML = '';
        messageContainer.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 5000);
    }
}

// Inicializar la UI cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new AuthUI();
});