//HTML foi completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    const App = {
        translations: {
            en: {
                congratulations: "Congratulations!",
                
            },
            pt: {
                congratulations: "Parabéns!",
                
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
            const currentMode = localStorage.getItem('darkMode');

            if (currentMode === 'enabled') {
                body.classList.add('dark-mode');
                toggleSwitch.checked = true;
            }

            toggleSwitch.addEventListener('change', () => {
                if (toggleSwitch.checked) {
                    body.classList.add('dark-mode');
                    localStorage.setItem('darkMode', 'enabled');
                } else {
                    body.classList.remove('dark-mode');
                    localStorage.setItem('darkMode', 'disabled');
                }
            });
        }
    };
    App.init();
});


document.addEventListener("DOMContentLoaded", function() {
    const inputSatisfacao = document.getElementById("satisfacao");
    const outputValor = document.getElementById("valorSatisfacao");

    // Definir o valor inicial corretamente
    outputValor.textContent = inputSatisfacao.value;

    // Atualizar o valor dinamicamente ao mover o slider
    inputSatisfacao.addEventListener("input", function() {
        outputValor.textContent = inputSatisfacao.value;
    });
});