<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); 
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Credentials: true"); // ✅ Esto permite enviar cookies
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include_once '../config/connection.php';
include_once '../models/user.php';
include_once '../models/cookies_sesiones.php';

function checkLoginCredentials(){
    //Recoger datos enviados
    $identificador = $_POST['nickname'] ?? '';
    $password = $_POST['password'] ?? '';


    $user=new User();
    $isValid= $user->checkUserExists($identificador,$identificador,$password); //Debería retornar true o false

    if ($isValid) {
        //Sacar la img de perfil para mandarla al frontend y mostrarla
        //$img = $user->getImg($identificador);

        
        //Enviar la respuesta al frontend
        echo json_encode([
          "success" => true,
          "message" => "Inicio de sesión exitoso",
          // aquí podrías devolver un token o datos del usuario
        ]);
      } else {
        echo json_encode([
          'success' => false,
          'message' => 'Usuario o contraseña incorrectos'
        ]);
      }
}

//Sacar el nickname y el tipo para almacenar las sesiones 
function getNickType($identificador){
    //Recoger datos
    $user=new User();
    $data= $user->getTypeAndNick($identificador);
  
    return $data;
  }


function setSessions($identificador){

    $data=getNickType($identificador);
    $tipo=$data['tipo'];
    $nickname=$data['nickname'];
  
    $sesion=new Sesion();
    //$sesion->start_session();
    $sesion->set_session("usu", $nickname, "tipo", $tipo);
    $haySesion=$sesion->get_session("usu");
    
    //Se devuelve el tipo y ya en el frontend se redirige al dashboard en función del tipo de usuario
    //Enviar la respuesta al frontend
    echo json_encode([
      "success" => true,
      "contenidoSesion"=>$haySesion,
      "usu" =>$nickname,
      "tipo" => $tipo
      // aquí podrías devolver un token o datos del usuario
    ]);
}

?>