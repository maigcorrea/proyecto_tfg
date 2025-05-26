<?php
    include_once '../config/connection.php';
    include_once '../models/user.php';
    include_once '../models/cookies_sesiones.php';
    include_once '../models/post.php';
    include_once '../models/comment.php';
    include_once '../models/like.php';

    function getLikesCountByPost() {
        $idPost = $_GET['postId'] ?? '';

        $like = new Like();
        $likesCount = $like->getLikesCountByPost($idPost);

        if ($likesCount !== false) {
            echo json_encode([
                'success' => true,
                'postId' => $idPost,
                'likesCount' => $likesCount,
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error retrieving likes count']);
        }
    }
?>