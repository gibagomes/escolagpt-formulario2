document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("advanced-form");
  const inputs = form.querySelectorAll("input");
  const phoneInput = document.getElementById("phone");
  const successMessage = document.getElementById("success-message");
  const resetBtn = document.getElementById("reset-btn");
  const fileInput = document.getElementById("file");
  const fileError = document.getElementById("file-error");

  // Inicializa o Flatpickr no campo de data de nascimento
  flatpickr("#birthdate", {
    dateFormat: "d/m/Y",
    maxDate: "today",
    locale: "pt",
  });

  // Adiciona evento de envio ao formulário
  form.addEventListener("submit", function (event) {
    let valid = true;

    // Verifica a validade de todos os campos de entrada
    inputs.forEach((input) => {
      const errorMessage = input.nextElementSibling;
      if (!input.checkValidity()) {
        errorMessage.style.display = "block";
        valid = false;
      } else {
        errorMessage.style.display = "none";
      }
    });

    // Verifica o tipo de arquivo
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.pdf)$/i; // Extensões permitidas
      if (!allowedExtensions.exec(file.name)) {
        fileError.style.display = "block";
        valid = false;
      } else {
        fileError.style.display = "none";
      }
    } else {
      fileError.style.display = "block";
      valid = false;
    }

    if (!valid) {
      event.preventDefault(); // Impede o envio do formulário se inválido
    } else {
      event.preventDefault(); // Impede o envio real do formulário
      form.reset(); // Reseta o formulário
      successMessage.style.display = "block"; // Mostra a mensagem de sucesso
    }
  });

  // Adiciona evento de clique ao botão de limpar
  resetBtn.addEventListener("click", function () {
    form.reset(); // Reseta o formulário
    successMessage.style.display = "none"; // Esconde a mensagem de sucesso
    // Esconde todas as mensagens de erro
    inputs.forEach((input) => {
      const errorMessage = input.nextElementSibling;
      errorMessage.style.display = "none";
    });
    fileError.style.display = "none"; // Esconde a mensagem de erro de arquivo
  });

  // Máscara de entrada para o telefone
  phoneInput.addEventListener("input", function () {
    let value = phoneInput.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (value.length > 11) {
      value = value.slice(0, 11); // Limita o comprimento a 11 dígitos
    }
    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (value.length > 6) {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,5}).*/, "($1) $2");
    }
    phoneInput.value = value; // Atualiza o valor do campo de telefone
  });

  // Restringe a entrada a apenas números no campo de telefone
  phoneInput.addEventListener("keypress", function (event) {
    if (!/\d/.test(event.key)) {
      event.preventDefault(); // Impede a entrada de caracteres não numéricos
    }
  });
});
