<?php
require_once "../config/connection.php";

    class User{
        private $conn;
        // private $table_name = "usuario";
    
        public function __construct() {
            $this->conn = new db();
        }

        //REGISTER
        public function userRegistration($tel,$nom,$email,$nickname, $f_nac, $pass){
            $inserted=false;

            if(!$this->checkEmailExists($email)){
                if(!$this->checkNicknameExists($nickname)){
                    try {
                        $query="INSERT INTO usuario(telefono, nombre, email, nickname, nacimiento, passwrd) VALUES(?,?,?,?,?,?);";
                        $stmt=$this->conn->getConnection()->prepare($query);
    
                        // Hashear la contraseña
                        $hash = password_hash($pass, PASSWORD_BCRYPT);
    
                        $stmt->bind_param("isssss",$tel,$nom,$email,$nickname, $f_nac, $hash);
                         //NOTA: Cuando un usuario intente iniciar sesión, puedes usar password_verify($passwordIntroducida, $hashAlmacenado) para comprobar si la contraseña coincide con el hash almacenado.
    
                        $stmt->execute();
                        $inserted=true;
                    } catch (\Throwable $th) {
                        $inserted=false;
                    }
    
                }
                
                // if ($this->checkNicknameExists($nickname)) {
                //     return [
                //         "success" => false,
                //         "message" => "Nickname ocupado, selecciona otro"
                //     ];
                // }


                // try {
                //     $query = "INSERT INTO usuario(telefono, nombre, email, nickname, nacimiento, passwrd) VALUES(?,?,?,?,?,?);";
                //     $stmt = $this->conn->getConnection()->prepare($query);
                //     $stmt->bind_param("isssss", $tel, $nom, $email, $nickname, $f_nac, $pass);
            
                //     $stmt->execute();
            
                //     return [
                //         "success" => true,
                //         "message" => "Usuario registrado correctamente"
                //     ];
                // } catch (\Throwable $th) {
                //     // Aquí puedes agregar más detalles si quieres depurar
                //     return [
                //         "success" => false,
                //         "message" => "Usuario ya registrado. Debe iniciar sesión"
                //     ];
                // }
                
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
            $query="SELECT id, tipo, nickname FROM usuario WHERE email=? OR nickname=?";
            $stmt=$this->conn->getConnection()->prepare($query);
            $stmt->bind_param("ss", $nom, $nom);
            $stmt->bind_result($id, $tipo, $nickname);

            $data=[];
            $stmt->execute();
            while($stmt->fetch()){
                $data=[
                    "id" => $id,
                    "tipo" => $tipo,
                    "nickname" => $nickname
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
            $query="SELECT telefono, email, nombre, nickname, descripcion, nacimiento, img, tipo FROM usuario WHERE id=?;";
            $stmt=$this->conn->getConnection()->prepare($query);
            $stmt->bind_param("i", $identifier);
            $stmt->execute();
            $stmt->bind_result($phone, $mail, $name, $nick, $desc, $birth, $img, $tipo);

            $dataList=[];
            while($stmt->fetch()){
                $dataList=[
                    "Sobre mí" => $desc,
                    "Nombre" => $name,
                    "Nickname" => $nick,
                    "Email" => $mail,
                    "Teléfono" => $phone,
                    "Nacimiento" => $birth,
                    "ImgPerfil" => $img,
                    "Tipo" => $tipo
                ];
            }

            $stmt->close();
            return $dataList;
        }


        //ACTUALIZAR DATOS DEL USUARIO

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





        //METER TAGAS EN LA BD DESPUÉS DEL REGISTRO
        public function selectTags($nickname, $tagsString) {
            $query = "UPDATE usuario SET tags= ? WHERE nickname= ?";
            $stmt = $this->conn->getConnection()->prepare($query);
            $stmt->bind_param("ss", $tagsString, $nickname);


            $success = $stmt->execute();

            $stmt -> close();
            return $success;
        }

        //OBTENER TAGS DE UN USUARIO
        public function getTags($id) {
            $query = "SELECT tags FROM usuario WHERE id=?";
            $stmt = $this->conn->getConnection()->prepare($query);
            $stmt->bind_param("i", $id);
            

            $stmt->execute();
            $result = $stmt->get_result();
            if ($row = $result->fetch_assoc()) {
                return $row['tags']; // Devuelve string tipo: "Genética,Diagnóstico"
            }
            return null;
        }



        //OBTENER TODOS LOS USUARIOS DE LA BD
        public function getAllUsers($id) {
            $query = "SELECT id, telefono, nombre, nickname, descripcion, nacimiento, img, tags FROM usuario WHERE id!=?";
            $stmt = $this->conn->getConnection()->prepare($query);
            $stmt->bind_param("i", $id);

            $stmt->execute();
            $result = $stmt->get_result(); // ← necesario para poder usar fetch_assoc()

            $usuarios = [];
            while ($row = $result->fetch_assoc()) {
                $usuarios[] = $row;
            }

            return $usuarios;
        }


        //OBTENER TODOS LOS DATOS DE UN USUARIO EN BASE A SU NICKNAME
        public function getUserByNickname($nickname) {
            $query = "SELECT * FROM usuario WHERE nickname = ?";
            $stmt = $this->conn->getConnection()->prepare($query);
            $stmt->bind_param("s", $nickname);
            $stmt->execute();
            $result = $stmt->get_result();
            return $result->fetch_assoc();
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
    }

?>