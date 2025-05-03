<?php
require_once("../../../../credProyecto.php");

class db {
    private $conn;

    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new mysqli(HOST_CONN, USU_CONN, PSW_CONN, DB_CONN);
            $this->conn->set_charset("utf8");

            if ($this->conn->connect_error) {
                throw new Exception("Error de conexión: " . $this->conn->connect_error);
            }

            mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        } catch (Exception $e) {
            echo "Error de conexión: " . $e->getMessage();
        }

        return $this->conn;
    }
}
?>