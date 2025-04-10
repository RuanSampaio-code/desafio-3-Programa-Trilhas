document.addEventListener('DOMContentLoaded', () => {
    const App = {
        init() {
            functionLanguageSelector(translations); // Ativa a tradução
            functionDarkMode();
            
        },

       
    };

    App.init();

    const form = document.querySelector('form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Obtém o idioma selecionado
        const lang = document.getElementById('languageSelect').value;

        // Exibe a mensagem traduzida
        const message = translations[lang]?.congratulations || "Feedback enviado com sucesso!";
        alert(message);

        // Redireciona para a página inicial
        window.location.href = '../index.html';
    });
});