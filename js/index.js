//HTML foi completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    const App = {
        translations: {
            en: {
                welcomeMessage: "Welcome to the Trilhas program, an initiative by SECTI and FAPEMA to train young people and adults in the technology field.",
                startRegistration: "Start Registration"
            },
            pt: {
                welcomeMessage: "Bem-vindo ao programa Trilhas, uma iniciativa da SECTI e FAPEMA para capacitar jovens e adultos na área de tecnologia.",
                startRegistration: "Iniciar Inscrição"
            }
        },
        
        init() {
            this.setupLanguageSelector();
            this.setupDarkMode();
        },

        setupLanguageSelector() {
            const languageSelect = document.getElementById('languageSelect');
            languageSelect.addEventListener('change', () => {
                this.updateTranslations(languageSelect.value);
            });

            // Definir o idioma inicial
            this.updateTranslations(languageSelect.value);
        },

        updateTranslations(language) {
            document.querySelectorAll('[data-translate]').forEach(element => {
                const key = element.getAttribute('data-translate');
                element.textContent = this.translations[language][key];
            });
        },

        setupDarkMode() {
            const toggleSwitch = document.getElementById('darkModeToggle');
            const currentMode = localStorage.getItem('darkMode');

            if (currentMode === 'enabled') {
                document.body.classList.add('dark-mode');
                toggleSwitch.checked = true;
            }

            toggleSwitch.addEventListener('change', () => {
                if (toggleSwitch.checked) {
                    document.body.classList.add('dark-mode');
                    localStorage.setItem('darkMode', 'enabled');
                } else {
                    document.body.classList.remove('dark-mode');
                    localStorage.setItem('darkMode', 'disabled');
                }
            });
        }
    };

    App.init();
});
