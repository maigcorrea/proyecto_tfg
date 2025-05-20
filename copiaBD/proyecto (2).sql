-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-05-2025 a las 03:07:42
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
  `descripcion` varchar(250) DEFAULT NULL,
  `nacimiento` date DEFAULT NULL,
  `passwrd` varchar(80) NOT NULL,
  `img` varchar(200) DEFAULT NULL,
  `tags` varchar(400) DEFAULT NULL,
  `tipo` varchar(5) NOT NULL DEFAULT 'usu'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`telefono`, `email`, `nombre`, `nickname`, `descripcion`, `nacimiento`, `passwrd`, `img`, `tags`, `tipo`) VALUES
(67849029, 'dvf@gmail.com', 'gbs', 'easf', NULL, '2015-12-10', '$2y$10$idkBJeGp8qUClnZh9KBjB.D9F.Xnx//glt71RNELeFCOjlqUZvWjK', '682bacde3ca0c_incendioselvaamazonicaardiendoamazonas_7009552744.avif', NULL, 'usu'),
(112376473, 'cds@gmail.com', 'scxsdc', 'hdew', NULL, '2015-12-03', '$2y$10$ib.TD3Nk88vAYQ6Umf8ySOrynQH7CU6kMzCR8psXdNygIDjunq6W.', '682b818e25c19_PokmonGo.jpg', 'Tratamientos,Apoyo emocional,Investigación', 'usu'),
(609474290, 'maite@gmail.com', 'Maite', 'mai_gc', NULL, '2004-12-21', '$2y$10$OAdrbzCRMVStBH.kbCeSde8A1QjajMWvkiSmEUt3xNaBWnpe6lUTq', '6814f99ad1da0_The Fini Company España - marca corporativa global de Fini - The Fini Company (19.02.2025 02_36).png', NULL, 'usu'),
(609474291, 'msaite@gmail.com', 'Maite', 'maiite_', NULL, '2015-12-03', '$2y$10$UzOP6.KdCRi690fn0HtdmuIp4Kk69Lx3ySB1BdnDvlyKww/OdBSRS', '67d4084ee597a_gato.jpg', NULL, 'usu'),
(609474299, 'algo@gmail.com', 'vzsrdg', 'algoo', NULL, '2015-12-02', '$2y$10$cOzQuiDZMF55adfbuBT3KOB4VhwO95jh0kKSYl.UiRnGwISTtJMHC', '67d9abbc782ae_large.jpg', NULL, 'usu'),
(609836284, 'prueba@gmail.com', 'prueba', 'pr_1', NULL, '2015-12-03', '$2y$10$kGoELAZ29Jt/FZpSj8XMGuO7RiwsmuhzDE/doGb3aviVcJqjuNnj.', NULL, NULL, 'usu'),
(625647281, 'fran@gmail.com', 'Fran', 'fran_wordpress', NULL, '2015-12-05', '$2y$10$4isNKcL.4d1MdGboJr2EHevtokZZDWzyFPNilTaLxwqC7M1Hw5Kwi', NULL, NULL, 'usu'),
(632123457, 'marta@gmail.com', 'marta', 'martita', NULL, '2015-12-02', '$2y$10$IJ69jbVU2eIQVBGa5K1lFeX0mkUlH4pB2IC/I7BKmNlLO3p85Zzaq', '682bcb067ebd0_lindoalienigenamontandoovniespaciodibujosanimadosvectoriconoilustracioncienciatecnologiaiconoaislado_1386768224.jpg', 'Apoyo emocional,Tratamientos', 'usu'),
(638376383, 'faer@gmail.com', 'vrv', 'esacdwdw', NULL, '2015-12-03', '$2y$10$MKx0ENJ5NHTibcTf9TvRF.DbUuwCB9a5srivuPgOJzDS83EXr8Pqq', '682bab41ac0a9_Capturadepantalla20250323001009.png', NULL, 'usu'),
(654789009, 'carmen@gmail.com', 'Carmen', 'carmeen', NULL, '2015-12-10', '$2y$10$tlP7RHupe1jbCEclpB1m..JbfEIZmumSnU0pJEVVmEO6ieC3uOJt6', '682b7d2bbdd9d_puma4.webp', NULL, 'usu'),
(654789012, 'lore@gmail.com', 'Lorenzo', 'loreenzo', NULL, '2015-12-04', '$2y$10$lrpDbf9/7vE2KQuAejB1judPSC6wJl9nIpa9vHvbrwYwfhf/x59Ku', '682baa45ad13e_MarioKart8Deluxe_2022_112122_004.png', NULL, 'usu'),
(654849340, 'wed@gmail.com', 'dewd', 'dwqf', NULL, '2015-12-09', '$2y$10$DOGLC12MCvWEJZefBFiPVu/gd/K0vP90//TSXLGkOrdh6KT1ev6DC', '682baca5cb30d_Productos19.02.202502_26.png', NULL, 'usu'),
(654987265, 'erica@gmail.com', 'Erica', 'Eri', NULL, '2015-01-14', 'erica123', NULL, NULL, 'usu'),
(657384931, 'wii@gmail.com', 'wii', 'wii', NULL, '2015-12-22', '$2y$10$V73PnPPUSUydM8jWCVZqaurQFJUnC59nu.mefaqnB3QjdpsYo2cqW', '68211d5b3586d_0706_anhkuromihinhnenmaytinhsieudethuong.jpg', NULL, 'usu'),
(657456322, 'prueba@gmail.com', 'prueba3', 'pr_3', NULL, '2015-12-02', '$2y$10$.smHD.IR0Rg8NMzyNjjBs.0Uncg9Hf8uFxrFmmM4bqsgHp9fTgQAu', '67d42028bef72_gato.jpg', NULL, 'usu'),
(673802937, 'kitty@gmail.com', 'Hello Kitty', 'kittyy', NULL, '2015-12-02', '$2y$10$4bky5IYxiG3EkNthJjIEkuHMfRL.RRnEj8J9Y8nBfiJ7/Q4S7BWtO', '6829ffd2eee76_IMG_20230114_203728.jpg', NULL, 'usu'),
(673920381, 'mery@gmail.com', 'Mery', 'meryy', NULL, '2015-12-02', '$2y$10$.M0CQ3aGE7adYEuO1peu8e/hodiD0Fv5pbsVZMhbnBqrI3KWXHD8a', '6828c36c19c6e_IMG_20230828_075534.jpg', NULL, 'usu'),
(674974922, 'crw@gmail.com', 'csc', 'frw', NULL, '2015-12-03', '$2y$10$di5ofF4eRDCsHHgKNNwy/.ek3.H486AjldWct7cMQOTd9HV8AuwrG', '682baeb3782ec_PokmonGo.jpg', NULL, 'usu'),
(675178391, 'redu@gmail.com', 'Redu', 'r_js', NULL, '1995-03-08', 'redu1234', NULL, NULL, 'usu'),
(682625270, 'kitty2@gmail.com', 'hello kitty2', 'kitty2', NULL, '2015-12-05', '$2y$10$.D.USY0nTJXVx0ihyNstVeV5xKLUD8dNwACug82miA0D/gGiMMpcu', '681630de8517d_cara-hello-kitty.png', NULL, 'usu'),
(683902847, 'claudia@gmail.com', 'Claudia', 'clauu', NULL, '2015-12-09', '$2y$10$IncXVicxCFPt9jBpm1uPLu6OgFrmQXza/GSsRR5UEpzAfG7RkG63m', '../../frontend/public/userAssets/clauu/6828af8066055_Digitalizacindebienvenida.jpg', NULL, 'usu'),
(837634252, 'prueba@gmail.com', 'prueba2', 'pr_2', NULL, '2015-12-02', '$2y$10$eTei2cGwdZ0UDsbP5uQvyuGPln2GG842VVNlQug4dgvK0vApEkCUa', '67d41827f2ed4_gato.jpg', NULL, 'usu'),
(2147483647, 'kuromii@gmail.com', 'Kuromi', 'kuromiii', NULL, '2015-12-10', '$2y$10$wtHtmks8oGuc47C6kWYvzue73E0Am2zcIx7P48K7EFLMnhX75J.eC', '6820c6e20c86f_0706_anhkuromihinhnenmaytinhsieudethuong.jpg', NULL, 'usu');

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
