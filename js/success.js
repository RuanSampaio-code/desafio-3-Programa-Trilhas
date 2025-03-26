//HTML foi completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    const App = {
        translations: {
            en: {
                congratulations: "Congratulations!",
                congratulations__register: "Congratulations! Your registration has been successful.",
                congratulations__credit: "The Government of the State of Maranhão, through SECTI in partnership with FAPEMA, thanks you for your participation."
                
            },
            pt: {
                congratulations: "Parabéns!",
                congratulations__register: "Parabéns! Sua inscrição foi realizada com sucesso",
                congratulations__credit: "O Governo do Estado do Maranhão, por meio da SECTI em parceria com a FAPEMA, agradece sua participação."
                
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
            const body = document.body;
            const form = document.querySelector('form');
            const currentMode = localStorage.getItem('darkMode');

            if (currentMode === 'enabled') {
                body.classList.add('dark-mode');
                form.classList.add('dark-mode');
                toggleSwitch.checked = true;
            }

            toggleSwitch.addEventListener('change', () => {
                if (toggleSwitch.checked) {
                    body.classList.add('dark-mode');
                    form.classList.add('dark-mode');
                    localStorage.setItem('darkMode', 'enabled');
                } else {
                    body.classList.remove('dark-mode');
                    form.classList.remove('dark-mode');
                    localStorage.setItem('darkMode', 'disabled');
                }
            });
        }
    };
    App.init();
});


