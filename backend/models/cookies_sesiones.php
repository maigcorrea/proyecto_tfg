<?php

class Sesion{
    //Generar una cookie
    function set_cookie(String $nom, $val){
        setcookie($nom,$val,time()+(86400*30));
    }


    //Eliminar una cookie
    function unset_cookie(String $nom){
        $comp=false;

        if(isset($_COOKIE[$nom])){
            setcookie($nom,"",time()-(86400*30));
            $comp=true;
        }

        return $comp;
    }


    //Generar una sesión
    function start_session(){
        //Se comprueba si la sesión existe, si no está, se crea
        if(session_status() === PHP_SESSION_NONE){
            session_start();
        }
    }


    //Abrir una sesión
    function set_session(String $nom1, $val1, String $nom2, $val2){
        $this->start_session();
        $_SESSION[$nom1]=$val1;
        $_SESSION[$nom2]=$val2;
    }


    //Devolver los datos de una sesión
    function get_session($nom){
        $this->start_session();

        // echo "<pre>";
        //     var_dump($_SESSION);
        // echo "</pre>";

        if (array_key_exists($nom, $_SESSION)) {
            return $_SESSION[$nom];
        } else {
            return null;
        }
        // return $_SESSION[$nom];
    }


    //Borrar una sesión
    function unset_session(){
        try {
            $this->start_session();
            session_unset();
            session_destroy();
            return true;
        } catch (Error $e) {
            return false;
        }
        
    }


    //Comprobar si la sesión existe
    function is_session(String $nom){
        $this->start_session();
        $isset=isset($_SESSION[$nom]);

        return $isset;
    }
}
?>