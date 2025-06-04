-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-06-2025 a las 14:01:18
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

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
-- Estructura de tabla para la tabla `comentario`
--

CREATE TABLE `comentario` (
  `id` bigint(11) NOT NULL,
  `contenido` varchar(350) NOT NULL,
  `usuario` bigint(11) UNSIGNED NOT NULL,
  `post` int(11) UNSIGNED NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `comentario`
--

INSERT INTO `comentario` (`id`, `contenido`, `usuario`, `post`, `fecha`) VALUES
(7, 'cvarg', 1, 21, '2025-05-26 11:35:52'),
(11, 'nada', 1, 21, '2025-05-26 11:42:49'),
(12, 'hola', 1, 21, '2025-05-26 11:48:16'),
(13, 'vsdfvd', 1, 21, '2025-05-26 11:50:34'),
(14, 'TFG', 1, 21, '2025-05-26 11:55:32'),
(15, 'cadecf', 1, 21, '2025-05-26 11:56:13'),
(16, 'cvsfvsfr', 1, 21, '2025-05-26 11:57:09'),
(17, 'nuevo comentario', 1, 21, '2025-05-26 11:59:25'),
(19, 'csdacfa', 1, 21, '2025-05-26 12:13:08'),
(21, 'fwegt', 1, 21, '2025-05-26 12:17:09'),
(22, 'aerf', 1, 21, '2025-05-26 12:17:11'),
(23, 'refwer', 1, 20, '2025-05-26 12:17:46'),
(24, 'ced', 1, 20, '2025-05-26 12:17:49'),
(25, 'hyhuhbe', 1, 21, '2025-05-26 12:55:16'),
(26, 'cfraf', 1, 21, '2025-05-26 16:12:08'),
(36, 'bobo', 44, 40, '2025-06-04 13:09:14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `usuario` bigint(11) UNSIGNED NOT NULL,
  `post` int(11) UNSIGNED NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `likes`
--

INSERT INTO `likes` (`id`, `usuario`, `post`, `fecha`) VALUES
(45, 1, 21, '2025-05-26 22:04:52'),
(46, 1, 20, '2025-05-26 22:04:53'),
(62, 1, 29, '2025-06-01 18:49:03'),
(63, 26, 29, '2025-06-01 22:01:34'),
(64, 1, 39, '2025-06-04 01:38:12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `post`
--

CREATE TABLE `post` (
  `id` int(11) UNSIGNED NOT NULL,
  `usuario` bigint(11) UNSIGNED NOT NULL,
  `contenido` varchar(500) NOT NULL,
  `fecha` datetime NOT NULL,
  `tags` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `post`
--

INSERT INTO `post` (`id`, `usuario`, `contenido`, `fecha`, `tags`) VALUES
(20, 2, 'heyyy', '2025-05-25 19:09:33', ''),
(21, 2, 'csr', '2025-05-25 19:10:02', ''),
(29, 1, 'holaaaa', '2025-06-01 18:49:01', ''),
(30, 1, 'p1', '2025-06-04 00:42:46', ''),
(31, 1, 'p2', '2025-06-04 00:42:54', ''),
(32, 1, 'p3', '2025-06-04 00:43:01', ''),
(33, 1, 'p4\r\n', '2025-06-04 00:43:07', ''),
(34, 1, 'p5', '2025-06-04 00:43:11', ''),
(35, 1, 'p6', '2025-06-04 00:43:20', ''),
(36, 1, 'p7', '2025-06-04 00:43:25', ''),
(37, 1, 'p8', '2025-06-04 00:43:31', ''),
(38, 1, 'p9', '2025-06-04 00:43:39', ''),
(39, 1, 'p10', '2025-06-04 00:43:47', ''),
(40, 44, 'me gustan las gambas con queso', '2025-06-04 13:09:08', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tag`
--

CREATE TABLE `tag` (
  `id` bigint(11) UNSIGNED NOT NULL,
  `nombre` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tag`
--

INSERT INTO `tag` (`id`, `nombre`) VALUES
(9, 'Apoyo emocional'),
(14, 'Asociación'),
(4, 'Autoinmunes'),
(3, 'Dermatología'),
(8, 'Diagnóstico'),
(19, 'Digestivo'),
(2, 'Genética'),
(10, 'Investigación'),
(18, 'Motoro'),
(1, 'Neurología'),
(13, 'Oncología'),
(17, 'Oseo'),
(5, 'Pediatría'),
(12, 'personalizada'),
(6, 'Raras'),
(7, 'Síntomas crónicos'),
(11, 'Tratamientos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tag_usuario`
--

CREATE TABLE `tag_usuario` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_tag` bigint(11) UNSIGNED NOT NULL,
  `id_usu` bigint(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tag_usuario`
--

INSERT INTO `tag_usuario` (`id`, `id_tag`, `id_usu`) VALUES
(108, 1, 1),
(109, 3, 1),
(110, 11, 18),
(111, 11, 12),
(112, 6, 12),
(113, 2, 12),
(114, 1, 12),
(115, 3, 12),
(116, 10, 12),
(117, 1, 24),
(118, 3, 24),
(119, 2, 24),
(120, 10, 24),
(121, 11, 24),
(122, 17, 38),
(123, 18, 38),
(124, 19, 38),
(125, 2, 39),
(126, 8, 39),
(127, 3, 40),
(128, 8, 40);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` bigint(11) UNSIGNED NOT NULL,
  `telefono` int(9) NOT NULL,
  `email` varchar(100) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `nickname` varchar(20) NOT NULL,
  `descripcion` varchar(850) DEFAULT NULL,
  `nacimiento` date DEFAULT NULL,
  `passwrd` varchar(80) NOT NULL,
  `img` varchar(200) DEFAULT NULL,
  `tipo` varchar(5) NOT NULL DEFAULT 'usu',
  `permiso` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `telefono`, `email`, `nombre`, `nickname`, `descripcion`, `nacimiento`, `passwrd`, `img`, `tipo`, `permiso`) VALUES
(1, 609474291, 'maite@gmail.com', 'Maite García Correa', 'maiite', 'lorem ipsum JAJAJAJAJA', '2015-12-09', '$2y$10$/3pdB6n1U63uR.HC9WqVa.eVcSUnzF0NmGA6KfuidO0NpdLDmjs6e', '683cf15d1c820_brie3.png', 'usu', 1),
(2, 678935262, 'erica@gmail.com', 'Erica Palomino', 'Eriiiica', 'Hola Mundo, me gusta PHP', '2015-12-02', '$2y$10$/3pdB6n1U63uR.HC9WqVa.eVcSUnzF0NmGA6KfuidO0NpdLDmjs6e', '683a272e3d912_ovninaveespacialextraterrestredibujosanimadosnavecosmicaformaplatillo_18473379.avif', 'usu', 0),
(3, 678987654, 'prueb1a@gmail.com', 'prueba', 'prueba202020202', '', '2015-12-17', '$2y$10$Wi7yMmeKJ0AQjCAqDMAksO/8fxZHCcmghUri6m8iSyW/uIKZNJfMy', '683a24d5badfc_MarioKart8Deluxe_2022_112122_004.png', 'usu', 0),
(9, 654321122, 'admin@gmail.com', 'admin', 'admin', 'A mi me vacilan', '2015-12-03', '$2y$10$M/pOPA2s72xAxruHWaCce.44kVTGzdc5kQEPW9PdgRmr6Luv1pgEm', '6839845e9ae1a_managermessagingiconcartoonstylevector.jpg', 'admin', 0),
(10, 666555522, 'u1@gmail.com', 'u1', 'u1', 'fearsgfreg', '2015-12-01', '$2y$10$KP38T4zcqJWjlMAgr5SUoeV0InfX5vylA5IzpyzwHwMia8Kv8RC4O', '683a5702bbd34_persona.jpg', 'usu', 0),
(11, 611111111, 'u2@gmail.com', 'u2', 'u2', '', '2015-12-02', '$2y$10$XKWHtJftwJhsSbKzAuZXw.4WUMoX//e6ChzqeiXdqEGi0kl/X2HmW', 'null', 'usu', 0),
(12, 622222222, 'u3@gmail.com', 'u3', 'u3', NULL, '2015-12-02', '$2y$10$q/WgoP6FiWbSQJt.DWw3/.FlU/3haU2YD7EYLQEPYIGQUL4s7DY6a', NULL, 'usu', 1),
(13, 633333333, 'u4@gmail.com', 'u4', 'u4', NULL, '2015-12-03', '$2y$10$I87cFb3Wg.RLjPsH2/QSluuYMpoxgtQ/6oYwwRG4ppyhpGQ6xhvO6', NULL, 'usu', 0),
(15, 655555555, 'u6@gmail.com', 'u6', 'u6', NULL, '2000-12-09', '$2y$10$FdBTkpM.ThY9NVKaf7dzNONLgOFCvWjqRpKQ6ByWBc8bvj03qPBla', NULL, 'usu', 0),
(18, 677656553, 'vvvd@gmail.com', 'vfdv', 'sdfwes', NULL, '1998-02-03', '$2y$10$L8b1GCsVRK1LHz/hhzbpMuiq2kXArIirp2G6I.mD.afivpvHBZf7G', '683a661f81ed9_carahellokitty.png', 'usu', 0),
(19, 677656552, 'evie@gmail.com', 'evie', 'eviee', NULL, '1998-02-03', '$2y$10$zJ1KcWWFXZYFdEnJAKJZwex9YPscjlB97q2FFFRoW4FJCaHLWyI02', '683a668f09c14_incendioselvaamazonicaardiendoamazonas_7009552744.avif', 'usu', 0),
(21, 653423121, 'fref@gmail.com', 'fregef', 'dew', NULL, '1982-03-05', '$2y$10$ClQ1xy5b0e8hpymp5DOGTeW.jS5kw8xUPE0V7i/k0mfHDnMHfk2.K', '683a6f3533f11_image.png', 'usu', 0),
(22, 676545633, 'dewdde@gmail.com', 'dewd', 'dedede', NULL, '2004-02-05', '$2y$10$qXbWu6YSU12Rb417n3G6QOEMXAQQOTZ6yU21zBTpZEnV0FrY85X4m', '683a6ffa84181_1975.36_pinturatresmanchasno196.jpg', 'admin', 0),
(23, 677797058, 'deijdeui@gmail.com', 'wiwiwiwiw', 'dewfrwwwwww', 'dewfdew', '2002-02-14', '$2y$10$cSLwhmJ4nNMgdWCj9b/15.SL268/QAZcASFeYxoMWpjz3VhI/AB4K', '683a707fe0eb8_mod.jpg', 'admin', 0),
(24, 66909873, 'usu10@gmail.com', 'usu10', 'usu10', NULL, '2015-12-03', '$2y$10$ktywvztozQVb9PuVM32bQ.JTxkxiWnlitGU/H5AEUnChAlYajBkQe', '683a71305bb2a_TheFiniCompanyEspaamarcacorporativaglobaldeFiniTheFiniCompany19.02.202502_36.png', 'usu', 1),
(25, 690987893, 'gegrg@gmail.com', 'ProbarTags', 'gegrg', NULL, '2015-12-01', '$2y$10$UUTYP8AH.fuM34kwxe.4p.DqIjN3/VCf7dm.QB3338f4E/ftWchx.', '683c94be62d2a_hero_2.jpg', 'usu', 0),
(26, 674839373, 'grtgre@gmail.com', 'hrthgrt', 'kfmr', NULL, '2015-12-09', '$2y$10$64GjB6q4bApqM3yL7COBo.RFQgJPqsc/y5cYkqCbc9WxrGUPKbWCO', '683c97cd4ec52_img_6.jpg', 'usu', 0),
(27, 675654543, 'gtrgrt@gmail.com', ' xcgbnfh', 'h6y5hy', NULL, '2015-12-08', '$2y$10$XbTAF6aexsLiwIHx0azLD.iSasTXpXF2toZMJy5QbG24IhEIT90Me', '683cb64995618_img_4.jpg', 'usu', 0),
(28, 654567625, 'aaawa@gmail.com', 'aaaaa', 'awa', NULL, '2015-12-01', '$2y$10$J6xRLJne7rTt3WgJZ6ZtJOMqzLzaW.128fE8KHwdrk0u54u18PITy', NULL, 'usu', 0),
(29, 654332123, 'aadew@gmail.com', 'holaaa', 'h1', NULL, '2015-12-09', '$2y$10$HcwG2kY0/HREP5uf0w3J.uoobe6bJmAPW/5aq3VrGiamHPBg4K7LO', '683cbeec03dc3_img_1.jpg', 'usu', 0),
(30, 666544436, 'fergccaec@gmail.com', 'vfdsvs', 'edwed', NULL, '2015-12-08', '$2y$10$Z8HRioD4DyoJqqrDkbvNaOdGCPA9YYHQEQ/YMJWzjqLzSiEt.omUK', '683e1be9b3de8_managermessagingiconcartoonstylevector.jpg', 'usu', 0),
(31, 662323332, 'sii@gmail.com', 'Sipermisoo', 'si', NULL, '2015-12-03', '$2y$10$S3Fgej.o1f8IeWpZuz6M0.S6UvQJtHDQzzVbXY8qjDlUcBLplj8yO', '683e200f891e8_descarga.jpeg', 'usu', 1),
(32, 677654433, 'noo@gmail.com', 'noPermiso', 'noo', NULL, '2015-12-02', '$2y$10$TrFg9nTkB08K/QmKToNRd.XEDxS9O5O2UY4RJ6VtsSwNhRuK3VqlK', NULL, 'usu', 0),
(33, 644644744, 'jijijii@gmail.com', 'aaaaaaaaaaana', 'jijiji', NULL, '2015-12-03', '$2y$10$rOMTgd5T7x/WOILFUN3MSukJq1yC57PLsqQW3MPgcF9FwMosEQc/.', NULL, 'usu', 0),
(34, 611212221, 'jo@gmail.com', 'jojojo', 'jojojo', NULL, '2008-03-01', '$2y$10$i5qG7xFHkCcy7b.MSEKZF.C3f39PMKV5.qMd.OVxPSfonynP9GG7i', NULL, 'usu', 0),
(35, 2147483647, 'pablo@gmail.com', 'wd3d', 'sii', NULL, '2015-12-10', '$2y$10$YoLceNUh/mFL1UAlCjZYQ.LGAPGIm6JAu5l31CKeuWRJ3D4vRHwE2', NULL, 'usu', 0),
(38, 611212224, 'desire@gmail.com', 'Desi', 'desi', NULL, '2015-12-03', '$2y$10$cQai3vkoi2CaLcALJjJN0OckqYUUWDba64J9MyqwmOUcG0cn97ATC', NULL, 'usu', 0),
(39, 643221129, 'nasaro@gmail.com', 'nasaro', 'nasa', NULL, '2015-12-01', '$2y$10$B4lgzlm/o7J4Z5PDdChg6ulTPrm5l9v6.KlHgPODfgX1FFfFvHTKS', NULL, 'usu', 0),
(40, 609474290, 'pacho@gmail.com', 'Pacho', 'pacho', 'Encantado, tengo 20 años y soy de Granada', '2015-12-02', '$2y$10$JrMx6F9irmeCyqzcqpJJ1OlOvEsv/8Go75AGxp.mkQcy6NMmSUFrW', NULL, 'usu', 0),
(42, 665363784, 'carcf@gmail.com', 'dxewd', 'trhr', NULL, '2015-12-02', '$2y$10$nNxol/gDuNlxSZEmCt7BOOfTaOJMTISgVKBqm4OaGrp/z38UJ.wNW', NULL, 'usu', 0),
(43, 654, 'merda@gmail.com', 'merda', 'merda', NULL, '2015-12-02', '$2y$10$aumk9NXjKfRmmdkhLttRkugEmRH9l8oZcO2PQgIz/.xYFxCkwYAJq', NULL, 'usu', 0),
(44, 111111111, '1', '1', 'Abion', NULL, '2007-12-25', '$2y$10$X7ovd0Mv.DtOW7VWp7CsTOTyPh9M2oF1thRi6zukxAgc1LOf0mkfq', NULL, 'usu', 0),
(45, 654432217, '2@hotmail.com', 'Rafa', 'rafa', NULL, '2007-12-05', '$2y$10$IQhdvGYHg63RAvOqCAS1xOsnuubeivbCXUHHB7v5tjCEvsq7HIu9W', NULL, 'usu', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comentario`
--
ALTER TABLE `comentario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_comentario_usuario` (`usuario`),
  ADD KEY `fk_comentario_post` (`post`);

--
-- Indices de la tabla `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_likes_usuario` (`usuario`),
  ADD KEY `fk_likes_post` (`post`);

--
-- Indices de la tabla `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_post_usuarios` (`usuario`);

--
-- Indices de la tabla `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `tag_usuario`
--
ALTER TABLE `tag_usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tagUsu_usuario` (`id_usu`),
  ADD KEY `fk_tagUsu_tag` (`id_tag`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `telefono` (`telefono`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comentario`
--
ALTER TABLE `comentario`
  MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT de la tabla `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `tag`
--
ALTER TABLE `tag`
  MODIFY `id` bigint(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `tag_usuario`
--
ALTER TABLE `tag_usuario`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=129;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` bigint(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comentario`
--
ALTER TABLE `comentario`
  ADD CONSTRAINT `fk_comentario_post` FOREIGN KEY (`post`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_comentario_usuario` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `fk_likes_post` FOREIGN KEY (`post`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_likes_usuario` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `fk_post_usuarios` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tag_usuario`
--
ALTER TABLE `tag_usuario`
  ADD CONSTRAINT `fk_tagUsu_tag` FOREIGN KEY (`id_tag`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_tagUsu_usuario` FOREIGN KEY (`id_usu`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
