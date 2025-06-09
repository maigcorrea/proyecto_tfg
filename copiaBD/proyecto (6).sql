-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-06-2025 a las 07:34:04
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
(42, 'fwbifwbf', 1, 39, '2025-06-06 22:42:16'),
(48, 'nada', 1, 39, '2025-06-06 22:42:21'),
(50, 'jajaja', 1, 39, '2025-06-06 22:42:24'),
(54, 'vfdv', 1, 39, '2025-06-07 16:51:49'),
(55, 'vdtght', 1, 39, '2025-06-08 18:34:09'),
(56, '6i868i', 1, 39, '2025-06-08 18:34:11'),
(57, 'pppp', 1, 39, '2025-06-08 18:34:12'),
(58, 'grygrhy', 1, 39, '2025-06-08 18:34:15'),
(59, 'gg', 1, 39, '2025-06-08 18:34:17'),
(60, 'jajaj', 1, 39, '2025-06-08 18:34:21'),
(61, 'holllslldfdfmkefmrofrfoinfoifmoffmofmffweeholllslldfdfmkefmrofrfoinfoifmoffmofmffweeholllslldfdfmkefmrofrfoinfoifmoffmofmffweeholllslldfdfmkefmrofrfoinfoifmoffmofmffweeholllslldfdfmkefmrofrfoinfoifmoffmofmffweeholllslldfdfmkefmrofrfoinfoifmoffmofmffweeholllslldfdfmkefmrofrfoinfoifmoffmofmffweeholllslldfdfmkefmrofrfoinfoifmoffmofmffweeholllslldfdfmk', 1, 39, '2025-06-08 18:48:46'),
(62, 'hbuyboyu', 1, 41, '2025-06-08 18:50:41'),
(63, 'ewfre', 1, 41, '2025-06-08 18:50:45'),
(64, '#6c837f#6c837f#6c837f#6c837f#6c837f#6c837f#6c837f#', 1, 42, '2025-06-08 19:06:18'),
(65, '#6c837f#6c837f#6c837f#6c837f#6c837f#6c837f#6c837f#6c837f#6c837f#6c837f#6c837f#6c', 1, 42, '2025-06-08 19:06:49');

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
(96, 1, 41, '2025-06-08 18:26:44'),
(101, 1, 39, '2025-06-08 18:37:09'),
(105, 1, 42, '2025-06-08 18:53:19');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `post`
--

CREATE TABLE `post` (
  `id` int(11) UNSIGNED NOT NULL,
  `usuario` bigint(11) UNSIGNED NOT NULL,
  `contenido` varchar(500) NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `post`
--

INSERT INTO `post` (`id`, `usuario`, `contenido`, `fecha`) VALUES
(39, 1, 'p10', '2025-06-04 00:43:47'),
(41, 1, 'sfvreg', '2025-06-07 16:51:44'),
(42, 1, 'holllslldfdfmkefmrofrfoinfoifmoffmofmffweeholllslldfdfmkefmrofrfoinfoifmoffmofmffweeholllslldfdfmkefmrofrfoinfoifmoffmofmffweeholllslldfdfmkefmrofrfoinfoifmoffmofmffweeholllslldfdfmkefmrofrfoinfoifmoffmofmffweeholllslldfdfmkefmrofrfoinfoifmoffmofmffweeholllslldfdfmkefmrofrfoinfoifmoffmofmffweeholllslldfdfmkefmrofrfoinfoifmoffmofmffweeholllslldfdfmkefmrofrfoinfoifmoffmofmffweeholllslldfdfmkefmrofrfoinfoifmoffmofmffweeholllslldfdfmkefmrofrfoinfoifmoffmofmffweeholllslldfdfmkefmrofrfoinfoifmoffmofmf', '2025-06-08 18:48:34');

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
(20, 'efwef'),
(2, 'Genética'),
(10, 'Investigación'),
(1, 'Neurología'),
(13, 'Oncología'),
(17, 'Oseo'),
(5, 'Pediatría'),
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
(110, 11, 18),
(122, 17, 38),
(124, 19, 38),
(127, 3, 40),
(128, 8, 40),
(132, 2, 39),
(133, 8, 39),
(134, 1, 39),
(135, 3, 39),
(136, 4, 39),
(137, 5, 39),
(138, 10, 39),
(139, 13, 39),
(140, 11, 39),
(141, 6, 39),
(144, 3, 49),
(145, 4, 49),
(146, 20, 49),
(147, 10, 49),
(153, 1, 1),
(154, 3, 1),
(155, 4, 1),
(156, 10, 1),
(157, 6, 1),
(158, 2, 1),
(159, 8, 1);

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
(1, 609474291, 'maiite@gmail.com', 'Maite Correa', 'maiite', 'nncncnreegfeg', '2015-12-09', '$2y$10$/3pdB6n1U63uR.HC9WqVa.eVcSUnzF0NmGA6KfuidO0NpdLDmjs6e', '684664eb7e5e3_iconometeoritocayendoisometricoiconovectormeteoritocayendodisenowebaisladosobrefondoblanco_9631846601.avif', 'usu', 1),
(2, 678935262, 'erica@gmail.com', 'Erica Palomino', 'Eriiiica', 'Hola Mundo, me gusta PHP', '2015-12-02', '$2y$10$/3pdB6n1U63uR.HC9WqVa.eVcSUnzF0NmGA6KfuidO0NpdLDmjs6e', '683a272e3d912_ovninaveespacialextraterrestredibujosanimadosnavecosmicaformaplatillo_18473379.avif', 'usu', 0),
(3, 678987654, 'prueb1a@gmail.com', 'prueba', 'prueba202020202', '', '2015-12-17', '$2y$10$Wi7yMmeKJ0AQjCAqDMAksO/8fxZHCcmghUri6m8iSyW/uIKZNJfMy', '683a24d5badfc_MarioKart8Deluxe_2022_112122_004.png', 'usu', 0),
(9, 654321122, 'admin@gmail.com', 'admin', 'admin', 'A mi me vacilan', '2015-12-03', '$2y$10$M/pOPA2s72xAxruHWaCce.44kVTGzdc5kQEPW9PdgRmr6Luv1pgEm', '6839845e9ae1a_managermessagingiconcartoonstylevector.jpg', 'admin', 0),
(10, 666555522, 'u1@gmail.com', 'u1', 'u1', 'fearsgfreg', '2015-12-01', '$2y$10$KP38T4zcqJWjlMAgr5SUoeV0InfX5vylA5IzpyzwHwMia8Kv8RC4O', '683a5702bbd34_persona.jpg', 'usu', 0),
(18, 677656553, 'vvvd@gmail.com', 'vfdv', 'sdfwes', NULL, '1998-02-03', '$2y$10$L8b1GCsVRK1LHz/hhzbpMuiq2kXArIirp2G6I.mD.afivpvHBZf7G', '683a661f81ed9_carahellokitty.png', 'usu', 0),
(19, 677656552, 'evie@gmail.com', 'evie', 'eviee', NULL, '1998-02-03', '$2y$10$zJ1KcWWFXZYFdEnJAKJZwex9YPscjlB97q2FFFRoW4FJCaHLWyI02', '683a668f09c14_incendioselvaamazonicaardiendoamazonas_7009552744.avif', 'usu', 0),
(21, 653423121, 'fref@gmail.com', 'fregef', 'dew', NULL, '1982-03-05', '$2y$10$ClQ1xy5b0e8hpymp5DOGTeW.jS5kw8xUPE0V7i/k0mfHDnMHfk2.K', '683a6f3533f11_image.png', 'usu', 0),
(22, 676545633, 'dewdde@gmail.com', 'dewd', 'dedede', NULL, '2004-02-05', '$2y$10$qXbWu6YSU12Rb417n3G6QOEMXAQQOTZ6yU21zBTpZEnV0FrY85X4m', '683a6ffa84181_1975.36_pinturatresmanchasno196.jpg', 'admin', 0),
(25, 690987893, 'gegrg@gmail.com', 'ProbarTags', 'gegrg', NULL, '2015-12-01', '$2y$10$UUTYP8AH.fuM34kwxe.4p.DqIjN3/VCf7dm.QB3338f4E/ftWchx.', '683c94be62d2a_hero_2.jpg', 'usu', 0),
(26, 674839373, 'grtgre@gmail.com', 'hrthgrt', 'kfmr', NULL, '2015-12-09', '$2y$10$64GjB6q4bApqM3yL7COBo.RFQgJPqsc/y5cYkqCbc9WxrGUPKbWCO', '683c97cd4ec52_img_6.jpg', 'usu', 0),
(27, 675654543, 'gtrgrt@gmail.com', ' xcgbnfh', 'h6y5hy', NULL, '2015-12-08', '$2y$10$XbTAF6aexsLiwIHx0azLD.iSasTXpXF2toZMJy5QbG24IhEIT90Me', '683cb64995618_img_4.jpg', 'usu', 0),
(28, 654567625, 'aaawa@gmail.com', 'aaaaa', 'awa', NULL, '2015-12-01', '$2y$10$J6xRLJne7rTt3WgJZ6ZtJOMqzLzaW.128fE8KHwdrk0u54u18PITy', NULL, 'usu', 0),
(29, 654332123, 'aadew@gmail.com', 'holaaa', 'h1', NULL, '2015-12-09', '$2y$10$HcwG2kY0/HREP5uf0w3J.uoobe6bJmAPW/5aq3VrGiamHPBg4K7LO', '683cbeec03dc3_img_1.jpg', 'usu', 0),
(30, 666544436, 'fergccaec@gmail.com', 'vfdsvs', 'edwed', NULL, '2015-12-08', '$2y$10$Z8HRioD4DyoJqqrDkbvNaOdGCPA9YYHQEQ/YMJWzjqLzSiEt.omUK', '683e1be9b3de8_managermessagingiconcartoonstylevector.jpg', 'usu', 0),
(31, 662323332, 'sii@gmail.com', 'Sipermisoo', 'si', NULL, '2015-12-03', '$2y$10$S3Fgej.o1f8IeWpZuz6M0.S6UvQJtHDQzzVbXY8qjDlUcBLplj8yO', '683e200f891e8_descarga.jpeg', 'usu', 1),
(32, 677654433, 'noo@gmail.com', 'noPermiso', 'noo', NULL, '2015-12-02', '$2y$10$TrFg9nTkB08K/QmKToNRd.XEDxS9O5O2UY4RJ6VtsSwNhRuK3VqlK', NULL, 'usu', 0),
(34, 611212221, 'jo@gmail.com', 'jojojo', 'jojojo', NULL, '2008-03-01', '$2y$10$i5qG7xFHkCcy7b.MSEKZF.C3f39PMKV5.qMd.OVxPSfonynP9GG7i', NULL, 'usu', 0),
(35, 2147483647, 'pablo@gmail.com', 'wd3d', 'sii', NULL, '2015-12-10', '$2y$10$YoLceNUh/mFL1UAlCjZYQ.LGAPGIm6JAu5l31CKeuWRJ3D4vRHwE2', NULL, 'usu', 0),
(38, 611212224, 'desire@gmail.com', 'Desi', 'desi', NULL, '2015-12-03', '$2y$10$cQai3vkoi2CaLcALJjJN0OckqYUUWDba64J9MyqwmOUcG0cn97ATC', '6844552587302_scooby.webp', 'usu', 0),
(39, 643221129, 'nasaro@gmail.com', 'nasaro', 'nasa', NULL, '2015-12-01', '$2y$10$B4lgzlm/o7J4Z5PDdChg6ulTPrm5l9v6.KlHgPODfgX1FFfFvHTKS', NULL, 'usu', 0),
(40, 609474290, 'pacho@gmail.com', 'Pacho', 'pacho', 'Encantado, tengo 20 años y soy de Granada', '2015-12-02', '$2y$10$JrMx6F9irmeCyqzcqpJJ1OlOvEsv/8Go75AGxp.mkQcy6NMmSUFrW', NULL, 'usu', 0),
(42, 665363784, 'carcf@gmail.com', 'dxewd', 'trhr', NULL, '2015-12-02', '$2y$10$nNxol/gDuNlxSZEmCt7BOOfTaOJMTISgVKBqm4OaGrp/z38UJ.wNW', NULL, 'usu', 0),
(43, 654, 'merda@gmail.com', 'merda', 'merda', NULL, '2015-12-02', '$2y$10$aumk9NXjKfRmmdkhLttRkugEmRH9l8oZcO2PQgIz/.xYFxCkwYAJq', NULL, 'usu', 0),
(44, 111111111, '1', '1', 'Abion', NULL, '2007-12-25', '$2y$10$X7ovd0Mv.DtOW7VWp7CsTOTyPh9M2oF1thRi6zukxAgc1LOf0mkfq', NULL, 'usu', 0),
(45, 654432217, '2@hotmail.com', 'Rafa', 'rafa', NULL, '2007-12-05', '$2y$10$IQhdvGYHg63RAvOqCAS1xOsnuubeivbCXUHHB7v5tjCEvsq7HIu9W', NULL, 'usu', 0),
(46, 655363332, 'vdb@gmail.comd', 'vfdv', 'ed', NULL, '2007-12-14', '$2y$10$e9t41yluZlU.7v6LJ1/1Wey/jG2YxtbUfEIsBQKwJfM/YqYqapNPS', NULL, 'usu', 0),
(47, 654443638, 'lfkemf2@gmail.com', 'kkfejk', 'vervre', NULL, '2007-12-16', '$2y$10$jqEIUFXb6FRYbBNV79q5tOPt2wi2W52.KEovNA/l0qXo5wx0rOGhe', NULL, 'usu', 0),
(48, 609474299, 'registro@gmail.com', 'registro', 'reg', NULL, '2007-12-11', '$2y$10$lSEjnYeS1Q3myTqjUYSjQec8Rg9CEAHp3iMvZIZXNj6iBl78efj6.', NULL, 'usu', 1),
(49, 654454325, 'fergeg@gmail.com', 'dewdew', 'hi', NULL, '2007-12-03', '$2y$10$4JTFDnUR8Hy2wXLCKoHG..NoIjJZTT/g5TgfR/jndhxdEQBJC1EJ2', '684591c2826fb_20250608_1217_MonochromeDNAStrand_simple_compose_01jx7gp1tefhsbc6wx47sbvd6n.png', 'usu', 0);

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
  MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT de la tabla `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT de la tabla `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de la tabla `tag`
--
ALTER TABLE `tag`
  MODIFY `id` bigint(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `tag_usuario`
--
ALTER TABLE `tag_usuario`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=160;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` bigint(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

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
