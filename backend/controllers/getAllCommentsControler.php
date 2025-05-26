<?php
    include_once '../config/connection.php';
    include_once '../models/user.php';
    include_once '../models/cookies_sesiones.php';
    include_once '../models/post.php';
    include_once '../models/comment.php';

    function getAllComments() {
        $comment = new Comment();
        $comments = $comment->getAllComments();

        echo json_encode([
            'success' => true,
            'comments' => $comments,
        ]);
    }
?>