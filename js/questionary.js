
document.addEventListener('DOMContentLoaded', () => {
    const App = {
        init() {
            functionLanguageSelector(translations);
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