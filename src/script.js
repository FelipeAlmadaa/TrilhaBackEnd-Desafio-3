// Funções de navegação
function abrirPagina() {
  window.location.href = "inscricao.html";
}

function voltarPagina() {
  window.location.href = "/Html/index.html";
}

function loginPage() {
  window.location.href = "login.html";
}

// Verificar estado de login ao carregar a página
function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const currentUser = localStorage.getItem("currentUser");
  const menuLogin = document.getElementById("menuLogin");

  if (isLoggedIn === "true" && currentUser) {
    // Usuário logado - mostra nome e dropdown
    menuLogin.textContent = currentUser;
    menuLogin.onclick = function (e) {
      e.preventDefault();
      const dropdown = document.getElementById("userDropdown");
      dropdown.classList.toggle("show-dropdown");
    };
  } else {
    // Usuário não logado - mantém "Login" com redirecionamento normal
    menuLogin.textContent = "Login";
    menuLogin.onclick = loginPage;

    // Garante que o dropdown está escondido
    const dropdown = document.getElementById("userDropdown");
    if (dropdown) dropdown.classList.remove("show-dropdown");
  }

  // Fecha dropdown ao clicar fora
  window.onclick = function (e) {
    if (!e.target.matches("#menuLogin")) {
      const dropdowns = document.getElementsByClassName("dropdown-content");
      for (let i = 0; i < dropdowns.length; i++) {
        if (dropdowns[i].classList.contains("show-dropdown")) {
          dropdowns[i].classList.remove("show-dropdown");
        }
      }
    }
  };
}
// Função de logout
function logout() {
  // Remove os itens de autenticação do localStorage
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");

  // Fecha o dropdown
  const userDropdown = document.getElementById("userDropdown");
  if (userDropdown) {
    userDropdown.classList.remove("show-dropdown");
  }

  // Redireciona para a página inicial
  window.location.href = "index.html";
}
// Animação de scroll
document.addEventListener("DOMContentLoaded", function () {
  checkLoginStatus(); // Verifica o status de login ao carregar a página

  const trilhas = document.querySelectorAll(".pai-trilha");
  const inscrever = document.querySelector(".increver");

  function verificarScroll() {
    trilhas.forEach((trilha) => {
      const trilhaTop = trilha.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (trilhaTop < windowHeight - 100) {
        trilha.classList.add("show");
      }
    });

    const inscreverTop = inscrever.getBoundingClientRect().top;
    if (inscreverTop < window.innerHeight - 100) {
      inscrever.classList.add("show");
    }
  }

  window.addEventListener("scroll", verificarScroll);
  verificarScroll();
});

// Lógica de seleção única nos checkboxes de trilhas
document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll(".trilha-checkbox");

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        checkboxes.forEach((otherCheckbox) => {
          if (otherCheckbox !== this) {
            otherCheckbox.checked = false;
          }
        });
      }
      validarCampos(); // Revalida o formulário após mudança nos checkboxes
    });
  });
});

// Exibir nome do arquivo selecionado
document.addEventListener("DOMContentLoaded", function () {
  function handleFileInputChange(inputId, displayId) {
    const fileInput = document.getElementById(inputId);
    const fileNameDisplay = document.getElementById(displayId);

    fileInput.addEventListener("change", function () {
      if (this.files && this.files.length > 0) {
        fileNameDisplay.textContent = `Arquivo selecionado: ${this.files[0].name}`;
      } else {
        fileNameDisplay.textContent = "";
      }
      validarCampos(); // Revalida o formulário após mudança no arquivo
    });
  }

  handleFileInputChange("file-residencia", "file-residencia-name");
  handleFileInputChange("file-identidade", "file-identidade-name");
});

// Verificação do formulário antes de enviar
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const btnInscricao = document.getElementById("btn-inscricao");
  const modal = document.getElementById("modal-confirmacao");
  const modalContent = document.querySelector(".modal-content p");
  const closeModal = document.querySelector(".close-modal");
  const btnSalvar = document.getElementById("btn-salvar");
  const btnCarregar = document.getElementById("btn-carregar");

  function validarCampos() {
    const camposObrigatorios = document.querySelectorAll(
      "input[required], select[required]"
    );
    const trilhasSelecionadas =
      document.querySelectorAll(".trilha-checkbox:checked").length > 0;

    const termoAssinado =
      document.querySelectorAll(".termo-assing:checked").length > 0;

    const todosPreenchidos = Array.from(camposObrigatorios).every(
      (campo) => campo.value.trim() !== ""
    );

    function validarEmail() {
      const emailInput = document.getElementById("email");
      const erroSpan = document.getElementById("erroEmail");
      const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!regexEmail.test(emailInput.value)) {
        erroSpan.textContent = "E-mail inválido!";
        return false;
      } else {
        erroSpan.textContent = "";
        return true;
      }
    }

    //validação email
    document.getElementById("email").addEventListener("input", validarEmail);

    const telefoneInput = document.getElementById("telefone");
    telefoneInput.addEventListener("input", validarTelefone);

    function validarTelefone() {
      const telErro = document.getElementById("erroTelefone");
      let telefoneValue = telefoneInput.value;

      telefoneValue = telefoneValue.replace(/\D/g, "");
      telefoneValue = telefoneValue.replace(
        /(\d{2})(\d{1})(\d{4})(\d{4})/,
        "($1) $2 $3-$4"
      );
      telefoneInput.value = telefoneValue;

      if (telefoneValue.length > 14) {
        telErro.textContent = "";
      } else {
        telErro.textContent = "Número de telefone inválido";
      }
    }

    //validação cpf
    const cpfInput = document.getElementById("cpf");
    cpfInput.addEventListener("input", validarCPf);

    function validarCPf() {
      const cpfErro = document.getElementById("erroCPF");
      let cpfValue = cpfInput.value;

      cpfValue = cpfValue.replace(/\D/g, "");
      cpfValue = cpfValue.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        "$1.$2.$3-$4"
      );
      cpfValue = cpfValue;

      cpfInput.value = cpfValue;

      if (cpfValue.length >= 14) {
        cpfErro.textContent = "";
      } else {
        cpfErro.textContent = "Digite um cpf valido";
      }
    }

    const valido =
      todosPreenchidos && trilhasSelecionadas && termoAssinado && validarEmail;
    btnInscricao.disabled = !valido; // Ativa ou desativa o botão de inscrição
    btnCarregar.disabled = !valido;
    btnSalvar.disabled = !valido;
    return valido;
  }

  form.addEventListener("input", validarCampos);
  form.addEventListener("change", validarCampos); // Para os checkboxes e uploads de arquivo

  btnInscricao.addEventListener("click", function (event) {
    event.preventDefault();

    if (validarCampos()) {
      modalContent.innerText = "Inscrição realizada com sucesso!";
      modal.style.display = "block";
      form.reset(); // Limpa o formulário
      btnInscricao.disabled = true; // Desabilita o botão novamente
    } else {
      modalContent.innerText =
        "Preencha todos os campos obrigatórios e selecione uma trilha antes de continuar!";
      modal.style.display = "block";
    }
  });

  btnSalvar.addEventListener("click", function (event) {
    event.preventDefault();

    if (validarCampos()) {
      modalContent.innerText = "Dados Salvos com sucesso!";
      modal.style.display = "block";
      form.reset(); // Limpa o formulário
      btnSalvar.disabled = true; // Desabilita o botão novamente
    } else {
      modalContent.innerText =
        "Preencha todos os campos obrigatórios e selecione uma trilha antes de continuar!";
      modal.style.display = "block";
    }
  });

  btnCarregar.addEventListener("click", function (event) {
    event.preventDefault();

    if (validarCampos()) {
      modalContent.innerText = "Dados carregados com sucesso!";
      modal.style.display = "block";
      btnCarregar.disabled = true; // Desabilita o botão novamente
    } else {
      modalContent.innerText =
        "Preencha todos os campos obrigatórios e selecione uma trilha antes de continuar!";
      modal.style.display = "block";
    }
  });
  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
  });
  console.log();
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});
const senha = document.getElementById("reg-senha");
const confirmacao = document.getElementById("reg-confirmar");
senha.addEventListener("input", senhasIguais);
confirmacao.addEventListener("input", senhasIguais);
function senhasIguais() {
  const senhaValue = senha.value;
  const confirmacaoValue = confirmacao.value;
  const spanSenha = document.getElementById("erroSenha");
  if (senhaValue != confirmacaoValue) {
    spanSenha.textContent = "Senhas não são iguais";
    return false;
  } else {
    spanSenha.textContent = "";
    return true;
  }
}

function salvarFormulario() {
  const nome = document.getElementById("nome").value;
  const dataNascimento = document.getElementById("data_nascimento").value;
  const cpf = document.getElementById("cpf").value;
  const sexo = document.getElementById("sexo").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;
  const rua = document.getElementById("rua").value;
  const cep = document.getElementById("cep").value;
  const numero = document.getElementById("numero").value;
  const cidade = document.getElementById("cidade").value;
  const estado = document.getElementById("estado").value;
  const trilhas = Array.from(
    document.querySelectorAll(".trilha-checkbox:checked")
  ).map((checkbox) => checkbox.id);
  const termo = document.getElementById("termo").checked;

  const dadosFormulario = {
    nome: nome,
    dataNascimento: dataNascimento,
    cpf: cpf,
    sexo: sexo,
    email: email,
    telefone: telefone,
    rua: rua,
    cep: cep,
    numero: numero,
    cidade: cidade,
    estado: estado,
    trilhas: trilhas,
    termo: termo,
  };

  localStorage.setItem("dadosFormulario", JSON.stringify(dadosFormulario));
}

function carregarFormulario() {
  const dadosFormularioString = localStorage.getItem("dadosFormulario");

  if (dadosFormularioString) {
    const dadosFormulario = JSON.parse(dadosFormularioString);

    document.getElementById("nome").value = dadosFormulario.nome;
    document.getElementById("data_nascimento").value =
      dadosFormulario.dataNascimento;
    document.getElementById("cpf").value = dadosFormulario.cpf;
    document.getElementById("sexo").value = dadosFormulario.sexo;
    document.getElementById("email").value = dadosFormulario.email;
    document.getElementById("telefone").value = dadosFormulario.telefone;
    document.getElementById("rua").value = dadosFormulario.rua;
    document.getElementById("cep").value = dadosFormulario.cep;
    document.getElementById("numero").value = dadosFormulario.numero;
    document.getElementById("cidade").value = dadosFormulario.cidade;
    document.getElementById("estado").value = dadosFormulario.estado;

    const trilhaCheckboxes = document.querySelectorAll(".trilha-checkbox");
    trilhaCheckboxes.forEach((checkbox) => {
      checkbox.checked = dadosFormulario.trilhas.includes(checkbox.id);
    });

    document.getElementById("termo").checked = dadosFormulario.termo;
  } else {
    alert("Nenhum dado salvo encontrado.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("formlogin");
  const registerForm = document.getElementById("register-form");
  const showRegister = document.getElementById("show-register");
  const showLogin = document.getElementById("show-login");

  const errorMessage = document.getElementById("error-menssage");

  showRegister.addEventListener("click", function (e) {
    e.preventDefault();
    loginForm.style.display = "none";
    registerForm.style.display = "block";
  });

  showLogin.addEventListener("click", function (e) {
    e.preventDefault();
    registerForm.style.display = "none";
    loginForm.style.display = "block";
  });

  function showError(mensagem, elemento) {
    if (elemento && elemento instanceof HTMLElement) {
      elemento.textContent = mensagem;
      elemento.style.display = "block";
    } else {
      alert(mensagem);
    }
  }

  // Função de login
  function validateLogin(event) {
    event.preventDefault();

    const usuarioDigitado = document.getElementById("nome_de_usuario").value;
    const senhaDigitada = document.getElementById("senha").value;
    const usuarioSalvo = localStorage.getItem("usuario");

    const errorUsu = document.getElementById("error-menssage");

    if (!usuarioSalvo) {
      showError("Nenhum usuário encontrado. Cadastre-se primeiro!", errorUsu);
      return;
    }

    try {
      const usuarioObj = JSON.parse(usuarioSalvo);

      if (
        usuarioDigitado === usuarioObj.usuario &&
        senhaDigitada === usuarioObj.senha
      ) {
        // Armazena que o usuário está logado
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", usuarioDigitado);

        alert("Login realizado com sucesso!");
        loginForm.reset();
        errorUsu.textContent = "";
        window.location.href = "index.html";
      } else {
        showError("Nome de usuário ou senha incorretos.", errorUsu);
      }
    } catch (error) {
      showError(
        "Erro ao processar dados do usuário. Tente novamente.",
        errorUsu
      );
      console.error("Erro ao fazer login:", error);
    }
  }

  let usuarioDisponivel = true;

  // valida as informações do user
  document.getElementById("reg-usuario").addEventListener("input", function () {
    const usuarioDigitado = this.value.trim();
    const errorSpan = document.getElementById("erroUsuarioExistente");
    const usuarioSalvo = localStorage.getItem("usuario");

    if (!usuarioDigitado) {
      errorSpan.textContent = "";
      usuarioDisponivel = false;
      return;
    }

    try {
      if (usuarioSalvo) {
        const usuarioObjSalvo = JSON.parse(usuarioSalvo);
        if (usuarioObjSalvo.usuario === usuarioDigitado) {
          errorSpan.textContent = "Este nome de usuário já está em uso.";
          usuarioDisponivel = false;
        } else {
          errorSpan.textContent = "";
          usuarioDisponivel = true;
        }
      } else {
        errorSpan.textContent = "";
        usuarioDisponivel = true;
      }
    } catch (error) {
      console.error("Erro ao acessar localStorage:", error);
      errorSpan.textContent = "Erro ao verificar nome de usuário.";
      usuarioDisponivel = false;
    }
  });

  // Validação do registro
  function validateRegister(event) {
    event.preventDefault();

    const usuario = document.getElementById("reg-usuario").value.trim();
    const senha = document.getElementById("reg-senha").value;
    const confirmarSenha = document.getElementById("reg-confirmar").value;

    const errorSenha = document.getElementById("erroSenha");
    const errorConfirmar = document.getElementById("erroConfirmarSenha");

    // Limpa mensagens
    errorSenha.textContent = "";
    errorConfirmar.textContent = "";

    if (!usuario || !senha || !confirmarSenha) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (!usuarioDisponivel) {
      alert("Este nome de usuário já está em uso. Escolha outro.");
      return;
    }

    if (senha !== confirmarSenha) {
      errorConfirmar.textContent = "As senhas não coincidem.";
      return;
    }

    const usuarioData = { usuario, senha };
    localStorage.setItem("usuario", JSON.stringify(usuarioData));
    alert("Usuário registrado com sucesso!");
    // Entra na tela de login após o registro
    registerForm.style.display = "none";
    loginForm.style.display = "block";

    registerForm.reset();
  }

  // Associa os validadores aos eventos de envio dos formulários
  loginForm.addEventListener("submit", validateLogin);
  registerForm.addEventListener("submit", validateRegister);
});

// Ajusta elementos específicos para mobile
function adjustForMobile() {
  if (window.innerWidth <= 768) {
    // Adiciona classe mobile ao body
    document.body.classList.add("mobile-view");

    // Ajustes específicos
    const trilhas = document.querySelectorAll(".pai-trilha");
    trilhas.forEach((trilha) => {
      trilha.style.marginBottom = "20px";
    });
  } else {
    document.body.classList.remove("mobile-view");
  }
}

// Executa ao carregar e redimensionar
window.addEventListener("load", adjustForMobile);
window.addEventListener("resize", adjustForMobile);
