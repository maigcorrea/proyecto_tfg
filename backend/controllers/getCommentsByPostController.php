<?php
    include_once '../config/connection.php';
    include_once '../models/user.php';
    include_once '../models/cookies_sesiones.php';
    include_once '../models/post.php';
    include_once '../models/comment.php';


    function getCommentsByPost(){
        $postId = $_GET['postId'] ?? '';

        if (empty($postId)) {
            echo json_encode(['error' => 'postId no proporcionado']);
            http_response_code(400);
            return;
        }

        $comment = new Comment();
        $comments = $comment->getCommentsByPost($postId);

        echo json_encode([
            'success' => true,
            'comments' => $comments
        ]);
    }
?>