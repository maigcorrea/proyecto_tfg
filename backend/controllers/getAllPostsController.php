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
        $post = new Post();
        $posts = $post->getAllTotalPosts();

        echo json_encode([
            'success' => true,
            'posts' => $posts,
        ]);
    }
?>