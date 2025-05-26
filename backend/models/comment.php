<?php
    require_once "../config/connection.php";


    class Comment{
        private $conn;


        public function __construct() {
            $this->conn = new db();
        }


        public function createComment($content, $userId, $postId){
            $query = "INSERT INTO comentario (contenido, usuario, post, fecha) VALUES (?, ?, ?, NOW());";
            $stmt = $this->conn->getConnection()->prepare($query);
            $stmt-> bind_param("sii", $content, $userId, $postId);

            $resultado = $stmt->execute();
            $stmt->close();

            return $resultado;
        }



        public function getCommentsByPost($postId){
            $query = "SELECT c.id, c.contenido, c.fecha, u.nombre AS usuario_nombre 
                      FROM comentario c 
                      JOIN usuario u ON c.usuario = u.id 
                      WHERE c.post = ? 
                      ORDER BY c.fecha DESC;";
            $stmt = $this->conn->getConnection()->prepare($query);
            $stmt->bind_param("i", $postId);
            $stmt->execute();
            $result = $stmt->get_result();

            $comments = [];
            while ($row = $result->fetch_assoc()) {
                $comments[] = $row;
            }

            $stmt->close();
            return $comments;
        }
    }
?>