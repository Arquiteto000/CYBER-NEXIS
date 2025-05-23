<?php
$token = "chave123";
if ($_GET['token'] !== $token) {
    http_response_code(403);
    echo "Acesso negado.";
    exit;
}

$comando = $_GET['cmd'] ?? '';
if (!$comando) {
    echo "Nenhum comando enviado.";
    exit;
}

$ip = "192.168.1.56"; // ← Altere para o IP do seu Termux
$porta = 7878;

// Envia o comando via netcat
$saida = shell_exec("echo \"$comando\" | nc $ip $porta");
echo $saida ?: \"Comando enviado com sucesso!\";
?>
