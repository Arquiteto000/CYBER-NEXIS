<?php
session_start();

$servername = "localhost";
$username = "Arquireto";
$password = "Death1410Note";
$dbname = "seu_banco_de_dados";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Conectar ao banco de dados
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Verificar conexão
    if ($conn->connect_error) {
        die(json_encode(['success' => false, 'message' => 'Erro de conexão com o banco de dados.']));
    }

    // Consultar o banco de dados
    $stmt = $conn->prepare("SELECT senha FROM usuarios WHERE nome_usuario = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->bind_result($senha_hash);
    $stmt->fetch();
    $stmt->close();

    // Verificar senha
    if (isset($senha_hash) && password_verify($password, $senha_hash)) {
        $_SESSION['username'] = $username;
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Usuário ou senha incorretos.']));
    }

    $conn->close();
}
?>