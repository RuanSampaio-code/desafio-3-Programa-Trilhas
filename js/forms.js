document.addEventListener('DOMContentLoaded', () => {
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
});

//Função para ativar o modo escuro
function functionDarkMode() {
  const toggleSwitch = document.getElementById('darkModeToggle');
  const currentMode = localStorage.getItem('darkMode');
  
  if (currentMode === 'enabled') {
      document.body.classList.add('dark-mode');
      toggleSwitch.checked = true;
  }

  toggleSwitch.addEventListener('change', () => {
      document.body.classList.toggle('dark-mode', toggleSwitch.checked);
      localStorage.setItem('darkMode', toggleSwitch.checked ? 'enabled' : 'disabled');
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

//Função para validar o formulário// Função para validar o formulário
// Função para validar o formulário
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

      requiredFields.forEach(field => {
          const input = document.getElementById(field.id);
          const value = input.value.trim();
          
          // Validação geral dos campos obrigatórios
          if (value === '') {
              missingFields.push(`<li>${field.label}</li>`);
              input.classList.add('is-invalid');
          } else {
              input.classList.remove('is-invalid');
          }

          // Validação específica para e-mail
          if (field.id === 'email' && value !== '') {
              if (!emailRegex.test(value)) {
                  invalidEmail = true;
                  input.classList.add('is-invalid');
              }
          }
      });

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
          window.location.href = 'success.html';
      }
  });

  // Remove a validação quando o usuário digitar
  document.querySelectorAll("input, select").forEach((input) => {
      input.addEventListener("input", () => {
          input.classList.remove("is-invalid");
          // Validação em tempo real para e-mail
          if (input.id === 'email' && input.value.trim() !== '') {
              if (!emailRegex.test(input.value)) {
                  input.classList.add('is-invalid');
              }
          }
      });
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