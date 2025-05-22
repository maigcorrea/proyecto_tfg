<?php
    include_once '../config/connection.php';
    include_once '../models/user.php';
    include_once '../models/cookies_sesiones.php';
    include_once '../models/project.php';


    function getAllPost(){
        $project = new Project();
        $posts = $project->getAllPosts();
    }
?>