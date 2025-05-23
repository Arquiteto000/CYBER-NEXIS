document.addEventListener('DOMContentLoaded', () => {
    const enigmaSections = document.querySelectorAll('.enigma-section');
    const feedbackResposta = document.querySelector('.feedback-resposta');
    const timersDisplay = document.querySelector('.timer');
    let enigmaAtual = 0;
    let tempoRestante = 20;
    let timer;
    
    // Array de enigmas com perguntas, respostas e dicas
    const enigmas = [
        {
            pergunta: 'Eu protejo dados, mas quando sou fraco, tudo pode ser roubado. Quem sou eu?',
            resposta: 'Senha',
            dica: 'É uma sequência de caracteres usada para autenticação.'
        },
        {
            pergunta: 'O que significa a sigla VPN?',
            resposta: 'Rede Privada Virtual',
            dica: 'Usada para proteger a privacidade na internet.'
        },
        {
            pergunta: 'Em que porta padrão o protocolo HTTP opera?',
            resposta: '80',
            dica: 'É uma porta muito utilizada para navegação na web.'
        },
        {
            pergunta: 'Sou o pesadelo dos sistemas: exploro vulnerabilidades para causar danos. Quem sou eu?',
            resposta: 'Malware',
            dica: 'É um tipo de software malicioso.'
        },
        {
            pergunta: 'Qual comando Linux é usado para listar os arquivos de um diretório?',
            resposta: 'ls',
            dica: 'É um comando simples, mas essencial para navegação no terminal.'
        },
        // Mais enigmas podem ser adicionados aqui
    ];

    const perguntasEnigma = document.querySelector('.pergunta-enigma');
    const respostasUsuario = document.querySelector('.resposta-criptografia');
    const botoesVerificar = document.querySelector('.verificar-resposta');

    function exibirEnigma() {
        const enigmaAtualObj = enigmas[enigmaAtual];
        perguntasEnigma.textContent = enigmaAtualObj.pergunta;
        respostasUsuario.value = '';
        feedbackResposta.textContent = ''; // Limpar feedback anterior
        tempoRestante = 20;
        atualizarTimer();
        iniciarTimer();
    }

    function iniciarTimer() {
        timer = setInterval(() => {
            tempoRestante--;
            atualizarTimer();
            if (tempoRestante === 0) {
                clearInterval(timer);
                feedbackResposta.textContent = 'O tempo acabou!';
                feedbackResposta.style.color = 'red';
                proximoEnigma();
            }
        }, 1000);
    }

    function atualizarTimer() {
        timersDisplay.textContent = `Tempo restante: ${tempoRestante} segundos`;
    }

    function verificarResposta() {
        const respostaCorreta = enigmas[enigmaAtual].resposta.toLowerCase();
        const respostaDigitada = respostasUsuario.value.toLowerCase();

        if (respostaDigitada === respostaCorreta) {
            feedbackResposta.textContent = 'Resposta correta!';
            feedbackResposta.style.color = 'green';
            clearInterval(timer);
            setTimeout(() => {
                window.location.href = 'pagina-secreta.html'; // Redirecionar após resposta correta
            }, 1000);
        } else {
            feedbackResposta.textContent = `Resposta incorreta. Dica: ${enigmas[enigmaAtual].dica}`;
            feedbackResposta.style.color = 'orange';
        }
    }

    function proximoEnigma() {
        enigmaAtual++;
        if (enigmaAtual < enigmas.length) {
            exibirEnigma();
        } else {
            alert('Todos os enigmas foram concluídos!');
            window.location.href = 'pagina-final.html'; // Final do jogo
        }
    }

    botoesVerificar.addEventListener('click', verificarResposta);
    exibirEnigma(); // Exibir o primeiro enigma ao carregar a página
});
