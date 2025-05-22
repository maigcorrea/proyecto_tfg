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
    }
?>