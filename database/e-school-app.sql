-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 24, 2024 at 07:09 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`acctID`, `acctype`, `email`, `password`, `firstname`, `middlename`, `lastname`, `status`, `imageID`) VALUES
('Tk6Bxe8U', 'admin', 'mark@gmail.com', 'mark123', 'Mark', 'Langcay', 'Adduru', 'logout', 'Tk6Bxe8U'),
('un2kt7px', 'faculty', 'pamparor@gmail.com', 'rumar123', 'Rumar', 'Capoquian', 'Pamparo', 'online', 'un2kt7p1'),
('VHXQ6s6O', 'student', 'allan@gmail.com', 'allan123', 'Allan', 'Caranguioan', 'Caluigiran', 'logout', 'VHXQ6s6O');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `choices`
--

INSERT INTO `choices` (`id`, `choicesID`, `letter`, `content`, `correct`) VALUES
(1, 'C2pvxjPd', 'A', 'push()', 0),
(2, 'C2pvxjPd', 'B', 'pop()', 1),
(3, 'C2pvxjPd', 'C', 'shift()', 1),
(5, 'C2pvxjPd', 'D', 'unshift()', 0),
(6, 'Pa2qqJFY', 'B', 'implements', 0),
(7, 'Pa2qqJFY', 'C', 'inherits', 1),
(8, 'Pa2qqJFY', 'D', 'extends', 0),
(9, 'Pa2qqJFY', 'A', 'uses', 0),
(151, 'h6iu0Ivc', 'A', 'dasds', 0),
(152, 'h6iu0Ivc', 'B', 'ddd', 0),
(153, 'h6iu0Ivc', 'C', 'aa', 1),
(154, 'h6iu0Ivc', 'D', 'cvvc', 1);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `class`
--

INSERT INTO `class` (`classID`, `className`, `classDesc`, `classCode`, `membersID`, `imageID`) VALUES
(1, 'CAPSTONE 1', 'IT 4C', 'IT-CAP2', 'BiJ456Aj', 'xVKKzdPD'),
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `class_list`
--

INSERT INTO `class_list` (`id`, `acctID`, `classCode`, `hidden`) VALUES
(1, 'un2kt7px', 'IT-CAP2', 'false'),
(1836, 'un2kt7px', 'IT-ELECT2', 'false'),
(1844, 'Tk6Bxe8U', 'IT-ELECT2', 'false'),
(1845, 'VHXQ6s6O', 'IT-CAP2', 'false'),
(1846, 'VHXQ6s6O', 'IT-ELECT2', 'false');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `replyID` varchar(10) NOT NULL,
  `postID` varchar(10) NOT NULL,
  `classCode` varchar(10) NOT NULL,
  `acctID` varchar(10) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `content` varchar(100) NOT NULL,
  `time` varchar(20) NOT NULL,
  `date` varchar(20) NOT NULL,
  `fileID` varchar(10) NOT NULL,
  `imageID` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `replyID`, `postID`, `classCode`, `acctID`, `fullname`, `content`, `time`, `date`, `fileID`, `imageID`) VALUES
(1, '5B7Rww8K', '5B7Rww8K', 'IT-CAP2', 'un2kt7px', 'Rumar C. Pamparo', 'how about me?', '03:13 PM', 'Fri Dec 15 2023', 'none', 'none'),
(2, '5B7Rww8K', '5B7Rww8K', 'IT-CAP2', 'un2kt7px', 'Rumar C. Pamparo', 'finalized it.', '03:23 PM', 'Fri Dec 15 2023', 'none', 'none'),
(20, '5B7Rww8K', '5B7Rww8K', 'IT-CAP2', 'un2kt7px', 'Rumar C. Pamparo', 'wow', '04:35 PM', 'Wed Apr 17 2024', 'none', 'none'),
(21, '5B7Rww8K', '5B7Rww8K', 'IT-CAP2', 'un2kt7px', 'Rumar C. Pamparo', 'nice', '04:40 PM', 'Wed Apr 17 2024', 'none', 'none'),
(22, '5B7Rww8K', '5B7Rww8K', 'IT-CAP2', 'un2kt7px', 'Rumar C. Pamparo', 'very good', '05:09 PM', 'Wed Apr 17 2024', 'none', 'none'),
(23, '5B7Rww8K', '5B7Rww8K', 'IT-CAP2', 'un2kt7px', 'Rumar C. Pamparo', 'its good', '05:10 PM', 'Wed Apr 17 2024', 'none', 'none'),
(24, '5B7Rww8K', '5B7Rww8K', 'IT-CAP2', 'un2kt7px', 'Rumar C. Pamparo', 'great', '05:10 PM', 'Wed Apr 17 2024', 'none', 'mRqjkzL5'),
(25, 'DOann9lo', 'DOann9lo', 'IT-ELECT2', 'un2kt7px', 'Rumar C. Pamparo', 'can i try this?', '05:13 PM', 'Wed Apr 17 2024', 'none', 'none'),
(26, 'DOann9lo', 'DOann9lo', 'IT-ELECT2', 'un2kt7px', 'Rumar C. Pamparo', 'ok', '05:16 PM', 'Wed Apr 17 2024', 'kQueNYI2', 'none'),
(27, 'SnScSSNM', 'SnScSSNM', 'IT-ELECT2', 'un2kt7px', 'Rumar C. Pamparo', 'ito files', '05:23 PM', 'Wed Apr 17 2024', '3GcnDxAn', 'none'),
(28, 'SnScSSNM', 'SnScSSNM', 'IT-ELECT2', 'un2kt7px', 'Rumar C. Pamparo', 'ok', '05:23 PM', 'Wed Apr 17 2024', '8Wh9S1LK', 'none'),
(29, 'SnScSSNM', 'SnScSSNM', 'IT-ELECT2', 'un2kt7px', 'Rumar C. Pamparo', 'ok', '05:25 PM', 'Wed Apr 17 2024', 'none', 'xTuZ12uV'),
(30, 'gb3YpAQC', 'gb3YpAQC', 'IT-ELECT2', 'un2kt7px', 'Rumar C. Pamparo', 'astig perd', '04:34 PM', 'Thu Apr 18 2024', 'none', 'none'),
(31, 'gb3YpAQC', 'gb3YpAQC', 'IT-ELECT2', 'VHXQ6s6O', 'Allan C. Caluigiran', 'petmalu', '04:38 PM', 'Thu Apr 18 2024', 'none', 'none'),
(32, 'Bd4lkWFD', 'Bd4lkWFD', 'IT-CAP2', 'un2kt7px', 'Rumar C. Pamparo', 'nice', '02:50 PM', 'Fri May 03 2024', 'none', 'none'),
(33, 'Bd4lkWFD', 'Bd4lkWFD', 'IT-CAP2', 'un2kt7px', 'Rumar C. Pamparo', 'dsads', '05:03 PM', 'Wed May 08 2024', 'none', 'none');

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `id` int(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `data` varchar(100) NOT NULL,
  `dateUploaded` varchar(20) NOT NULL,
  `timeUploaded` varchar(20) NOT NULL,
  `acctID` varchar(10) NOT NULL,
  `classCode` varchar(10) NOT NULL,
  `fileID` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`id`, `name`, `type`, `data`, `dateUploaded`, `timeUploaded`, `acctID`, `classCode`, `fileID`) VALUES
(1, 'Prepare-Stock-Sauces-and-Soups-GROUP-5-FSP-BTVTED-FSM-1A.pptx', 'application/vnd.openxmlformats-officedocument.pres', 'file_1703604974548.pptx', 'Mon Jan 22 2024', '03:35 AM', 'un2kt7px', 'IT-ELECT2', 'lz8YnK4M'),
(2, 'luis-training-plan.docx', 'application/vnd.openxmlformats-officedocument.word', 'file_1703605531798.docx', 'Mon Jan 22 2024', '03:35 AM', 'un2kt7px', 'IT-ELECT2', 'th5tRTPX'),
(5, 'ACHIEVEMENT CHART-FLS FINAL.xlsx', 'application/vnd.openxmlformats-officedocument.spre', 'file_1703608899097.xlsx', 'Mon Jan 22 2024', '03:35 AM', 'un2kt7px', 'IT-ELECT2', 'th5tRTPX'),
(46, 'PR_No._1500-23BAC...pdf', 'application/pdf', 'file_1713151971107.pdf', 'Mon Jan 22 2024', '03:35 AM', 'un2kt7p', 'IT-ELECT2', 'TDVJI3IY'),
(47, 'PR_NO._2985-23BAC_-_ROXIEMAR_CONSTRUCTION_1xEh6C9.pdf', 'application/pdf', 'file_1713152254689.pdf', 'Mon Apr 15 2024', '11:37 AM', 'un2kt7px', 'IT-ELECT2', 'iwPl3xFW'),
(48, 'PR_No._1500-23BAC...pdf', 'application/pdf', 'file_1713152254698.pdf', 'Mon Apr 15 2024', '11:37 AM', 'un2kt7px', 'IT-ELECT2', 'iwPl3xFW'),
(49, 'NEL-V1416 COD MARCH 04, 2024.pdf', 'application/pdf', 'file_1713152969292.pdf', 'Mon Apr 15 2024', '11:49 AM', 'un2kt7px', 'IT-ELECT2', 'XlcYbqYk'),
(50, 'PR_NO._2985-23BAC_-_ROXIEMAR_CONSTRUCTION_1xEh6C9.pdf', 'application/pdf', 'file_1713230070858.pdf', 'Tue Apr 16 2024', '09:14 AM', 'un2kt7px', 'IT-ELECT2', 'DOann9lo'),
(51, 'PR_No._1500-23BAC...pdf', 'application/pdf', 'file_1713230070868.pdf', 'Tue Apr 16 2024', '09:14 AM', 'un2kt7px', 'IT-ELECT2', 'DOann9lo'),
(55, 'BN_CERTIFICATE-DMIG215716208423.pdf', 'application/pdf', 'file_1713342638775.pdf', 'Wed Apr 17 2024', '04:30 PM', 'un2kt7px', 'IT-CAP2', 'PuA2vl6y'),
(56, 'OR_DMIG215716208423.pdf', 'application/pdf', 'file_1713345403821.pdf', 'Wed Apr 17 2024', '05:16 PM', 'un2kt7px', 'IT-ELECT2', 'kQueNYI2'),
(57, 'OR_DMIG215716208423.pdf', 'application/pdf', 'file_1713345789537.pdf', 'Wed Apr 17 2024', '05:23 PM', 'un2kt7px', 'IT-ELECT2', '3GcnDxAn'),
(58, 'UNDERTAKING_DMIG215716208423.pdf', 'application/pdf', 'file_1713345832208.pdf', 'Wed Apr 17 2024', '05:23 PM', 'un2kt7px', 'IT-ELECT2', '8Wh9S1LK'),
(59, 'OR_DMIG215716208423.pdf', 'application/pdf', 'file_1713429216114.pdf', 'Thu Apr 18 2024', '04:33 PM', 'Tk6Bxe8U', 'IT-ELECT2', 'gb3YpAQC');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `filllayout`
--

INSERT INTO `filllayout` (`id`, `fillContent`, `fillType`, `fillPosition`, `fillLayoutID`) VALUES
(1, 'In Python, you can create a function using the', 'text', 1, 'YXWApu2U'),
(2, 'def', 'blank', 2, 'YXWApu2U'),
(3, 'keyword', 'text', 3, 'YXWApu2U'),
(8, 'algorithm', 'blank', 1, 'wPgjtqxZ'),
(9, 'is a step-by-step procedure for solving a problem or accomplishing a task.', 'text', 2, 'wPgjtqxZ'),
(47, 'dasdasddasds', 'blank', 2, 'Z22IU74j'),
(48, 'asdasd', 'text', 1, 'Z22IU74j'),
(49, 'dasds', 'text', 3, 'Z22IU74j');

-- --------------------------------------------------------

--
-- Table structure for table `friends`
--

CREATE TABLE `friends` (
  `id` int(10) NOT NULL,
  `acctID` varchar(10) NOT NULL,
  `friendAcctID` varchar(10) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `imageID` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `friends`
--

INSERT INTO `friends` (`id`, `acctID`, `friendAcctID`, `fullname`, `imageID`) VALUES
(113, 'un2kt7px', 'Tk6Bxe8U', 'Mark L. Adduru', 'Tk6Bxe8U');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `image`
--

INSERT INTO `image` (`id`, `name`, `type`, `data`, `dateUploaded`, `timeUploaded`, `acctID`, `classCode`, `imageID`) VALUES
(1, 'ads.jpg', 'image/jpeg', 'image_17016911032.jpg', 'Mon Jan 22 2024', '03:35 AM', 'un2kt7px', 'IT-CAP2', 'xVKKzdPD'),
(2, 'papa.jpg', 'image/jpeg', 'image_1699451744436.png', 'Mon Jan 22 2024', '03:35 AM', 'un2kt7px', 'IT-ELECT2', 'YHXQ6s61'),
(3, 'rumar.jpg', 'image/jpeg', 'image_1701691103989.jpg', 'Mon Jan 22 2024', '03:35 AM', 'un2kt7px', 'none', 'un2kt7px'),
(4, 'mark.jpg', 'image/jpeg', 'image_1701691103982.jpg', 'Mon Jan 22 2024', '03:35 AM', 'un2kt7px', 'none', 'Tk6Bxe8U'),
(5, 'allan.jpg', 'image/jpeg', 'image_1701668137802.png', 'Mon Jan 22 2024', '03:35 AM', 'un2kt7px', 'none', 'VHXQ6s6O'),
(1922, 'MIRACLE LOTION PNG.png', 'image/png', 'image_1713096266041.png', 'Sun Apr 14 2024', '08:04 PM', 'un2kt7px', 'IT-CAP2', 'Bd4lkWFD'),
(1923, 'lemon_rub-removebg-preview.png', 'image/png', 'image_1713096266037.png', 'Sun Apr 14 2024', '08:04 PM', 'un2kt7px', 'IT-CAP2', 'Bd4lkWFD'),
(1924, 'FAKE STORE.jpg', 'image/jpeg', 'image_1713096266032.jpg', 'Sun Apr 14 2024', '08:04 PM', 'un2kt7px', 'IT-CAP2', 'Bd4lkWFD'),
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
(1945, 'Premium Photo _ A cat sits on a shelf in front of books and a plant.jpeg', 'image/jpeg', 'image_1713097929223.jpeg', 'Sun Apr 14 2024', '08:32 PM', 'un2kt7px', 'IT-CAP2', 'lfTJi63D'),
(1946, 'young-man-using-mobile-phone-while-standing-gym_1048944-2269590-removebg-preview.png', 'image/png', 'image_1713230070861.png', 'Tue Apr 16 2024', '09:14 AM', 'un2kt7px', 'IT-ELECT2', 'DOann9lo'),
(1947, 'Untitled (10 x 10 in).gif', 'image/gif', 'image_1713230070863.gif', 'Tue Apr 16 2024', '09:14 AM', 'un2kt7px', 'IT-ELECT2', 'DOann9lo'),
(1948, '423686914_439679775064082_7513696424590273516_n (1).jpg', 'image/jpeg', 'image_1713230102728.jpg', 'Tue Apr 16 2024', '09:15 AM', 'un2kt7px', 'IT-ELECT2', '1SXMpTpy'),
(1949, 'Screenshot 2024-03-04 105655.png', 'image/png', 'image_1713230102733.png', 'Tue Apr 16 2024', '09:15 AM', 'un2kt7px', 'IT-ELECT2', '1SXMpTpy'),
(1950, '423619598_7291313737588313_3862564192417168033_n.jpg', 'image/jpeg', 'image_1713230102736.jpg', 'Tue Apr 16 2024', '09:15 AM', 'un2kt7px', 'IT-ELECT2', '1SXMpTpy'),
(1959, 'Your paragraph text (3).jpg', 'image/jpeg', 'image_1713342533252.jpg', 'undefined', 'undefined', 'un2kt7px', 'IT-CAP2', 'XgdtaIbB'),
(1960, 'Your paragraph text (3).jpg', 'image/jpeg', 'image_1713342614235.jpg', 'undefined', 'undefined', 'un2kt7px', 'IT-CAP2', 'eW9BbVNK'),
(1962, 'Your paragraph text (2).jpg', 'image/jpeg', 'image_1713345058500.jpg', 'undefined', 'undefined', 'un2kt7px', 'IT-CAP2', 'mRqjkzL5'),
(1963, 'wonder drops.png', 'image/png', 'image_1713345902985.png', 'undefined', 'undefined', 'un2kt7px', 'IT-ELECT2', 'xTuZ12uV'),
(1964, '284493335_3064569063853706_2708312132206988290_n.jpg', 'image/jpeg', 'image_1713429216112.jpg', 'Thu Apr 18 2024', '04:33 PM', 'Tk6Bxe8U', 'IT-ELECT2', 'gb3YpAQC'),
(1965, '441270367_1152689112818157_6081257374215719744_n.jpg', 'image/jpeg', 'image_1717141496156.jpg', 'Fri May 31 2024', '03:44 PM', 'un2kt7px', 'IT-CAP2', '46bMycve'),
(1966, '441277305_448048864277698_5511921002941859110_n.jpg', 'image/jpeg', 'image_1717141496159.jpg', 'Fri May 31 2024', '03:44 PM', 'un2kt7px', 'IT-CAP2', '46bMycve'),
(1967, '440794579_406283208963146_325435484913997915_n.jpg', 'image/jpeg', 'image_1717141496159.jpg', 'Fri May 31 2024', '03:44 PM', 'un2kt7px', 'IT-CAP2', '46bMycve'),
(1968, 'pexels-stywo-1261728.jpg', 'image/jpeg', 'image_1719161300026.jpg', 'undefined', 'undefined', 'un2kt7px', 'none', 'yxIKY57R'),
(1969, 'pexels-stywo-1261728.jpg', 'image/jpeg', 'image_1719161300035.jpg', 'undefined', 'undefined', 'un2kt7px', 'none', 'yjI8wqhE'),
(1970, 'pexels-stywo-1261728.jpg', 'image/jpeg', 'image_1719161300030.jpg', 'undefined', 'undefined', 'un2kt7px', 'none', 'UY47Y6EM');

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `id` int(10) NOT NULL,
  `membersID` varchar(10) NOT NULL,
  `acctID` varchar(10) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `middlename` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `memberType` varchar(10) NOT NULL,
  `imageID` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`id`, `membersID`, `acctID`, `firstname`, `middlename`, `lastname`, `memberType`, `imageID`) VALUES
(3, 'BiJ456Aj', 'un2kt7px', 'Rumar', 'Capoquian', 'Pamparo', 'admin', 'un2kt7px'),
(1933, '42d8800e', 'un2kt7px', 'Rumar', 'Capoquian', 'Pamparo', 'admin', 'un2kt7px'),
(1946, '42d8800e', 'Tk6Bxe8U', 'Mark', 'Langcay', 'Adduru', 'member', 'Tk6Bxe8U'),
(1947, 'BiJ456Aj', 'VHXQ6s6O', 'Allan', 'Caranguioan', 'Caluigiran', 'member', 'VHXQ6s6O'),
(1948, '42d8800e', 'VHXQ6s6O', 'Allan', 'Caranguioan', 'Caluigiran', 'member', 'VHXQ6s6O');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`id`, `postID`, `acctID`, `name`, `timePosted`, `datePosted`, `postContent`, `replyID`, `imageID`, `fileID`, `heartCount`, `likeCount`, `classCode`, `subjectName`, `postType`, `quizID`, `schedID`, `duration`, `random`) VALUES
(1, '5B7Rww8K', 'un2kt7px', 'Rumar C. Pamparo', '09:52 PM', 'Wed Dec 06 2023', 'Multiple Images', '5B7Rww8K', '5B7Rww8K', 'none', 0, 0, 'IT-CAP2', 'CAPSTONE 2', 'normal', 'none', 'none', 0, ''),
(3, 'GoWYC8s', 'un2kt7px', 'Rumar C. Pamparo', '08:51 PM', 'Thu Dec 07 2023', 'Single Images', 'GoWYC8sL', 'BgJ3t4MP', 'none', 0, 0, 'IT-CAP2', 'CAPSTONE 2', 'normal', 'none', 'none', 0, ''),
(4, 'lz8YnK4M', 'un2kt7px', 'Rumar C. Pamparo', '08:52 PM', 'Thu Dec 07 2023', 'Single Files', 'lz8YnK4M', 'none', 'lz8YnK4M', 0, 0, 'IT-ELECT2', 'ENTREPRENEURSHIP 2', 'normal', 'none', 'none', 0, ''),
(5, 'th5tRTPX', 'un2kt7px', 'Rumar C. Pamparo', '08:54 PM', 'Thu Dec 07 2023', 'Multi Files', 'th5tRTPX', 'none', 'th5tRTPX', 0, 0, 'IT-ELECT2', 'ENTREPRENEURSHIP 2', 'normal', 'none', 'none', 0, ''),
(258, 'mORXxJYo', 'un2kt7px', 'Rumar C. Pamparo', '07:50 PM', 'Sun Apr 14 2024', 'test', 'mORXxJYo', 'mORXxJYo', 'none', 0, 0, 'IT-CAP2', 'CAPSTONE 2', 'normal', 'none', 'none', 0, 'none'),
(259, 'dNf522yo', 'un2kt7px', 'Rumar C. Pamparo', '08:02 PM', 'Sun Apr 14 2024', 'try nga', 'dNf522yo', 'dNf522yo', 'none', 0, 0, 'IT-CAP2', 'CAPSTONE 2', 'normal', 'none', 'none', 0, 'none'),
(260, 'Bd4lkWFD', 'un2kt7px', 'Rumar C. Pamparo', '08:04 PM', 'Sun Apr 14 2024', 'test1', 'Bd4lkWFD', 'Bd4lkWFD', 'none', 0, 0, 'IT-CAP2', 'CAPSTONE 2', 'normal', 'none', 'none', 0, 'none'),
(269, 'TDVJI3IY', 'un2kt7px', 'Rumar C. Pamparo', '11:32 AM', 'Mon Apr 15 2024', 'pdf sample', 'TDVJI3IY', 'none', 'TDVJI3IY', 0, 0, 'IT-ELECT2', 'ENTREPRENEURSHIP 2', 'normal', 'none', 'none', 0, 'none'),
(270, 'iwPl3xFW', 'un2kt7px', 'Rumar C. Pamparo', '11:37 AM', 'Mon Apr 15 2024', 'sample multiple', 'iwPl3xFW', 'none', 'iwPl3xFW', 0, 0, 'IT-ELECT2', 'ENTREPRENEURSHIP 2', 'normal', 'none', 'none', 0, 'none'),
(271, 'XlcYbqYk', 'un2kt7px', 'Rumar C. Pamparo', '11:49 AM', 'Mon Apr 15 2024', 'nel', 'XlcYbqYk', 'none', 'XlcYbqYk', 0, 0, 'IT-ELECT2', 'ENTREPRENEURSHIP 2', 'normal', 'none', 'none', 0, 'none'),
(272, 'DOann9lo', 'un2kt7px', 'Rumar C. Pamparo', '09:14 AM', 'Tue Apr 16 2024', 'sample multiple post', 'DOann9lo', 'DOann9lo', 'DOann9lo', 0, 0, 'IT-ELECT2', 'ENTREPRENEURSHIP 2', 'normal', 'none', 'none', 0, 'none'),
(273, '1SXMpTpy', 'un2kt7px', 'Rumar C. Pamparo', '09:15 AM', 'Tue Apr 16 2024', 'sample', '1SXMpTpy', '1SXMpTpy', 'none', 0, 0, 'IT-ELECT2', 'ENTREPRENEURSHIP 2', 'normal', 'none', 'none', 0, 'none'),
(277, 'gb3YpAQC', 'Tk6Bxe8U', 'Mark L. Adduru', '04:33 PM', 'Thu Apr 18 2024', 'sample lang perds', 'gb3YpAQC', 'gb3YpAQC', 'gb3YpAQC', 0, 0, 'IT-ELECT2', 'ENTREPRENEURSHIP 2', 'normal', 'none', 'none', 0, 'none'),
(278, 'Ciaq97Dj', 'un2kt7px', 'Rumar C. Pamparo', '05:03 PM', 'Wed May 08 2024', 'sads', 'Ciaq97Dj', 'Ciaq97Dj', 'Ciaq97Dj', 0, 0, 'IT-CAP2', 'CAPSTONE 2', 'normal', 'none', 'none', 0, 'none'),
(279, 'Tu2qqJFY', 'un2kt7px', 'Rumar C. Pamparo', '04:33 PM', 'Thu Apr 18 2024', 'Exercise 1', 'Tu2qqJFY', 'none', 'none', 0, 0, 'IT-CAP2', 'CAPSTONE 1', 'normal', '1Oc0uJXk', '1Oc0uJXk', 0, '1'),
(280, 'Yu2qqJFY', 'un2kt7px', 'Rumar C. Pamparo', '04:33 PM', 'Thu Apr 18 2024', 'Exercise 2', 'Yu2qqJFY', 'none', 'none', 0, 0, 'IT-CAP2', 'CAPSTONE 1', 'normal', '2eb7oSeH', '2eb7oSeH', 0, '1');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `questionbank`
--

INSERT INTO `questionbank` (`id`, `bankID`, `bankTitle`, `subjectName`, `questionID`, `totalPoints`, `totalQuestions`, `time`, `date`) VALUES
(1, 'Fi2qqJFY', 'try', 'CAPSTONE 1', 'Fi2qqJFY', 3, 3, '08:13 PM', 'Tue Jan 16 2024'),
(2, 'bbLmxfIX', 'Javascript Questions', 'ENTREPRENEURSHIP', 'bbLmxfIX', 2, 2, '07:40 PM', 'Wed Jan 17 2024'),
(3, 'UICd4r8F', 'Its all about Java', 'CAPSTONE 1', 'UICd4r8F', 3, 3, '09:10 PM', 'Wed Jan 17 2024');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `questionID`, `questionNumber`, `questionContent`, `questionType`, `points`, `required`, `keySensitive`, `questionAnswerText`, `numberOfAns`, `choicesID`, `imageID`, `fillLayoutID`, `subjectName`) VALUES
(30, 'bbLmxfIX', 3, 'In JavaScript, objects are immutable.', 'True Or False', 1, 1, 0, 'False', 0, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(53, 'bbLmxfIX', 1, 'none', 'fill', 1, 0, 0, 'none', 1, 'none', 'none', 'YXWApu2U', 'ENTREPRENEURSHIP'),
(55, 'Fi2qqJFY', 6, 'In Python, the print statement is used to display output to the console.', 'True Or False', 1, 0, 0, 'True', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(97, 'UICd4r8F', 1, 'What keyword is used to create a function in Python?', 'enumeration', 1, 0, 0, 'def', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(98, 'UICd4r8F', 2, 'Which of the following is used to inherit a class in Java?', 'choices', 1, 0, 0, 'none', 1, 'Pa2qqJFY', 'none', 'none', 'CAPSTONE 1'),
(99, 'UICd4r8F', 3, 'none', 'fill', 1, 0, 0, 'none', 2, 'none', 'none', 'wPgjtqxZ', 'CAPSTONE 1'),
(100, 'Fi2qqJFY', 1, 'Which of the following is a mutable data type in Python?', 'enumeration', 1, 0, 0, 'list', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(101, 'Fi2qqJFY', 2, 'Which of the following methods is used to add an element to the end of an array in JavaScript?', 'choices', 1, 0, 0, 'none', 1, 'C2pvxjPd', 'none', 'none', 'CAPSTONE 1'),
(160, 'Qdr6JsPc', 1, 'Which of the following is used to inherit a class in Java?', 'choices', 1, 0, 0, 'none', 1, 'Pa2qqJFY', 'none', 'none', 'CAPSTONE 1'),
(161, 'Qdr6JsPc', 2, 'What keyword is used to create a function in Python?', 'enumeration', 1, 0, 0, 'def', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(162, 'UUAVMWI5', 1, 'In Python, the print statement is used to display output to the console.', 'True Or False', 1, 0, 0, 'True', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(163, 'UUAVMWI5', 2, 'Which of the following is a mutable data type in Python?', 'enumeration', 1, 0, 0, 'list', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(164, 'UUAVMWI5', 3, 'Which of the following methods is used to add an element to the end of an array in JavaScript?', 'choices', 1, 0, 0, 'none', 1, 'C2pvxjPd', 'none', 'none', 'CAPSTONE 1'),
(165, 'e61DROKC', 1, 'In JavaScript, objects are immutable.', 'True Or False', 1, 1, 0, 'False', 0, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(166, 'e61DROKC', 2, 'none', 'fill', 1, 0, 0, 'none', 1, 'none', 'none', 'YXWApu2U', 'ENTREPRENEURSHIP'),
(167, 'd0GVbn3I', 1, 'das', 'enumeration', 1, 0, 1, 'dasd', 1, 'none', 'none', 'none', 'SYSTEM ADMINISTRATION AND MAINTENANCE'),
(168, 'd0GVbn3I', 1, 'das', 'enumeration', 1, 0, 1, 'dasd', 1, 'none', 'none', 'none', 'SYSTEM ADMINISTRATION AND MAINTENANCE'),
(169, 'h6iu0Ivc', 2, 'what is', 'choices', 1, 0, 0, 'none', 2, 'h6iu0Ivc', 'none', 'none', 'SYSTEM ADMINISTRATION AND MAINTENANCE'),
(170, 'Z22IU74j', 3, '', 'fill', 1, 0, 0, 'none', 1, 'none', 'none', 'Z22IU74j', 'SYSTEM ADMINISTRATION AND MAINTENANCE'),
(171, 'Hh2bpYss', 1, 'das', 'enumeration', 1, 0, 0, 'dasdasd', 1, 'none', 'kp5xhjkF', 'none', 'ENTREPRENEURSHIP'),
(172, 'Ohay9sCh', 1, 'asd', 'enumeration', 1, 0, 0, 'asds', 1, 'none', 'IgrdrKTm', 'none', 'ENTREPRENEURSHIP'),
(173, 'Ohay9sCh', 1, 'asd', 'enumeration', 1, 0, 0, 'asds', 1, 'none', 'IgrdrKTm', 'none', 'ENTREPRENEURSHIP'),
(174, 'tgMnhxXa', 2, 'dasd', 'enumeration', 1, 0, 0, 'asdasd', 1, 'none', '8ZS3fzlt', 'none', 'ENTREPRENEURSHIP'),
(175, 'kf12ami0', 1, 'dasd', 'enumeration', 1, 0, 0, 'asd', 1, 'none', 'yxIKY57R', 'none', 'SYSTEM ADMINISTRATION AND MAINTENANCE'),
(176, 'kf12ami0', 1, 'dasd', 'enumeration', 1, 0, 0, 'asd', 1, 'none', 'yxIKY57R', 'none', 'SYSTEM ADMINISTRATION AND MAINTENANCE'),
(177, 'kf12ami0', 1, 'dasd', 'enumeration', 1, 0, 0, 'asd', 1, 'none', 'yxIKY57R', 'none', 'SYSTEM ADMINISTRATION AND MAINTENANCE'),
(178, 'KYZE9iQv', 2, 'das', 'enumeration', 1, 0, 0, 'asdas', 1, 'none', 'UY47Y6EM', 'none', 'SYSTEM ADMINISTRATION AND MAINTENANCE'),
(179, 'kf12ami0', 1, 'dasd', 'enumeration', 1, 0, 0, 'asd', 1, 'none', 'yxIKY57R', 'none', 'SYSTEM ADMINISTRATION AND MAINTENANCE'),
(180, 'KYZE9iQv', 2, 'das', 'enumeration', 1, 0, 0, 'asdas', 1, 'none', 'UY47Y6EM', 'none', 'SYSTEM ADMINISTRATION AND MAINTENANCE'),
(181, 'kf12ami0', 1, 'dasd', 'enumeration', 1, 0, 0, 'asd', 1, 'none', 'yxIKY57R', 'none', 'SYSTEM ADMINISTRATION AND MAINTENANCE'),
(182, 'KYZE9iQv', 2, 'das', 'enumeration', 1, 0, 0, 'asdas', 1, 'none', 'UY47Y6EM', 'none', 'SYSTEM ADMINISTRATION AND MAINTENANCE'),
(183, 'kf12ami0', 1, 'dasd', 'enumeration', 1, 0, 0, 'asd', 1, 'none', 'yxIKY57R', 'none', 'SYSTEM ADMINISTRATION AND MAINTENANCE'),
(184, 'KYZE9iQv', 2, 'das', 'enumeration', 1, 0, 0, 'asdas', 1, 'none', 'UY47Y6EM', 'none', 'SYSTEM ADMINISTRATION AND MAINTENANCE'),
(185, 'kf12ami0', 1, 'dasd', 'enumeration', 1, 0, 0, 'asd', 1, 'none', 'yxIKY57R', 'none', 'SYSTEM ADMINISTRATION AND MAINTENANCE'),
(186, 'KYZE9iQv', 2, 'das', 'enumeration', 1, 0, 0, 'asdas', 1, 'none', 'UY47Y6EM', 'none', 'SYSTEM ADMINISTRATION AND MAINTENANCE'),
(187, '4Y4R4edX', 3, 'das', 'enumeration', 1, 0, 0, 'asds', 1, 'none', 'yjI8wqhE', 'none', 'SYSTEM ADMINISTRATION AND MAINTENANCE'),
(188, '4Y4R4edX', 3, 'das', 'enumeration', 1, 0, 0, 'asds', 1, 'none', 'yjI8wqhE', 'none', 'SYSTEM ADMINISTRATION AND MAINTENANCE'),
(189, 'kf12ami0', 1, 'dasd', 'enumeration', 1, 0, 0, 'asd', 1, 'none', 'yxIKY57R', 'none', 'SYSTEM ADMINISTRATION AND MAINTENANCE'),
(190, 'KYZE9iQv', 2, 'das', 'enumeration', 1, 0, 0, 'asdas', 1, 'none', 'UY47Y6EM', 'none', 'SYSTEM ADMINISTRATION AND MAINTENANCE'),
(191, 'aCPXaMGI', 1, 'In JavaScript, objects are immutable.', 'True Or False', 1, 1, 0, 'False', 0, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(192, 'aCPXaMGI', 2, 'none', 'fill', 1, 0, 0, 'none', 1, 'none', 'none', 'YXWApu2U', 'ENTREPRENEURSHIP');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quiz`
--

INSERT INTO `quiz` (`quizID`, `quizTitle`, `quizInstructions`, `questionID`, `subjectName`, `totalPoints`, `totalQuestions`, `time`, `date`, `duration`, `random`, `autoView`) VALUES
('1bRWITVE', 'Java Script Quiz', 'Answer properly.', 'bbLmxfIX', 'ENTREPRENEURSHIP', 2, 2, '03:35 AM', 'Mon Jan 22 2024', 0, '1', '0'),
('1Oc0uJXk', 'Python Quiz', 'Answer properly.', 'Fi2qqJFY', 'CAPSTONE 1', 3, 3, '05:30 PM', 'Thu Jan 18 2024', 0, '1', '0'),
('2eb7oSeH', 'Java Quiz', 'Answer properly.', 'UICd4r8F', 'CAPSTONE 1', 3, 3, '11:09 PM', 'Wed Jan 24 2024', 0, '1', '0'),
('aCPXaMGI', 'java quiz', 'nice', 'aCPXaMGI', 'ENTREPRENEURSHIP', 2, 2, '12:57 PM', 'Mon Jun 24 2024', 30, '1', '0'),
('e61DROKC', 'ASDAS', 'DASD', 'e61DROKC', 'ENTREPRENEURSHIP', 2, 2, '09:51 AM', 'Fri Jun 21 2024', 0, '1', '0'),
('Qdr6JsPc', 'dasdas', 'dasdasd', 'Qdr6JsPc', 'CAPSTONE 1', 2, 2, '06:25 PM', 'Thu Jun 06 2024', 0, '1', '0'),
('UUAVMWI5', 'exercise 101', 'exercise 101', 'UUAVMWI5', 'CAPSTONE 1', 3, 3, '01:52 PM', 'Wed Jun 12 2024', 0, '1', '0');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reactions`
--

INSERT INTO `reactions` (`id`, `reactID`, `postID`, `acctID`, `classCode`, `reactType`) VALUES
(28, '8aLHPx4c', '8aLHPx4c', 'un2kt7px', 'IT 411', 'heart'),
(30, 'lz8YnK4M', 'lz8YnK4M', 'un2kt7px', 'IT 411', 'like'),
(43, 'kDBvDNOI', 'th5tRTPX', 'un2kt7px', 'IT 411', 'like'),
(44, 'JbuyEy4q', 'th5tRTPX', 'un2kt7px', 'IT 411', 'heart'),
(45, 'S63hVZAm', '1SXMpTpy', 'un2kt7px', 'IT-ELECT2', 'heart'),
(46, '7jUiSBua', '1SXMpTpy', 'un2kt7px', 'IT-ELECT2', 'like'),
(47, 'jAmPiGdS', 'gb3YpAQC', 'un2kt7px', 'IT-ELECT2', 'heart'),
(48, 'fWhVAv6d', 'gb3YpAQC', 'VHXQ6s6O', 'IT-ELECT2', 'heart');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`id`, `schedID`, `postID`, `schedDate`, `schedTime`, `dueDate`, `dueTime`, `closeDate`, `closeTime`) VALUES
(1, '1Oc0uJXk', 'Tu2qqJFY', '2024-01-05', '21:40', '2024-01-05', '09:40', '2024-02-02', '09:42'),
(2, '2eb7oSeH', 'Yu2qqJFY', '2024-01-05', '21:40', '2024-01-05', '09:40', '2024-02-02', '09:42');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `scores`
--

INSERT INTO `scores` (`id`, `scoreID`, `quizID`, `acctID`, `fullname`, `score`) VALUES
(1, '1Oc0uJXk', '1Oc0uJXk', 'un2kt7px', 'Rumar C. Pamparo', 3),
(2, '8ePQ5du4', '1Oc0uJXk', 'VHXQ6s6O', 'Allan C Caluigiran', 1);

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `id` int(10) NOT NULL,
  `subjectName` varchar(50) NOT NULL,
  `subjectCode` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subject`
--

INSERT INTO `subject` (`id`, `subjectName`, `subjectCode`) VALUES
(1, 'SYSTEM ADMINISTRATION AND MAINTENANCE', 'IT 412'),
(2, 'ENTREPRENEURSHIP', 'ELECTIVE 13'),
(3, 'CAPSTONE 1', 'IT 411'),
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
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=155;

--
-- AUTO_INCREMENT for table `class`
--
ALTER TABLE `class`
  MODIFY `classID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1983;

--
-- AUTO_INCREMENT for table `class_list`
--
ALTER TABLE `class_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1847;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `filllayout`
--
ALTER TABLE `filllayout`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `friends`
--
ALTER TABLE `friends`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;

--
-- AUTO_INCREMENT for table `image`
--
ALTER TABLE `image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1971;

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1949;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=281;

--
-- AUTO_INCREMENT for table `questionbank`
--
ALTER TABLE `questionbank`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=193;

--
-- AUTO_INCREMENT for table `reactions`
--
ALTER TABLE `reactions`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

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
