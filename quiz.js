document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.getElementById('quiz-form');
    const steps = document.querySelectorAll('.step');
    const timerDisplay = document.getElementById('time');
    const quizFeedback = document.getElementById('quiz-feedback');
    let currentStep = 0;
    let timeLeft = 300; // 5 minutos em segundos
    let timerInterval;

    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            step.style.display = index === stepIndex ? 'block' : 'none';
        });
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                showResults();
            }
        }, 1000);
    }

    function checkAnswer(questionNumber, selectedAnswer) {
        const correctAnswers = {
            q1: 'b', // TCP/IP
            q2: 'b', // JavaScript
            q3: 'b', // Um sistema de segurança que monitora e controla o tráfego de rede
            q4: 'a', // Converter nomes de domínio em endereços IP
            q5: 'b', // Um endereço único atribuído a cada dispositivo conectado à rede
            q6: 'c', // Servir conteúdo da web para os usuários
            q7: 'b', // Criptografar a comunicação entre o navegador e o servidor
            q8: 'c'  // HTML
        };
        return correctAnswers[questionNumber] === selectedAnswer;
    }

    function showFeedback(stepIndex, isCorrect) {
        const feedbackElement = steps[stepIndex].querySelector('.step-feedback');
        feedbackElement.textContent = isCorrect ? 'Resposta correta!' : 'Resposta incorreta.';
        feedbackElement.style.color = isCorrect ? 'green' : 'red';
    }

    function calculateResults() {
        let score = 0;
        for (let i = 1; i <= 8; i++) {
            const selectedAnswer = document.querySelector(`input[name="q${i}"]:checked`);
            if (selectedAnswer && checkAnswer(`q${i}`, selectedAnswer.value)) {
                score++;
            }
        }
        return score;
    }

    function showResults() {
        clearInterval(timerInterval);
        const score = calculateResults();
        quizFeedback.textContent = `Você acertou ${score} de 8 perguntas.`;
        quizFeedback.style.display = 'block';
        quizForm.style.display = 'none';
    }

    showStep(currentStep);
    startTimer();

    quizForm.addEventListener('click', (event) => {
        if (event.target.classList.contains('next-step')) {
            const selectedAnswer = document.querySelector(`input[name="q${currentStep + 1}"]:checked`);
            if (selectedAnswer) {
                const isCorrect = checkAnswer(`q${currentStep + 1}`, selectedAnswer.value);
                showFeedback(currentStep, isCorrect);
                if (currentStep < steps.length - 1) {
                    currentStep++;
                    showStep(currentStep);
                }
            } else {
                alert('Por favor, selecione uma resposta.');
            }
        } else if (event.target.classList.contains('prev-step')) {
            currentStep--;
            showStep(currentStep);
        }
    });

    quizForm.addEventListener('submit', (event) => {
        event.preventDefault();
        showResults();
    });
});