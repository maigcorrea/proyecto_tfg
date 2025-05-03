<?php
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Credentials: true"); // ✅ Esto permite enviar cookies
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json");//Indicar que la respuesta del servidor será en formato JSON
    header("Access-Control-Allow-Credentials: true"); // Permite el uso de credenciales (como cookies)


    //Obtener el método HTTP usado en la solicitud (GET, POST, PUT, DELETE).
    $method = $_SERVER['REQUEST_METHOD'];
    //Obtener el valor de action pasado por parámetro en la url, si no está seteado el action se deja vacío
    $action = isset($_GET['action']) ? $_GET['action'] : '';


    //En función del action, llamar al controlador y la función correspondiente
switch ($action) {
    case 'checkSessionExists':
        $sesion= new Sesion();
        $currentSesion= $sesion->get_session("usu");

        if (isset($currentSesion) && $currentSesion!=null) {
            //  Obtener la foto para mostrarla en el perfil
            //$user=new User();
            //$img=$user->getImg($currentSesion);
            // var_dump($_SESSION);
            echo json_encode([
                "loggedIn" => true,
                "usuario" => $currentSesion,
                //"img" => $img
                // "tipo" => $_SESSION['tipo']
            ]);
        } else {
            echo json_encode([
                "loggedIn" => false,
                "currentSession" =>$currentSesion
            ]);
        }
    
    break;
}
?>