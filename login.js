document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const errorElement = document.getElementById('login-error');

  // Simulação de carregamento (pode ser substituído por uma chamada AJAX)
  errorElement.textContent = 'Verificando credenciais...';

  fetch('login.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      window.location.href = 'dashboard.html'; // Redireciona para o painel
    } else {
      errorElement.textContent = data.message; // Exibe a mensagem de erro
    }
  })
  .catch(error => {
    console.error('Erro:', error);
    errorElement.textContent = 'Erro ao processar o login.';
  });
});
document.getElementById('login-form').addEventListener('submit', function(event) {
  const username = document.getElementById('username').value;
  localStorage.setItem('codinome', username); // Armazena o codinome localmente
});
