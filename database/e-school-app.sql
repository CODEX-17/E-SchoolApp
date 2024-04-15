-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 15, 2024 at 03:46 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `e-school-app`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `acctID` varchar(10) NOT NULL,
  `acctype` varchar(7) NOT NULL,
  `email` varchar(25) NOT NULL,
  `password` varchar(50) NOT NULL,
  `firstname` varchar(20) NOT NULL,
  `middlename` varchar(20) NOT NULL,
  `lastname` varchar(20) NOT NULL,
  `status` varchar(6) NOT NULL,
  `imageID` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`acctID`, `acctype`, `email`, `password`, `firstname`, `middlename`, `lastname`, `status`, `imageID`) VALUES
('Tk6Bxe8U', 'admin', 'mark@gmail.com', 'mark123', 'Mark', 'Langcay', 'Adduru', 'logout', 'Tk6Bxe8U'),
('un2kt7px', 'faculty', 'pamparor@gmail.com', 'rumar123', 'Rumar', 'Capoquian', 'Pamparo', 'online', 'un2kt7p1'),
('VHXQ6s6O', 'student', 'allan@gmail.com', 'Allan123', 'Allan', 'Caranguioan', 'Caluigiran', 'logout', 'VHXQ6s6O');

-- --------------------------------------------------------

--
-- Table structure for table `choices`
--

CREATE TABLE `choices` (
  `id` int(11) NOT NULL,
  `choicesID` varchar(10) NOT NULL,
  `letter` varchar(2) NOT NULL,
  `content` varchar(100) NOT NULL,
  `correct` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `choices`
--

INSERT INTO `choices` (`id`, `choicesID`, `letter`, `content`, `correct`) VALUES
(1, '8Id0U1YF', 'A', 'aaaa', 0),
(2, '8Id0U1YF', 'B', 'bbbbb', 1),
(3, '8Id0U1YF', 'C', 'cccc', 1),
(5, 'OIalRUCA', 'A', 'eeee', 0),
(6, 'OIalRUCA', 'B', 'fffff', 0),
(7, 'OIalRUCA', 'C', 'gggg', 1),
(8, 'OIalRUCA', 'D', 'hhhh', 0),
(9, 'mX7fm8Rd', 'A', 'DSDSD', 0),
(10, 'mX7fm8Rd', 'B', 'SDSDS', 0),
(11, 'mX7fm8Rd', 'C', 'D', 1),
(12, 'mX7fm8Rd', 'D', 'DSDS', 0),
(13, 'vCB6U73X', 'A', 'DSDS', 0),
(14, 'vCB6U73X', 'B', 'DSDS', 0),
(15, 'vCB6U73X', 'C', 'DSDS', 1),
(16, 'vCB6U73X', 'D', 'DDDD', 0),
(17, 'EfrFO1iP', 'A', 'green', 1),
(18, 'EfrFO1iP', 'B', 'yellow', 0),
(19, 'EfrFO1iP', 'C', 'blue', 0),
(20, 'EfrFO1iP', 'D', 'pink', 0),
(21, 'uMW04JPh', 'A', 'Leo', 1),
(22, 'uMW04JPh', 'B', 'Lea', 1),
(23, 'uMW04JPh', 'C', 'ayy', 0),
(24, 'uMW04JPh', 'D', 'wehh', 0),
(25, 'uMW04JPh', 'E', 'dsds', 0),
(26, 'oWGbvF3w', 'A', 'gjjfg', 0),
(27, 'oWGbvF3w', 'B', 'jgfgj', 1),
(28, 'oWGbvF3w', 'C', 'jfgj', 0),
(29, 'oWGbvF3w', 'D', 'thjffg', 0),
(30, 'oWGbvF3w', 'E', 'kyuky', 0),
(31, 'YrtLqXc7', 'A', 'an animal', 1),
(32, 'YrtLqXc7', 'B', 'a plant', 0),
(33, 'YrtLqXc7', 'C', 'a thing', 0),
(34, 'YrtLqXc7', 'D', 'a nothing', 0),
(35, '6HsoVA6w', 'A', 'Rumar pamparo', 1),
(36, '6HsoVA6w', 'B', 'get this', 0),
(37, '6HsoVA6w', 'C', 'omar', 0),
(38, '6HsoVA6w', 'D', 'Rumar pamparo', 1),
(39, 'HwEA6i17', 'B', 'dsdsd', 1),
(40, 'HwEA6i17', 'A', 'dsds', 1),
(41, 'HwEA6i17', 'C', 'sds', 0),
(42, 'HwEA6i17', 'D', 'dsdsd', 0),
(43, 'EOh0GdrX', 'A', 'ddd', 1),
(44, '5znT5aI4', 'D', 'dsd', 0),
(45, 'mVTxL3mM', 'A', 'dsds', 1),
(46, 'EOh0GdrX', 'B', 'ddd', 1),
(47, 'mVTxL3mM', 'B', 'dsdsd', 1),
(48, 'EOh0GdrX', 'C', 'ddd', 0),
(49, 'mVTxL3mM', 'C', 'sdsd', 0),
(50, 'mVTxL3mM', 'D', 'dsds', 0),
(51, 'EOh0GdrX', 'D', 'ddd', 0),
(52, 'D0UpHZfI', 'A', 'dsds', 1),
(53, 'zyQPWPsh', 'A', 'dsdsd', 1),
(54, 'D0UpHZfI', 'B', 'dsdsd', 1),
(55, 'D0UpHZfI', 'C', 'sds', 0),
(56, 'zyQPWPsh', 'B', 'sds', 1),
(57, 'D0UpHZfI', 'D', 'dsdds', 0),
(58, 'zyQPWPsh', 'C', 'dsds', 0),
(59, 'WNjEOJEW', 'A', 'dsd', 1),
(60, 'zyQPWPsh', 'D', 'dsdsd', 0),
(61, 'WNjEOJEW', 'B', 'sdsdsd', 1),
(62, 'WNjEOJEW', 'C', 'sdsd', 0),
(63, '3NlXsJTs', 'A', 'dsds', 0),
(64, 'WNjEOJEW', 'D', 'dsds', 0),
(65, '3NlXsJTs', 'B', 'dsdsd', 0),
(66, 'sVFR0jcv', 'A', 'dsd', 0),
(67, '3NlXsJTs', 'C', 'sdsd', 1),
(68, 'sVFR0jcv', 'B', 'sdsds', 1),
(69, '3NlXsJTs', 'D', 'dsdsd', 1),
(70, 'sVFR0jcv', 'C', 'dsdsd', 1),
(71, 'sVFR0jcv', 'D', 'dsds', 0),
(72, 'V90ODOhH', 'A', 'dsd', 1),
(73, 'V90ODOhH', 'B', 'sdsdsd', 0),
(74, 'lnXTnyJd', 'A', 'dsds', 1),
(75, 'lnXTnyJd', 'B', 'sd', 1),
(76, 'V90ODOhH', 'C', 'sdsd', 1),
(77, 'lnXTnyJd', 'C', 'sdsd', 0),
(78, 'V90ODOhH', 'D', 'dsdsd', 0),
(79, 'lnXTnyJd', 'D', 'sds', 0),
(80, '5znT5aI4', 'A', 'dsds', 1),
(81, 'h0ASJwL1', 'A', 'dsd', 0),
(82, 'h0ASJwL1', 'B', 'sdsd', 0),
(83, '5znT5aI4', 'B', 'dsdsd', 1),
(84, 'h0ASJwL1', 'C', 'dsds', 1),
(85, '5znT5aI4', 'C', 'sdsd', 0),
(86, 'h0ASJwL1', 'D', 'dsds', 1),
(87, 'YAvXGiCn', 'A', 'dsd', 1),
(88, 'YDkFrBgv', 'D', 'dsd', 0),
(89, 'YAvXGiCn', 'B', 'dddd', 1),
(90, 'YAvXGiCn', 'C', 'dd', 0),
(91, 'YAvXGiCn', 'D', 'ffff', 0),
(92, 'YDkFrBgv', 'A', 'dsdsd', 1),
(93, 'YDkFrBgv', 'B', 'dd', 0),
(94, 'YDkFrBgv', 'C', 'dsd', 0),
(95, 'RT1ToWbM', 'C', 'c', 0),
(96, 'RT1ToWbM', 'A', 'a', 1),
(97, 'RT1ToWbM', 'B', 'b', 0),
(98, 'RT1ToWbM', 'D', 'd', 0),
(99, 'ase12312', 'A', 'Aasd', 1),
(100, 'ase12312', 'A', 'Aasd', 1),
(101, 'ase12312', 'A', 'Aasd', 1),
(102, 'ase12312', 'A', 'Aasd', 1),
(103, 'ase12312', 'A', 'Aasd', 1),
(104, '8Id0U1YF', 'A', 'asdad', 0),
(105, '8Id0U1YF', 'A', 'asdad', 0),
(106, '8Id0U1YF', 'A', 'asdad', 0),
(107, '8Id0U1YF', 'A', 'asdad', 0),
(108, '8Id0U1YF', 'A', 'asdad', 0),
(109, '8Id0U1YF', 'A', 'asdad', 0),
(110, '8Id0U1YF', 'A', 'asdad', 0),
(111, '8Id0U1YF', 'A', 'asdad', 0),
(112, '8Id0U1YF', 'A', 'asdasd', 0),
(113, '8Id0U1YF', 'A', 'asdasd', 0),
(114, '8Id0U1YF', 'A', 'asdasd', 0),
(115, '8Id0U1YF', 'A', 'asdasd', 0),
(116, '8Id0U1YF', 'A', 'asdasd', 0),
(117, '8Id0U1YF', 'A', 'asdasd', 0),
(118, '8Id0U1YF', 'A', 'asdasd', 0),
(119, '8Id0U1YF', 'A', 'asdasd', 0),
(120, '8Id0U1YF', 'A', 'asdasd', 0),
(121, '8Id0U1YF', 'A', 'asdasd', 0),
(122, '8Id0U1YF', 'A', 'asdasd', 0),
(123, '8Id0U1YF', 'A', 'asdasd', 0),
(124, '8Id0U1YF', 'A', 'asdasd', 0),
(125, '8Id0U1YF', 'A', 'asdasd', 0),
(126, '8Id0U1YF', 'A', 'asdasd', 0),
(127, '8Id0U1YF', 'A', 'asdasd', 0),
(128, '8Id0U1YF', 'A', 'asdasd', 0),
(129, '8Id0U1YF', 'A', 'asdasd', 0),
(130, '8Id0U1YF', 'A', 'asdasd', 0),
(131, 'C2pvxjPd', 'A', 'Blue', 0),
(132, 'C2pvxjPd', 'B', 'Brown', 1),
(133, 'C2pvxjPd', 'C', 'Red', 0),
(134, 'C2pvxjPd', 'D', 'Green', 0),
(135, 'MJAgSbEC', 'A', '23', 1),
(136, 'MJAgSbEC', 'B', '22', 0),
(137, 'MJAgSbEC', 'C', '21', 0),
(138, 'MJAgSbEC', 'D', '20', 0),
(139, 'DVKMM8l5', 'A', 'green', 0),
(140, 'DVKMM8l5', 'B', 'brown', 0),
(141, 'DVKMM8l5', 'C', 'violet', 1),
(142, 'DVKMM8l5', 'D', 'blue', 0),
(143, 'pQWOSluq', 'A', 'color', 1),
(144, 'pQWOSluq', 'B', 'thing', 0),
(145, 'pQWOSluq', 'C', 'test', 0),
(146, 'pQWOSluq', 'D', 'tesing', 0),
(147, 'ge7FseO5', 'A', 'asdas', 1),
(148, 'ge7FseO5', 'B', 'dsadsa', 0),
(149, 'ge7FseO5', 'C', 'dasd', 0),
(150, 'ge7FseO5', 'D', 'dasds', 0);

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE `class` (
  `classID` int(10) NOT NULL,
  `className` varchar(50) NOT NULL,
  `classDesc` varchar(100) NOT NULL,
  `classCode` varchar(10) NOT NULL,
  `membersID` varchar(10) NOT NULL,
  `imageID` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `class`
--

INSERT INTO `class` (`classID`, `className`, `classDesc`, `classCode`, `membersID`, `imageID`) VALUES
(1, 'CAPSTONE 2', 'IT 4C', 'IT-CAP2', 'BiJ456Aj', 'xVKKzdPD'),
(2, 'ENTREPRENEURSHIP 2', 'ENTREPRENEURSHIP EDDITED', 'IT-ELECT2', '42d8800e', 'YHXQ6s61');

-- --------------------------------------------------------

--
-- Table structure for table `class_list`
--

CREATE TABLE `class_list` (
  `id` int(11) NOT NULL,
  `acctID` varchar(8) NOT NULL,
  `classCode` varchar(10) NOT NULL,
  `hidden` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `class_list`
--

INSERT INTO `class_list` (`id`, `acctID`, `classCode`, `hidden`) VALUES
(1, 'un2kt7px', 'IT-CAP2', 'false'),
(1836, 'un2kt7px', 'IT-ELECT2', 'false');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `commentID` varchar(10) NOT NULL,
  `postID` varchar(10) NOT NULL,
  `acctID` varchar(10) NOT NULL,
  `content` varchar(100) NOT NULL,
  `time` varchar(20) NOT NULL,
  `date` varchar(20) NOT NULL,
  `fileID` varchar(10) NOT NULL,
  `imageID` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `commentID`, `postID`, `acctID`, `content`, `time`, `date`, `fileID`, `imageID`) VALUES
(1, '8J26Xi212', 'jQ3BMZtE', 'un2kt7px', 'My name is', '03:13 PM', 'Fri Dec 15 2023', 'none', 'none'),
(2, 'tO2n1B212', 'jQ3BMZtE', 'un2kt7px', 'New2', '03:23 PM', 'Fri Dec 15 2023', 'emf1G2t6', 'none'),
(3, 'tO2n1B231', 'jQ3BMZtE', 'un2kt7px', 'new 3', '10:54 AM', 'Mon Dec 18 2023', 'none', 'VHXQ6s6O'),
(4, '1J26Xi223', 'YkqaXCPa', 'un2kt7px', 'kkkk', '03:33 PM', 'Fri Dec 15 2023', 'none', 'none'),
(5, '0QT309fJ', 'jQ3BMZtE', 'un2kt7px', 'ay panget', '03:53 AM', 'Fri Jan 26 2024', 'none', 'none'),
(6, 'g3IXFaPT', 'jQ3BMZtE', 'un2kt7px', 'talaga ba beh', '03:54 AM', 'Fri Jan 26 2024', 'none', 'none'),
(7, 'dDJTL02P', 'jQ3BMZtE', 'un2kt7px', 'ay cge beh', '03:57 AM', 'Fri Jan 26 2024', 'none', 'none'),
(8, 'hWkB7FqS', 'jQ3BMZtE', 'un2kt7px', 'ito na behh', '03:58 AM', 'Fri Jan 26 2024', 'none', 'none'),
(9, 'LE2Orx4r', 'jQ3BMZtE', 'un2kt7px', 'dsdsds', '04:09 AM', 'Fri Jan 26 2024', 'Hq4KoSMS', 'none'),
(10, 'Xv8YXoiL', 'jQ3BMZtE', 'un2kt7px', 'its true', '04:12 AM', 'Fri Jan 26 2024', 'MBNnN2F8', 'none'),
(11, 'R7M2yqOH', 'jQ3BMZtE', 'un2kt7px', 'its true', '04:14 AM', 'Fri Jan 26 2024', 'oeRN2G0o', 'none'),
(12, 'F5k8e6BL', 'jQ3BMZtE', 'un2kt7px', 'working promise', '04:15 AM', 'Fri Jan 26 2024', '8HJFLsGy', 'none'),
(13, 'wjfixoiE', 'jQ3BMZtE', 'un2kt7px', 'try', '04:17 AM', 'Fri Jan 26 2024', 'lG2HD7ql', 'none'),
(14, '6kbrKrrh', 'jQ3BMZtE', 'un2kt7px', 'dsdas', '11:27 AM', 'Fri Jan 26 2024', 'none', 'none'),
(15, '0Gndbmkx', 'eYIFfaMC', 'un2kt7px', 'sheesh', '12:19 PM', 'Fri Jan 26 2024', 'none', 'none'),
(16, 'AZ7pM3hh', '9oY6kRi8', 'un2kt7px', 'hahah nuyan', '12:20 PM', 'Fri Jan 26 2024', 'none', 'none'),
(17, '4cpAvAnK', '9oY6kRi8', 'VHXQ6s6O', 'HAHA POGI', '12:21 PM', 'Fri Jan 26 2024', 'none', 'none'),
(18, 'hKz29lig', 'oJlxaGuq', 'un2kt7px', 'asasd', '09:36 PM', 'Sun Jan 28 2024', 'none', 'none'),
(19, 'tpZ3mS4Y', '7IsBExcZ', 'WhpOtets', 'new 1', '08:48 AM', 'Mon Jan 29 2024', 'hRP4aof1', 'none');

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `id` int(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `data` varchar(100) NOT NULL,
  `fileID` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`id`, `name`, `type`, `data`, `fileID`) VALUES
(1, 'Prepare-Stock-Sauces-and-Soups-GROUP-5-FSP-BTVTED-FSM-1A.pptx', 'application/vnd.openxmlformats-officedocument.pres', 'file_1703604974548.pptx', 'tO2n1B9q'),
(2, 'luis-training-plan.docx', 'application/vnd.openxmlformats-officedocument.word', 'file_1703605531798.docx', 'OCyGiaLQ'),
(5, 'ACHIEVEMENT CHART-FLS FINAL.xlsx', 'application/vnd.openxmlformats-officedocument.spre', 'file_1703608899097.xlsx', 'y9HW8ezd');

-- --------------------------------------------------------

--
-- Table structure for table `filllayout`
--

CREATE TABLE `filllayout` (
  `id` int(11) NOT NULL,
  `fillContent` varchar(100) NOT NULL,
  `fillType` varchar(5) NOT NULL,
  `fillPosition` int(11) NOT NULL,
  `fillLayoutID` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `filllayout`
--

INSERT INTO `filllayout` (`id`, `fillContent`, `fillType`, `fillPosition`, `fillLayoutID`) VALUES
(1, 'q5', 'text', 1, '2ojgplEC'),
(2, 'q5', 'blank', 2, '2ojgplEC'),
(3, 'q5', 'text', 3, '2ojgplEC'),
(4, 'q6', 'text', 1, 'D9ZApYOD'),
(7, 'q6', 'text', 4, 'D9ZApYOD'),
(8, 'DSDSDS', 'text', 1, 'xZaxdwxK'),
(9, 'DSDS', 'blank', 2, 'xZaxdwxK'),
(10, 'What is my', 'text', 1, 'EJcb5AZC'),
(11, 'fave', 'blank', 2, 'EJcb5AZC'),
(12, 'color?', 'text', 3, 'EJcb5AZC'),
(13, 'bayang magiliw', 'text', 1, 'TRhAgqcV'),
(14, 'perlas ng silang alang', 'blank', 2, 'TRhAgqcV'),
(15, 'bayang magiliw', 'text', 3, 'TRhAgqcV'),
(16, 'ghvhgv', 'text', 1, 'OJSLJTvY'),
(17, 'jkbnhhjbj', 'blank', 2, 'OJSLJTvY'),
(18, 'i am', 'text', 1, 'aHcysuQC'),
(19, 'jehiah', 'blank', 2, 'aHcysuQC'),
(20, 'color?', 'blank', 2, 'XLYeJXnZ'),
(21, 'my name is', 'text', 1, 'pOlWtzB4'),
(22, 'what is ', 'text', 1, 'XLYeJXnZ'),
(23, 'Rumar Pamparo', 'blank', 2, 'pOlWtzB4'),
(24, 'im', 'text', 3, 'pOlWtzB4'),
(25, '23', 'blank', 4, 'pOlWtzB4'),
(26, 'yrs old', 'text', 5, 'pOlWtzB4'),
(27, 'dsdsds', 'blank', 1, 'RUOiLcPE'),
(28, 'dsdsds', 'blank', 2, 'RUOiLcPE'),
(29, 'dsdsds', 'text', 4, 'RUOiLcPE'),
(30, 'dsdsds', 'blank', 5, 'RUOiLcPE'),
(31, 'dsdsds', 'blank', 2, 'YXWApu2U'),
(32, 'dsdsds', 'blank', 3, 'YXWApu2U'),
(33, 'dsds', 'text', 1, 'YXWApu2U'),
(34, 'dsdsds', 'blank', 4, 'YXWApu2U'),
(35, 'dsds', 'text', 1, 'lskUhV0E'),
(36, 'rumar', 'blank', 2, 'lskUhV0E'),
(37, 'pamparo', 'blank', 3, 'lskUhV0E'),
(38, 'who is me? cat', 'blank', 1, 'eAzK97X0'),
(39, 'My name is', 'text', 1, 'wPgjtqxZ'),
(40, 'Mark', 'blank', 2, 'wPgjtqxZ'),
(41, 'Im ', 'text', 3, 'wPgjtqxZ'),
(42, '23', 'blank', 4, 'wPgjtqxZ'),
(43, 'years old', 'text', 5, 'wPgjtqxZ'),
(44, 'dsadsd', 'text', 1, 'TFpXUsSo'),
(45, 'dsadsd', 'blank', 2, 'TFpXUsSo'),
(46, 'dasdsa', 'text', 4, 'TFpXUsSo');

-- --------------------------------------------------------

--
-- Table structure for table `friends`
--

CREATE TABLE `friends` (
  `id` int(10) NOT NULL,
  `acctID` varchar(10) NOT NULL,
  `friendAcctID` varchar(10) NOT NULL,
  `fullname` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `friends`
--

INSERT INTO `friends` (`id`, `acctID`, `friendAcctID`, `fullname`) VALUES
(64, '116bd490', '8J26Xi2P', 'Christian James T Tuliao'),
(71, 'un2kt7px', '116bd490', 'Mark Langcay Adduru'),
(83, 'un2kt7px', '077e0510', 'Manolito P Cabactulan'),
(84, 'un2kt7px', 'ced97302', 'Kyle F Arellano'),
(88, 'VHXQ6s6O', '077e0510', 'Manolito Paloma Cabactulan'),
(94, 'un2kt7px', 'VHXQ6s6O', 'Allan Jay C Caluigiran'),
(96, 'un2kt7px', '43WRp7AF', 'Rosemarie T Dela Cruz'),
(97, '077e0510', '43WRp7AF', 'Rosemarie T Dela Cruz'),
(98, '43WRp7AF', '077e0510', 'Manolito P Cabactulan'),
(100, 'un2kt7px', '8J26Xi2P', 'Christian James T Tuliao'),
(102, 'un2kt7px', 'VHXQ6s6O', 'Allan Jay C Caluigiran'),
(104, 'un2kt7px', '8C4px7jH', 'jco M drigo'),
(107, 'VHXQ6s6O', '077e0510', 'Manolito P Cabactulan'),
(108, '077e0510', 'VHXQ6s6O', 'Allan C Caluigiran');

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

CREATE TABLE `image` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(100) NOT NULL,
  `data` varchar(100) NOT NULL,
  `dateUploaded` varchar(20) NOT NULL,
  `timeUploaded` varchar(20) NOT NULL,
  `acctID` varchar(10) NOT NULL,
  `classCode` varchar(10) NOT NULL,
  `imageID` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `image`
--

INSERT INTO `image` (`id`, `name`, `type`, `data`, `dateUploaded`, `timeUploaded`, `acctID`, `classCode`, `imageID`) VALUES
(1, 'ads.jpg', 'image/jpeg', 'image_17016911032.jpg', 'Mon Jan 22 2024', '03:35 AM', 'un2kt7px', 'IT-CAP2', 'xVKKzdPD'),
(2, 'papa.jpg', 'image/jpeg', 'image_1699451744436.png', 'Mon Jan 22 2024', '03:35 AM', 'un2kt7px', 'IT-ELECT2', 'YHXQ6s61'),
(3, 'rumar.jpg', 'image/jpeg', 'image_1701691103989.jpg', 'Mon Jan 22 2024', '03:35 AM', 'un2kt7px', 'none', 'un2kt7p1'),
(4, 'mark.jpg', 'image/jpeg', 'image_1701691103982.jpg', 'Mon Jan 22 2024', '03:35 AM', 'un2kt7px', 'none', 'Tk6Bxe8U'),
(5, 'allan.jpg', 'image/jpeg', 'image_1701668137802.png', 'Mon Jan 22 2024', '03:35 AM', 'un2kt7px', 'none', 'VHXQ6s6O'),
(1911, 'csu.png', 'image/jpeg', 'image_17016911033.png', 'Mon Jan 22 2024', '03:35 AM', 'un2kt7px', 'IT-CAP2', '5B7Rww8K'),
(1912, 'colab.png', 'image/jpeg', 'image_17016911034.png', 'Mon Jan 22 2024', '03:36 AM', 'un2kt7px', 'IT-CAP2', '5B7Rww8K'),
(1913, 'wallpaper.png', 'image/jpeg', 'image_1701691103990.jpeg', 'Mon Jan 22 2024', '03:36 AM', 'un2kt7px', 'IT-CAP2', '5B7Rww8K'),
(1914, 'cat.jpg', 'image/jpeg', 'image_1701691103998.jpeg', 'Mon Jan 22 2024', '03:39 AM', 'un2kt7px', 'IT-CAP2', '5B7Rww8K'),
(1915, 'jaimee.jpg', 'image/jpeg', 'image_17016911035.JPG', 'Mon Jan 22 2024', '03:39 AM', 'un2kt7px', 'IT-CAP2', 'BgJ3t4MP'),
(1916, '416052874_249732241406647_1413292149803446007_n.jpg', 'image/jpeg', 'image_1713095412757.jpg', 'Sun Apr 14 2024', '07:50 PM', 'un2kt7px', 'IT-CAP2', 'mORXxJYo'),
(1917, '0735DB9D-D3E9-44FC-A09E-FC12319D1C45.JPG', 'image/jpeg', 'image_1713095412759.JPG', 'Sun Apr 14 2024', '07:50 PM', 'un2kt7px', 'IT-CAP2', 'mORXxJYo'),
(1918, '0735DB9D-D3E9-44FC-A09E-FC12319D1C45 2.JPG', 'image/jpeg', 'image_1713095412753.JPG', 'Sun Apr 14 2024', '07:50 PM', 'un2kt7px', 'IT-CAP2', 'mORXxJYo'),
(1919, 'gaelle-marcel-YnbJwNXy0YQ-unsplash.jpg', 'image/jpeg', 'image_1713096153387.jpg', 'Sun Apr 14 2024', '08:02 PM', 'un2kt7px', 'IT-CAP2', 'dNf522yo'),
(1920, 'header text.jpg', 'image/jpeg', 'image_1713096153398.jpg', 'Sun Apr 14 2024', '08:02 PM', 'un2kt7px', 'IT-CAP2', 'dNf522yo'),
(1921, 'Premium Photo _ A cat sits on a shelf in front of books and a plant.jpeg', 'image/jpeg', 'image_1713096153399.jpeg', 'Sun Apr 14 2024', '08:02 PM', 'un2kt7px', 'IT-CAP2', 'dNf522yo'),
(1922, 'MIRACLE LOTION PNG.png', 'image/png', 'image_1713096266041.png', 'Sun Apr 14 2024', '08:04 PM', 'un2kt7px', 'IT-CAP2', 'Bd4lkWFD'),
(1923, 'lemon_rub-removebg-preview.png', 'image/png', 'image_1713096266037.png', 'Sun Apr 14 2024', '08:04 PM', 'un2kt7px', 'IT-CAP2', 'Bd4lkWFD'),
(1924, 'FAKE STORE.jpg', 'image/jpeg', 'image_1713096266032.jpg', 'Sun Apr 14 2024', '08:04 PM', 'un2kt7px', 'IT-CAP2', 'Bd4lkWFD'),
(1925, 'wonder drops.png', 'image/png', 'image_1713096682479.png', 'Sun Apr 14 2024', '08:11 PM', 'un2kt7px', 'IT-CAP2', 'QhjAYld2'),
(1926, 'lemon_rub-removebg-preview.png', 'image/png', 'image_1713096682496.png', 'Sun Apr 14 2024', '08:11 PM', 'un2kt7px', 'IT-CAP2', 'QhjAYld2'),
(1927, 'FAKE STORE.jpg', 'image/jpeg', 'image_1713097253899.jpg', 'Sun Apr 14 2024', '08:20 PM', 'un2kt7px', 'IT-CAP2', 'A0eXOL80'),
(1928, 'lemon_rub-removebg-preview.png', 'image/png', 'image_1713097253903.png', 'Sun Apr 14 2024', '08:20 PM', 'un2kt7px', 'IT-CAP2', 'A0eXOL80'),
(1929, 'MIRACLE LOTION PNG.png', 'image/png', 'image_1713097275875.png', 'Sun Apr 14 2024', '08:21 PM', 'un2kt7px', 'IT-CAP2', 'A0eXOL80'),
(1930, 'wonder drops.png', 'image/png', 'image_1713097275883.png', 'Sun Apr 14 2024', '08:21 PM', 'un2kt7px', 'IT-CAP2', 'A0eXOL80'),
(1931, 'MIRACLE LOTION PNG.png', 'image/png', 'image_1713097319834.png', 'Sun Apr 14 2024', '08:21 PM', 'un2kt7px', 'IT-CAP2', 'Lcd8ALoZ'),
(1932, 'lemon_rub-removebg-preview.png', 'image/png', 'image_1713097319826.png', 'Sun Apr 14 2024', '08:21 PM', 'un2kt7px', 'IT-CAP2', 'Lcd8ALoZ'),
(1933, 'wonder drops.png', 'image/png', 'image_1713097335957.png', 'Sun Apr 14 2024', '08:22 PM', 'un2kt7px', 'IT-CAP2', 'Lcd8ALoZ'),
(1934, 'MIRACLE LOTION PNG.png', 'image/png', 'image_1713097336054.png', 'Sun Apr 14 2024', '08:22 PM', 'un2kt7px', 'IT-CAP2', 'Lcd8ALoZ'),
(1935, 'FAKE STORE.jpg', 'image/jpeg', 'image_1713097527223.jpg', 'Sun Apr 14 2024', '08:25 PM', 'un2kt7px', 'IT-CAP2', 'lOGS8BIH'),
(1936, 'lemon_rub-removebg-preview.png', 'image/png', 'image_1713097527225.png', 'Sun Apr 14 2024', '08:25 PM', 'un2kt7px', 'IT-CAP2', 'lOGS8BIH'),
(1937, 'MIRACLE LOTION PNG.png', 'image/png', 'image_1713097543326.png', 'Sun Apr 14 2024', '08:25 PM', 'un2kt7px', 'IT-CAP2', 'lOGS8BIH'),
(1938, 'lemon_rub-removebg-preview.png', 'image/png', 'image_1713097543321.png', 'Sun Apr 14 2024', '08:25 PM', 'un2kt7px', 'IT-CAP2', 'lOGS8BIH'),
(1939, 'gaelle-marcel-YnbJwNXy0YQ-unsplash.jpg', 'image/jpeg', 'image_1713097929219.jpg', 'Sun Apr 14 2024', '08:32 PM', 'un2kt7px', 'IT-CAP2', 'lfTJi63D'),
(1940, '416052874_249732241406647_1413292149803446007_n.jpg', 'image/jpeg', 'image_1713097929218.jpg', 'Sun Apr 14 2024', '08:32 PM', 'un2kt7px', 'IT-CAP2', 'lfTJi63D'),
(1941, '0735DB9D-D3E9-44FC-A09E-FC12319D1C45 2.JPG', 'image/jpeg', 'image_1713097929215.JPG', 'Sun Apr 14 2024', '08:32 PM', 'un2kt7px', 'IT-CAP2', 'lfTJi63D'),
(1942, '0735DB9D-D3E9-44FC-A09E-FC12319D1C45.JPG', 'image/jpeg', 'image_1713097929218.JPG', 'Sun Apr 14 2024', '08:32 PM', 'un2kt7px', 'IT-CAP2', 'lfTJi63D'),
(1943, 'header text.jpg', 'image/jpeg', 'image_1713097929222.jpg', 'Sun Apr 14 2024', '08:32 PM', 'un2kt7px', 'IT-CAP2', 'lfTJi63D'),
(1944, 'IMG_5642.JPG', 'image/jpeg', 'image_1713097929222.JPG', 'Sun Apr 14 2024', '08:32 PM', 'un2kt7px', 'IT-CAP2', 'lfTJi63D'),
(1945, 'Premium Photo _ A cat sits on a shelf in front of books and a plant.jpeg', 'image/jpeg', 'image_1713097929223.jpeg', 'Sun Apr 14 2024', '08:32 PM', 'un2kt7px', 'IT-CAP2', 'lfTJi63D');

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `ID` int(10) NOT NULL,
  `membersID` varchar(10) NOT NULL,
  `acctID` varchar(10) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `middlename` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `memberType` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`ID`, `membersID`, `acctID`, `firstname`, `middlename`, `lastname`, `memberType`) VALUES
(1, 'BiJ456Aj', 'VHXQ6s6O', 'Allan', 'Caranguioan', 'Caluigiran', 'member'),
(3, 'BiJ456Aj', 'un2kt7px', 'Rumar', 'Capoquian', 'Pamparo', 'admin'),
(1933, '42d8800e', 'un2kt7px', 'Rumar', 'Capoquian', 'Pamparo', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `messageID` varchar(10) NOT NULL,
  `roomID` varchar(10) NOT NULL,
  `messageContent` varchar(100) NOT NULL,
  `messageSender` varchar(50) NOT NULL,
  `messageReceiver` varchar(50) NOT NULL,
  `date` varchar(20) NOT NULL,
  `time` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `messageID`, `roomID`, `messageContent`, `messageSender`, `messageReceiver`, `date`, `time`) VALUES
(1, 'tn2kt7pp', 'un2kt788', 'Hi, lan kamusta ka may assignment kana ba perd?', 'un2kt7px', 'VHXQ6s6O', 'Wed Dec 20 2023', '01:21 PM'),
(2, 'in2kt7pp', 'un2kt788', 'wala pa nga tolss eh.', 'VHXQ6s6O', 'un2kt7px', 'Wed Dec 20 2023', '02:21 PM'),
(3, 'tn2kt7py', '116bdgh6', 'Tols  kamusta na dyan?', '116bd490', 'un2kt7px', 'Wed Dec 20 2023', '02:21 PM'),
(4, 'kROSiWWi', 'KVdJop4Z', 'date', 'un2kt7px', '116bd490', 'Tue Dec 26 2023', '07:33 PM'),
(5, '2263olLK', 'ghbh581v', 'wheee', 'un2kt7px', '116bd490', 'Tue Dec 26 2023', '07:35 PM'),
(6, 'W4QjOhi2', 'un2kt788', 'ok cge', 'un2kt7px', 'VHXQ6s6O', 'Tue Dec 26 2023', '07:49 PM'),
(7, 'etmIH6xu', 'un2kt788', 'dsdsds', 'un2kt7px', 'VHXQ6s6O', 'Tue Dec 26 2023', '07:56 PM'),
(8, 'zVxTM0xl', 'un2kt788', 'new', 'un2kt7px', 'VHXQ6s6O', 'Tue Dec 26 2023', '07:58 PM'),
(9, 'KEamOo7p', 'un2kt788', 'new', 'un2kt7px', 'VHXQ6s6O', 'Tue Dec 26 2023', '07:58 PM'),
(10, '4ig1Y0qM', 'un2kt788', 'paano', 'un2kt7px', 'VHXQ6s6O', 'Tue Dec 26 2023', '08:01 PM'),
(11, 'bpfBFf7Z', 'un2kt788', 'paano', 'un2kt7px', 'VHXQ6s6O', 'Tue Dec 26 2023', '08:01 PM'),
(12, 'wenc7u4L', 'un2kt788', 'ayy wehhhh', 'un2kt7px', 'VHXQ6s6O', 'Tue Dec 26 2023', '08:03 PM'),
(13, 'svh0As0k', 'un2kt788', 'uyy lan', 'un2kt7px', 'VHXQ6s6O', 'Tue Dec 26 2023', '08:06 PM'),
(14, '86XJ2kS8', 'un2kt788', 'gagi bat ganun', 'VHXQ6s6O', 'un2kt7px', 'Tue Dec 26 2023', '08:06 PM'),
(15, 'mA1tcAOi', 'un2kt788', 'sheet', 'VHXQ6s6O', 'un2kt7px', 'Tue Dec 26 2023', '08:17 PM'),
(16, 'wWzmDJNb', 'un2kt788', 'ay wehh', 'un2kt7px', 'VHXQ6s6O', 'Tue Dec 26 2023', '08:17 PM'),
(17, 'KumfwHuZ', 'un2kt788', 'dsdsd', 'VHXQ6s6O', 'un2kt7px', 'Tue Dec 26 2023', '08:18 PM'),
(21, 'LFFs44up', 'un2kt788', 'dsdsdsddddddddd', 'un2kt7px', 'VHXQ6s6O', 'Tue Dec 26 2023', '08:19 PM'),
(22, 'BJpPnMGd', 'un2kt788', 'ddsdsd', 'VHXQ6s6O', 'un2kt7px', 'Tue Dec 26 2023', '08:19 PM'),
(23, 'xwHvRuLO', 'un2kt788', 'gagi', 'un2kt7px', 'VHXQ6s6O', 'Tue Dec 26 2023', '08:21 PM'),
(24, '5yoRF1Ul', 'un2kt788', 'sheeett', 'un2kt7px', 'VHXQ6s6O', 'Tue Dec 26 2023', '08:29 PM'),
(25, '21gj8Msz', 'un2kt788', 'xxdsd', 'VHXQ6s6O', 'un2kt7px', 'Tue Dec 26 2023', '08:29 PM'),
(26, 'kap2Mg2w', 'un2kt788', 'dsdsds', 'VHXQ6s6O', 'un2kt7px', 'Tue Dec 26 2023', '08:33 PM'),
(27, 'KPq0e7EU', 'un2kt788', 'dsdsds', 'un2kt7px', 'VHXQ6s6O', 'Tue Dec 26 2023', '08:34 PM'),
(28, 'F0fFOtRW', 'un2kt788', 'dsddddddd', 'un2kt7px', 'VHXQ6s6O', 'Tue Dec 26 2023', '08:34 PM'),
(29, 'F2u6e9n8', 'un2kt788', 'dsdsd', 'VHXQ6s6O', 'un2kt7px', 'Tue Dec 26 2023', '08:35 PM'),
(30, 'Rr8NMbth', 'un2kt788', 'dsdsd', 'un2kt7px', 'VHXQ6s6O', 'Tue Dec 26 2023', '08:35 PM'),
(31, 'wC8Wfn1S', 'un2kt788', 'cge nga', 'un2kt7px', 'VHXQ6s6O', 'Tue Dec 26 2023', '08:35 PM'),
(32, 'DWpbp2Tb', 'un2kt788', 'dsdsdcsds', 'VHXQ6s6O', 'un2kt7px', 'Tue Dec 26 2023', '08:36 PM'),
(33, 'uvsDKtdM', 'un2kt788', 'dsdsdcsdsdsd', 'VHXQ6s6O', 'un2kt7px', 'Tue Dec 26 2023', '08:37 PM'),
(34, 'Gp69IUwI', 'un2kt788', 'sasasasas', 'un2kt7px', 'VHXQ6s6O', 'Tue Dec 26 2023', '08:38 PM'),
(35, '9Ti3JTX5', 'un2kt788', 'ssds', 'VHXQ6s6O', 'un2kt7px', 'Tue Dec 26 2023', '08:39 PM'),
(36, 't3kzTuz1', 'un2kt788', 'dsdsd', 'un2kt7px', 'VHXQ6s6O', 'Tue Dec 26 2023', '08:40 PM'),
(37, 'oUjEvCUV', 'un2kt788', 'dsds', 'un2kt7px', 'VHXQ6s6O', 'Tue Dec 26 2023', '08:41 PM'),
(38, 'ekH089uo', 'un2kt788', 'dsdsdsds', 'un2kt7px', 'VHXQ6s6O', 'Tue Dec 26 2023', '08:41 PM'),
(39, 'M84F49AE', 'un2kt788', 'ssdsdsds', 'VHXQ6s6O', 'un2kt7px', 'Tue Dec 26 2023', '08:41 PM'),
(40, 'NOZaTyml', 'un2kt788', 'dsdsdsds', 'un2kt7px', 'VHXQ6s6O', 'Tue Dec 26 2023', '08:41 PM'),
(41, 'IhVyo4TI', '116bdgh6', 'dfsdfdf', 'un2kt7px', '116bd490', 'Tue Dec 26 2023', '08:43 PM'),
(42, 'M1ogBuLH', 'un2kt788', 'ffffff', 'un2kt7px', 'VHXQ6s6O', 'Tue Dec 26 2023', '08:43 PM'),
(43, 'HmXKsT1E', 'un2kt788', 'dsds', 'VHXQ6s6O', 'un2kt7px', 'Tue Dec 26 2023', '08:44 PM'),
(44, 'HbpUaqfi', 'un2kt788', 'oyyy', 'VHXQ6s6O', 'un2kt7px', 'Sun Dec 31 2023', '07:34 PM'),
(45, 'j4FDFyhc', 'un2kt788', 'dsdsd', 'VHXQ6s6O', 'un2kt7px', 'Sun Dec 31 2023', '08:00 PM'),
(46, 'ydEfxqwS', 'un2kt788', 'dsdsd', 'VHXQ6s6O', 'un2kt7px', 'Sun Dec 31 2023', '08:00 PM'),
(47, 'ygct7bBJ', 'un2kt788', 'dsfdfd', 'VHXQ6s6O', 'un2kt7px', 'Sun Dec 31 2023', '08:03 PM'),
(48, '6RbB9UHf', 'un2kt788', 'dsdsd', 'VHXQ6s6O', 'un2kt7px', 'Sun Dec 31 2023', '08:12 PM'),
(49, 'epEjR91y', 'un2kt788', 'uyyy', 'un2kt7px', 'VHXQ6s6O', 'Mon Jan 01 2024', '01:03 AM'),
(50, 'gcpkmcJj', 'un2kt788', 'uy perd', 'VHXQ6s6O', 'un2kt7px', 'Mon Jan 01 2024', '01:19 AM'),
(51, '0leCfKeL', 'un2kt788', 'lah', 'VHXQ6s6O', 'un2kt7px', 'Mon Jan 01 2024', '01:21 AM'),
(52, 'MWrtMISt', 'un2kt788', 'lah', 'VHXQ6s6O', 'un2kt7px', 'Mon Jan 01 2024', '01:22 AM'),
(53, 'ZebMLCn7', 'un2kt788', 'lah', 'VHXQ6s6O', 'un2kt7px', 'Mon Jan 01 2024', '01:24 AM'),
(54, '08futant', 'un2kt788', 'dsdsd', 'un2kt7px', 'VHXQ6s6O', 'Mon Jan 01 2024', '01:25 AM'),
(55, '1LrHtIUJ', 'un2kt788', 'dsdsd', 'un2kt7px', 'VHXQ6s6O', 'Mon Jan 01 2024', '01:28 AM'),
(56, '1Tl8tONg', 'un2kt788', 'dsds', 'VHXQ6s6O', 'un2kt7px', 'Mon Jan 01 2024', '01:28 AM'),
(57, 'HuHireka', 'un2kt788', 'dsdsds', 'un2kt7px', 'VHXQ6s6O', 'Mon Jan 01 2024', '01:29 AM'),
(58, 'H1mCJuR5', 'un2kt788', 'dsds', 'un2kt7px', 'VHXQ6s6O', 'Mon Jan 01 2024', '01:33 AM'),
(59, 'sZ2pDmLB', 'un2kt788', 'dsdsd', 'un2kt7px', 'VHXQ6s6O', 'Mon Jan 01 2024', '01:41 AM'),
(60, 'opnrdGM3', 'un2kt788', 'dsdsddddd', 'un2kt7px', 'VHXQ6s6O', 'Mon Jan 01 2024', '01:41 AM'),
(61, '2rBksQDy', 'un2kt788', 'yes', 'un2kt7px', 'VHXQ6s6O', 'Mon Jan 01 2024', '02:10 AM'),
(62, '3RD5ssFz', 'un2kt788', 'oy tol', 'un2kt7px', 'VHXQ6s6O', 'Mon Jan 01 2024', '02:11 AM'),
(63, 'WinMBAbM', 'un2kt788', 'perd musta', 'un2kt7px', 'VHXQ6s6O', 'Mon Jan 01 2024', '02:12 AM'),
(64, 'af0YKtJU', 'un2kt788', 'dsdsds', 'un2kt7px', 'VHXQ6s6O', 'Mon Jan 01 2024', '02:15 AM'),
(65, 'HuxWRuOg', 'un2kt788', 'dsdsds', 'un2kt7px', 'VHXQ6s6O', 'Mon Jan 01 2024', '02:15 AM'),
(66, 'KXVRVva5', 'un2kt788', 'dsdsds', 'un2kt7px', 'VHXQ6s6O', 'Mon Jan 01 2024', '02:17 AM'),
(67, 'ZemUP8kh', 'un2kt788', 'sasas', 'un2kt7px', 'VHXQ6s6O', 'Mon Jan 01 2024', '02:18 AM'),
(68, 'Xtn7jems', 'un2kt788', 'uy tolss', 'VHXQ6s6O', 'un2kt7px', 'Tue Jan 02 2024', '11:43 AM'),
(69, 'aTU9QaaZ', 'un2kt788', 'uyy par', 'un2kt7px', 'VHXQ6s6O', 'Tue Jan 02 2024', '12:01 PM'),
(70, 'EQvVi1OE', 'un2kt788', 'par', 'un2kt7px', 'VHXQ6s6O', 'Tue Jan 02 2024', '12:02 PM'),
(71, 'qAqVUMUp', 'un2kt788', 'shees', 'VHXQ6s6O', 'un2kt7px', 'Tue Jan 02 2024', '12:13 PM'),
(72, 'w0eIqTeP', 'un2kt788', 'uyy tollsss', 'VHXQ6s6O', 'un2kt7px', 'Mon Jan 08 2024', '07:09 PM'),
(73, '1m3YZCLQ', 'un2kt788', 'ano na lann', 'un2kt7px', 'VHXQ6s6O', 'Mon Jan 08 2024', '07:09 PM'),
(74, 'H5Rz4IyZ', '116bdgh6', 'oyy mak', 'un2kt7px', '116bd490', 'Mon Jan 08 2024', '07:12 PM'),
(75, 'fDOTjXl7', '116bdgh6', 'toll kamusta', 'un2kt7px', '116bd490', 'Mon Jan 08 2024', '07:15 PM'),
(76, 'KQcYjs39', 'un2kt788', 'hashha\n', 'un2kt7px', 'VHXQ6s6O', 'Mon Jan 08 2024', '09:09 PM'),
(77, 'N5jNAUF6', 'khntPBOy', 'New', 'un2kt7px', '077e0510', 'Fri Jan 12 2024', '01:52 PM'),
(78, 'aPkHuIEf', '3FPGmFm9', 'hello', 'VHXQ6s6O', '077e0510', 'Fri Jan 12 2024', '01:52 PM'),
(79, '1mzZZNHy', 'un2kt788', 'OK na', 'VHXQ6s6O', 'un2kt7px', 'Fri Jan 12 2024', '01:59 PM'),
(80, 'atLrqraO', 'un2kt788', 'paa', 'un2kt7px', 'VHXQ6s6O', 'Fri Jan 12 2024', '01:59 PM'),
(81, 'Ejv0Iq3J', 'un2kt788', 'new', 'VHXQ6s6O', 'un2kt7px', 'Fri Jan 12 2024', '02:00 PM'),
(82, 'o4lHxS42', 'un2kt788', 'allan cutie', 'un2kt7px', 'VHXQ6s6O', 'Wed Jan 24 2024', '02:58 AM'),
(83, 'ynb8xaqy', 'un2kt788', 'ggg', 'VHXQ6s6O', 'un2kt7px', 'Wed Jan 24 2024', '02:59 AM'),
(84, 'MtYjlgzK', 'un2kt788', '123', 'VHXQ6s6O', 'un2kt7px', 'Wed Jan 24 2024', '02:59 AM'),
(85, 'oI9lntG4', 'un2kt788', '1111', 'VHXQ6s6O', 'un2kt7px', 'Wed Jan 24 2024', '02:59 AM'),
(86, 'rlNL9V5z', 'un2kt788', 'dsdsd', 'VHXQ6s6O', 'un2kt7px', 'Wed Jan 24 2024', '03:31 AM'),
(87, 'mKvzXkeZ', 'un2kt788', 'dsdsddddd', 'VHXQ6s6O', 'un2kt7px', 'Wed Jan 24 2024', '03:32 AM'),
(88, 'REbNgCtS', 'un2kt788', 'dsdsfff', 'un2kt7px', 'VHXQ6s6O', 'Wed Jan 24 2024', '03:34 AM'),
(89, '5HDcku39', 'ZQNqAzq6', 'Hi', '43WRp7AF', 'un2kt7px', 'Wed Jan 24 2024', '05:01 AM'),
(90, 'hti8MU5V', 'ZgSA6wvu', 'sdfsdfsdfsdf\n', 'un2kt7px', '8J26Xi2P', 'Wed Jan 24 2024', '07:31 PM'),
(91, 'wsBjbtrT', '3dTUGNks', 'TESST\n', 'un2kt7px', 'ced97302', 'Wed Jan 24 2024', '07:31 PM'),
(92, 'qvyppK29', 'un2kt788', 'TESST\n', 'un2kt7px', 'VHXQ6s6O', 'Wed Jan 24 2024', '07:32 PM'),
(93, 'QwFBopP9', 'un2kt788', 'TESST\n', 'un2kt7px', 'VHXQ6s6O', 'Wed Jan 24 2024', '07:32 PM'),
(94, '9YOT9X9D', 'un2kt788', 'TESST\n', 'un2kt7px', 'VHXQ6s6O', 'Wed Jan 24 2024', '07:32 PM'),
(95, 'R56txUAC', 'un2kt788', 'TESST\n', 'un2kt7px', 'VHXQ6s6O', 'Wed Jan 24 2024', '07:32 PM'),
(96, 'pv6MLtQn', 'un2kt788', 'ASDASDASD\n', 'VHXQ6s6O', 'un2kt7px', 'Wed Jan 24 2024', '07:33 PM'),
(97, 'fJAjvwo6', 'un2kt788', 'TESST\n', 'un2kt7px', 'VHXQ6s6O', 'Wed Jan 24 2024', '07:33 PM'),
(98, '1qDlBAjP', 'kJAhSFzK', 'neal', 'un2kt7px', 'SNSBjwH9', 'Sun Jan 28 2024', '10:04 PM'),
(99, '5gWbq7ia', 'kJAhSFzK', 'rumar', 'SNSBjwH9', 'un2kt7px', 'Sun Jan 28 2024', '10:04 PM'),
(100, 'QJeoHI7p', '3FPGmFm9', 'uyy bro\n', '077e0510', 'VHXQ6s6O', 'Thu Feb 15 2024', '04:40 PM'),
(101, 'DgvJNN6v', '3FPGmFm9', 'uy lannn', 'VHXQ6s6O', '077e0510', 'Thu Feb 15 2024', '04:40 PM'),
(102, '3q5SfOKA', '3FPGmFm9', 'dsads', 'VHXQ6s6O', '077e0510', 'Thu Feb 15 2024', '04:41 PM'),
(103, '7PjPV1bP', '3FPGmFm9', 'hey bro\n', '077e0510', 'VHXQ6s6O', 'Thu Feb 15 2024', '04:41 PM'),
(104, 'DvhrfMlj', '3FPGmFm9', 'panget mo boy', 'VHXQ6s6O', '077e0510', 'Thu Feb 15 2024', '04:41 PM'),
(105, 'WKgXXxqB', '3FPGmFm9', 'dsds', '077e0510', 'VHXQ6s6O', 'Thu Feb 15 2024', '04:43 PM'),
(106, 'Po7cOU3f', '3FPGmFm9', 'dsadsad', 'VHXQ6s6O', '077e0510', 'Thu Feb 15 2024', '04:43 PM');

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `id` int(10) NOT NULL,
  `postID` varchar(10) NOT NULL,
  `acctID` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `timePosted` varchar(10) NOT NULL,
  `datePosted` varchar(50) NOT NULL,
  `postContent` varchar(100) NOT NULL,
  `replyID` varchar(10) NOT NULL,
  `imageID` varchar(10) NOT NULL,
  `fileID` varchar(10) NOT NULL,
  `heartCount` int(10) NOT NULL,
  `likeCount` int(10) NOT NULL,
  `classCode` varchar(10) NOT NULL,
  `subjectName` varchar(50) NOT NULL,
  `postType` varchar(20) NOT NULL,
  `quizID` varchar(10) NOT NULL,
  `schedID` varchar(10) NOT NULL,
  `duration` int(10) NOT NULL,
  `random` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`id`, `postID`, `acctID`, `name`, `timePosted`, `datePosted`, `postContent`, `replyID`, `imageID`, `fileID`, `heartCount`, `likeCount`, `classCode`, `subjectName`, `postType`, `quizID`, `schedID`, `duration`, `random`) VALUES
(1, '5B7Rww8K', 'un2kt7px', 'Rumar C. Pamparo', '09:52 PM', 'Wed Dec 06 2023', 'Multiple Images', '5B7Rww8K', '5B7Rww8K', 'none', 0, 0, 'IT-CAP2', 'CAPSTONE 2', 'normal', 'none', 'none', 0, ''),
(3, 'GoWYC8s', 'un2kt7px', 'Rumar C. Pamparo', '08:51 PM', 'Thu Dec 07 2023', 'Single Images', 'GoWYC8sL', 'BgJ3t4MP', 'none', 0, 0, 'IT-CAP2', 'CAPSTONE 2', 'normal', 'none', 'none', 0, ''),
(4, 'lz8YnK4M', 'un2kt7px', 'Rumar C. Pamparo', '08:52 PM', 'Thu Dec 07 2023', 'Single Files', 'lz8YnK4M', 'lNp3faZo', 'none', 0, 0, 'IT-ELECT2', 'ENTREPRENEURSHIP 2', 'normal', 'none', 'none', 0, ''),
(5, 'th5tRTPX', 'un2kt7px', 'Rumar C. Pamparo', '08:54 PM', 'Thu Dec 07 2023', 'Multi Files', 'th5tRTPX', 'none', 'none', 0, 0, 'IT-ELECT2', 'ENTREPRENEURSHIP 2', 'normal', 'none', 'none', 0, ''),
(258, 'mORXxJYo', 'un2kt7px', 'Rumar C. Pamparo', '07:50 PM', 'Sun Apr 14 2024', 'test', 'mORXxJYo', 'mORXxJYo', 'none', 0, 0, 'IT-CAP2', 'CAPSTONE 2', 'normal', 'none', 'none', 0, 'none'),
(259, 'dNf522yo', 'un2kt7px', 'Rumar C. Pamparo', '08:02 PM', 'Sun Apr 14 2024', 'try nga', 'dNf522yo', 'dNf522yo', 'none', 0, 0, 'IT-CAP2', 'CAPSTONE 2', 'normal', 'none', 'none', 0, 'none'),
(260, 'Bd4lkWFD', 'un2kt7px', 'Rumar C. Pamparo', '08:04 PM', 'Sun Apr 14 2024', 'test1', 'Bd4lkWFD', 'Bd4lkWFD', 'none', 0, 0, 'IT-CAP2', 'CAPSTONE 2', 'normal', 'none', 'none', 0, 'none'),
(261, 'QhjAYld2', 'un2kt7px', 'Rumar C. Pamparo', '08:11 PM', 'Sun Apr 14 2024', 'tes3', 'QhjAYld2', 'QhjAYld2', 'none', 0, 0, 'IT-CAP2', 'CAPSTONE 2', 'normal', 'none', 'none', 0, 'none'),
(262, 'A0eXOL80', 'un2kt7px', 'Rumar C. Pamparo', '08:20 PM', 'Sun Apr 14 2024', 'new', 'A0eXOL80', 'A0eXOL80', 'none', 0, 0, 'IT-CAP2', 'CAPSTONE 2', 'normal', 'none', 'none', 0, 'none'),
(263, 'A0eXOL80', 'un2kt7px', 'Rumar C. Pamparo', '08:21 PM', 'Sun Apr 14 2024', 'sample new post', 'A0eXOL80', 'A0eXOL80', 'none', 0, 0, 'IT-CAP2', 'CAPSTONE 2', 'normal', 'none', 'none', 0, 'none'),
(264, 'Lcd8ALoZ', 'un2kt7px', 'Rumar C. Pamparo', '08:21 PM', 'Sun Apr 14 2024', '', 'Lcd8ALoZ', 'Lcd8ALoZ', 'none', 0, 0, 'IT-CAP2', 'CAPSTONE 2', 'normal', 'none', 'none', 0, 'none'),
(265, 'Lcd8ALoZ', 'un2kt7px', 'Rumar C. Pamparo', '08:22 PM', 'Sun Apr 14 2024', 'delete', 'Lcd8ALoZ', 'Lcd8ALoZ', 'none', 0, 0, 'IT-CAP2', 'CAPSTONE 2', 'normal', 'none', 'none', 0, 'none'),
(266, 'lOGS8BIH', 'un2kt7px', 'Rumar C. Pamparo', '08:25 PM', 'Sun Apr 14 2024', 'nice', 'lOGS8BIH', 'lOGS8BIH', 'none', 0, 0, 'IT-CAP2', 'CAPSTONE 2', 'normal', 'none', 'none', 0, 'none'),
(267, 'lOGS8BIH', 'un2kt7px', 'Rumar C. Pamparo', '08:25 PM', 'Sun Apr 14 2024', 'nice one', 'lOGS8BIH', 'lOGS8BIH', 'none', 0, 0, 'IT-CAP2', 'CAPSTONE 2', 'normal', 'none', 'none', 0, 'none'),
(268, 'lfTJi63D', 'un2kt7px', 'Rumar C. Pamparo', '08:32 PM', 'Sun Apr 14 2024', 'SUPER MULTIPLE', 'lfTJi63D', 'lfTJi63D', 'none', 0, 0, 'IT-CAP2', 'CAPSTONE 2', 'normal', 'none', 'none', 0, 'none');

-- --------------------------------------------------------

--
-- Table structure for table `questionbank`
--

CREATE TABLE `questionbank` (
  `id` int(11) NOT NULL,
  `bankID` varchar(11) NOT NULL,
  `bankTitle` varchar(100) NOT NULL,
  `subjectName` varchar(100) NOT NULL,
  `questionID` varchar(10) NOT NULL,
  `totalPoints` int(10) NOT NULL,
  `totalQuestions` int(10) NOT NULL,
  `time` varchar(20) NOT NULL,
  `date` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questionbank`
--

INSERT INTO `questionbank` (`id`, `bankID`, `bankTitle`, `subjectName`, `questionID`, `totalPoints`, `totalQuestions`, `time`, `date`) VALUES
(2, 'MBNeJZQ0', 'try', 'PRINCIPLES AND STRATEGIES IN TEACHING', 'MBNeJZQ0', 2, 2, '08:13 PM', 'Tue Jan 16 2024'),
(3, 'ztB1D6Ox', 'try', 'ENTREPRENEURSHIP', 'ztB1D6Ox', 1, 1, '07:40 PM', 'Wed Jan 17 2024'),
(4, 'HEpszhsE', 'next', 'ENTREPRENEURSHIP', 'HEpszhsE', 2, 2, '09:10 PM', 'Wed Jan 17 2024'),
(5, 'KRkYfT1v', 'new', 'ENTREPRENEURSHIP', 'KRkYfT1v', 2, 2, '06:24 PM', 'Thu Jan 18 2024'),
(6, '3m68dtjI', 'new one', 'ENTREPRENEURSHIP', '3m68dtjI', 2, 2, '06:27 PM', 'Thu Jan 18 2024'),
(7, 'KVx1AwGn', 'uu', 'ENTREPRENEURSHIP', 'KVx1AwGn', 1, 1, '03:12 AM', 'Tue Jan 23 2024'),
(8, 'UICd4r8F', 'New Quiz', 'CAPSTONE 1', 'UICd4r8F', 3, 3, '04:46 AM', 'Wed Jan 24 2024'),
(9, 'ZSBaTJCW', 'Quiz 2', 'CAPSTONE 1', 'ZSBaTJCW', 2, 2, '04:54 AM', 'Wed Jan 24 2024'),
(10, 'wOeytUiP', 'new 1 ', 'CAPSTONE 2', 'wOeytUiP', 3, 3, '09:43 PM', 'Sun Jan 28 2024'),
(11, 'X6QZ7T5V', 'cp1 quiz', 'NATIONAL SERVICE TRAINING PROGRAM 2', 'X6QZ7T5V', 2, 2, '09:48 PM', 'Sun Jan 28 2024'),
(12, 'vHg1ETZs', 'myQuiz', 'CAPSTONE 2', 'vHg1ETZs', 4, 4, '04:35 PM', 'Thu Feb 15 2024');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `questionID` varchar(10) NOT NULL,
  `questionNumber` int(10) NOT NULL,
  `questionContent` varchar(100) NOT NULL,
  `questionType` varchar(20) NOT NULL,
  `points` int(10) NOT NULL,
  `required` tinyint(1) NOT NULL,
  `keySensitive` tinyint(1) NOT NULL,
  `questionAnswerText` varchar(100) NOT NULL,
  `numberOfAns` int(3) NOT NULL,
  `choicesID` varchar(10) NOT NULL,
  `imageID` varchar(10) NOT NULL,
  `fillLayoutID` varchar(10) NOT NULL,
  `subjectName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `questionID`, `questionNumber`, `questionContent`, `questionType`, `points`, `required`, `keySensitive`, `questionAnswerText`, `numberOfAns`, `choicesID`, `imageID`, `fillLayoutID`, `subjectName`) VALUES
(1, 'n5TKgI1A', 1, 'q1', 'text', 2, 0, 0, 'q1', 0, 'none', 'none', 'none', 'CAPSTONE 1'),
(2, 'n5TKgI1A', 2, 'q2', 'text', 2, 0, 0, 'q2', 0, 'none', 'none', 'none', 'CAPSTONE 1'),
(3, 'kciccHhl', 1, 'sdas', 'text', 1, 0, 0, 'aads', 0, 'none', 'none', 'none', 'CAPSTONE 1'),
(4, 'kciccHhl', 2, 'dasd', 'text', 1, 0, 0, 'asdasdas', 0, 'none', 'none', 'none', 'CAPSTONE 1'),
(5, 'eFRypAzH', 1, 'qq1', 'text', 1, 0, 0, 'qaq', 0, 'none', 'none', 'none', 'PRINCIPLES AND STRATEGIES IN TEACHING'),
(7, 'Ksk6Mzis', 1, 'aaa', 'text', 1, 0, 0, 'aaa', 0, 'none', 'none', 'none', 'CAPSTONE 1'),
(8, 'Ksk6Mzis', 2, 'sasa', 'text', 1, 0, 0, 'sas', 0, 'none', 'none', 'none', 'CAPSTONE 1'),
(9, 'Ksk6Mzis', 3, 'asas', 'text', 1, 0, 0, 'asa', 0, 'none', 'none', 'none', 'CAPSTONE 1'),
(10, 'Ksk6Mzis', 4, 'sasa', 'text', 1, 0, 0, 'saas', 0, 'none', 'none', 'none', 'CAPSTONE 1'),
(11, 'PoDIxrM7', 1, 'sas', 'text', 1, 0, 0, 'asasa', 0, 'none', 'none', 'none', 'CAPSTONE 1'),
(12, 'PoDIxrM7', 2, 'asaas', 'text', 1, 0, 0, 'sasas', 0, 'none', 'none', 'none', 'CAPSTONE 1'),
(13, 'PoDIxrM7', 3, 'sasas', 'text', 1, 0, 0, 'sasa', 0, 'none', 'none', 'none', 'CAPSTONE 1'),
(14, 'PoDIxrM7', 4, 'asaas', 'text', 1, 0, 0, 'sas', 0, 'none', 'none', 'none', 'CAPSTONE 1'),
(15, 'kRNZ6Pq6', 1, 'ss', 'text', 1, 0, 0, 'ssasas', 0, 'none', 'none', 'none', 'CAPSTONE 1'),
(16, 'kRNZ6Pq6', 2, 'saasa', 'text', 1, 0, 0, 'sasa', 0, 'none', 'none', 'none', 'CAPSTONE 1'),
(17, 'kRNZ6Pq6', 3, 'sasasa', 'text', 1, 0, 0, 'sasa', 0, 'none', 'none', 'none', 'CAPSTONE 1'),
(18, 'kRNZ6Pq6', 4, 'sasa', 'True Or False', 1, 0, 0, '1', 0, 'none', 'none', 'none', 'CAPSTONE 1'),
(19, 'kRNZ6Pq6', 5, 'sasasa', 'True Or False', 1, 0, 0, '0', 0, 'none', 'none', 'none', 'CAPSTONE 1'),
(20, 'bFONa9iv', 1, 'aaa', 'text', 1, 0, 0, 'bbb', 0, 'none', 'none', 'none', 'SYSTEM ADMINISTRATION AND MAINTENANCE'),
(21, 'xzJr9GpL', 1, 'what is my name?', 'text', 2, 1, 1, 'Rumar Pamparo', 0, 'none', 'none', 'none', 'CAPSTONE 1'),
(22, 'xzJr9GpL', 2, 'What is my Last name?', 'text', 2, 1, 0, 'Pamparo', 0, 'none', '3vMf5DH8', 'none', 'CAPSTONE 1'),
(23, 'xzJr9GpL', 3, 'my fave color?', 'choices', 2, 1, 0, 'none', 0, 'EfrFO1iP', 'none', 'none', 'CAPSTONE 1'),
(24, 'xzJr9GpL', 4, 'my cat name?', 'choices', 2, 0, 0, 'none', 0, 'uMW04JPh', 'uMW04JPh', 'none', 'CAPSTONE 1'),
(25, 'xzJr9GpL', 5, 'none', 'fill', 2, 1, 1, 'none', 0, 'none', 'none', 'EJcb5AZC', 'CAPSTONE 1'),
(26, 'xzJr9GpL', 6, 'none', 'fill', 1, 1, 1, 'none', 0, 'none', 'TRhAgqcV', 'TRhAgqcV', 'CAPSTONE 1'),
(27, 'xzJr9GpL', 7, 'POgi aako diba?', 'True Or False', 1, 1, 0, '0', 0, 'none', 'none', 'none', 'CAPSTONE 1'),
(28, 'xzJr9GpL', 8, 'panget bako?', 'True Or False', 2, 1, 0, '1', 0, 'none', 'none', 'none', 'CAPSTONE 1'),
(29, 'bbLmxfIX', 1, 'jrtyujtujt', 'choices', 2, 1, 0, 'none', 0, 'oWGbvF3w', 'none', 'none', 'ENTREPRENEURSHIP'),
(30, 'bbLmxfIX', 3, 'yut6uijtyi', 'True Or False', 1, 1, 0, '1', 0, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(31, 'bbLmxfIX', 2, 'none', 'fill', 1, 1, 1, 'none', 0, 'none', 'none', 'aHcysuQC', 'ENTREPRENEURSHIP'),
(32, 'zgqARuqP', 1, 'yurtyuyu', 'text', 1, 1, 1, 'yuirui', 0, 'none', 'none', 'none', 'CAPSTONE 1'),
(33, 'zgqARuqP', 2, 'yityi', 'text', 1, 1, 1, 'ityiit', 0, 'none', 'none', 'none', 'CAPSTONE 1'),
(34, 'lHkep6VL', 1, 'rumar', 'text', 1, 0, 0, 'rumar', 0, 'none', 'none', 'none', 'CAPSTONE 1'),
(35, 'lHkep6VL', 2, 'pamparo', 'text', 4, 0, 0, 'pamparo', 0, 'none', 'none', 'none', 'CAPSTONE 1'),
(36, 'mPNp1Gpi', 1, 'what is dog?', 'choices', 1, 0, 0, 'none', 1, 'YrtLqXc7', 'none', 'none', 'CAPSTONE 1'),
(37, 'mPNp1Gpi', 2, 'what is my name?', 'choices', 1, 0, 0, 'none', 2, '6HsoVA6w', 'none', 'none', 'CAPSTONE 1'),
(38, 'zIw4SgVX', 1, 'try lang', 'choices', 1, 1, 0, 'none', 0, 'HwEA6i17', 'none', 'none', 'CAPSTONE 1'),
(39, 'doHqHU0T', 1, 'dsdsds', 'choices', 1, 0, 0, 'none', 0, 'EOh0GdrX', 'none', 'none', 'CAPSTONE 1'),
(40, 'doHqHU0T', 5, 'dsds', 'choices', 1, 0, 0, 'none', 0, '5znT5aI4', 'none', 'none', 'CAPSTONE 1'),
(41, 'doHqHU0T', 6, 'dsds', 'choices', 1, 0, 0, 'none', 0, 'mVTxL3mM', 'none', 'none', 'CAPSTONE 1'),
(42, 'doHqHU0T', 7, 'dsdsds', 'choices', 1, 0, 0, 'none', 0, 'D0UpHZfI', 'none', 'none', 'CAPSTONE 1'),
(43, 'doHqHU0T', 2, 'dsds', 'choices', 1, 0, 0, 'none', 2, 'zyQPWPsh', 'none', 'none', 'CAPSTONE 1'),
(44, 'doHqHU0T', 8, 'dsdsd', 'choices', 1, 0, 0, 'none', 0, 'WNjEOJEW', 'none', 'none', 'CAPSTONE 1'),
(45, 'doHqHU0T', 9, 'dsdsds', 'choices', 1, 0, 0, 'none', 32, 'sVFR0jcv', 'none', 'none', 'CAPSTONE 1'),
(46, 'doHqHU0T', 3, 'dsdsds', 'choices', 1, 0, 0, 'none', 4, '3NlXsJTs', 'none', 'none', 'CAPSTONE 1'),
(47, 'doHqHU0T', 4, 'dsdsd', 'choices', 1, 0, 0, 'none', 0, 'V90ODOhH', 'none', 'none', 'CAPSTONE 1'),
(48, 'GcdMblht', 1, 'dsds', 'text', 1, 0, 0, 'dsds', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(49, 'GcdMblht', 2, 'dsds', 'text', 1, 0, 0, 'dsdsds', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(50, '80yMURt9', 1, 'none', 'fill', 1, 1, 0, 'none', 1, 'none', 'none', 'XLYeJXnZ', 'CAPSTONE 1'),
(51, '80yMURt9', 2, 'none', 'fill', 1, 1, 0, 'none', 2, 'none', 'none', 'pOlWtzB4', 'CAPSTONE 1'),
(52, 'QF8TQwkL', 1, 'none', 'fill', 1, 0, 0, 'none', 3, 'none', 'none', 'RUOiLcPE', 'CAPSTONE 1'),
(53, '5wN0FIPg', 1, 'none', 'fill', 1, 0, 0, 'none', 3, 'none', 'none', 'YXWApu2U', 'CAPSTONE 1'),
(54, 'hXqPgnW9', 1, 'rumar', 'text', 3, 1, 0, 'rumar', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(55, 'hXqPgnW9', 6, 'cge', 'True Or False', 1, 0, 0, '1', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(56, 'hXqPgnW9', 3, 'what is?', 'choices', 1, 0, 0, 'none', 2, 'YAvXGiCn', 'none', 'none', 'CAPSTONE 1'),
(57, 'hXqPgnW9', 2, 'pamparo', 'text', 1, 0, 0, 'pamparo', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(58, 'hXqPgnW9', 4, 'gdgdgsds', 'choices', 1, 0, 0, 'none', 1, 'YDkFrBgv', 'none', 'none', 'CAPSTONE 1'),
(59, 'hXqPgnW9', 5, 'none', 'fill', 1, 0, 0, 'none', 2, 'none', 'none', 'lskUhV0E', 'CAPSTONE 1'),
(60, 'bo8vvHHC', 1, 'TORF Q', 'True Or False', 6, 1, 0, '1', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(61, 'bo8vvHHC', 2, 'TOEFK', 'True Or False', 3, 1, 0, '0', 1, 'none', 'kpNeEbOA', 'none', 'CAPSTONE 1'),
(62, 'V6RgKaoR', 1, 'dsds', 'text', 1, 1, 1, 'dsdsd', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(63, 'V6RgKaoR', 2, 'dddd', 'text', 1, 0, 0, 'dddsds', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(64, 'V6RgKaoR', 3, 'fdfdfd', 'text', 1, 0, 0, 'dsdsds', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(65, 'V6RgKaoR', 4, 'dsd', 'text', 1, 0, 0, 'dsd', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(66, 'eAzK97X0', 1, 'idk', 'text', 1, 1, 1, 'idk', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(67, 'eAzK97X0', 2, 'what is a', 'choices', 1, 1, 0, 'none', 1, 'RT1ToWbM', 'none', 'none', 'CAPSTONE 1'),
(68, 'Zr26cq0S', 1, 'q1', 'text', 1, 1, 1, 'ans1', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(69, 'Zr26cq0S', 2, 'q2', 'text', 1, 0, 0, 'ans 2', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(70, '5xaMUrnb', 1, 'q1', 'text', 1, 0, 0, 'ans1', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(71, '5xaMUrnb', 2, 'q2', 'text', 1, 0, 0, 'ans 2', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(72, '0DlpGmQZ', 1, 'q1', 'text', 1, 0, 0, 'a1', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(73, '0DlpGmQZ', 2, 'q2', 'text', 1, 0, 0, 'a2', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(74, 'MBNeJZQ0', 1, 'q1', 'text', 1, 0, 0, 'a1', 1, 'none', 'none', 'none', 'PRINCIPLES AND STRATEGIES IN TEACHING'),
(75, 'MBNeJZQ0', 2, 'q2', 'text', 1, 0, 0, 'a2', 1, 'none', 'none', 'none', 'PRINCIPLES AND STRATEGIES IN TEACHING'),
(76, 'ztB1D6Ox', 1, 'q1', 'enumeration', 1, 0, 0, 'a1', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(77, 'dtYyYLar', 1, 'q2', 'enumeration', 1, 0, 0, 'a2', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(78, 'dtYyYLar', 2, 'q3', 'enumeration', 1, 0, 0, 'q4', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(79, 'KRkYfT1v', 1, 'qq11', 'enumeration', 1, 0, 0, 'zaaa1', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(80, 'KRkYfT1v', 2, 'qq22', 'enumeration', 1, 0, 0, 'aa222', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(81, '3m68dtjI', 1, 'qqqwqwq', 'enumeration', 1, 0, 0, 'wqwqwq', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(82, '3m68dtjI', 2, 'dsds', 'enumeration', 1, 0, 0, 'dsdss', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(83, 'EhdZsd0a', 1, 'q1', 'enumeration', 1, 0, 0, 'a1', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(84, 'EhdZsd0a', 2, 'qqqwqwq', 'enumeration', 1, 0, 0, 'wqwqwq', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(85, 'EhdZsd0a', 3, 'dsds', 'enumeration', 1, 0, 0, 'dsdss', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(86, 'FlzwiDL6', 1, 'q1', 'enumeration', 1, 0, 0, 'a1', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(87, 'FlzwiDL6', 2, 'qqqwqwq', 'enumeration', 1, 0, 0, 'wqwqwq', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(88, 'FlzwiDL6', 3, 'dsds', 'enumeration', 1, 0, 0, 'dsdss', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(89, 'KVx1AwGn', 1, 'yuguyh', 'enumeration', 1, 1, 0, 'yy1', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(90, 'BwZIUHhX', 1, 'yuguyh', 'enumeration', 1, 1, 0, 'yy1', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(91, 'BwZIUHhX', 2, 'q1', 'enumeration', 1, 0, 0, 'a1', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(92, 'BwZIUHhX', 4, 'qq22', 'enumeration', 1, 0, 0, 'aa222', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(93, 'BwZIUHhX', 3, 'qq11', 'enumeration', 1, 0, 0, 'zaaa1', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(94, '2hegz6x0', 1, 'q1', 'enumeration', 1, 0, 0, 'a1', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(95, '2hegz6x0', 2, 'qq11', 'enumeration', 1, 0, 0, 'zaaa1', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(96, '2hegz6x0', 3, 'qq22', 'enumeration', 1, 0, 0, 'aa222', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(97, 'UICd4r8F', 1, 'Give example of Color', 'enumeration', 1, 0, 0, 'Blue', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(98, 'UICd4r8F', 2, 'What is the color of chair?', 'choices', 1, 0, 0, 'none', 1, 'C2pvxjPd', 'none', 'none', 'CAPSTONE 1'),
(99, 'UICd4r8F', 3, 'none', 'fill', 1, 0, 0, 'none', 2, 'none', 'none', 'wPgjtqxZ', 'CAPSTONE 1'),
(100, 'Fi2qqJFY', 1, 'Give example of Color', 'enumeration', 1, 0, 0, 'Blue', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(101, 'Fi2qqJFY', 2, 'What is the color of chair?', 'choices', 1, 0, 0, 'none', 1, 'C2pvxjPd', 'none', 'none', 'CAPSTONE 1'),
(102, 'Fi2qqJFY', 3, 'none', 'fill', 1, 0, 0, 'none', 2, 'none', 'none', 'wPgjtqxZ', 'CAPSTONE 1'),
(103, 'ZSBaTJCW', 2, 'what is the age of mark?', 'choices', 1, 0, 0, 'none', 1, 'MJAgSbEC', 'none', 'none', 'CAPSTONE 1'),
(104, 'ZSBaTJCW', 1, 'What is my name?', 'enumeration', 1, 0, 0, 'mark', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(105, 'u0j8FfTB', 1, 'what is the age of mark?', 'choices', 1, 0, 0, 'none', 1, 'MJAgSbEC', 'none', 'none', 'CAPSTONE 1'),
(106, 'u0j8FfTB', 2, 'What is my name?', 'enumeration', 1, 0, 0, 'mark', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(107, 'XnLKODbE', 1, 'what is the age of mark?', 'choices', 1, 0, 0, 'none', 1, 'MJAgSbEC', 'none', 'none', 'CAPSTONE 1'),
(108, 'XnLKODbE', 2, 'What is my name?', 'enumeration', 1, 0, 0, 'mark', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(109, '8C1dpAwa', 1, 'qqqwqwq', 'enumeration', 1, 0, 0, 'wqwqwq', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(110, '8C1dpAwa', 2, 'dsds', 'enumeration', 1, 0, 0, 'dsdss', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(111, 'mBd9IdW2', 1, 'qqqwqwq', 'enumeration', 1, 0, 0, 'wqwqwq', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(112, 'mBd9IdW2', 2, 'dsds', 'enumeration', 1, 0, 0, 'dsdss', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(113, 'QHsMKZZo', 1, 'yuguyh', 'enumeration', 1, 1, 0, 'yy1', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(114, '3udNFGOv', 1, 'qqqwqwq', 'enumeration', 1, 0, 0, 'wqwqwq', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(115, '3udNFGOv', 2, 'dsds', 'enumeration', 1, 0, 0, 'dsdss', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(116, 'I93t9Haj', 1, 'qqqwqwq', 'enumeration', 1, 0, 0, 'wqwqwq', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(117, 'I93t9Haj', 2, 'dsds', 'enumeration', 1, 0, 0, 'dsdss', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(118, '2eb7oSeH', 1, 'qqqwqwq', 'enumeration', 1, 0, 0, 'wqwqwq', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(119, '2eb7oSeH', 2, 'dsds', 'enumeration', 1, 0, 0, 'dsdss', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(120, 'GC25rAug', 1, 'qqqwqwq', 'enumeration', 1, 0, 0, 'wqwqwq', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(121, 'GC25rAug', 2, 'dsds', 'enumeration', 1, 0, 0, 'dsdss', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(122, 'rVq9z5hc', 1, 'qqqwqwq', 'enumeration', 1, 0, 0, 'wqwqwq', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(123, 'rVq9z5hc', 2, 'dsds', 'enumeration', 1, 0, 0, 'dsdss', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(124, '5rVKnLLR', 1, 'q1', 'enumeration', 1, 0, 0, 'a1', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(125, 'BAucYBYD', 1, 'qqqwqwq', 'enumeration', 1, 0, 0, 'wqwqwq', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(126, 'BAucYBYD', 2, 'dsds', 'enumeration', 1, 0, 0, 'dsdss', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(127, 'wOeytUiP', 1, '1+1 = ?', 'enumeration', 1, 0, 0, '2', 1, 'none', 'none', 'none', 'CAPSTONE 2'),
(128, 'wOeytUiP', 2, '2+2 =?', 'enumeration', 1, 0, 0, '4', 1, 'none', 'none', 'none', 'CAPSTONE 2'),
(129, 'wOeytUiP', 3, 'what is the color of grapes?', 'choices', 1, 0, 0, 'none', 1, 'DVKMM8l5', 'none', 'none', 'CAPSTONE 2'),
(130, 'I2MQyc9T', 1, '1+1 = ?', 'enumeration', 1, 0, 0, '2', 1, 'none', 'none', 'none', 'CAPSTONE 2'),
(131, 'I2MQyc9T', 2, '2+2 =?', 'enumeration', 1, 0, 0, '4', 1, 'none', 'none', 'none', 'CAPSTONE 2'),
(132, 'I2MQyc9T', 3, 'what is the color of grapes?', 'choices', 1, 0, 0, 'none', 1, 'DVKMM8l5', 'none', 'none', 'CAPSTONE 2'),
(133, 'X6QZ7T5V', 1, 'what is?', 'enumeration', 1, 0, 0, 'apple', 1, 'none', 'none', 'none', 'NATIONAL SERVICE TRAINING PROGRAM 2'),
(134, 'X6QZ7T5V', 2, 'blue is?', 'choices', 1, 0, 0, 'none', 1, 'pQWOSluq', 'none', 'none', 'NATIONAL SERVICE TRAINING PROGRAM 2'),
(135, 'TLKUVR7R', 1, 'q1', 'enumeration', 1, 0, 0, 'a1', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(136, 'lclnS76e', 1, 'q1', 'enumeration', 1, 0, 0, 'a1', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(137, 'Ea5VXbZW', 1, 'q1', 'enumeration', 1, 0, 0, 'a1', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(138, 'Ea5VXbZW', 2, '1+1 = ?', 'enumeration', 1, 0, 0, '2', 1, 'none', 'none', 'none', 'CAPSTONE 2'),
(139, 'Ea5VXbZW', 3, '2+2 =?', 'enumeration', 1, 0, 0, '4', 1, 'none', 'none', 'none', 'CAPSTONE 2'),
(140, 'Ea5VXbZW', 4, 'what is the color of grapes?', 'choices', 1, 0, 0, 'none', 1, 'DVKMM8l5', 'none', 'none', 'CAPSTONE 2'),
(141, '95Q4bSLS', 1, 'q1', 'enumeration', 1, 0, 0, 'a1', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(142, '95Q4bSLS', 2, 'what is the color of grapes?', 'choices', 1, 0, 0, 'none', 1, 'DVKMM8l5', 'none', 'none', 'CAPSTONE 2'),
(143, 'qin8rID8', 1, 'q1', 'enumeration', 1, 0, 0, 'a1', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(144, 'qin8rID8', 2, 'what is the color of grapes?', 'choices', 1, 0, 0, 'none', 1, 'DVKMM8l5', 'none', 'none', 'CAPSTONE 2'),
(145, 'qin8rID8', 3, '1+1 = ?', 'enumeration', 1, 0, 0, '2', 1, 'none', 'none', 'none', 'CAPSTONE 2'),
(146, 'qin8rID8', 4, '2+2 =?', 'enumeration', 1, 0, 0, '4', 1, 'none', 'none', 'none', 'CAPSTONE 2'),
(147, 'aa96zKC3', 1, '1+1 = ?', 'enumeration', 1, 0, 0, '2', 1, 'none', 'none', 'none', 'CAPSTONE 2'),
(148, 'aa96zKC3', 2, '2+2 =?', 'enumeration', 1, 0, 0, '4', 1, 'none', 'none', 'none', 'CAPSTONE 2'),
(149, 'aa96zKC3', 3, 'what is the color of grapes?', 'choices', 1, 0, 0, 'none', 1, 'DVKMM8l5', 'none', 'none', 'CAPSTONE 2'),
(150, '61oE4vgu', 1, '1+1 = ?', 'enumeration', 1, 0, 0, '2', 1, 'none', 'none', 'none', 'CAPSTONE 2'),
(151, '61oE4vgu', 2, 'what is the color of grapes?', 'choices', 1, 0, 0, 'none', 1, 'DVKMM8l5', 'none', 'none', 'CAPSTONE 2'),
(152, 'vHg1ETZs', 1, 'what is green?', 'enumeration', 1, 1, 1, 'dsadsa', 1, 'none', 'Y39N7rdw', 'none', 'CAPSTONE 2'),
(153, 'vHg1ETZs', 2, 'dsadsa', 'choices', 1, 0, 0, 'none', 1, 'ge7FseO5', 'none', 'none', 'CAPSTONE 2'),
(154, 'vHg1ETZs', 3, 'none', 'fill', 1, 0, 0, 'none', 1, 'none', 'none', 'TFpXUsSo', 'CAPSTONE 2'),
(155, 'vHg1ETZs', 4, 'sadasds', 'True Or False', 1, 0, 0, '1', 1, 'none', 'none', 'none', 'CAPSTONE 2'),
(156, '8ePQ5du4', 1, 'what is green?', 'enumeration', 1, 1, 1, 'dsadsa', 1, 'none', 'Y39N7rdw', 'none', 'CAPSTONE 2'),
(157, '8ePQ5du4', 2, 'dsadsa', 'choices', 1, 0, 0, 'none', 1, 'ge7FseO5', 'none', 'none', 'CAPSTONE 2'),
(158, '8ePQ5du4', 3, 'none', 'fill', 1, 0, 0, 'none', 1, 'none', 'none', 'TFpXUsSo', 'CAPSTONE 2'),
(159, '8ePQ5du4', 4, 'sadasds', 'True Or False', 1, 0, 0, '1', 1, 'none', 'none', 'none', 'CAPSTONE 2');

-- --------------------------------------------------------

--
-- Table structure for table `quiz`
--

CREATE TABLE `quiz` (
  `quizID` varchar(10) NOT NULL,
  `quizTitle` varchar(50) NOT NULL,
  `quizInstructions` varchar(100) NOT NULL,
  `questionID` varchar(10) NOT NULL,
  `subjectName` varchar(50) NOT NULL,
  `totalPoints` int(10) NOT NULL,
  `totalQuestions` int(10) NOT NULL,
  `time` varchar(20) NOT NULL,
  `date` varchar(20) NOT NULL,
  `duration` int(10) NOT NULL,
  `random` varchar(10) NOT NULL,
  `autoView` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quiz`
--

INSERT INTO `quiz` (`quizID`, `quizTitle`, `quizInstructions`, `questionID`, `subjectName`, `totalPoints`, `totalQuestions`, `time`, `date`, `duration`, `random`, `autoView`) VALUES
('1bRWITVE', 'new', 'dsa', '1bRWITVE', 'ENTREPRENEURSHIP', 2, 2, '03:35 AM', 'Mon Jan 22 2024', 0, '1', '0'),
('1Oc0uJXk', 'dsds', 'dsds', '1Oc0uJXk', 'ENTREPRENEURSHIP', 2, 2, '05:30 PM', 'Thu Jan 18 2024', 0, '1', '0'),
('2eb7oSeH', 'dsds', 'sds', '2eb7oSeH', 'ENTREPRENEURSHIP', 2, 2, '11:09 PM', 'Wed Jan 24 2024', 0, '1', '0'),
('2hegz6x0', 'ii', 'yy', '2hegz6x0', 'ENTREPRENEURSHIP', 3, 3, '03:17 AM', 'Tue Jan 23 2024', 0, '1', '0'),
('3udNFGOv', 'dsds', 'xcds', '3udNFGOv', 'ENTREPRENEURSHIP', 2, 2, '10:43 PM', 'Wed Jan 24 2024', 0, '1', '0'),
('5rVKnLLR', 'new1', 'new1', '5rVKnLLR', 'ENTREPRENEURSHIP', 1, 1, '06:51 PM', 'Sat Jan 27 2024', 0, '1', '0'),
('5wN0FIPg', 'fill3', 'fill3', '5wN0FIPg', 'CAPSTONE 1', 1, 1, '08:54 PM', 'Wed Jan 10 2024', 0, '', ''),
('61oE4vgu', '333', '22211', '61oE4vgu', 'CAPSTONE 2', 2, 2, '10:09 PM', 'Sun Jan 28 2024', 0, '1', '0'),
('7RT1GEjq', 'dsds', 'dsd', '7RT1GEjq', 'ENTREPRENEURSHIP', 2, 2, '05:20 PM', 'Thu Jan 18 2024', 0, '1', '0'),
('80yMURt9', 'fill test', 'fill test', '80yMURt9', 'CAPSTONE 1', 2, 2, '07:08 PM', 'Wed Jan 10 2024', 0, '', ''),
('8C1dpAwa', 'sched', 'sched', '8C1dpAwa', 'ENTREPRENEURSHIP', 2, 2, '09:20 PM', 'Wed Jan 24 2024', 0, '1', '0'),
('8ePQ5du4', 'ds', 'sds', '8ePQ5du4', 'CAPSTONE 2', 4, 4, '04:36 PM', 'Thu Feb 15 2024', 0, '1', '0'),
('8vnF2aqw', 'TEST QUIZZZ', 'TEST QUIZZZ', '8vnF2aqw', 'ENTREPRENEURSHIP', 3, 3, '01:32 AM', 'Tue Jan 23 2024', 2, '1', '0'),
('95Q4bSLS', '11', '22', '95Q4bSLS', 'CAPSTONE 2', 2, 2, '09:52 PM', 'Sun Jan 28 2024', 0, '1', '0'),
('A2w58lKx', 'adasd', 'dasd', 'A2w58lKx', 'ENTREPRENEURSHIP', 2, 2, '03:39 AM', 'Mon Jan 22 2024', 0, '1', '0'),
('a8q0tl12', 'sdsd', 'dfsdf', 'a8q0tl12', 'ENTREPRENEURSHIP', 2, 2, '05:21 PM', 'Thu Jan 18 2024', 0, '1', '0'),
('aa96zKC3', '22', '11', 'aa96zKC3', 'CAPSTONE 2', 3, 3, '10:08 PM', 'Sun Jan 28 2024', 0, '1', '0'),
('BAucYBYD', 'new quiz 1', 'Answer this', 'BAucYBYD', 'ENTREPRENEURSHIP', 2, 2, '09:40 PM', 'Sun Jan 28 2024', 0, '1', '0'),
('bbLmxfIX', 'ryetuerttyurt', 'tujrtujrttu', 'bbLmxfIX', 'ENTREPRENEURSHIP', 4, 3, '07:32 PM', 'Mon Jan 08 2024', 0, '', ''),
('Be2FdS94', 'dsds', 'dsds', 'Be2FdS94', 'ENTREPRENEURSHIP', 2, 2, '05:33 PM', 'Thu Jan 18 2024', 0, '1', '0'),
('bFONa9iv', 'asd', 'asd', 'bFONa9iv', 'SYSTEM ADMINISTRATION AND MAINTENANCE', 1, 1, '01:21 PM', 'Wed Dec 20 2023', 0, '', ''),
('bo8vvHHC', 'TORF TEST', 'TORF TEST', 'bo8vvHHC', 'CAPSTONE 1', 9, 2, '02:36 AM', 'Thu Jan 11 2024', 0, '', ''),
('BwZIUHhX', 'yq', 'iu', 'BwZIUHhX', 'ENTREPRENEURSHIP', 4, 4, '03:14 AM', 'Tue Jan 23 2024', 0, '1', '0'),
('ccoTQ4cw', 'dsds', 'dsds', 'ccoTQ4cw', 'ENTREPRENEURSHIP', 2, 2, '05:32 PM', 'Thu Jan 18 2024', 0, '1', '0'),
('ceHJ2Fo4', 'new', 'dsa', 'ceHJ2Fo4', 'ENTREPRENEURSHIP', 2, 2, '03:33 AM', 'Mon Jan 22 2024', 0, '1', '0'),
('doHqHU0T', 'tessss', 'sdsds', 'doHqHU0T', 'CAPSTONE 1', 11, 11, '10:59 AM', 'Tue Jan 09 2024', 0, '', ''),
('dtYyYLar', 'new new', 'new new', 'dtYyYLar', 'ENTREPRENEURSHIP', 2, 2, '05:36 PM', 'Thu Jan 18 2024', 0, '1', '0'),
('Ea5VXbZW', '11', '22', 'Ea5VXbZW', 'CAPSTONE 2', 4, 4, '09:51 PM', 'Sun Jan 28 2024', 0, '1', '0'),
('eAzK97X0', 'math', 'solve this', 'eAzK97X0', 'CAPSTONE 1', 2, 2, '02:06 PM', 'Fri Jan 12 2024', 0, '', ''),
('eFRypAzH', 'sa', 'sasa', 'eFRypAzH', 'PRINCIPLES AND STRATEGIES IN TEACHING', 2, 2, '03:13 PM', 'Fri Dec 15 2023', 0, '', ''),
('EhdZsd0a', 'dsdsds', 'esds', 'EhdZsd0a', 'ENTREPRENEURSHIP', 3, 3, '01:39 AM', 'Tue Jan 23 2024', 0, '1', '0'),
('ERZRWNY8', 'sdsds', 'dsd', 'ERZRWNY8', 'ENTREPRENEURSHIP', 2, 2, '05:10 PM', 'Thu Jan 18 2024', 0, '1', '0'),
('fh2Yto15', 'dsds', 'dsd', 'fh2Yto15', 'ENTREPRENEURSHIP', 4, 4, '06:49 PM', 'Thu Jan 18 2024', 0, '1', '0'),
('Fi2qqJFY', 'Exam', 'Please answer this', 'Fi2qqJFY', 'CAPSTONE 1', 3, 3, '04:47 AM', 'Wed Jan 24 2024', 0, '1', '0'),
('FlzwiDL6', 'new222', 'new222', 'FlzwiDL6', 'ENTREPRENEURSHIP', 3, 3, '01:52 AM', 'Tue Jan 23 2024', 0, '1', '0'),
('fP4FfsZc', 'TEST QUIZZZ', 'TEST QUIZZZ', 'fP4FfsZc', 'ENTREPRENEURSHIP', 3, 3, '01:27 AM', 'Tue Jan 23 2024', 2, '1', '0'),
('g4huIKeU', 'jijijij', 'jnjkbn', 'g4huIKeU', 'ENTREPRENEURSHIP', 2, 2, '02:52 AM', 'Mon Jan 22 2024', 0, '1', '0'),
('GC25rAug', 'asdsd', 'ds', 'GC25rAug', 'ENTREPRENEURSHIP', 2, 2, '11:13 PM', 'Wed Jan 24 2024', 0, '1', '0'),
('GcdMblht', 'TEST QUESTION', 'QUESTION INSTRUCTIONS', 'GcdMblht', 'CAPSTONE 1', 2, 2, '01:13 PM', 'Wed Jan 10 2024', 0, '', ''),
('GnFpkAec', 'dsdsds', 'dsds', 'GnFpkAec', 'ENTREPRENEURSHIP', 6, 6, '06:29 PM', 'Thu Jan 18 2024', 0, '1', '0'),
('hs4Rvbuu', 'dsds', 'dsds', 'hs4Rvbuu', 'ENTREPRENEURSHIP', 2, 2, '05:34 PM', 'Thu Jan 18 2024', 0, '1', '0'),
('hXqPgnW9', 'sample quiz', 'SAMPLE INSTRUCTION', 'hXqPgnW9', 'CAPSTONE 1', 8, 6, '09:11 PM', 'Wed Jan 10 2024', 0, '', ''),
('I2MQyc9T', 'math', 'answer this', 'I2MQyc9T', 'CAPSTONE 2', 3, 3, '09:44 PM', 'Sun Jan 28 2024', 0, '1', '0'),
('I93t9Haj', 'ddd', 'ddd', 'I93t9Haj', 'ENTREPRENEURSHIP', 2, 2, '11:04 PM', 'Wed Jan 24 2024', 0, '1', '0'),
('Iih6Mask', 'new one', 'new one', 'Iih6Mask', 'ENTREPRENEURSHIP', 2, 2, '03:58 AM', 'Mon Jan 22 2024', 0, '1', '0'),
('jOLgJf9O', 'dsds', 'dsds', 'jOLgJf9O', 'ENTREPRENEURSHIP', 2, 2, '05:33 PM', 'Thu Jan 18 2024', 0, '1', '0'),
('KLjbm47f', 'sample new', 'sample new', 'KLjbm47f', 'ENTREPRENEURSHIP', 2, 2, '03:50 AM', 'Mon Jan 22 2024', 0, '1', '0'),
('kRNZ6Pq6', 'asasssss', 'sas', 'kRNZ6Pq6', 'CAPSTONE 1', 5, 5, '10:54 AM', 'Mon Dec 18 2023', 0, '', ''),
('ku1WTrO2', 'TEST QUIZZZ', 'TEST QUIZZZ', 'ku1WTrO2', 'ENTREPRENEURSHIP', 3, 3, '01:27 AM', 'Tue Jan 23 2024', 2, '1', '0'),
('lBhM4tYt', 'dsdsds', 'esds', 'lBhM4tYt', 'ENTREPRENEURSHIP', 3, 3, '01:36 AM', 'Tue Jan 23 2024', 0, '1', '0'),
('lclnS76e', '11', '22', 'lclnS76e', 'ENTREPRENEURSHIP', 1, 1, '09:49 PM', 'Sun Jan 28 2024', 0, '1', '0'),
('lHkep6VL', 'testQuiz', 'instructions', 'lHkep6VL', 'CAPSTONE 1', 2, 2, '01:36 AM', 'Tue Jan 09 2024', 0, '', ''),
('mBd9IdW2', 'dsds', 'dasd', 'mBd9IdW2', 'ENTREPRENEURSHIP', 2, 2, '09:31 PM', 'Wed Jan 24 2024', 0, '1', '0'),
('mPNp1Gpi', 'choices quiz', 'test inst', 'mPNp1Gpi', 'CAPSTONE 1', 2, 2, '09:52 AM', 'Tue Jan 09 2024', 0, '', ''),
('OAIyKS7x', 'dsdsds', 'esds', 'OAIyKS7x', 'ENTREPRENEURSHIP', 3, 3, '01:36 AM', 'Tue Jan 23 2024', 0, '1', '0'),
('PoDIxrM7', 'asasasassss', 'sas', 'PoDIxrM7', 'CAPSTONE 1', 4, 4, '10:54 AM', 'Mon Dec 18 2023', 0, '', ''),
('QF8TQwkL', 'fill 3', 'fill 3', 'QF8TQwkL', 'CAPSTONE 1', 1, 1, '08:53 PM', 'Wed Jan 10 2024', 0, '', ''),
('QHsMKZZo', 'asdasd', 'sdas', 'QHsMKZZo', 'ENTREPRENEURSHIP', 1, 1, '10:01 PM', 'Wed Jan 24 2024', 0, '1', '0'),
('qin8rID8', '11', '22', 'qin8rID8', 'CAPSTONE 2', 4, 4, '09:53 PM', 'Sun Jan 28 2024', 0, '1', '0'),
('rVq9z5hc', 'new1', 'new1', 'rVq9z5hc', 'ENTREPRENEURSHIP', 2, 2, '11:16 PM', 'Wed Jan 24 2024', 0, '1', '0'),
('s0CCFZ56', 'dsds', 'dsds', 's0CCFZ56', 'ENTREPRENEURSHIP', 2, 2, '05:24 PM', 'Thu Jan 18 2024', 0, '1', '0'),
('S1rDDw8S', 'TESTING QUIZ', 'TESTING QUIZ', 'S1rDDw8S', 'ENTREPRENEURSHIP', 4, 4, '01:23 AM', 'Tue Jan 23 2024', 15, '1', '0'),
('TLKUVR7R', '11', '22', 'TLKUVR7R', 'ENTREPRENEURSHIP', 1, 1, '09:49 PM', 'Sun Jan 28 2024', 0, '1', '0'),
('u0j8FfTB', 'Take this', 'new quiz', 'u0j8FfTB', 'CAPSTONE 1', 2, 2, '04:55 AM', 'Wed Jan 24 2024', 0, '1', '0'),
('V6RgKaoR', 'random quiz', 'random quiz', 'V6RgKaoR', 'CAPSTONE 1', 4, 4, '07:47 PM', 'Thu Jan 11 2024', 0, '', ''),
('vu3lsDbm', 'dsdsd', 'dsad', 'vu3lsDbm', 'ENTREPRENEURSHIP', 1, 1, '03:56 AM', 'Mon Jan 22 2024', 0, '1', '0'),
('XnLKODbE', 'quiz 2', 'quiz2 ', 'XnLKODbE', 'CAPSTONE 1', 2, 2, '04:56 AM', 'Wed Jan 24 2024', 0, '1', '0'),
('xzJr9GpL', 'My personal', 'my instructions', 'xzJr9GpL', 'CAPSTONE 1', 14, 8, '03:32 PM', 'Sun Jan 07 2024', 0, '', ''),
('zgqARuqP', 'rtyhrtyh', 'yiut67yi', 'zgqARuqP', 'CAPSTONE 1', 2, 2, '07:35 PM', 'Mon Jan 08 2024', 0, '', ''),
('zIw4SgVX', 'tes tse', 'dsds', 'zIw4SgVX', 'CAPSTONE 1', 1, 1, '10:17 AM', 'Tue Jan 09 2024', 0, '', '');

-- --------------------------------------------------------

--
-- Table structure for table `reactions`
--

CREATE TABLE `reactions` (
  `id` int(10) NOT NULL,
  `reactID` varchar(10) NOT NULL,
  `postID` varchar(10) NOT NULL,
  `acctID` varchar(10) NOT NULL,
  `classCode` varchar(10) NOT NULL,
  `reactType` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reactions`
--

INSERT INTO `reactions` (`id`, `reactID`, `postID`, `acctID`, `classCode`, `reactType`) VALUES
(28, '8aLHPx4c', '8aLHPx4c', 'un2kt7px', 'IT 411', 'heart'),
(30, 'lz8YnK4M', 'lz8YnK4M', 'un2kt7px', 'IT 411', 'like'),
(43, 'kDBvDNOI', 'th5tRTPX', 'un2kt7px', 'IT 411', 'like'),
(44, 'JbuyEy4q', 'th5tRTPX', 'un2kt7px', 'IT 411', 'heart');

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `id` int(11) NOT NULL,
  `schedID` varchar(10) NOT NULL,
  `postID` varchar(10) NOT NULL,
  `schedDate` varchar(20) NOT NULL,
  `schedTime` varchar(20) NOT NULL,
  `dueDate` varchar(20) NOT NULL,
  `dueTime` varchar(20) NOT NULL,
  `closeDate` varchar(20) NOT NULL,
  `closeTime` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`id`, `schedID`, `postID`, `schedDate`, `schedTime`, `dueDate`, `dueTime`, `closeDate`, `closeTime`) VALUES
(1, '0', '0', '2024-01-05', '21:40', '2024-01-05', '09:40', '2024-02-02', '09:42'),
(2, '3avPzgqh', '3avPzgqh', '2024-01-05', '21:40', '2024-01-05', '09:40', '2024-02-02', '09:42'),
(3, 'tI3g2tQ9', 'tI3g2tQ9', '2024-01-06', '23:24', '2024-01-11', '11:26', '2024-01-26', '23:30'),
(4, 'VSVhtT8V', 'VSVhtT8V', '2024-01-06', '23:33', '2024-01-11', '11:26', '2024-01-26', '23:30'),
(5, 'UasK8TY9', 'UasK8TY9', '2024-01-06', '23:35', '2024-01-11', '11:26', '2024-01-26', '23:30'),
(6, 'K2JCPYL1', 'K2JCPYL1', '2024-01-06', '23:38', '2024-01-11', '11:26', '2024-01-26', '23:30'),
(7, 'YkqaXCPa', 'YkqaXCPa', '2024-01-05', '15:36', '2024-01-04', '15:36', '2024-01-09', '15:36'),
(9, 'gR8lvZne', 'gR8lvZne', '2024-01-09', '10:36', '2024-01-09', '22:59', '2024-01-09', '12:37'),
(10, 'ahJUCxcA', 'ahJUCxcA', '2024-01-12', '00:52', '2024-01-12', '00:55', '2024-01-12', '02:49'),
(11, 'yfekruX4', 'yfekruX4', '2024-01-12', '00:55', '2024-01-12', '00:57', '2024-01-12', '00:59'),
(12, 'IlcRXYTQ', 'IlcRXYTQ', '2024-01-12', '01:18', '2024-01-12', '01:19', '2024-01-12', '01:20'),
(13, 'ypKGgGTl', 'ypKGgGTl', '2024-01-12', '01:25', '2024-01-12', '01:27', '2024-01-12', '01:28'),
(14, 'JINGVvZg', 'JINGVvZg', '2024-01-12', '01:25', '2024-01-12', '01:27', '2024-01-12', '01:28'),
(15, 'dfC0D6wE', 'dfC0D6wE', '2024-01-12', '01:26', '2024-01-12', '01:27', '2024-01-12', '01:28'),
(16, 'jhSV8vyg', 'jhSV8vyg', '2024-01-12', '01:31', '2024-01-12', '01:32', '2024-01-12', '01:33'),
(17, 'rhQQBMxm', 'rhQQBMxm', '2024-01-12', '01:34', '2024-01-12', '01:35', '2024-01-12', '01:37'),
(18, '5twE97vH', '5twE97vH', '2024-01-12', '01:36', '2024-01-12', '01:38', '2024-01-12', '01:39'),
(19, 'pl0JeYHG', 'pl0JeYHG', '2024-01-12', '01:40', '2024-01-12', '01:41', '2024-01-12', '01:43'),
(20, 'I8f2QtXY', 'I8f2QtXY', '2024-01-12', '01:42', '2024-01-12', '01:43', '2024-01-12', '01:44'),
(21, 'PLRihInp', 'PLRihInp', '2024-01-12', '01:44', '2024-01-12', '01:46', '2024-01-12', '01:47'),
(22, 'tKgzDEX9', 'tKgzDEX9', '2024-01-12', '01:47', '2024-01-12', '01:48', '2024-01-12', '01:50'),
(23, 'FpzVHB7H', 'FpzVHB7H', '2024-01-12', '01:55', '2024-01-12', '01:56', '2024-01-12', '01:57'),
(24, 'mhTBbzED', 'mhTBbzED', '2024-01-12', '01:56', '2024-01-12', '01:57', '2024-01-12', '01:58'),
(25, 'L2SzZkd8', 'L2SzZkd8', '2024-01-12', '01:59', '2024-01-12', '02:02', '2024-01-12', '04:57'),
(26, '5VVcmQoz', '5VVcmQoz', '2024-01-12', '02:01', '2024-01-12', '02:02', '2024-01-12', '02:04'),
(27, '7awqNn2j', '7awqNn2j', '2024-01-12', '02:04', '2024-01-12', '02:05', '2024-01-12', '02:06'),
(28, '1rRwFbrY', '1rRwFbrY', '2024-01-12', '02:07', '2024-01-12', '02:08', '2024-01-12', '02:08'),
(29, '0hXMRDTJ', '0hXMRDTJ', '2024-01-12', '02:09', '2024-01-12', '02:10', '2024-01-12', '02:12'),
(30, '81iCDN8M', '81iCDN8M', '2024-01-12', '02:12', '2024-01-12', '02:14', '2024-01-12', '02:16'),
(31, 'MvMx9bDP', 'MvMx9bDP', '2024-01-24', '21:32', '2024-01-24', '21:34', '2024-01-24', '21:36'),
(32, 'wjjVTthU', 'wjjVTthU', '2024-01-24', '21:47', '2024-01-24', '21:49', '2024-01-24', '21:50'),
(33, '7bKAL9bp', '7bKAL9bp', '2024-01-24', '21:51', '2024-01-24', '21:53', '2024-01-24', '21:54'),
(34, 'BhKgGzjg', 'BhKgGzjg', '2024-01-24', '10:03', '2024-01-24', '13:06', '2024-01-24', '22:09'),
(35, '5U1Pxqo3', '5U1Pxqo3', '2024-01-24', '22:18', '2024-01-24', '22:19', '2024-01-24', '22:20'),
(36, '9TDpoz1t', '9TDpoz1t', '2024-01-24', '22:21', '2024-01-24', '22:22', '2024-01-24', '22:23'),
(37, '1uBYyqV8', '1uBYyqV8', '2024-01-24', '22:21', '2024-01-24', '22:23', '2024-01-24', '22:25'),
(38, 'zRYOys38', 'zRYOys38', '2024-01-24', '22:24', '2024-01-24', '22:25', '2024-01-24', '22:26'),
(39, 'seggZkD6', 'seggZkD6', '2024-01-24', '22:44', '2024-01-24', '22:46', '2024-01-24', '22:47'),
(40, 'rUnVW4ol', 'rUnVW4ol', '2024-01-24', '22:46', '2024-01-24', '22:47', '2024-01-24', '22:48'),
(41, 'iJIFdl0W', 'iJIFdl0W', '2024-01-24', '22:50', '2024-01-24', '22:52', '2024-01-24', '22:53'),
(42, 'pfpemVYn', 'pfpemVYn', '2024-01-24', '22:51', '2024-01-24', '22:54', '2024-01-24', '22:53'),
(43, '0aNcEwzr', '0aNcEwzr', '2024-01-24', '22:55', '2024-01-24', '22:56', '2024-01-24', '22:57'),
(44, 'TeRUrigT', 'TeRUrigT', '2024-01-24', '23:01', '2024-01-24', '23:02', '2024-01-24', '23:03'),
(45, 'NDcGIk26', 'NDcGIk26', '2024-01-24', '23:07', '2024-01-24', '23:08', '2024-01-24', '23:09'),
(46, 'RUEpwIyI', 'RUEpwIyI', '2024-01-24', '23:12', '2024-01-24', '23:14', '2024-01-24', '23:15'),
(47, 'sRy1F8C5', 'sRy1F8C5', '2024-01-24', '23:15', '2024-01-24', '23:19', '2024-01-24', '23:22'),
(48, 'eYIFfaMC', 'eYIFfaMC', '2024-01-24', '23:19', '2024-01-24', '23:20', '2024-01-24', '23:20');

-- --------------------------------------------------------

--
-- Table structure for table `scores`
--

CREATE TABLE `scores` (
  `id` int(10) NOT NULL,
  `scoreID` varchar(10) NOT NULL,
  `quizID` varchar(10) NOT NULL,
  `acctID` varchar(10) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `score` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `scores`
--

INSERT INTO `scores` (`id`, `scoreID`, `quizID`, `acctID`, `fullname`, `score`) VALUES
(1, 'XgP1I4Fc', 'bo8vvHHC', 'SNSBjwH9', 'Rumar C. Pamparo', 3),
(2, 'JHkb4Fal', 'bo8vvHHC', 'SNSBjwH9', 'Allan Jay', 3),
(3, 'I5HfyEZm', 'bo8vvHHC', 'SNSBjwH9', 'Mark ADDURU', 3),
(4, '1ED2sfbQ', 'bo8vvHHC', 'SNSBjwH9', 'Rumar C. Pamparo', 9),
(5, '8qlpWwtQ', 'bo8vvHHC', 'SNSBjwH9', 'Allan Jay', 3),
(6, 'JMvLliIN', 'bo8vvHHC', 'VHXQ6s6O', 'generateName', 9),
(7, 'dfllqGKq', 'eAzK97X0', 'VHXQ6s6O', 'Allan Jay', 2),
(8, 'yrXHzhG6', 'FlzwiDL6', 'VHXQ6s6O', 'Mark ADDURU', 3),
(9, 'MZGJr2uw', 'FlzwiDL6', 'VHXQ6s6O', 'Allan Jay C Caluigiran', 0),
(10, 'opM6FNen', '2hegz6x0', 'VHXQ6s6O', 'Allan Jay C Caluigiran', 0),
(12, 'C1a7Hafx', 'Fi2qqJFY', 'VHXQ6s6O', 'Allan Jay C Caluigiran', 0),
(14, 'Cj0KGjWg', 'XnLKODbE', 'VHXQ6s6O', 'Allan Jay C Caluigiran', 1),
(15, 'P9CcFxxX', 'BwZIUHhX', 'lLpiO905', 'JD B Tumaliuan', 0),
(16, 'y9znlTxJ', 'lclnS76e', 'VHXQ6s6O', 'Allan C Caluigiran', 0),
(17, '03tKjw3A', '5rVKnLLR', 'VHXQ6s6O', 'Allan C Caluigiran', 0),
(18, 'XvsUIbU5', '95Q4bSLS', 'SNSBjwH9', 'Reneal C Accad', 0),
(19, 'SqEi8Ljt', 'Ea5VXbZW', 'SNSBjwH9', 'Reneal C Accad', 3),
(20, 'U522yv6L', '95Q4bSLS', 'VHXQ6s6O', 'Allan C Caluigiran', 0),
(21, 'kX6nqSZ7', '95Q4bSLS', 'VHXQ6s6O', 'Allan C Caluigiran', 1),
(22, 'EyIqTJcY', 'Ea5VXbZW', 'VHXQ6s6O', 'Allan C Caluigiran', 3),
(23, 'AeMFHxaD', 'aa96zKC3', 'SNSBjwH9', 'Reneal C Accad', 1),
(24, 'RT344mpS', '61oE4vgu', 'SNSBjwH9', 'Reneal C Accad', 1),
(25, 'QIPHpF6D', '61oE4vgu', 'WhpOtets', 'Red H Ito ang laban', 2),
(26, '6v38vX8Y', '61oE4vgu', 'WhpOtets', 'Red H Ito ang laban', 1),
(27, 'Gx8ORzq6', 'QHsMKZZo', 'SNSBjwH9', 'Reneal C Accad', 0),
(28, 'D1MIgBxS', '8ePQ5du4', 'VHXQ6s6O', 'Allan C Caluigiran', 1);

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `id` int(10) NOT NULL,
  `subjectName` varchar(50) NOT NULL,
  `subjectCode` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subject`
--

INSERT INTO `subject` (`id`, `subjectName`, `subjectCode`) VALUES
(1, 'SYSTEM ADMINISTRATION AND MAINTENANCE', 'IT 412'),
(2, 'ENTREPRENEURSHIP', 'ELECTIVE 13'),
(3, 'CAPSTONE 2', 'IT 411'),
(4, 'PRINCIPLES AND STRATEGIES IN TEACHING', 'GEC 12'),
(5, 'SOCIAL AND PROFFESIONAL ISSUES', 'IT 326'),
(6, 'INFORMATION ASSURANCE AND SECURITY 2', 'IT 325'),
(7, 'TRACK ELECTIVE 4', 'IT 323'),
(8, 'TRACK ELECTIVE 3', '322'),
(9, 'SYSTEM INTEGRATION AND ARCHITECHTURE', 'IT 321'),
(10, 'SERVICE CULTURE', 'IT 317'),
(11, 'CONTEMPORARY WORLD', 'GEC 104'),
(13, 'PHYSICAL ACTIVITY TOWARDS HEALTH AND FITNESS II', 'PE 12'),
(14, 'NATIONAL SERVICE TRAINING PROGRAM 2', 'NSTP 12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`acctID`);

--
-- Indexes for table `choices`
--
ALTER TABLE `choices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`classID`);

--
-- Indexes for table `class_list`
--
ALTER TABLE `class_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `filllayout`
--
ALTER TABLE `filllayout`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `friends`
--
ALTER TABLE `friends`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `questionbank`
--
ALTER TABLE `questionbank`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `quiz`
--
ALTER TABLE `quiz`
  ADD PRIMARY KEY (`quizID`);

--
-- Indexes for table `reactions`
--
ALTER TABLE `reactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `scores`
--
ALTER TABLE `scores`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `choices`
--
ALTER TABLE `choices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=151;

--
-- AUTO_INCREMENT for table `class`
--
ALTER TABLE `class`
  MODIFY `classID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1983;

--
-- AUTO_INCREMENT for table `class_list`
--
ALTER TABLE `class_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1837;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `filllayout`
--
ALTER TABLE `filllayout`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `friends`
--
ALTER TABLE `friends`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

--
-- AUTO_INCREMENT for table `image`
--
ALTER TABLE `image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1946;

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1934;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=269;

--
-- AUTO_INCREMENT for table `questionbank`
--
ALTER TABLE `questionbank`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=160;

--
-- AUTO_INCREMENT for table `reactions`
--
ALTER TABLE `reactions`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `scores`
--
ALTER TABLE `scores`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `subject`
--
ALTER TABLE `subject`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
