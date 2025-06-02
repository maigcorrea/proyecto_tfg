-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-06-2025 a las 02:07:20
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
(18, 'getg', 1, 21, '2025-05-26 12:09:03'),
(19, 'csdacfa', 1, 21, '2025-05-26 12:13:08'),
(20, 'dWF', 1, 21, '2025-05-26 12:14:12'),
(21, 'fwegt', 1, 21, '2025-05-26 12:17:09'),
(22, 'aerf', 1, 21, '2025-05-26 12:17:11'),
(23, 'refwer', 1, 20, '2025-05-26 12:17:46'),
(24, 'ced', 1, 20, '2025-05-26 12:17:49'),
(25, 'hyhuhbe', 1, 21, '2025-05-26 12:55:16'),
(26, 'cfraf', 1, 21, '2025-05-26 16:12:08'),
(34, 'vdgst', 1, 21, '2025-06-01 18:43:02'),
(35, 'holi', 1, 29, '2025-06-01 18:49:09');

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
(61, 1, 27, '2025-06-01 18:42:55'),
(62, 1, 29, '2025-06-01 18:49:03'),
(63, 26, 29, '2025-06-01 22:01:34');

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
(27, 1, 'SGFBSR', '2025-06-01 18:39:11', ''),
(28, 1, 'wiiii', '2025-06-01 18:47:23', ''),
(29, 1, 'holaaaa', '2025-06-01 18:49:01', '');

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
(4, 'Autoinmunes'),
(3, 'Dermatología'),
(8, 'Diagnóstico'),
(2, 'Genética'),
(10, 'Investigación'),
(1, 'Neurología'),
(13, 'Oncología'),
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
(1, 1, 25),
(2, 2, 25),
(3, 8, 25),
(4, 12, 25),
(5, 5, 26),
(6, 13, 26),
(7, 2, 26),
(8, 10, 27),
(9, 13, 27),
(10, 1, 27),
(11, 13, 28),
(12, 10, 28),
(13, 1, 28),
(14, 1, 29),
(15, 13, 29),
(16, 5, 29),
(17, 6, 29);

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
  `tags` varchar(400) DEFAULT NULL,
  `tipo` varchar(5) NOT NULL DEFAULT 'usu'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `telefono`, `email`, `nombre`, `nickname`, `descripcion`, `nacimiento`, `passwrd`, `img`, `tags`, `tipo`) VALUES
(1, 609474291, 'maite@gmail.com', 'Maite García Correa', 'maii', 'lorem ipsum JAJAJAJAJA', '2015-12-09', '$2y$10$QLAC6M6SWzZhfx2kpXLGBOoyVbmhcnSaDhOB3aYYnAki33PEtYa.i', '683a247862c33_PokmonGo.jpg', 'Genética,Síntomas crónicos,Diagnóstico,Tratamientos,Investigación', 'usu'),
(2, 678935262, 'erica@gmail.com', 'Erica Palomino', 'Eriiiica', 'Hola Mundo, me gusta PHP', '2015-12-02', '$2y$10$/3pdB6n1U63uR.HC9WqVa.eVcSUnzF0NmGA6KfuidO0NpdLDmjs6e', '683a272e3d912_ovninaveespacialextraterrestredibujosanimadosnavecosmicaformaplatillo_18473379.avif', 'Diagnóstico,Apoyo emocional,Investigación,Genética', 'usu'),
(3, 678987654, 'prueb1a@gmail.com', 'prueba', 'prueba202020202', '', '2015-12-17', '$2y$10$Wi7yMmeKJ0AQjCAqDMAksO/8fxZHCcmghUri6m8iSyW/uIKZNJfMy', '683a24d5badfc_MarioKart8Deluxe_2022_112122_004.png', 'Neurología,Genética', 'usu'),
(9, 654321122, 'admin@gmail.com', 'admin', 'admin', NULL, '2015-12-03', '$2y$10$M/pOPA2s72xAxruHWaCce.44kVTGzdc5kQEPW9PdgRmr6Luv1pgEm', '6839845e9ae1a_managermessagingiconcartoonstylevector.jpg', NULL, 'admin'),
(10, 666555522, 'u1@gmail.com', 'u1', 'u1', 'fearsgfreg', '2015-12-01', '$2y$10$KP38T4zcqJWjlMAgr5SUoeV0InfX5vylA5IzpyzwHwMia8Kv8RC4O', '683a5702bbd34_persona.jpg', 'Neurología,Genética', 'usu'),
(11, 611111111, 'u2@gmail.com', 'u2', 'u2', '', '2015-12-02', '$2y$10$XKWHtJftwJhsSbKzAuZXw.4WUMoX//e6ChzqeiXdqEGi0kl/X2HmW', 'null', NULL, 'usu'),
(12, 622222222, 'u3@gmail.com', 'u3', 'u3', NULL, '2015-12-02', '$2y$10$q/WgoP6FiWbSQJt.DWw3/.FlU/3haU2YD7EYLQEPYIGQUL4s7DY6a', NULL, NULL, 'usu'),
(13, 633333333, 'u4@gmail.com', 'u4', 'u4', NULL, '2015-12-03', '$2y$10$I87cFb3Wg.RLjPsH2/QSluuYMpoxgtQ/6oYwwRG4ppyhpGQ6xhvO6', NULL, NULL, 'usu'),
(15, 655555555, 'u6@gmail.com', 'u6', 'u6', NULL, '2000-12-09', '$2y$10$FdBTkpM.ThY9NVKaf7dzNONLgOFCvWjqRpKQ6ByWBc8bvj03qPBla', NULL, NULL, 'usu'),
(18, 677656553, 'vvvd@gmail.com', 'vfdv', 'sdfwes', NULL, '1998-02-03', '$2y$10$L8b1GCsVRK1LHz/hhzbpMuiq2kXArIirp2G6I.mD.afivpvHBZf7G', '683a661f81ed9_carahellokitty.png', NULL, 'usu'),
(19, 677656552, 'evie@gmail.com', 'evie', 'eviee', NULL, '1998-02-03', '$2y$10$zJ1KcWWFXZYFdEnJAKJZwex9YPscjlB97q2FFFRoW4FJCaHLWyI02', '683a668f09c14_incendioselvaamazonicaardiendoamazonas_7009552744.avif', NULL, 'usu'),
(21, 653423121, 'fref@gmail.com', 'fregef', 'dew', NULL, '1982-03-05', '$2y$10$ClQ1xy5b0e8hpymp5DOGTeW.jS5kw8xUPE0V7i/k0mfHDnMHfk2.K', '683a6f3533f11_image.png', NULL, 'usu'),
(22, 676545633, 'dewdde@gmail.com', 'dewd', 'dedede', NULL, '2004-02-05', '$2y$10$qXbWu6YSU12Rb417n3G6QOEMXAQQOTZ6yU21zBTpZEnV0FrY85X4m', '683a6ffa84181_1975.36_pinturatresmanchasno196.jpg', NULL, 'admin'),
(23, 677797058, 'deijdeui@gmail.com', 'wiwiwiwiw', 'dewfrwwwwww', 'dewfdew', '2002-02-14', '$2y$10$cSLwhmJ4nNMgdWCj9b/15.SL268/QAZcASFeYxoMWpjz3VhI/AB4K', '683a707fe0eb8_mod.jpg', NULL, 'admin'),
(24, 66909873, 'usu10@gmail.com', 'usu10', 'usu10', NULL, '2015-12-03', '$2y$10$ktywvztozQVb9PuVM32bQ.JTxkxiWnlitGU/H5AEUnChAlYajBkQe', '683a71305bb2a_TheFiniCompanyEspaamarcacorporativaglobaldeFiniTheFiniCompany19.02.202502_36.png', 'Dermatología,Diagnóstico', 'usu'),
(25, 690987893, 'gegrg@gmail.com', 'ProbarTags', 'gegrg', NULL, '2015-12-01', '$2y$10$UUTYP8AH.fuM34kwxe.4p.DqIjN3/VCf7dm.QB3338f4E/ftWchx.', '683c94be62d2a_hero_2.jpg', NULL, 'usu'),
(26, 674839373, 'grtgre@gmail.com', 'hrthgrt', 'kfmr', NULL, '2015-12-09', '$2y$10$64GjB6q4bApqM3yL7COBo.RFQgJPqsc/y5cYkqCbc9WxrGUPKbWCO', '683c97cd4ec52_img_6.jpg', NULL, 'usu'),
(27, 675654543, 'gtrgrt@gmail.com', ' xcgbnfh', 'h6y5hy', NULL, '2015-12-08', '$2y$10$XbTAF6aexsLiwIHx0azLD.iSasTXpXF2toZMJy5QbG24IhEIT90Me', '683cb64995618_img_4.jpg', NULL, 'usu'),
(28, 654567625, 'aaawa@gmail.com', 'aaaaa', 'awa', NULL, '2015-12-01', '$2y$10$J6xRLJne7rTt3WgJZ6ZtJOMqzLzaW.128fE8KHwdrk0u54u18PITy', NULL, NULL, 'usu'),
(29, 654332123, 'aadew@gmail.com', 'holaaa', 'h1', NULL, '2015-12-09', '$2y$10$HcwG2kY0/HREP5uf0w3J.uoobe6bJmAPW/5aq3VrGiamHPBg4K7LO', '683cbeec03dc3_img_1.jpg', NULL, 'usu');

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
  MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT de la tabla `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `tag`
--
ALTER TABLE `tag`
  MODIFY `id` bigint(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `tag_usuario`
--
ALTER TABLE `tag_usuario`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` bigint(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

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
