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


        //Obtener post parte usuario
        public function getAllPosts($userId){
            $query = "SELECT p.id, p.contenido, p.fecha, u.nombre, u.nickname, u.img,
                     (SELECT COUNT(*) FROM likes l WHERE l.post = p.id) as likesCount,
                     EXISTS(SELECT 1 FROM likes l2 WHERE l2.post = p.id AND l2.usuario = ?) as userLiked,
                     (SELECT COUNT(*) FROM comentario c WHERE c.post = p.id) as commentsCount
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

        //Obtener post parte administrador
        public function getAllTotalPosts($limit, $offset){
            // Primero, consulta el total de posts sin limitaciones
            $totalQuery = "SELECT COUNT(*) as total FROM post";
            $totalResult = $this->conn->getConnection()->query($totalQuery);
            $totalRow = $totalResult->fetch_assoc();
            $totalPosts = $totalRow['total'];

            // Luego, consulta los posts paginados con sus contadores
            $query = "SELECT p.id, p.contenido, p.fecha, p.usuario, u.nombre, u.nickname, u.img,
                     (SELECT COUNT(*) FROM likes l WHERE l.post = p.id) as likesCount,
                     (SELECT COUNT(*) FROM comentario c WHERE c.post = p.id) as commentsCount
              FROM post p
              INNER JOIN usuario u ON p.usuario = u.id
              ORDER BY p.fecha DESC LIMIT ? OFFSET ?";

            $stmt = $this->conn->getConnection()->prepare($query);
            $stmt->bind_param("ii", $limit, $offset);
            $stmt->execute();
            $resultado =$stmt->get_result();
            $posts=[];
            while($row = $resultado->fetch_assoc()){
                $posts[] = $row;
            }

            $stmt->close();

            // Devuelve tanto los posts como el total
            return [
                'total' => $totalPosts,
                'posts' => $posts
            ];
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