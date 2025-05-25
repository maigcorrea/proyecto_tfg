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



        public function getAllPosts(){
            $query = "SELECT p.id, p.contenido, p.fecha, u.nombre, u.nickname, u.img FROM post p INNER JOIN usuario u ON p.usuario = u.id ORDER BY p.fecha DESC";
            $stmt = $this->conn->getConnection()->prepare($query);

            $stmt->execute();
            $resultado =$stmt->get_result();
            $posts=[];
            while($row = $resultado->fetch_assoc()){
                $posts[] = $row;
            }

            $stmt->close();
            return $posts;
        }
    }
?>