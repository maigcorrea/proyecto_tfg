-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-06-2025 a las 12:19:58
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
(66, 'Estoy de acuerdo! Lorem ipsum es muy interesante', 59, 43, '2025-06-09 10:24:46'),
(70, 'Enserio??', 62, 43, '2025-06-09 10:31:46'),
(71, 'No tenía ni idea, muchas gracias', 62, 43, '2025-06-09 10:32:03'),
(74, 'Increíble!', 63, 43, '2025-06-09 10:35:30'),
(76, 'Siiiii', 59, 43, '2025-06-09 10:41:00'),
(77, 'Me parece una buena idea', 65, 47, '2025-06-09 10:43:28'),
(78, 'Ooo! Que interesante', 59, 48, '2025-06-09 10:44:17'),
(80, 'Fantástico', 55, 47, '2025-06-09 11:43:48'),
(81, 'Increible!!', 55, 45, '2025-06-09 11:50:30'),
(82, 'Interesante', 60, 69, '2025-06-09 12:13:54'),
(83, 'Suena bien', 58, 47, '2025-06-09 12:15:01'),
(84, 'Me parece interesante', 58, 43, '2025-06-09 12:15:12'),
(85, 'Perfecto', 58, 69, '2025-06-09 12:15:37');

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
(107, 59, 43, '2025-06-09 10:24:33'),
(108, 53, 43, '2025-06-09 10:26:34'),
(110, 61, 43, '2025-06-09 10:29:05'),
(113, 62, 43, '2025-06-09 10:31:22'),
(114, 63, 45, '2025-06-09 10:35:09'),
(115, 64, 43, '2025-06-09 10:37:35'),
(117, 64, 45, '2025-06-09 10:37:39'),
(118, 59, 45, '2025-06-09 10:40:50'),
(120, 65, 45, '2025-06-09 10:43:13'),
(122, 55, 45, '2025-06-09 11:43:37'),
(123, 55, 43, '2025-06-09 11:50:22'),
(124, 55, 48, '2025-06-09 11:50:37'),
(125, 59, 48, '2025-06-09 12:04:38'),
(126, 63, 48, '2025-06-09 12:08:59'),
(127, 60, 70, '2025-06-09 12:13:33'),
(128, 60, 69, '2025-06-09 12:13:35'),
(129, 58, 45, '2025-06-09 12:15:14'),
(130, 58, 48, '2025-06-09 12:15:17'),
(131, 58, 68, '2025-06-09 12:15:21'),
(132, 53, 69, '2025-06-09 12:16:57');

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
(43, 60, 'Hola, Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500', '2025-06-09 10:23:58'),
(45, 61, '\"Contenido aquí, contenido aquí\". Estos textos hacen parecerlo un español que se puede leer. Muchos paquetes de autoedición y editores de páginas web usan el Lorem Ipsum', '2025-06-09 10:29:28'),
(47, 59, ' Odio donec dapibus metus aliquam mi tristique felis, auctor mus ridiculus sollicitudin quam ac rutrum, vulputate molestie nulla fusce aptent arcu.', '2025-06-09 10:40:40'),
(48, 65, 'Se cree ampliamente que la historia de Lorem Ipsum se origina con Cicerón en el siglo I aC y su texto De Finibus bonorum et malorum', '2025-06-09 10:43:49'),
(64, 55, 'Lorem ipsum Lorem ipsum ipsum lorem minsum lorem\r\n', '2025-06-09 11:43:35'),
(65, 59, 'asando a la década de 1960, el Lorem Ipsum fue popularizado por el fabricante de tipografía Letraset, que lo utilizó en sus campañas publicitarias. Letraset ofrecía páginas de Lorem Ipsum como hojas de transferencia, que fueron ampliamente utilizadas en la era anterior a los ordenadores para los diseños.', '2025-06-09 11:52:24'),
(66, 61, '. Sin embargo, las referencias a la frase \"Lorem Ipsum\" se pueden encontrar en la Edición de la Biblioteca Clásica Loeb de 1914 del De Finibus en las secciones 32 y 33. Fue en esta edición del De Finibus en la que H. Rac', '2025-06-09 12:08:33'),
(68, 63, 's, netus dis molestie elementum laoreet eleifend', '2025-06-09 12:10:06'),
(69, 57, 'l Lorem Ipsum fue reintroducido en la década de 1980 por Aldus Corporation, una empresa que desarrolló Software de Publicación de Escritorio. Su producto más conocido PageMaker ', '2025-06-09 12:11:16'),
(70, 65, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ', '2025-06-09 12:13:04'),
(71, 60, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ', '2025-06-09 12:13:31'),
(72, 58, 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2025-06-09 12:15:56'),
(73, 53, 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2025-06-09 12:16:48');

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
(21, 'Personalizada'),
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
(162, 1, 52),
(163, 2, 52),
(164, 3, 52),
(165, 6, 52),
(166, 7, 52),
(167, 4, 52),
(168, 11, 52),
(169, 1, 53),
(170, 2, 53),
(171, 3, 53),
(172, 7, 53),
(173, 6, 53),
(174, 11, 53),
(175, 9, 53),
(176, 5, 53),
(177, 21, 53),
(184, 2, 56),
(185, 1, 56),
(186, 6, 56),
(187, 9, 56),
(188, 5, 56),
(189, 3, 57),
(190, 8, 57),
(191, 4, 58),
(192, 7, 58),
(193, 2, 59),
(194, 6, 59),
(195, 3, 59),
(196, 10, 59),
(197, 1, 59),
(198, 13, 60),
(199, 10, 60),
(200, 11, 60),
(201, 1, 61),
(202, 8, 61),
(203, 10, 62),
(204, 11, 62),
(205, 11, 63),
(206, 2, 64),
(207, 4, 55),
(208, 2, 55),
(209, 6, 55),
(210, 7, 55),
(211, 11, 55),
(212, 9, 55),
(213, 10, 55);

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
(50, 609474290, 'mike@gmail.com', 'Michael', 'mikee_', NULL, '1999-02-10', '$2y$10$m8mIca8GPI4YN5iiug5Z.e2Ts7WrI5l/rn9mFnTGhadWd2EudbKbW', '6846929e4fe69_22.jpg', 'usu', 1),
(52, 654347238, 'travis@gmail.com', 'Travis', 'traviss', NULL, '1986-01-01', '$2y$10$nHyNRlP557p06FrXky.dHuolcgUMXLI6p9i5rUh5mu9AqOUVMQIt6', '684695dae6a68_53.jpg', 'usu', 1),
(53, 654231325, 'sofi@gmail.com', 'Sofía', 'sofiia', NULL, '1989-07-13', '$2y$10$M599RkpauqHCvifxMBUkAeA2LR3VwGwmjexjstwSYyfvLEEgFBrje', NULL, 'usu', 1),
(54, 679098767, 'admin@gmail.com', 'admin', 'admin', 'Soy el administrador de la aplicación', '1985-06-20', '$2y$10$m8mIca8GPI4YN5iiug5Z.e2Ts7WrI5l/rn9mFnTGhadWd2EudbKbW', NULL, 'admin', 0),
(55, 678754324, 'naomirichards@gmail.com', 'naomi', 'naomi', NULL, '1995-08-07', '$2y$10$prr8x6kap1xMf1JLXP4w8eGkZXYJhrn11ZDDTh/Q1Y1SVbWRsjdE6', '6846acec88852_54.jpg', 'usu', 0),
(56, 612221123, 'jakeanderson@gmail.com', 'Jake', 'jakesss', NULL, '1994-04-17', '$2y$10$Kn.TZHjM8J6dFNeOlsvPyuL9uufnNXSiblXgVoz/MYPhylxI.42nS', '684697b2765b4_47.jpg', 'usu', 0),
(57, 678098756, 'natalieJensen@gmail.com', 'Natalie', 'natyy', NULL, '2000-09-26', '$2y$10$zryQQeiiXSRh1hUjuvWN..r4LezymtjBaILxhX2H9sc2Pt1zApfOW', '684698209f320_63.jpg', 'usu', 0),
(58, 655647792, 'paulramirez@gmail.com', 'Paul', 'paulo', NULL, '1987-07-15', '$2y$10$iyWM6FieStmumtaTtoAZHeYV/e.fHe36NN.6WNWwjrK7y3lfIuSZu', '6846989931f1e_98.jpg', 'usu', 1),
(59, 698099875, 'stevenlopez@gmail.com', 'Steven', 'steeve', NULL, '2003-01-01', '$2y$10$d1oFbNXPeWkru4p/DEths.IIp.7Fk7EatKNL3d1XI7Y5o17j9euBW', NULL, 'usu', 0),
(60, 654343223, 'camilaramirez@gmail.com', 'Camila', 'camii', 'Hola mundo, esto es una descripción de usuario de Camila', '1977-05-19', '$2y$10$7ibNanzIADX3frE1Oadku.96yovIsg6o.vjk/Y87/PGgCQGn6CAYO', '684699a4dcc60_14.jpg', 'usu', 0),
(61, 653212133, 'ruben@gmail.com', 'Ruben', 'ruben', NULL, '1990-05-31', '$2y$10$1r/QtlF4dujbBtnMCQMtm.jno0H7al5AXQxpTAq/bJVGA2cnynZF.', '68469b3239733_99.jpg', 'usu', 1),
(62, 664688767, 'sandragonzalez@gmail.com', 'Sandra', 'sandra', NULL, '2002-01-10', '$2y$10$6U8FFKdKCEqTUuLD7mktleYutg0a0hSpU3nTU0.zdZh1j9us2VB3a', '68469bd034bf7_86.jpg', 'usu', 1),
(63, 667802026, 'gerard@gamil.com', 'Gerardo', 'gerardo', 'El trozo de texto estándar de Lorem Ipsum usado desde el año 1500 ', '2004-10-30', '$2y$10$3LVFy.pYQbVCv1R6DdDHoej2pjqfkkorYupJx2QUltLEvTzx0zed2', '68469c5f07838_51.jpg', 'usu', 0),
(64, 678793774, 'ameliaSanders@gmail.com', 'Amelia', 'amelia_sd', 'lamcorper suspendisse vel posuere turpis porttitor dapibus class duis aliquet, tempus non ligula donec facilisi ad platea augue, justo convallis eget ultrices', '2001-02-06', '$2y$10$aEEFq7vpG5uz.vieRVRB.eiR8IrJROsXF2pR4OsA7at8buAreVLNK', '68469d457072a_10.jpg', 'usu', 1),
(65, 667542526, 'marleneMedina@gmail.com', 'Marlene', 'mar', 'Hola a todos, esta es mi descripción', '1988-05-04', '$2y$10$OjLWxc1RwgIQgnq3SrGqKeHNVnPgSDFFbpSfe.nZ8A2FAgzw3Vu2C', '68469e78b1ec2_0.jpg', 'usu', 0);

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
  MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT de la tabla `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=133;

--
-- AUTO_INCREMENT de la tabla `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT de la tabla `tag`
--
ALTER TABLE `tag`
  MODIFY `id` bigint(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `tag_usuario`
--
ALTER TABLE `tag_usuario`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=214;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` bigint(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

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
