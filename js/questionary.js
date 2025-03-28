document.addEventListener('DOMContentLoaded', () => {
    const App = {
        translations: {
            en: {
                congratulations: "Congratulations!",
                feedbackTitle: "Site Feedback",
                name: "Name:",
                email: "Email:",
                siteSpeed: "How do you rate the site's speed?",
                usability: "How do you rate the site's usability?",
                good: "Good",
                regular: "Regular",
                bad: "Bad",
                problems: "Did you encounter any problems during registration?",
                satisfaction: "What is your level of satisfaction with the site?",
                satisfactionRange: "1 (very dissatisfied) to 5 (very satisfied)",
                additionalComments: "Additional comments:",
                submitFeedback: "Submit Feedback",
                selected: "Selected:"
            },
            pt: {
                congratulations: "Parabéns!",
                feedbackTitle: "Feedback do Site",
                name: "Nome:",
                email: "Email:",
                siteSpeed: "Como você avalia a velocidade do site?",
                usability: "Como você avalia a facilidade de uso do site?",
                good: "Boa",
                regular: "Regular",
                bad: "Ruim",
                problems: "Você encontrou algum problema durante a inscrição?",
                satisfaction: "Qual é o seu nível de satisfação com o site?",
                satisfactionRange: "1 (muito insatisfeito) a 5 (muito satisfeito)",
                additionalComments: "Comentários adicionais:",
                submitFeedback: "Enviar Feedback",
                selected: "Selecionado:"
            }
        },
        
        init() {
            this.setupLanguageSelector();
            this.setupDarkMode();
            this.setupSatisfactionSlider();
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
        },

        setupSatisfactionSlider() {
            const inputSatisfacao = document.getElementById("satisfacao");
            const sliderValue = document.getElementById("sliderValue");
        
            // Atualizar o valor inicial e a posição do indicador
            const updateSliderValue = () => {
                const value = inputSatisfacao.value;
                sliderValue.textContent = value;
        
                // Calcular a posição do indicador com base no valor do slider
                const percentage = ((value - inputSatisfacao.min) / (inputSatisfacao.max - inputSatisfacao.min)) * 100;
                sliderValue.style.left = `calc(${percentage}% + (${8 - percentage * 0.15}px))`; // Ajuste fino para centralizar
            };
        
            // Atualizar ao carregar a página
            updateSliderValue();
        
            // Atualizar dinamicamente ao mover o slider
            inputSatisfacao.addEventListener("input", updateSliderValue);
        }
    };

    App.init();

    const form = document.querySelector('form');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Exibe o alerta
        alert(App.translations[document.getElementById('languageSelect').value].congratulations);

        // Redireciona para a página index.html
        window.location.href = '../index.html';
    });
});