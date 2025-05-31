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


        //Obtener toda la información de un post concreto (usuarios que le han dado like, que han comentado, comentarios, etc)
        public function getPostData($postId){
            $conn = $this->conn->getConnection();

            // Consulta 1: info del post
            $queryPost = "SELECT p.id, p.contenido, p.fecha, u.id as user_id, u.nombre, u.nickname, u.img
                        FROM post p
                        INNER JOIN usuario u ON p.usuario = u.id
                        WHERE p.id = ?";
            $stmt = $conn->prepare($queryPost);
            $stmt->bind_param("i", $postId);
            $stmt->execute();
            $result = $stmt->get_result();
            $post = $result->fetch_assoc();
            $stmt->close();

            if (!$post) {
                return null; // No existe el post
            }

            // Consulta 2: usuarios que dieron like
            $queryLikes = "SELECT u.id, u.nickname, u.nombre, u.img, l.fecha
                        FROM likes l
                        INNER JOIN usuario u ON l.usuario = u.id
                        WHERE l.post = ?";
            $stmt = $conn->prepare($queryLikes);
            $stmt->bind_param("i", $postId);
            $stmt->execute();
            $likes = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
            $stmt->close();

            // Consulta 3: comentarios con info del usuario
            $queryComments = "SELECT c.id, c.contenido, c.fecha, u.id AS usuario_id, u.nickname, u.nombre, u.img
                            FROM comentario c
                            INNER JOIN usuario u ON c.usuario = u.id
                            WHERE c.post = ?
                            ORDER BY c.fecha ASC";
            $stmt = $conn->prepare($queryComments);
            $stmt->bind_param("i", $postId);
            $stmt->execute();
            $comments = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
            $stmt->close();

            // Estructura final
            return [
                'post' => $post,
                'likes' => $likes,
                'comments' => $comments
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