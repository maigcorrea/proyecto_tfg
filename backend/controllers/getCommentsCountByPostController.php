<?php
    include_once '../config/connection.php';
    include_once '../models/user.php';
    include_once '../models/cookies_sesiones.php';
    include_once '../models/post.php';
    include_once '../models/comment.php';
    include_once '../models/like.php';

    function getCommentsCountByPost() {
        $idPost = $_GET['postId'] ?? '';

        $comment = new Comment();
        $commentsCount = $like->getCommentsCountByPost($idPost);

        if ($commentsCount !== false) {
            echo json_encode([
                'success' => true,
                'postId' => $idPost,
                'commentsCount' => $commentsCount,
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error retrieving comments count']);
        }
    }
?>