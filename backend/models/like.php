<?php
    require_once "../config/connection.php";

    class Like{
        private $conn;


        public function __construct() {
            $this->conn = new db();
        }


        public function createLike($postId, $userId) {
            $query = "INSERT INTO likes (usuario, post, fecha) VALUES (?,?, NOW());";
            $stmt = $this->conn->getConnection()->prepare($query);
            $stmt->bind_param("ii", $userId, $postId);
            if ($stmt->execute()) {
                return true;
            } else {
                return false;
            }

            $stmt->close();

        }

        public function removeLike($postId, $userId){
            $query = "DELETE FROM likes WHERE post = ? AND usuario = ?;";
            $stmt = $this->conn->getConnection()->prepare($query);
            $stmt->bind_param("ii", $postId, $userId);
            if ($stmt->execute()) {
                return true;
            } else {
                return false;
            }

            $stmt->close();
        }

        public function hasUserLiked($postId, $userId) {
            $query = "SELECT * FROM likes WHERE post = ? AND usuario = ?;";
            $stmt = $this->conn->getConnection()->prepare($query);
            $stmt->bind_param("ii", $postId, $userId);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                return true;
            } else {
                return false;
            }

            $stmt->close();
        }


        public function getLikesCountByPost($postId) {
            $query = "SELECT COUNT(*) as likesCount FROM likes WHERE post = ?;";
            $stmt = $this->conn->getConnection()->prepare($query);
            $stmt->bind_param("i", $postId);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                return $row['likesCount'];
            } else {
                return 0; //No hay likes
            }

            $stmt->close();
        }
    }
?>