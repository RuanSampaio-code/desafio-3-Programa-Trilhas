
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
    //Inicilizas as funções
    functionDarkMode();
    functionLanguageSelector(translations);
    functionFormValidation();
    initCitySuggestions();
});
//Função para validar o formulário
function functionFormValidation() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para validar e-mail
    const userRegex = /^[a-zA-Z0-9]{6,}$/; // ID do usuário: mínimo 6 caracteres alfanuméricos
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/; // Senha: mínimo 8 caracteres com letras e números

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
            /* { id: 'rua', label: 'Rua' },
            { id: 'cidade', label: 'Cidade' },
            { id: 'estado', label: 'Estado' }, */
            { id: 'comprovante', label: 'Comprovante de residência', type: 'file' },
            { id: 'usuario', label: 'ID do Usuário' }, // Novo campo
            { id: 'senha', label: 'Senha' } // Novo campo
        ];
        let invalidFields = []; // Array para armazenar mensagens de erro
        let missingFields = [];
        let invalidEmail = false;
        let formData = {};
  
        requiredFields.forEach(field => {
            const input = document.getElementById(field.id);
            const value = input.value.trim();
            
            // Remover erro ao interagir com o campo
            input.addEventListener('input', () => input.classList.remove('is-invalid'));
            if (field.type === 'file') {
                input.addEventListener('change', () => input.classList.remove('is-invalid'));
            }

            // Validação geral dos campos obrigatórios
            if (value === '') {
                missingFields.push(`<li>${field.label}</li>`);
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
                formData[field.id] = value; // Salva o valor no formData
            }
  
            // Validação específica para e-mail
            if (field.id === 'email' && value !== '') {
                if (!emailRegex.test(value)) {
                    invalidEmail = true;
                    input.classList.add('is-invalid');
                }
            }

            // Validação específica para ID do Usuário
            if (field.id === 'usuario' && value !== '' && !userRegex.test(value)) {
                invalidFields.push('<li>ID do Usuário inválido (mínimo 6 caracteres alfanuméricos)</li>');
                input.classList.add('is-invalid');
            }

            // Validação específica para Senha
            if (field.id === 'senha' && value !== '' && !passwordRegex.test(value)) {
                invalidFields.push('<li>Senha inválida (mínimo 8 caracteres, incluindo letras e números)</li>');
                input.classList.add('is-invalid');
            }
        });

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
            // Salvar formData no LocalStorage
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