-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-05-2025 a las 23:04:56
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyecto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `telefono` int(9) NOT NULL,
  `email` varchar(100) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `nickname` varchar(20) NOT NULL,
  `nacimiento` date DEFAULT NULL,
  `passwrd` varchar(80) NOT NULL,
  `img` varchar(200) DEFAULT NULL,
  `tipo` varchar(5) NOT NULL DEFAULT 'usu'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`telefono`, `email`, `nombre`, `nickname`, `nacimiento`, `passwrd`, `img`, `tipo`) VALUES
(609474290, 'maite@gmail.com', 'Maite', 'mai_gc', '2004-12-21', '$2y$10$OAdrbzCRMVStBH.kbCeSde8A1QjajMWvkiSmEUt3xNaBWnpe6lUTq', '6814f99ad1da0_The Fini Company España - marca corporativa global de Fini - The Fini Company (19.02.2025 02_36).png', 'usu'),
(609474291, 'msaite@gmail.com', 'Maite', 'maiite_', '2015-12-03', '$2y$10$UzOP6.KdCRi690fn0HtdmuIp4Kk69Lx3ySB1BdnDvlyKww/OdBSRS', '67d4084ee597a_gato.jpg', 'usu'),
(609474299, 'algo@gmail.com', 'vzsrdg', 'algoo', '2015-12-02', '$2y$10$cOzQuiDZMF55adfbuBT3KOB4VhwO95jh0kKSYl.UiRnGwISTtJMHC', '67d9abbc782ae_large.jpg', 'usu'),
(609836284, 'prueba@gmail.com', 'prueba', 'pr_1', '2015-12-03', '$2y$10$kGoELAZ29Jt/FZpSj8XMGuO7RiwsmuhzDE/doGb3aviVcJqjuNnj.', NULL, 'usu'),
(625647281, 'fran@gmail.com', 'Fran', 'fran_wordpress', '2015-12-05', '$2y$10$4isNKcL.4d1MdGboJr2EHevtokZZDWzyFPNilTaLxwqC7M1Hw5Kwi', NULL, 'usu'),
(654987265, 'erica@gmail.com', 'Erica', 'Eri', '2015-01-14', 'erica123', NULL, 'usu'),
(657384931, 'wii@gmail.com', 'wii', 'wii', '2015-12-22', '$2y$10$V73PnPPUSUydM8jWCVZqaurQFJUnC59nu.mefaqnB3QjdpsYo2cqW', '68211d5b3586d_0706_anhkuromihinhnenmaytinhsieudethuong.jpg', 'usu'),
(657456322, 'prueba@gmail.com', 'prueba3', 'pr_3', '2015-12-02', '$2y$10$.smHD.IR0Rg8NMzyNjjBs.0Uncg9Hf8uFxrFmmM4bqsgHp9fTgQAu', '67d42028bef72_gato.jpg', 'usu'),
(673802937, 'kitty@gmail.com', 'Hello Kitty', 'kittyy', '2015-12-02', '$2y$10$4bky5IYxiG3EkNthJjIEkuHMfRL.RRnEj8J9Y8nBfiJ7/Q4S7BWtO', '681629574b65d_cara-hello-kitty.png', 'usu'),
(675178391, 'redu@gmail.com', 'Redu', 'r_js', '1995-03-08', 'redu1234', NULL, 'usu'),
(682625270, 'kitty2@gmail.com', 'hello kitty2', 'kitty2', '2015-12-05', '$2y$10$.D.USY0nTJXVx0ihyNstVeV5xKLUD8dNwACug82miA0D/gGiMMpcu', '681630de8517d_cara-hello-kitty.png', 'usu'),
(837634252, 'prueba@gmail.com', 'prueba2', 'pr_2', '2015-12-02', '$2y$10$eTei2cGwdZ0UDsbP5uQvyuGPln2GG842VVNlQug4dgvK0vApEkCUa', '67d41827f2ed4_gato.jpg', 'usu'),
(2147483647, 'kuromii@gmail.com', 'Kuromi', 'kuromiii', '2015-12-10', '$2y$10$wtHtmks8oGuc47C6kWYvzue73E0Am2zcIx7P48K7EFLMnhX75J.eC', '6820c6e20c86f_0706_anhkuromihinhnenmaytinhsieudethuong.jpg', 'usu');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`telefono`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
