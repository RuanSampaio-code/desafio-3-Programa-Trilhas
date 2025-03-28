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
            // Reutiliza as funções globais
            functionDarkMode();
            functionLanguageSelector(this.translations);
        }
    };

    App.init();
});
