<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../config/connection.php';
require_once '../models/user.php';
require_once '../models/cookies_sesiones.php';

function updateUserImg() {
    $sesion = new Sesion();
    $currentSesion = $sesion->get_session("id");

    if (!$currentSesion) {
        echo json_encode(["success" => false, "message" => "Sesión no iniciada"]);
        return;
    }

    $oldImg = $_POST['oldImg'] ?? null;
    $newImg = $_FILES['newImg']['name'] ?? null;

    if(!empty($newImg)){
        saveImg($newImg, $currentSesion, $oldImg);
    }else{
        echo json_encode(["success" => false, "message" => "No se ha subido ninguna imagen. Está vacío"]);
        return;
    }
}   



function saveImg($img, $id, $oldImg){
    //PARA LA FOTO, crear carpeta con el id del usuario si todavía no existe y meter la imagen, luego coger esa ruta para meterla en la bd
    $imgName= uniqid() . '_' . preg_replace('/[^a-zA-Z0-9\._]/', "", $img);
    $origen = $_FILES['newImg']['tmp_name'];
    $ruta="../../frontend/public/userAssets/".$id.'/';
    $rutaImgActual="../../frontend/public/userAssets/".$id.'/'.$oldImg;

    if(!file_exists($ruta)){
        mkdir($ruta,0777,true);
    }
    
    $destino=$ruta . $imgName;

    move_uploaded_file($origen, $destino);

    // Llamar a la función del modelo para actualizar la imagen en la bd
    //$sesion = new Sesion();
    //$id = $sesion->get_session("id");

    $user= new User();
    $inserted=$user->updateImgProfile($id,$imgName); //Subo el nombre de la img, no la ruta completa

    if ($inserted) {
        //Borrar la img anterior de la carpeta
        if(file_exists($rutaImgActual)){
            // Si la imagen anterior existe, la eliminamos
            unlink($rutaImgActual);
        }
        
        echo json_encode(["success" => true, "message" => "Imagen actualizada correctamente"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al actualizar la imagen"]);
    }

    return $inserted;
}

function updateUserProfile() {
    $sesion = new Sesion();
    $currentSesion = $sesion->get_session("id");

    if (!$currentSesion) {
        echo json_encode(["success" => false, "message" => "Sesión no iniciada"]);
        return;
    }

    $field = $_POST['campo'] ?? null;
    $newValue = $_POST['valor'] ?? null;

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
