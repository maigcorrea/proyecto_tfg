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
    }
?>