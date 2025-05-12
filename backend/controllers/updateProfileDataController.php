<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../config/connection.php';
require_once '../models/user.php';
require_once '../models/cookies_sesiones.php';

function updateUserProfile() {
    $sesion = new Sesion();
    $currentSesion = $sesion->get_session("usu");

    if (!$currentSesion) {
        echo json_encode(["success" => false, "message" => "Sesión no iniciada"]);
        return;
    }

    $field = $_POST['field'] ?? null;
    $newValue = $_POST['newValue'] ?? null;

    if (!$field || $newValue === null) {
        echo json_encode(["success" => false, "message" => "Datos incompletos"]);
        return;
    }

    $user = new User();
    $result = $user->updateUserProfileField($currentSesion, $field, $newValue);

    if ($result) {
        echo json_encode(["success" => true, "message" => "Actualización correcta"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al actualizar el campo"]);
    }
}
?>
