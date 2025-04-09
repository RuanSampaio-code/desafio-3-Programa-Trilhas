function functionDarkMode() {
    const toggleSwitch = document.getElementById('darkModeToggle');
    if (!toggleSwitch) {
        console.warn('Elemento #darkModeToggle não encontrado.');
        return; // Sai da função se o elemento não existir
    }

    const currentMode = localStorage.getItem('darkMode');

    if (currentMode === 'enabled') {
        document.body.classList.add('dark-mode');
        toggleSwitch.checked = true;
    }

    toggleSwitch.addEventListener('change', () => {
        const isDark = toggleSwitch.checked;
        document.body.classList.toggle('dark-mode', isDark);
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    });
}

// Seleção de Idioma
function functionLanguageSelector(translations) {
    if (!translations) {
        console.error('Objeto translations não encontrado.');
        return;
    }

    const languageSelect = document.getElementById('languageSelect');
    const defaultLanguage = 'pt'; // Define o idioma padrão como 'pt'

    if (!languageSelect) {
        console.warn('Elemento #languageSelect não encontrado. Usando idioma padrão.');
        updateTranslations(defaultLanguage, translations);
        return;
    }

    languageSelect.addEventListener('change', (event) => {
        updateTranslations(event.target.value, translations);
    });

    updateTranslations(languageSelect.value || defaultLanguage, translations);
}

function updateTranslations(language, translations) {
    if (!translations[language]) {
        console.error(`Traduções para o idioma "${language}" não encontradas.`);
        return;
    }

    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[language][key]) {
            element.textContent = translations[language][key];
        } else {
            console.warn(`Tradução para a chave "${key}" não encontrada no idioma "${language}".`);
        }
    });
}

// LocalStorage
function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
function loadFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// Validação de E-mail
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}