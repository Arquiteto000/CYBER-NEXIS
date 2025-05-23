<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $destinatario = "nexyscyber@gmail.com"; // Seu e-mail
    $assunto = "Respostas do Quiz - Cyber-Nexis";

    // Monta o corpo da mensagem com todas as perguntas recebidas
    $corpo = "Respostas recebidas do quiz:\n\n";

    foreach ($_POST as $pergunta => $resposta) {
        $corpo .= ucfirst($pergunta) . ": " . $resposta . "\n";
    }

    $headers = "From: webmaster@cybernexis.com"; // Pode ser fictício, mas ajuda no envio

    if (mail($destinatario, $assunto, $corpo, $headers)) {
        echo "Respostas enviadas com sucesso!";
    } else {
        echo "Erro ao enviar as respostas.";
    }
}
?>