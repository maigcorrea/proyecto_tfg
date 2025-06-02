<?php
    include_once '../config/connection.php';
    include_once '../models/cookies_sesiones.php';
    include_once '../models/tag.php';

    function getAllTags(){
        $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;
        $offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;

        $tag = new Tag();
        $tags = $tag->getAllTags($limit, $offset);

        echo json_encode($tags);
    }
?>