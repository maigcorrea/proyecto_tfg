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



        public function getAllComments($limit, $offset){
            // Primero, consulta el total de posts sin limitaciones
            $totalQuery = "SELECT COUNT(*) as total FROM comentario";
            $totalResult = $this->conn->getConnection()->query($totalQuery);
            $totalRow = $totalResult->fetch_assoc();
            $totalComments = $totalRow['total'];

            $query = "SELECT c.id, c.contenido, c.fecha, u.nombre AS usuario_nombre, p.contenido AS post_contenido 
                      FROM comentario c 
                      JOIN usuario u ON c.usuario = u.id 
                      JOIN post p ON c.post = p.id 
                      ORDER BY c.fecha DESC LIMIT ? OFFSET ?;";
            $stmt = $this->conn->getConnection()->prepare($query);
            $stmt->bind_param("ii", $limit, $offset);
            $stmt->execute();
            $result = $stmt->get_result();

            $comments = [];
            while ($row = $result->fetch_assoc()) {
                $comments[] = $row;
            }

            $stmt->close();
            return [
                'total' => $totalComments,
                'comentarios' => $comments
            ];
        }


        public function deleteComment($commentId){
            $query = "DELETE FROM comentario WHERE id = ?;";
            $stmt = $this->conn->getConnection()->prepare($query);
            $stmt->bind_param("i", $commentId);

            $deleted=false;
            $stmt->execute();
            if($stmt->affected_rows > 0){
                $deleted = true;
            } //Comprueba si se eliminó al menos una fila

            $stmt->close();

            return $deleted;
        }


        public function getCommentsCountByPost($postId) {
            $query = "SELECT COUNT(*) as commentsCount FROM comentario WHERE post = ?;";
            $stmt = $this->conn->getConnection()->prepare($query);
            $stmt->bind_param("i", $postId);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                return $row['commentsCount'];
            } else {
                return 0; //No hay comentarios
            }

            $stmt->close();
        }
    }
?>