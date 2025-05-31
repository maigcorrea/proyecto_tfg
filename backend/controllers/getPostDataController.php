<?php
    include_once '../config/connection.php';
    include_once '../models/user.php';
    include_once '../models/cookies_sesiones.php';
    include_once '../models/post.php';

    function getPostData(){
        $postId=$_GET['postId'] ?? '';

        $post = new Post();
        $result = $post->getPostData($postId);
        
        echo json_encode([
            'success' => true,
            'post' => $result["post"],
            'likes' => $result["likes"],
            'comments' => $result["comments"]
        ]);
    }
?>