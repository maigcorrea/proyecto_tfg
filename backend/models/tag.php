<?php
require_once "../config/connection.php";

    class Tag{
        private $conn;


        public function __construct() {
            $this->conn = new db();
        }

        public function getAllTags($limit, $offset) {
            $conn = $this->conn->getConnection();
            $query = "SELECT id, nombre FROM tag ORDER BY id DESC LIMIT ? OFFSET ?";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("ii", $limit, $offset);
            $stmt->execute();
            $result = $stmt->get_result();
            $tags = array();
            while ($row = $result->fetch_assoc()) {
                $tags[] = $row;
            }
            $stmt->close();
            

            // Obtener total de usuarios (para paginación)
            $totalQuery = "SELECT COUNT(*) as total FROM tag";
            $stmtTotal = $this->conn->getConnection()->prepare($totalQuery);
            $stmtTotal->execute();

            $totalResult = $stmtTotal->get_result();
            $totalRow = $totalResult->fetch_assoc();
            $total = $totalRow['total'];

            return [
                'tags' => $tags,
                'total' => $total
            ];
        }

        public function deleteTag($id) {
            $conn = $this->conn->getConnection();
            $query = "DELETE FROM tag WHERE id = ?";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("i", $id);

            $stmt->execute();

            $deleted = false; 
            if($stmt->affected_rows > 0) {
                $deleted = true;
            }

            $stmt->close();

            return $deleted;
        }
    }
?>