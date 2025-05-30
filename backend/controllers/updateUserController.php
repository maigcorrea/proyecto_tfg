<?php
require_once '../config/connection.php';
require_once '../models/user.php';
require_once '../models/cookies_sesiones.php';

function updateUser(){
    $id = $_POST['id'];
    $nickname = $_POST['nickname'];
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $telefono = $_POST['telefono'];
    $f_nac = $_POST['f_nac'];
    $descripcion = $_POST['descripcion'];
    $oldImg = $_POST['oldImg'];
    $newImg = isset($_FILES['newImg']) ? $_FILES['newImg']['name'] : null;

    // Si se ha seleccionado una nueva imagen
    if($newImg){
        //Se borra la foto de perfil anterior de la carpeta del usuario y se sube la nueva
        $replacedImgName =replaceImg($newImg, $id, $oldImg);    
        // Se actualizan los datos en la bd con la nueva imagen
        $user = new User();
        $updated = $user->updateFullUser($id, $nickname, $nombre, $email, $telefono, $f_nac, $descripcion, $replacedImgName);
    }else{
        //Se actualizan los datos en la bd con la imagen actual
        $user = new User();
        $updated = $user->updateFullUser($id, $nickname, $nombre, $email, $telefono, $f_nac, $descripcion, $oldImg);
    }

    
    if($updated){
        echo json_encode(["success" => true, "message" => "Datos actualizados correctamente"]);
    }
}


function replaceImg($img, $id, $oldImg){
    //PARA LA FOTO, crear carpeta con el id del usuario si todavía no existe y meter la imagen, luego coger esa ruta para meterla en la bd
    $imgName= uniqid() . '_' . preg_replace('/[^a-zA-Z0-9\._]/', "", $img);
    $origen = $_FILES['newImg']['tmp_name'];
    $ruta="../../frontend/public/userAssets/".$id.'/';
    $rutaImgActual="../../frontend/public/userAssets/".$id.'/'.$oldImg;

    if(!file_exists($ruta)){
        mkdir($ruta,0777,true);
    }
    
    $destino=$ruta . $imgName;
    $modifiedImage = false;

    try {
        move_uploaded_file($origen, $destino);  
        //Borrar la img anterior de la carpeta
        if(file_exists($rutaImgActual)){
            // Si la imagen anterior existe, la eliminamos
            unlink($rutaImgActual);
        }

        $modifiedImage = true;  
    } catch (\Throwable $th) {
        throw $th;
    }
        

    return $imgName;
}
?>