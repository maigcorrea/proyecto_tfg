<?php
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json");//Indicar que la respuesta del servidor será en formato JSON
    header("Access-Control-Allow-Credentials: true"); // Permite el uso de credenciales (como cookies)
    
    // 👉 Manejo explícito del preflight CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

    require_once '../models/user.php';
    require_once '../models/cookies_sesiones.php';

    //Obtener el método HTTP usado en la solicitud (GET, POST, PUT, DELETE).
    $method = $_SERVER['REQUEST_METHOD'];
    //Obtener el valor de action pasado por parámetro en la url, si no está seteado el action se deja vacío
    $action = isset($_GET['action']) ? $_GET['action'] : '';


    //En función del action, llamar al controlador y la función correspondiente
    switch ($action) {
    case 'checkSessionExists':
        //Como he guardado en la sesión el id del usuario (aparte del nickname y el tipo), se obtienen los datos en base a eso y no en base al nickname
        $sesion= new Sesion();
        $currentSesion= $sesion->get_session("id");


        if (isset($currentSesion) && $currentSesion!=null) {
            
            
            //  Obtener los datos (la foto para mostrarla en el perfil, nombre, etc)
            $user=new User();
            $data = $user->getDataUser($currentSesion); // Se obtienen todos los datos del usuario menos las tags (en base a su id)
            $img= $data['ImgPerfil'];
            $nombre = $data['Nombre'];
            $nickname = $data['Nickname'];
            $tipo = $data['Tipo'];

            $tagsAvailable=$user->getTags($currentSesion);
            $tags= $tagsAvailable ?? "";
            // var_dump($_SESSION);
            echo json_encode([
                "loggedIn" => true,
                "id" => $currentSesion,
                "usuario" => $nickname,
                "nombre" => $nombre,
                "img" => $img,
                "tags" => explode(',', $tags),
                "tipo" => $tipo,
                
                // "tipo" => $_SESSION['tipo']
            ]);
        } else {
            echo json_encode([
                "loggedIn" => false,
                "currentSession" =>$currentSesion
            ]);
        }
    
    break;

    case "getSession":
        $sesion= new Sesion();
        $tipo= $sesion->get_session("tipo");
        //var_dump($_SESSION["tipo"]);

        echo json_encode([
            "tipo" => $tipo,
        ]);
    break;

    case 'login':
        if ($method === 'POST') {
            // $data = json_decode(file_get_contents("php://input"), true);
            // $controller = new UserLoginController();
            // $controller->loginUser($data);
            require_once '../controllers/loginController.php';
            checkLoginCredentials();
        }
    break;

    case 'session':
        if ($method === 'POST') {
            require_once '../controllers/loginController.php';
            $response= setSessions($_POST['nickname']);
            return $response;
            
        }
    break;

    case 'close':
        $sesion= new Sesion();
        $closed=$sesion->unset_session();

        if($closed){
            echo json_encode([
                "closedSesion" => true,
            ]);
        }else{
            echo json_encode([
                "closedSesion" => false,
            ]);
        }
    
    break;

    case 'register':
        if ($method === 'POST') {
            //Controlar si el nickname no está pillado
            //Si no está pillado se crea una carpeta para subir la foto
            //Se registra al usuario
            require_once '../controllers/registerController.php';
            userRegistration();
        }
    break;

    case 'getDataProfile':
        $sesion= new Sesion();
        $currentSesion= $sesion->get_session("usu");

        if (isset($currentSesion) && $currentSesion != null) {
            //Obtener los datos del perfil
            //Llamar a función del controlador
            require_once "../controllers/getUserDataController.php";
            $userData = getDataUserProfile();
            header('Content-Type: application/json');
            echo json_encode($userData);
        }else{
            echo json_encode(["error" => "Error en users.php al obtener los datos del usuario loggeado"]);
        }
    break;

    case 'updateProfile':
    if ($method === 'POST') {
        require_once '../controllers/updateProfileDataController.php';
        updateUserProfile();
    }
    break;

    case 'updateImg':
    if ($method === 'POST') {
        require_once '../controllers/updateProfileDataController.php';
        updateUserImg();
    }
    break;

    case 'selectUserTags':
        require_once '../controllers/selectTagsController.php';
        selectTags();
    break;

    case 'getAllUsers':
        require_once '../controllers/getAllUsersController.php';
        getAllUsers();
    break;

    case 'getAllUsersCopia':
        require_once '../controllers/getAllUsersControllerCopia.php';
        getAllUsers();
    break;

    case 'getUserByNickname':
        require_once '../controllers/getUserByNicknameController.php';
        getUserByNickname(); // Asegúrate de que este nombre coincida
    break;

    case 'deleteUser':
        require_once '../controllers/deleteUserController.php';
        deleteUser();
    break;

    case 'updateUser':
        require_once '../controllers/updateUserController.php';
        updateUser();
    break;

    case 'getExtendedDataUser':
        require_once '../controllers/getExtendedDataUserController.php';
        getExtendedDataUser();
    break;

}
?>