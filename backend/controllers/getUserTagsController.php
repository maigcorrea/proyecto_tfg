<?php
    include_once '../config/connection.php';
    include_once '../models/user.php';

    function getUserTags(){
        $user_id = $_GET['userId'];
        $user = new User();
        $tags = $user->getTags($user_id);

        echo json_encode($tags); // Devuelve el array $tags;
    }
?>