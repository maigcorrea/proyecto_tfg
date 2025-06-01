<?php
    include_once '../config/connection.php';
    include_once '../models/user.php';
    include_once '../models/cookies_sesiones.php';
    include_once '../models/post.php';

    function getExtendedDataUser(){
        $userId = $_GET['userId'];
        $user = new User();
        $data = $user->getExtendedDataUser($userId);
        
        echo json_encode([
            'success' => true,
            "user" => $data['user'],
            "liked_posts" => $data['liked_posts'],
            "total_likes" => $data['total_likes'],
            "commented_posts" => $data['commented_posts'],
            "total_comments" => $data['total_comments'],
            "user_comments" => $data['user_comments'],
            "created_posts" => $data['created_posts']
        ]);
    }
?>