
document.addEventListener('DOMContentLoaded', () => {
    const App = { 
        init() {
            // Reutiliza as funções globais
            functionDarkMode();
            functionLanguageSelector(translations);
        }
    };

    App.init();
});
