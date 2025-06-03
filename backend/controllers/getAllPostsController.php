<?php
    include_once '../config/connection.php';
    include_once '../models/user.php';
    include_once '../models/cookies_sesiones.php';
    include_once '../models/post.php';


    function getAllPosts(){
        $post = new Post();
       // $userId = $_SESSION['id'] ?? null;
       $sesion= new Sesion();
        //$currentSesion= $sesion->get_session("usu");
        $userId = $sesion->get_session("id");
        $posts = $post->getAllPosts($userId);

        echo json_encode([
            'success' => true,
            'posts' => $posts,
            'userId' => $userId,
        ]);
    }


    function getAllTotalPosts(){
        $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;
        $offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;
        $selectedUserId = isset($_GET['selectedUserId']) && $_GET['selectedUserId'] !== '' ? intval($_GET['selectedUserId']) : null;


        $post = new Post();
        $posts = $post->getAllTotalPosts($limit, $offset, $selectedUserId);

        echo json_encode([
            'success' => true,
            'posts' => $posts['posts'],
            'total' => $posts['total']
        ]);
    }
?>