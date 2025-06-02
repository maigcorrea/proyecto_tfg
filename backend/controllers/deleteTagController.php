<?php
    include_once '../config/connection.php';
    include_once '../models/cookies_sesiones.php';
    include_once '../models/tag.php';

    function deleteTag(){

        $id = $_GET['tagId'];
        $tag = new Tag();
        $deleted = $tag->deleteTag($id);

        if($deleted){
            echo json_encode(['success' => true, 'message' => 'Tag eliminado correctamente.']);
        }else{
            echo json_encode(['success' => false, 'message' => 'Error al eliminar el tag.']);
        }
    }
?>