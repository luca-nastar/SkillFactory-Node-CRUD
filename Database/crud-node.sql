-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-08-2021 a las 17:46:22
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `crud-node`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `authors`
--

CREATE TABLE `authors` (
  `idAuthor` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `authors`
--

INSERT INTO `authors` (`idAuthor`, `name`, `country`, `isActive`) VALUES
(1, 'Author 1', 'Argentina', 1),
(2, 'Author 2', 'España', 1),
(3, 'Author 3', 'Uruguay', 1),
(4, 'Author 4 ', 'Argentina', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `books`
--

CREATE TABLE `books` (
  `idBook` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `isbn` int(11) DEFAULT NULL,
  `idAuthor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `books`
--

INSERT INTO `books` (`idBook`, `name`, `isbn`, `idAuthor`) VALUES
(1, 'Libro 1', 123, 1),
(2, 'Libro 2', 1234, 2),
(3, 'Libro 3', 123456, 3),
(4, 'Libro 4', 123456789, 4),
(5, 'Libro 5', 123789, 2),
(6, 'Libro 6', 123987, 4),
(7, 'Libro 7', 123654, 3),
(8, 'Libro 8', 123987654, 1),
(9, 'Libro 9', 987654321, 2),
(12, 'Libro 10', 654321, 1),
(13, 'Libro 11', 2147483647, 3),
(21, 'Libro 11', 123000123, 4),
(23, 'Libro 11', 123000124, 4),
(25, 'Libro 11', 123000125, 4);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`idAuthor`),
  ADD UNIQUE KEY `authors_un` (`idAuthor`);

--
-- Indices de la tabla `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`idBook`),
  ADD UNIQUE KEY `books_un` (`isbn`),
  ADD KEY `books_FK` (`idAuthor`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `authors`
--
ALTER TABLE `authors`
  MODIFY `idAuthor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `books`
--
ALTER TABLE `books`
  MODIFY `idBook` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_FK` FOREIGN KEY (`idAuthor`) REFERENCES `authors` (`idAuthor`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
