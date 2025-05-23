// script.js

// --- Auth.js (Firebase) ---
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  .uuu: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function sendMessage(text, fileUrl) {
  try {
    await addDoc(collection(db, "messages"), {
      text: text,
      fileUrl: fileUrl,
      timestamp: new Date()
    });
  } catch (e) {
    console.error("Erro ao adicionar documento: ", e);
  }
}

async function getMessages() {
  const querySnapshot = await getDocs(collection(db, "messages"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
}

onSnapshot(collection(db, "messages"), (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      console.log("Nova mensagem: ", change.doc.data());
    }
  });
});

// --- frontend.js (Carrossel) ---
const intervalo = 3000;
const imagens = document.querySelectorAll('.image-gallery img');
let indice = 0;

function alternarImagem() {
  imagens[indice].style.transform = 'translateX(-100%)';
  indice = (indice === imagens.length - 1) ? 0 : indice + 1;
  imagens[indice].style.transform = 'translateX(0)';
}

setInterval(alternarImagem, intervalo);

// --- frontend.js (Validação de Formulário) ---
function validateForm() {
  var nome = document.getElementById('nome').value.trim();
  var email = document.getElementById('email').value.trim();
  var mensagem = document.getElementById('mensagem').value.trim();

  if (nome === '' || email === '' || mensagem === '') {
    alert('Por favor, preencha todos os campos.');
    return false;
  }

  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Por favor, insira um endereço de e-mail válido.');
    return false;
  }

  return true;
}

// --- Chat.js ---
document.getElementById('message-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const messageInput = document.getElementById('message-input');
  const fileInput = document.getElementById('file-input');
  const messages = document.getElementById('messages');

  const messageText = messageInput.value;
  const file = fileInput.files[0];

  const formData = new FormData();

  if (messageText) {
    formData.append('text', messageText);
  }

  if (file) {
    formData.append('file', file);
  }

  fetch('http://localhost:5000/messages', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    const messageDiv = document.createElement('div');

    if (messageText) {
      const textNode = document.createElement('p');
      textNode.textContent = messageText;
      messageDiv.appendChild(textNode);
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        if (file.type.startsWith('image/')) {
          const img = document.createElement('img');
          img.src = e.target.result;
          img.style.maxWidth = '100%';
          messageDiv.appendChild(img);
        } else if (file.type.startsWith('audio/')) {
          const audio = document.createElement('audio');
          audio.src = e.target.result;
          audio.controls = true;
          messageDiv.appendChild(audio);
        }
      };
      reader.readAsDataURL(file);
    }

    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;

    messageInput.value = '';
    fileInput.value = '';
  });
}
// script.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('register-form');
    const aliasInput = document.getElementById('alias');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        errorMessage.style.display = 'none';

        const alias = aliasInput.value;
        const password = passwordInput.value;

        if (!validateAlias(alias)) {
            displayError('O pseudônimo deve ter pelo menos 5 caracteres.');
            return;
        }

        if (!validatePassword(password)) {
            displayError('A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um número.');
            return;
        }

        sendDataToServer(alias, password);
    });

    function validateAlias(alias) {
        return alias.length >= 5;
    }

    function validatePassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return passwordRegex.test(password);
    }

    async function sendDataToServer(alias, password) {
        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ alias, password })
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar. Tente novamente.');
            }

            alert('Cadastro bem-sucedido! Você será redirecionado para a página de login.');
            window.location.href = 'login.html';
        } catch (error) {
            displayError(error.message);
        }
    }

    function displayError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }
});
);

function validateForm() {
let nome = document.getElementById("nome").value;
let email = document.getElementById("email").value;
let mensagem = document.getElementById("mensagem").value;
let nomeErro = document.getElementById("nome-erro");
let emailErro = document.getElementById("email-erro");
let mensagemErro = document.getElementById("mensagem-erro");
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

nomeErro.textContent = "";
emailErro.textContent = "";
mensagemErro.textContent = "";

if (nome.trim() === "") {
nomeErro.textContent = "Por favor, insira seu nome.";
return false;
}

if (!emailRegex.test(email)) {
emailErro.textContent = "Por favor, insira um e-mail válido.";
return false;
}

if (mensagem.trim() === "") {
mensagemErro.textContent = "Por favor, insira sua mensagem.";
return false;
}

return true;
}

// Efeito de código caindo estilo Matrix
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

// Redimensiona o canvas para cobrir a tela inteira
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Caracteres para o efeito de código
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+[]{}|;:,.<>?~";
const charArray = chars.split("");
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = [];

// Cria um array de gotas de código
for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

// Função de animação do efeito Matrix
function matrixEffect() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; // Fundo preto com leve transparência
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0f0"; // Cor verde neon
    ctx.font = fontSize + "px monospace";

    // Desenha o código caindo
    for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reinicia a gota quando ela sai da tela
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

// Chama a função de animação
setInterval(matrixEffect, 50);
