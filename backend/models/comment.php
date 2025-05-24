<?php
    require_once "../config/connection.php";


    class Comment{
        private $conn;


        public function __construct() {
            $this->conn = new db();
        }


        public function createComment($content, $userId, $postId){
            $query = "INSERT INTO comentario VALUES (?, ?, ?, NOW());";
            $stmt = $this->conn->getConnection()->prepare($query);
            $stmt-> bind_param("sii", $content, $userId, $postId);

            $resultado = $stmt->execute();
            $stmt->close();

            return $resultado;
        }
    }
?>