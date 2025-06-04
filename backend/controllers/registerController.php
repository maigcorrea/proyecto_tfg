<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); 
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include_once '../config/connection.php';
include_once '../models/user.php';
include_once '../models/cookies_sesiones.php';

function userRegistration(){
    //Recoger datos enviados
    $nombre=$_POST["nombre"];
    $email=$_POST["email"];
    $nickname=$_POST["nickname"];
    $telefono=$_POST["telefono"];
    $nacimiento=$_POST["nacimiento"];
    $password=$_POST["password"];
    $tipo = isset($_POST["tipo"]) ? $_POST["tipo"] : "usu"; // Valor por defecto 'usu' si no se envía
    $permiso = isset($_POST["permiso"]) ? $_POST['permiso'] : "false"; //Por defecto false

    //Validaciones contraseña
    if(!isset($password) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'No se ha recibido la contraseña']);
        return;
    }else if( preg_match('/\s/', $password)) { //PATRONES
        echo json_encode(['success' => false, 'message' => 'La contraseña no puede contener espacios']);
        return;
    }else if (strlen($password) < 8 || strlen($password) > 20) {
        echo json_encode(['success' => false, 'message' => 'La contraseña debe tener entre 8 y 20 caracteres']);
        return;
    }else if (!preg_match('/[A-Z]/', $password)) {
        echo json_encode(['success' => false, 'message' => 'Debe contener al menos una mayúscula']);
        return;
    }else if (!preg_match('/[0-9]/', $password)) {
        echo json_encode(['success' => false, 'message' => 'Debe contener al menos un número']);
        return;
    }else if (!preg_match('/[a-z]/', $password)) {
        echo json_encode(['success' => false, 'message' => 'Debe contener al menos una minúscula']);
        return;
    }else if (!preg_match('/[!@#$%^&*()\-_=+{};:,<.>]/', $password)) { // \W = no alfanumérico, _ incluido
        echo json_encode(['success' => false, 'message' => 'Debe contener al menos un carácter especial']);
        return;
    }

    // Convertir de string a int (1 o 0)
    $permiso = ($permiso === "true") ? 1 : 0;

    // Llamar a la función del modelo
    $user= new User();
    $inserted = $user->userRegistration($telefono, $nombre, $email, $nickname, $nacimiento, $password, $tipo, $permiso);

    
    // Si se incluye tipo explícitamente (registro desde admin)
    
    

    if ($inserted === true) {
        // Obtener id del usuario recién insertado
        $id = $user->getId($nickname);
        

        // Guardar la imagen
        $uploaded = saveImg($id);
        if($uploaded){
            echo json_encode([
                "success" => true,
                "message" => "Usuario registrado correctamente"
            ]);
        } else{
            echo json_encode([
                "success" => true,
                "message" => "Usuario registrado correctamente, pero no se pudo guardar la imagen"
            ]);
        }
    } else if ($inserted === "email_taken"){
        echo json_encode([
            "success" => false,
            "message" => "Email ya registrado. debe iniciar sesión"
        ]);
    }else if($inserted === "nickname_taken"){
        echo json_encode([
        "success" => false,
        "message" => "Nickname ocupado, selecciona otro"
    ]);
    }else if($inserted === "phone_taken"){
        echo json_encode([
            "success" => false,
            "message" => "Teléfono ocupado, selecciona otro"
        ]);
    }else{
        echo json_encode([
            "success" => false,
            "message" => "Error inesperado durante el registro"
        ]);
    }
}


function saveImg($id){
    //PARA LA FOTO, crear carpeta con el id del usuario si todavía no existe y meter la imagen, luego coger esa ruta para meterla en la bd
    $imgName=null;

        if (!empty($_FILES['img']['name'])) {
            $imgName= uniqid() . '_' . preg_replace('/[^a-zA-Z0-9\._]/', "", $_FILES['img']['name']);
            $origen = $_FILES['img']['tmp_name'];
            $ruta="../../frontend/public/userAssets/".$id.'/';

            if(!file_exists($ruta)){
                mkdir($ruta,0777,true);
            }
            
            $destino=$ruta . $imgName;

            move_uploaded_file($origen, $destino);
            $uploadedImage = true;
        // }else {
        //     $imgName = null; // O una imagen por defecto
        }

        // Llamar a la función del modelo
        $user= new User();
        $uploadedImage = $user->saveImgProfile($id, $imgName);

        return $uploadedImage;;
}
?>