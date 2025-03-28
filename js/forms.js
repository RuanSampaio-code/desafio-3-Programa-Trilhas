document.addEventListener('DOMContentLoaded', () => {
    // Load form data from LocalStorage
    const savedFormData = JSON.parse(localStorage.getItem('formData'));
    if (savedFormData) {
        Object.keys(savedFormData).forEach(key => {
            const input = document.getElementById(key);
            if (input && input.type !== "file") {
                input.value = savedFormData[key];
            }
        });
    }
    //Controle de varaiáveis de idiomas
    const translations = {
        en: {
            backButton: "Back",
            formTitle: "Registration Form",
            formSubtitle: "Fill in the details below to register for the Trilhas Program.",
            participantInfo: "Participant Information",
            fullName: "Full Name",
            birthDate: "Date of Birth",
            cpf: "CPF",
            gender: "Gender",
            female: "Female",
            male: "Male",
            other: "Other",
            preferNotToSay: "Prefer not to say",
            email: "Email",
            phone: "Phone",
            identityDocument: "Identity Document",
            clickToSelect: "Click here to select the file",
            residentialAddress: "Residential Address",
            zipCode: "ZIP Code",
            street: "Street",
            number: "Number",
            city: "City",
            state: "State",
            residenceProof: "Proof of Residence",
            learningTracks: "Learning Tracks",
            selectOneTrack: "Select only one track",
            frontend: "Front-end Programming",
            backend: "Back-end Programming",
            gameProgramming: "Game Programming",
            designExperience: "Design and Experience",
            dataScience: "Data Science",
            termsConditions: "I declare that I have read and agree with the Terms and Conditions and the Privacy Policy.",
            cancel: "Cancel",
            submit: "Submit",
            zipCodeError: "Invalid ZIP Code",
            zipCodeFeedback: "Please enter a valid ZIP Code"
        },
        pt: {
            backButton: "Voltar",
            formTitle: "Formulário de inscrição",
            formSubtitle: "Preencha os dados abaixo para fazer sua inscrição no Programa Trilhas.",
            participantInfo: "Informações do participante",
            fullName: "Nome completo",
            birthDate: "Data de nascimento",
            cpf: "CPF",
            gender: "Sexo",
            female: "Feminino",
            male: "Masculino",
            other: "Outro",
            preferNotToSay: "Prefiro não informar",
            email: "E-mail",
            phone: "Telefone",
            identityDocument: "Documento de identidade",
            clickToSelect: "Clique aqui para selecionar o arquivo",
            residentialAddress: "Endereço residencial",
            zipCode: "CEP",
            street: "Rua",
            number: "Número",
            city: "Cidade",
            state: "Estado",
            residenceProof: "Comprovante de residência",
            learningTracks: "Trilhas de apredizagem",
            selectOneTrack: "Selecione apenas uma trilha",
            frontend: "Programação Front-end",
            backend: "Programação Back-end",
            gameProgramming: "Programação de Jogos",
            designExperience: "Design e Experiência",
            dataScience: "Ciência de Dados",
            termsConditions: "Declaro que li e concordo com os Termos e Condições e com a Política de Privacidade.",
            cancel: "Cancelar",
            submit: "Fazer inscrição",
            zipCodeError: "CEP inválido",
            zipCodeFeedback: "Por favor, insira um CEP válido"
        }
    };

    //Inicilizas as funções
    functionDarkMode();
    functionLanguageSelector(translations);
    functionFormValidation();
    initCitySuggestions();
});

//Função para ativar o modo escuro
function functionDarkMode() {
    const toggleSwitch = document.getElementById('darkModeToggle');
    const currentMode = localStorage.getItem('darkMode');

    if (currentMode === 'enabled') {
        document.body.classList.add('dark-mode');
        document.getElementById('sugestoes')?.classList.add('dark-mode'); 
        document.getElementById('errorModal')?.classList.add('dark-mode'); // Adiciona no modal
        document.querySelector('.modal-content')?.classList.add('dark-mode'); // Conteúdo do modal
        toggleSwitch.checked = true;
    }

    toggleSwitch.addEventListener('change', () => {
        const isDark = toggleSwitch.checked;
        document.body.classList.toggle('dark-mode', isDark);
        document.getElementById('sugestoes')?.classList.toggle('dark-mode', isDark);
        document.getElementById('errorModal')?.classList.toggle('dark-mode', isDark);
        document.querySelector('.modal-content')?.classList.toggle('dark-mode', isDark);
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    });
}


//Função para selecionar o idioma
function functionLanguageSelector(translations) {
    const languageSelect = document.getElementById('languageSelect');
    languageSelect.addEventListener('change', (event) => {
        updateTranslations(event.target.value, translations);
    });
    updateTranslations(languageSelect.value, translations);
}

//Função para atualizar as traduções
function updateTranslations(language, translations) {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = translations[language][key];
    });
}

//Função para validar o formulário
function functionFormValidation() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para validar e-mail
  
    document.querySelector('form').addEventListener('submit', (event) => {
        event.preventDefault();
  
        const requiredFields = [
            { id: 'nome', label: 'Nome completo' },
            { id: 'dataNascimento', label: 'Data de nascimento' },
            { id: 'cpf', label: 'CPF' },
            { id: 'email', label: 'E-mail' },
            { id: 'telefone', label: 'Telefone' },
            { id: 'sexo', label: 'Sexo' },
            { id: 'documento', label: 'Documento de identidade', type: 'file' },
            { id: 'cep', label: 'CEP' },
            { id: 'rua', label: 'Rua' },
            { id: 'cidade', label: 'Cidade' },
            { id: 'estado', label: 'Estado' },
            { id: 'comprovante', label: 'Comprovante de residência', type: 'file' } 
        ];
  
        let missingFields = [];
        let invalidEmail = false;
        let formData = {};
  
        requiredFields.forEach(field => {
            const input = document.getElementById(field.id);
            const value = input.value.trim();
            
            // Validação geral dos campos obrigatórios
            if (value === '') {
                missingFields.push(`<li>${field.label}</li>`);
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
                formData[field.id] = value; // Save the value to formData
            }
  
            // Validação específica para e-mail
            if (field.id === 'email' && value !== '') {
                if (!emailRegex.test(value)) {
                    invalidEmail = true;
                    input.classList.add('is-invalid');
                }
            }
        });

        // ✅ **Validação da trilha de aprendizagem**
        const learningTrack = document.querySelector('input[name="trilha"]:checked');
        if (!learningTrack) {
            missingFields.push('<li>Trilha de aprendizagem</li>');
        } else {
            formData['trilha'] = learningTrack.value; // Armazena a trilha escolhida
        }
  
        // Validação dos termos
        const termsAccepted = document.getElementById('termos').checked;
        const termsError = !termsAccepted ? '<li>Aceite os termos e condições</li>' : '';
  
        // Montagem da mensagem de erro
        let errorMessage = '';
        if (missingFields.length > 0 || invalidEmail || !termsAccepted) {
            errorMessage += '<ul>';
            
            if (missingFields.length > 0) {
                errorMessage += `<p>Campos obrigatórios não preenchidos:</p>${missingFields.join('')}`;
            }
            
            if (invalidEmail) {
                errorMessage += '<li>E-mail inválido</li>';
                document.getElementById('email').classList.add('is-invalid');
            }
            
            if (termsError) {
                errorMessage += termsError;
            }
            
            errorMessage += '</ul>';
        }
  
        // Exibe o modal com os erros ou redireciona
        if (errorMessage) {
            document.getElementById('modalBody').innerHTML = errorMessage;
            new bootstrap.Modal(document.getElementById('errorModal')).show();
        } else {
            // Save formData to LocalStorage
            localStorage.setItem('formData', JSON.stringify(formData));
            window.location.href = 'success.html';
        }
    });
}


// Função para buscar o CEP
function buscarCEP() {
    const cepInput = document.getElementById('cep');
    const cep = cepInput.value.replace(/\D/g, '');
    
    if (cep.length !== 8) return;
    
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                throw new Error('CEP não encontrado');
            }
            
            // Preenche os campos
            document.getElementById('rua').value = data.logradouro;
            document.getElementById('cidade').value = data.localidade;
            document.getElementById('estado').value = data.uf;
            
            // Remove a classe de erro se tiver
            cepInput.classList.remove('is-invalid');
        })
        .catch(error => {
            console.error(error);
            cepInput.classList.add('is-invalid');
            mostrarErroCEP();
        });
}

// Função para mostrar erro no modal
function mostrarErroCEP() {
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <p>CEP não encontrado ou inválido!</p>
        <p>Verifique o número digitado e tente novamente.</p>
    `;
    new bootstrap.Modal(document.getElementById('errorModal')).show();
}

// Adicione este event listener no DOMContentLoaded
document.getElementById('cep').addEventListener('blur', buscarCEP);

// Função para sugestões de cidades
function initCitySuggestions() {
    const inputCidade = document.getElementById("cidade");
    const listaSugestoes = document.createElement('ul');
    listaSugestoes.id = 'sugestoes';
    listaSugestoes.classList.add('list-group');
    inputCidade.parentNode.appendChild(listaSugestoes);

    // Carregar cidades do arquivo JSON
    fetch('../assets/json/estados-cidades2.json')
        .then(response => response.json())
        .then(data => {
            const cidades = [];
            data.estados.forEach(estado => {
                cidades.push(...estado.cidades);
            });

            inputCidade.addEventListener("focus", function () {
                listaSugestoes.innerHTML = ""; // Limpa sugestões anteriores
                listaSugestoes.style.display = "block"; // Exibe a lista de sugestões

                cidades.forEach(cidade => {
                    const li = document.createElement("li");
                    li.textContent = cidade;
                    li.classList.add("sugestao-item", "list-group-item");
                    li.addEventListener("click", function () {
                        inputCidade.value = cidade; // Preenche o campo ao clicar
                        listaSugestoes.innerHTML = ""; // Limpa a lista
                        listaSugestoes.style.display = "none"; // Oculta a lista de sugestões
                    });
                    listaSugestoes.appendChild(li);
                });
            });

            inputCidade.addEventListener("input", function () {
                const termo = inputCidade.value.toLowerCase();
                listaSugestoes.innerHTML = ""; // Limpa sugestões anteriores

                if (termo.length < 2) {
                    listaSugestoes.style.display = "none"; // Oculta a lista se o termo for menor que 2 caracteres
                    return;
                }

                const sugestoesFiltradas = cidades.filter(cidade => 
                    cidade.toLowerCase().includes(termo)
                );

                sugestoesFiltradas.forEach(cidade => {
                    const li = document.createElement("li");
                    li.textContent = cidade;
                    li.classList.add("sugestao-item", "list-group-item");
                    li.addEventListener("click", function () {
                        inputCidade.value = cidade; // Preenche o campo ao clicar
                        listaSugestoes.innerHTML = ""; // Limpa a lista
                        listaSugestoes.style.display = "none"; // Oculta a lista de sugestões
                    });
                    listaSugestoes.appendChild(li);
                });

                listaSugestoes.style.display = sugestoesFiltradas.length > 0 ? "block" : "none"; // Exibe a lista se houver sugestões
            });

            // Ocultar sugestões ao clicar fora
            document.addEventListener("click", function (e) {
                if (!inputCidade.contains(e.target) && !listaSugestoes.contains(e.target)) {
                    listaSugestoes.innerHTML = "";
                    listaSugestoes.style.display = "none"; // Oculta a lista de sugestões
                }
            });
        })
        .catch(error => console.error('Erro ao carregar cidades:', error));
}