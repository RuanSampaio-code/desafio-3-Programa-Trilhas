document.addEventListener('DOMContentLoaded', () => {
    // Toggle Password
    document.querySelector('.toggle-password').addEventListener('click', function() {
        const password = document.getElementById('senha');
        const icon = this.querySelector('i');
        
        if (password.type === 'password') {
            password.type = 'text';
            icon.classList.replace('bi-eye-slash', 'bi-eye');
        } else {
            password.type = 'password';
            icon.classList.replace('bi-eye', 'bi-eye-slash');
        }
    });

    // Validação de Formulário
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const usuario = document.getElementById('usuario');
        const senha = document.getElementById('senha');
        let isValid = true;

        // Validação simples
        [usuario, senha].forEach(input => {
            if (input.value.trim() === '') {
                input.classList.add('is-invalid');
                isValid = false;
            } else {
                input.classList.remove('is-invalid');
            }
        });

        if (isValid) {
            window.location.href = "/pages/home.html";
        }
    });

    // Validação em Tempo Real
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.classList.remove('is-invalid');
            }
        });
    });

    // Alternar imagem no modo escuro
    const toggleSwitch = document.getElementById('darkModeToggle');
    const loginLogo = document.getElementById('loginLogo');

    const updateLogo = () => {
        if (document.body.classList.contains('dark-mode')) {
            loginLogo.src = '../assets/logos/logo-trilhas-inova.png'; // Imagem para o modo escuro
        } else {
            loginLogo.src = '../assets/logos/logo-trilhas-inova-light.png'; // Imagem para o modo claro
        }
    };

    // Inicializa o estado da imagem com base no modo atual
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        toggleSwitch.checked = true;
        updateLogo();
    }

    // Alterna a imagem ao mudar o modo
    toggleSwitch.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode', toggleSwitch.checked);
        localStorage.setItem('darkMode', toggleSwitch.checked ? 'enabled' : 'disabled');
        updateLogo();
    });

    // Função de tradução
    const languageSelect = document.getElementById('languageSelect');
    const updateTranslations = (language) => {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[language][key]) {
                element.textContent = translations[language][key];
            }
        });

        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            if (translations[language][key]) {
                element.placeholder = translations[language][key];
            }
        });
    };

    // Inicializa a tradução com o idioma selecionado
    const defaultLanguage = 'pt';
    const currentLanguage = languageSelect.value || defaultLanguage;
    updateTranslations(currentLanguage);

    // Atualiza a tradução ao mudar o idioma
    languageSelect.addEventListener('change', (event) => {
        updateTranslations(event.target.value);
    });
});