document.addEventListener('DOMContentLoaded', () => {
    const App = {
        translations: {
            en: {
                congratulations: "Congratulations!",
                feedbackTitle: "Site Feedback",
                name: "Name:",
                email: "Email for contact:",
                siteSpeed: "How do you rate the site's speed?",
                usability: "How do you rate the site's usability?",
                good: "Good",
                regular: "Regular",
                bad: "Bad",
                problems: "Did you encounter any problems during registration?",
                problemsPlaceholder: "Describe the problem encountered, if any.",
                satisfaction: "What is your level of satisfaction with the site?",
                satisfactionRange: "1 (very dissatisfied) to 5 (very satisfied)",
                additionalComments: "Additional comments:",
                commentsPlaceholder: "Leave your feedback about the site.",
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
                problemsPlaceholder: "Descreva o problema encontrado, se houver.",
                satisfaction: "Qual é o seu nível de satisfação com o site?",
                satisfactionRange: "1 (muito insatisfeito) a 5 (muito satisfeito)",
                additionalComments: "Comentários adicionais:",
                commentsPlaceholder: "Deixe seu feedback sobre o site.",
                submitFeedback: "Enviar Feedback",
                selected: "Selecionado:"
            }
        },
        
        init() {
            functionLanguageSelector(this.translations);
            functionDarkMode();
            this.setupSatisfactionSlider();
        },

        setupSatisfactionSlider() {
            const inputSatisfacao = document.getElementById("satisfacao");
            const sliderValue = document.getElementById("sliderValue");

            if (!inputSatisfacao || !sliderValue) {
                console.warn("Slider de satisfação ou indicador não encontrado.");
                return;
            }
        
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