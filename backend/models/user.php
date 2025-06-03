<?php
require_once "../config/connection.php";

    class User{
        private $conn;
        // private $table_name = "usuario";
    
        public function __construct() {
            $this->conn = new db();
        }

        //REGISTER
        public function userRegistration($tel,$nom,$email,$nickname, $f_nac, $pass, $tipo = 'usu', $permiso = 0){
            $inserted=false;

            if($this->checkEmailExists($email)){
                return "email_taken";
            }

            if($this->checkNicknameExists($nickname)){
                return "nickname_taken";
            }

            if(!$this->checkEmailExists($email)){
                if(!$this->checkNicknameExists($nickname)){
                    try {
                        $query="INSERT INTO usuario(telefono, nombre, email, nickname, nacimiento, passwrd, tipo, permiso) VALUES(?,?,?,?,?,?,?,?);";
                        $stmt=$this->conn->getConnection()->prepare($query);
    
                        // Hashear la contraseña
                        $hash = password_hash($pass, PASSWORD_BCRYPT);
    
                        $stmt->bind_param("issssssi",$tel,$nom,$email,$nickname, $f_nac, $hash, $tipo, $permiso);
                         //NOTA: Cuando un usuario intente iniciar sesión, puedes usar password_verify($passwordIntroducida, $hashAlmacenado) para comprobar si la contraseña coincide con el hash almacenado.
    
                        $stmt->execute();
                        $inserted=true;
                    } catch (\Throwable $th) {
                        $inserted=false;
                    }
    
                }  
                
            }else{
                $inserted="email_taken";
            }

            return $inserted;
        }

        public function checkNicknameExists($nickname){
            $query="SELECT count(nickname) FROM usuario WHERE nickname=?;";
            $stmt=$this->conn->getConnection()->prepare($query);
            $stmt->bind_param("s",$nickname);
            $stmt->bind_result($exists);

            $stmt->execute();
            $stmt->fetch();

            if($exists==1){
                return true;
            }else{
                return false;
            }
        }

        public function checkEmailExists($email){
            $email=trim($email);
            $query="SELECT COUNT(email) FROM usuario WHERE email=?";
            $stmt=$this->conn->getConnection()->prepare($query);
            $stmt->bind_param("s",$email);
            $stmt->bind_result($exists);

            $stmt->execute();
            $stmt->fetch();

            if($exists==1){
                return true;
            }else{
                return false;
            }
        }

        public function saveImgProfile($id, $img){
            $query="UPDATE usuario SET img=? WHERE id=?";
            $stmt=$this->conn->getConnection()->prepare($query);
            $stmt->bind_param("si", $img, $id);

            if($stmt->execute()){
                return true;
            }else{
                return false;
            }

            $stmt->close();
        }

        //LOGIN
        public function getImg($nick){
            $query="SELECT img FROM usuario WHERE nickname=?;";
            $stmt=$this->conn->getConnection()->prepare($query);
            $stmt->bind_param("s",$nick);
            $stmt->bind_result($profile);

            $stmt->execute();
            $stmt->fetch();

            $stmt->close();
            return $profile;
        }

        public function getIdTypeAndNick($nom){
            $query="SELECT id, tipo, nickname, permiso FROM usuario WHERE email=? OR nickname=?";
            $stmt=$this->conn->getConnection()->prepare($query);
            $stmt->bind_param("ss", $nom, $nom);
            $stmt->bind_result($id, $tipo, $nickname, $permiso);

            $data=[];
            $stmt->execute();
            while($stmt->fetch()){
                $data=[
                    "id" => $id,
                    "tipo" => $tipo,
                    "nickname" => $nickname,
                    "permiso" => $permiso
                ];
            }

            $stmt->close();
            return $data;
        }

        public function checkLoginPassword($nom, $passw){
            //Comprobar que la contraseña es la correcta
            $sentencia="SELECT passwrd FROM usuario WHERE nickname=?;";
            $consulta=$this->conn->getConnection()->prepare($sentencia);
            $consulta->bind_param("s",$nom);
            $consulta->bind_result($hash);

            $consulta->execute();
            $consulta->fetch();

            $passw=trim($passw);
            $correcto=false;

            if(password_verify($passw,$hash)){
                $correcto=true;
            }
            
            $consulta->close();
            return $correcto;
        }

        public function checkUserExists($email, $nickname, $pass){
            //Comprobar email o nickname de usuario
            $sent="SELECT count(nickname), nickname FROM usuario where email=? OR nickname=?";
            $cons=$this->conn->getConnection()->prepare($sent);
            $cons->bind_param("ss", $email, $nickname);
            $cons->bind_result($number, $nickUsu);

            $cons->execute();
            $cons->fetch();


            if($number==1){
                //Se comprueba que la contraseña sea la de la bd
                return $this->checkLoginPassword($nickUsu, $pass); // Retorna el resultado de comprobar la contraseña(true o false)
            }else{
                return false; //En caso de que el usuario no se haya encontrado
            }

            $cons->close();
        }



        //DATOS DE LOS USUARIOS

        //OBTENER DNY Y NOMBRE DE TODOS LOS USUARIOS
        public function getUsers(){
            $query="SELECT DNI,nombre FROM usuario";
            $stmt=$this->conn->getConnection()->prepare($query);
            $stmt->execute();
            $stmt->bind_result($dni,$nombre);

            $userList=[];
            while($stmt->fetch()){
                $userList[] = [
                    "DNI" => $dni,
                    "nombre" => $nombre
                ];  // Almacena un array asociativo con claves "DNI" y "nombre"
            }

            $stmt->close();
            return $userList;
        }


        //OBTENER ID DEL USUARIO LOGGEADO
        /*public function getIdByNickname($nickname){
            $query="SELECT id FROM usuario WHERE nickname=?;";
            $stmt=$this->conn->getConnection()->prepare($query);
            $stmt->bind_param("s", $nickname);
            $stmt->bind_result($id);

            $stmt->execute();
            $stmt->fetch();

            $stmt->close();
            return $id;
        }*/


        //OBTENER TODOS LOS DATOS DEL USUARIO LOGGEADO
        public function getDataUser($identifier){
            $query = "SELECT u.telefono, u.email, u.nombre, u.nickname, u.descripcion, u.nacimiento, u.img, u.tipo, u.permiso,
                     GROUP_CONCAT(t.nombre SEPARATOR ',') AS tags
              FROM usuario u
              LEFT JOIN tag_usuario tu ON u.id = tu.id_usu
              LEFT JOIN tag t ON tu.id_tag = t.id
              WHERE u.id = ?
              GROUP BY u.id, u.telefono, u.email, u.nombre, u.nickname, u.descripcion, u.nacimiento, u.img, u.tipo;";

            $stmt=$this->conn->getConnection()->prepare($query);
            $stmt->bind_param("i", $identifier);
            $stmt->execute();
            $stmt->bind_result($phone, $mail, $name, $nick, $desc, $birth, $img, $tipo, $permiso, $tags);

            $dataList=[];
            while($stmt->fetch()){
                $tagsArray = $tags ? explode(',', $tags) : []; // Convertir a array

                $dataList=[
                    "Descripcion" => $desc,
                    "Nombre" => $name,
                    "Nickname" => $nick,
                    "Email" => $mail,
                    "Teléfono" => $phone,
                    "Nacimiento" => $birth,
                    "ImgPerfil" => $img,
                    "Tipo" => $tipo,
                    "Permiso" => $permiso,
                    "Tags" => $tagsArray
                ];
            }

            $stmt->close();
            return $dataList;
        }


        //ACTUALIZAR DATOS DEL USUARIO

        public function updatePermission($id, $permiso){
            $query="UPDATE usuario SET permiso=? WHERE id=?";
            $stmt=$this->conn->getConnection()->prepare($query);
            $stmt->bind_param("ii", $permiso, $id);

            $updated=false;

            $stmt->execute();
            if($stmt->affected_rows == 1){
                $updated=true;
            }

            $stmt->close();
            return $updated;
        }

        public function updateImgProfile($id, $img){
            $query="UPDATE usuario SET img=? WHERE id=?";
            $stmt=$this->conn->getConnection()->prepare($query);
            $stmt->bind_param("si", $img, $id);

            if($stmt->execute()){
                return true;
            }else{
                return false;
            }

            $stmt->close();
        }



        public function updateUserProfileField($id, $field, $newValue) {
            $allowedFields = ['nombre', 'email', 'telefono', 'nacimiento', 'nickname', 'descripcion'];

            if (!in_array($field, $allowedFields)) {
                return false; // Campo no permitido
            }

            try {
                $query = "UPDATE usuario SET $field = ? WHERE id = ?";
                $stmt = $this->conn->getConnection()->prepare($query);

                if (!$stmt) {
                    throw new Exception("Error preparando consulta: " . $this->conn->getConnection()->error);
                }

                $stmt->bind_param("si", $newValue, $id);

                if ($stmt->execute()) {
                    return true;
                } else {
                    return false;
                }

            } catch (Throwable $th) {
                return false;
            }
        }


        //ACTUALIZAR CONTRASEÑA
        public function changePassword($id, $password){
            $query="UPDATE usuario SET passwrd=? WHERE id=?";
            $stmt=$this->conn->getConnection()->prepare($query);

            // Hashear la contraseña
            $hash = password_hash($password, PASSWORD_BCRYPT);

            $stmt->bind_param("si", $hash, $id);
            $stmt->execute();


            try {
                if($stmt->affected_rows == 1){
                    return true;
                }else{
                    return false;
                }
            } catch (\Throwable $th) {
                //throw $th;
            }finally {
                $stmt->close();
            }           
        }
       

        //DESDE LA PARTE DEL ADMINISTRADOR ACTUALIZAR DATOS DE 1 USUARIO
        public function updateFullUser($id, $nickname, $nombre, $email, $telefono, $nacimiento, $descripcion, $img) {
            $query = "UPDATE usuario SET nickname = ?, nombre = ?, email = ?, telefono = ?, nacimiento = ?, descripcion = ?, img = ? WHERE id = ?";
            $stmt = $this->conn->getConnection()->prepare($query);
            $stmt->bind_param("sssssssi", $nickname, $nombre, $email, $telefono, $nacimiento, $descripcion, $img, $id);

            $success = false;

            if ($stmt->execute()) {
                $success = true;
            }

            $stmt->close();
            return $success;
        }





        //METER TAGAS EN LA BD DESPUÉS DEL REGISTRO
        /*public function selectTags($nickname, $tagsString) {
            $query = "UPDATE usuario SET tags= ? WHERE nickname= ?";
            $stmt = $this->conn->getConnection()->prepare($query);
            $stmt->bind_param("ss", $tagsString, $nickname);


            $success = $stmt->execute();

            $stmt -> close();
            return $success;
        }*/

        public function selectTags($nickname, $tagsArray) {
            $conn = $this->conn->getConnection();
            $conn->begin_transaction(); // Iniciamos una transacción

            try {
                // 1️⃣ Obtener el userId a partir del nickname
                $queryUser = "SELECT id FROM usuario WHERE nickname = ?";
                $stmtUser = $conn->prepare($queryUser);
                $stmtUser->bind_param("s", $nickname);
                $stmtUser->execute();
                $result = $stmtUser->get_result();
                $user = $result->fetch_assoc();
                $stmtUser->close();

                if (!$user) {
                    $conn->rollback();
                    return false; // Usuario no encontrado
                }

                $userId = $user['id'];

                // 2️⃣ Procesar cada tag
                foreach ($tagsArray as $tagName) {
                    $tagName = trim($tagName); // Asegurarse que no haya espacios

                    // 2.1 Verificar si la tag ya existe
                    $queryCheckTag = "SELECT id FROM tag WHERE nombre = ?";
                    $stmtCheck = $conn->prepare($queryCheckTag);
                    $stmtCheck->bind_param("s", $tagName);
                    $stmtCheck->execute();
                    $resultCheck = $stmtCheck->get_result();
                    $tag = $resultCheck->fetch_assoc();
                    $stmtCheck->close();

                    if (!$tag) {
                        // 2.2 Si no existe, insertarla
                        $queryInsertTag = "INSERT INTO tag (nombre) VALUES (?)";
                        $stmtInsert = $conn->prepare($queryInsertTag);
                        $stmtInsert->bind_param("s", $tagName);
                        $stmtInsert->execute();
                        $tagId = $stmtInsert->insert_id;
                        $stmtInsert->close();
                    } else {
                        $tagId = $tag['id'];
                    }

                    // 3️⃣ Insertar relación en tag_usuario si no existe
                    $queryInsertRelation = "INSERT IGNORE INTO tag_usuario (id_usu, id_tag) VALUES (?, ?)";
                    $stmtRelation = $conn->prepare($queryInsertRelation);
                    $stmtRelation->bind_param("ii", $userId, $tagId);
                    $stmtRelation->execute();
                    $stmtRelation->close();
                }

                $conn->commit(); // Confirmar transacción
                return true;
            } catch (Exception $e) {
                $conn->rollback(); // Si hay error, deshacer cambios
                error_log("Error en selectTags: " . $e->getMessage());
                return false;
            }
    }

        //OBTENER TAGS DE UN USUARIO
        public function getTags($id) {
            $conn = $this->conn->getConnection();

            $query = "SELECT t.nombre FROM tag t
                    INNER JOIN tag_usuario tu ON t.id = tu.id_tag
                    WHERE tu.id_usu = ?";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $result = $stmt->get_result();

            $tags = [];
            while ($row = $result->fetch_assoc()) {
                $tags[] = $row['nombre'];
            }
            $stmt->close();

            return $tags; // Devuelve un array como ["Genética", "Diagnóstico"]
        }


        //ACTUALIZAR TAGS DE UN USUARIO
        public function updateTags($userId, $tags) {
            $conn = $this->conn->getConnection();
            $conn->begin_transaction(); // Iniciar transacción

            try {
                // 1️⃣ Eliminar todas las relaciones actuales
                $stmtDelete = $conn->prepare("DELETE FROM tag_usuario WHERE id_usu = ?");
                $stmtDelete->bind_param("i", $userId);
                $stmtDelete->execute();
                $stmtDelete->close();

                // 2️⃣ Para cada tag, asegurar existencia y obtener su id
                $tagIds = [];
                foreach ($tags as $tag) {
                    $tag = trim($tag);
                    if (empty($tag)) continue;

                    // Intentar obtener el id del tag
                    $stmtSelect = $conn->prepare("SELECT id FROM tag WHERE nombre = ?");
                    $stmtSelect->bind_param("s", $tag);
                    $stmtSelect->execute();
                    $stmtSelect->bind_result($tagId);
                    if ($stmtSelect->fetch()) {
                        $tagIds[] = $tagId;
                    } else {
                        // Si no existe, insertarlo
                        $stmtInsertTag = $conn->prepare("INSERT INTO tag (nombre) VALUES (?)");
                        $stmtInsertTag->bind_param("s", $tag);
                        $stmtInsertTag->execute();
                        $tagIds[] = $conn->insert_id;
                        $stmtInsertTag->close();
                    }
                    $stmtSelect->close();
                }

                // 3️⃣ Insertar nuevas relaciones
                foreach ($tagIds as $tagId) {
                    $stmtInsertRel = $conn->prepare("INSERT INTO tag_usuario (id_usu, id_tag) VALUES (?, ?)");
                    $stmtInsertRel->bind_param("ii", $userId, $tagId);
                    $stmtInsertRel->execute();
                    $stmtInsertRel->close();
                }

                $conn->commit(); // Confirmar transacción
                return ['success' => true, 'message' => 'Tags actualizadas correctamente'];
            } catch (Exception $e) {
                $conn->rollback(); // Revertir cambios en caso de error
                return ['success' => false, 'message' => 'Error al actualizar tags: ' . $e->getMessage()];
            }
        }

        //OBTENER TODOS LOS USUARIOS DE LA BD (COPIA POR SI ACASO EN LA PARTE Donde se muestran todos los usuarios)
        public function getAllUsersCopia($id) {
            $query = "SELECT u.id, u.telefono, u.nombre, u.nickname, u.descripcion, u.nacimiento, u.img, u.permiso, u.email,
                     GROUP_CONCAT(t.nombre SEPARATOR ', ') AS tags
              FROM usuario u
              LEFT JOIN tag_usuario tu ON u.id = tu.id_usu
              LEFT JOIN tag t ON tu.id_tag = t.id
              WHERE u.id != ?
              GROUP BY u.id, u.telefono, u.nombre, u.nickname, u.descripcion, u.nacimiento, u.img";

            $stmt = $this->conn->getConnection()->prepare($query);
            $stmt->bind_param("i", $id);

            $stmt->execute();
            $result = $stmt->get_result();

            $usuarios = [];
            while ($row = $result->fetch_assoc()) {
                $usuarios[] = $row;
            }

            return $usuarios;
        }



        //OBTENER TODOS LOS USUARIOS DE LA BD
        public function getAllUsers($id, $limit, $offset) {
            // Consulta con JOIN y GROUP_CONCAT para obtener tags
            $query = "
                SELECT u.id, u.telefono, u.nombre, u.email, u.nickname, u.descripcion, u.nacimiento, u.img, 
                    GROUP_CONCAT(t.nombre SEPARATOR ', ') AS tags
                FROM usuario u
                LEFT JOIN tag_usuario tu ON u.id = tu.id_usu
                LEFT JOIN tag t ON tu.id_tag = t.id
                WHERE u.id != ?
                GROUP BY u.id
                LIMIT ? OFFSET ?
            ";
            
            $stmt = $this->conn->getConnection()->prepare($query);
            $stmt->bind_param("iii", $id, $limit, $offset);

            $stmt->execute();
            $result = $stmt->get_result(); // ← necesario para poder usar fetch_assoc()

            $usuarios = [];
            while ($row = $result->fetch_assoc()) {
                $usuarios[] = $row;
            }

            $stmt->close();

            // Obtener total de usuarios (para paginación)
            $totalQuery = "SELECT COUNT(*) as total FROM usuario WHERE id != ?";
            $stmtTotal = $this->conn->getConnection()->prepare($totalQuery);
            $stmtTotal->bind_param("i", $id);
            $stmtTotal->execute();

            $totalResult = $stmtTotal->get_result();
            $totalRow = $totalResult->fetch_assoc();
            $total = $totalRow['total'];
            

            return ['users' => $usuarios, 'total' => $total];
        }


        //OBTENER TODOS LOS DATOS DE UN USUARIO EN BASE A SU NICKNAME
        public function getUserByNickname($nickname) {
            $conn = $this->conn->getConnection();

            // Consulta para obtener los datos básicos del usuario
            $queryUser = "SELECT * FROM usuario WHERE nickname = ?";
            $stmtUser = $conn->prepare($queryUser);
            $stmtUser->bind_param("s", $nickname);
            $stmtUser->execute();
            $resultUser = $stmtUser->get_result();
            $user = $resultUser->fetch_assoc();
            $stmtUser->close();

            if (!$user) {
                return null; // Usuario no encontrado
            }

            // Consulta para obtener las tags asociadas
            $queryTags = "SELECT t.nombre FROM tag t 
                        INNER JOIN tag_usuario tu ON t.id = tu.id_tag 
                        INNER JOIN usuario u ON tu.id_usu = u.id
                        WHERE u.nickname = ?";
            $stmtTags = $conn->prepare($queryTags);
            $stmtTags->bind_param("s", $nickname);
            $stmtTags->execute();
            $resultTags = $stmtTags->get_result();

            $tags = [];
            while ($row = $resultTags->fetch_assoc()) {
                $tags[] = $row['nombre'];
            }
            $stmtTags->close();

            // Añadimos las tags al array del usuario
            $user['tagsUser'] = $tags;

            return $user;
        }



        //OBTENER ID DE UN USUARIO EN BASE A SU NICKNAME
        public function getId($nickname){
            $query="SELECT id FROM usuario WHERE nickname=?;";
            $stmt= $this->conn->getConnection() -> prepare($query);
            $stmt->bind_param("s",$nickname);
            $stmt->bind_result($id);

            $stmt->execute();
            $stmt->fetch();

            $stmt->close();
            return $id;
        }


        //ELIMINAR USUARIO
        public function deleteUser($id) {
            $query = "DELETE FROM usuario WHERE id = ?";
            $stmt = $this->conn->getConnection()->prepare($query);
            $stmt->bind_param("i", $id);
            $stmt->execute();

            $deleted= false;
            if ($stmt->affected_rows){
                $deleted = true;
            }

            $stmt->close();
            return $deleted;

        }


        //OBTENER TODOS LOS DATOS EXTENDIDOS DE UN USUARIO
        public function getExtendedDataUser($userId) {
            $conn = $this->conn->getConnection();

            // 1️⃣ Datos básicos del usuario
            $queryUser = "SELECT id, nickname, nombre, img, email, nacimiento, telefono, descripcion, tags 
                        FROM usuario WHERE id = ?";
            $stmt = $conn->prepare($queryUser);
            $stmt->bind_param("i", $userId);
            $stmt->execute();
            $user = $stmt->get_result()->fetch_assoc();
            $stmt->close();

            if (!$user) {
                return null; // Si no existe, devuelve null
            }

            // 2️⃣ Posts a los que ha dado like (detalle de post)
            $queryLikedPosts = "SELECT p.id, p.contenido, p.fecha, p.usuario AS autor_id, u.nickname AS autor_nickname
                                FROM likes l
                                INNER JOIN post p ON l.post = p.id
                                INNER JOIN usuario u ON p.usuario = u.id
                                WHERE l.usuario = ?";
            $stmt = $conn->prepare($queryLikedPosts);
            $stmt->bind_param("i", $userId);
            $stmt->execute();
            $likedPosts = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
            $stmt->close();

            // 3️⃣ Total de likes dados
            $queryTotalLikes = "SELECT COUNT(*) as total_likes FROM likes WHERE usuario = ?";
            $stmt = $conn->prepare($queryTotalLikes);
            $stmt->bind_param("i", $userId);
            $stmt->execute();
            $totalLikes = $stmt->get_result()->fetch_assoc()['total_likes'];
            $stmt->close();

            // 4️⃣ Posts en los que ha comentado (detalle de post)
            $queryCommentedPosts = "SELECT DISTINCT p.id, p.contenido, p.fecha, p.usuario AS autor_id, u.nickname AS autor_nickname
                                    FROM comentario c
                                    INNER JOIN post p ON c.post = p.id
                                    INNER JOIN usuario u ON p.usuario = u.id
                                    WHERE c.usuario = ?";
            $stmt = $conn->prepare($queryCommentedPosts);
            $stmt->bind_param("i", $userId);
            $stmt->execute();
            $commentedPosts = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
            $stmt->close();

            // 5️⃣ Total de comentarios (sin importar post)
            $queryTotalComments = "SELECT COUNT(*) as total_comments FROM comentario WHERE usuario = ?";
            $stmt = $conn->prepare($queryTotalComments);
            $stmt->bind_param("i", $userId);
            $stmt->execute();
            $totalComments = $stmt->get_result()->fetch_assoc()['total_comments'];
            $stmt->close();

            // 6️⃣ Comentarios completos hechos por el usuario
            $queryUserComments = "SELECT c.id, c.contenido, c.fecha, p.id AS post_id, p.contenido AS post_contenido
                                FROM comentario c
                                INNER JOIN post p ON c.post = p.id
                                WHERE c.usuario = ?
                                ORDER BY c.fecha DESC";
            $stmt = $conn->prepare($queryUserComments);
            $stmt->bind_param("i", $userId);
            $stmt->execute();
            $userComments = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
            $stmt->close();

            // 7️⃣ Posts creados por el usuario
            $queryCreatedPosts = "SELECT id, contenido, fecha FROM post WHERE usuario = ? ORDER BY fecha DESC";
            $stmt = $conn->prepare($queryCreatedPosts);
            $stmt->bind_param("i", $userId);
            $stmt->execute();
            $createdPosts = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
            $stmt->close();

            // 🔹 Construir la respuesta final
            return [
                'user' => $user,
                'liked_posts' => $likedPosts,
                'total_likes' => $totalLikes,
                'commented_posts' => $commentedPosts,
                'total_comments' => $totalComments,
                'user_comments' => $userComments,
                'created_posts' => $createdPosts
            ];
        }
    }

    

?>