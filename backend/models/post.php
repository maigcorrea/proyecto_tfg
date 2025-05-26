<?php
require_once "../config/connection.php";

    class Post{
        private $conn;


        public function __construct() {
            $this->conn = new db();
        }

        public function createPost($contenido, $id_usuario){
            $query= "INSERT INTO post (usuario, contenido, fecha) VALUES (?,?, NOW());";
            $stmt =$this->conn->getConnection()->prepare($query);
            $stmt->bind_param('ss',$id_usuario, $contenido);

            $resultado = $stmt->execute();
            $stmt->close();

            return $resultado;   
        }



        public function getAllPosts($userId){
            $query = "SELECT p.id, p.contenido, p.fecha, u.nombre, u.nickname, u.img,
                     (SELECT COUNT(*) FROM likes l WHERE l.post = p.id) as likesCount,
                     EXISTS(SELECT 1 FROM likes l2 WHERE l2.post = p.id AND l2.usuario = ?) as userLiked
              FROM post p
              INNER JOIN usuario u ON p.usuario = u.id
              ORDER BY p.fecha DESC";

            $stmt = $this->conn->getConnection()->prepare($query);
            $stmt->bind_param("i", $userId);
            $stmt->execute();
            $resultado =$stmt->get_result();
            $posts=[];
            while($row = $resultado->fetch_assoc()){
                // Convertir userLiked a booleano
                $row['userLiked'] = (bool)$row['userLiked'];
                $posts[] = $row;
            }

            $stmt->close();
            return $posts;
        }



        public function deletePost($postId){
            $query = "DELETE FROM post WHERE id = ?;";
            $stmt = $this->conn->getConnection()->prepare($query);
            $stmt->bind_param("i", $postId);
            
            $deleted=false;
            $stmt->execute();
            if($stmt->affected_rows > 0){
                $deleted = true;
            } //Comprueba si se eliminó al menos una fila

            $stmt->close();

            return $deleted;

        }
    }
?>