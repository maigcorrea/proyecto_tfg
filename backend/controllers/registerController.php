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
    // $perfil=$_POST["img"];
    

    // // Llamar a la función del modelo
    // $user= new User();
    // $inserted= $user->userRegistration($telefono,$nombre,$email,$nickname,$nacimiento,$password);
    // echo json_encode($inserted);
    $inserted=saveImg($telefono,$nombre,$email,$nickname,$nacimiento,$password);

    if ($inserted === true) {
        echo json_encode([
            "success" => true,
            "message" => "Usuario registrado correctamente"
        ]);
    } else if ($inserted === false) {
        echo json_encode([
            "success" => false,
            "message" => "Nickname ocupado, selecciona otro"
        ]);
    }else if ($inserted === "email_taken"){
        echo json_encode([
            "success" => false,
            "message" => "Email ya registrado. debe iniciar sesión"
        ]);
    }else{
        echo json_encode([
            "success" => false,
            "message" => "Error inesperado durante el registro"
        ]);
    }
}


function saveImg($telefono,$nombre,$email,$nickname,$nacimiento,$password){
    //PARA LA FOTO, crear carpeta con el nickname del usuario si todavía no existe y meter la imagen, luego coger esa ruta para meterla en la bd
    $imgName=null;

        if (!empty($_FILES['img']['name'])) {
            $imgName= uniqid() . '_' . preg_replace('/[^a-zA-Z0-9\._]/', "", $_FILES['img']['name']);
            $origen = $_FILES['img']['tmp_name'];
            $ruta="../../frontend/public/userAssets/".$nickname.'/';

            if(!file_exists($ruta)){
                mkdir($ruta,0777,true);
            }
            
            $destino=$ruta . $imgName;

            move_uploaded_file($origen, $destino);
        // }else {
        //     $imgName = null; // O una imagen por defecto
        }

        // Llamar a la función del modelo
        $user= new User();
        $inserted= $user->userRegistration($telefono,$nombre,$email,$nickname,$nacimiento,$password,$imgName);

        return $inserted;
}
?>