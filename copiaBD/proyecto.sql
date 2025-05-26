-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-05-2025 a las 18:13:54
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
(4, 'dewSF', 1, 21, '2025-05-26 00:11:25'),
(5, 'Vaya mierda', 1, 21, '2025-05-26 10:54:49'),
(6, 'vaya mierda', 1, 21, '2025-05-26 10:56:44'),
(7, 'cvarg', 1, 21, '2025-05-26 11:35:52'),
(8, 'csdcfs', 1, 21, '2025-05-26 11:39:38'),
(9, 'csdc', 1, 21, '2025-05-26 11:39:42'),
(10, 'csafera', 1, 21, '2025-05-26 11:40:03'),
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
(26, 'cfraf', 1, 21, '2025-05-26 16:12:08');

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
(39, 1, 21, '2025-05-26 17:35:45'),
(40, 1, 21, '2025-05-26 17:38:13'),
(41, 1, 20, '2025-05-26 17:43:52'),
(42, 1, 21, '2025-05-26 17:47:17'),
(43, 1, 20, '2025-05-26 17:57:57');

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
(11, 2, 'hola mundo', '2025-05-25 18:19:05', ''),
(12, 2, 'dewfnawuh', '2025-05-25 18:19:21', ''),
(13, 2, 'dewFW', '2025-05-25 18:28:35', ''),
(14, 2, 'vdvf', '2025-05-25 18:29:45', ''),
(15, 2, 'vdstbst', '2025-05-25 18:37:05', ''),
(16, 2, 'hdbashebdakwj', '2025-05-25 18:43:33', ''),
(17, 2, 'cascd', '2025-05-25 18:47:15', ''),
(18, 2, 'dscwsc', '2025-05-25 18:49:54', ''),
(19, 2, 'frasgerg', '2025-05-25 19:09:26', ''),
(20, 2, 'heyyy', '2025-05-25 19:09:33', ''),
(21, 2, 'csr', '2025-05-25 19:10:02', '');

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
(1, 609474291, 'maite@gmail.com', 'Maite García Correa', 'maii', NULL, '2015-12-09', '$2y$10$QLAC6M6SWzZhfx2kpXLGBOoyVbmhcnSaDhOB3aYYnAki33PEtYa.i', '68332d35ce067_carahellokitty.png', 'Genética,Síntomas crónicos,Diagnóstico,Tratamientos,Investigación', 'usu'),
(2, 678935262, 'eri@gmail.com', 'Erica', 'Eriiiica', NULL, '2015-12-02', '$2y$10$/3pdB6n1U63uR.HC9WqVa.eVcSUnzF0NmGA6KfuidO0NpdLDmjs6e', '6833382972b1e_valorant.jpeg', 'Diagnóstico,Apoyo emocional,Investigación,Genética', 'usu');

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
  MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT de la tabla `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` bigint(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
