<?php
    include_once '../config/connection.php';
    include_once '../models/user.php';
    include_once '../models/cookies_sesiones.php';
    include_once '../models/post.php';


    function getAllPosts(){
        $post = new Post();
        $posts = $post->getAllPosts();

        echo json_encode([
            'success' => true,
            'posts' => $posts,
        ]);
    }
?>