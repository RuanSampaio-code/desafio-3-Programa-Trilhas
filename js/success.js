//HTML foi completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    const App = {
        translations: {
            en: {
                congratulations: "🎉 Congratulations!",
                congratulations__register: "Congratulations! Your registration has been successful.",
                congratulations__credit: "The Government of the State of Maranhão, through SECTI in partnership with FAPEMA, thanks you for your participation.",
                return__main: "Return to the main page",
                questionary: "Feedback",
                
            },
            pt: {
                congratulations: "🎉 Parabéns!",
                congratulations__register: "Parabéns! Sua inscrição foi realizada com sucesso",
                congratulations__credit: "O Governo do Estado do Maranhão, por meio da SECTI em parceria com a FAPEMA, agradece sua participação.",
                return__main: "Retornar para a página principal",
                questionary: "Feedback",
                
            }
        },
        
        init() {
            functionDarkMode();
            functionLanguageSelector(this.translations);
        },
        };
    App.init();
});


