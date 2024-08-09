-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 09, 2024 at 08:03 AM
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
('un2kt7px', 'faculty', 'pamparor@gmail.com', 'rumar12345', 'Rumar', 'Capoquian', 'Pamparo', 'online', 'un2kt7px'),
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
(154, 'h6iu0Ivc', 'D', 'cvvc', 1),
(155, 'cndoArXj', 'A', 'aa', 0),
(156, 'cndoArXj', 'C', 'cc', 0),
(157, 'cndoArXj', 'D', 'dd', 1),
(158, 'cndoArXj', 'B', 'bb', 0);

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
(2, 'ENTREPRENEURSHIP 2', 'ENTREPRENEURSHIP EDDITED', 'IT-ELECT2', '42d8800e', 'YHXQ6s61'),
(1983, 'sample11', 'none', 'sample455', '4BOq5RAZ', '4BOq5RAZ'),
(1984, 'sample55', 'none', 'saple777', 'b3rGUPML', 'b3rGUPML'),
(1991, 'name1', 'class1', 'class1', 'jbnWPzX7', 'default'),
(1992, 'name2', 'class2', 'class2', 'vHOk8HRN', 'default'),
(1993, 'name3 updated', 'class3 updated', 'class3 upd', '6cQZ1Hjv', 'default');

-- --------------------------------------------------------

--
-- Table structure for table `class_list`
--

CREATE TABLE `class_list` (
  `id` int(11) NOT NULL,
  `acctID` varchar(8) NOT NULL,
  `classCode` varchar(10) NOT NULL,
  `classDesc` varchar(100) NOT NULL,
  `hidden` varchar(5) NOT NULL,
  `imageID` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `class_list`
--

INSERT INTO `class_list` (`id`, `acctID`, `classCode`, `classDesc`, `hidden`, `imageID`) VALUES
(1, 'un2kt7px', 'IT-CAP2', 'IT 4C', 'false', 'xVKKzdPD'),
(1836, 'un2kt7px', 'IT-ELECT2', 'ENTREPRENEURSHIP EDDITED', 'false', 'YHXQ6s61'),
(1844, 'Tk6Bxe8U', 'IT-ELECT2', 'ENTREPRENEURSHIP EDDITED', 'false', 'YHXQ6s61'),
(1845, 'VHXQ6s6O', 'IT-CAP2', 'IT 4C', 'false', 'xVKKzdPD'),
(1846, 'VHXQ6s6O', 'IT-ELECT2', 'ENTREPRENEURSHIP EDDITED', 'false', 'YHXQ6s61'),
(1849, 'un2kt7px', 'sample455', 'none', 'false', '4BOq5RA'),
(1852, 'un2kt7px', 'saple777', 'none', 'false', 'b3rGUPML'),
(1859, 'un2kt7px', 'class3 upd', 'class3', 'false', 'default'),
(1860, 'un2kt7px', 'class1', 'class1', 'false', 'default'),
(1861, 'un2kt7px', 'class2', 'class2', 'false', 'default');

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
(33, 'Bd4lkWFD', 'Bd4lkWFD', 'IT-CAP2', 'un2kt7px', 'Rumar C. Pamparo', 'dsads', '05:03 PM', 'Wed May 08 2024', 'none', 'none'),
(34, '7rnywy9X', '7rnywy9X', 'IT-CAP2', 'un2kt7px', 'Rumar C. Pamparo', 'sample comment', '09:16 AM', 'Thu Jul 25 2024', 'none', 'none');

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
(115, 'un2kt7px', 'VHXQ6s6O', 'Allan C. Caluigiran', 'VHXQ6s6O'),
(116, 'VHXQ6s6O', 'un2kt7px', 'Rumar C. Pamparo', 'un2kt7px'),
(117, 'Tk6Bxe8U', 'un2kt7px', 'Rumar C. Pamparo', 'un2kt7px'),
(135, 'VHXQ6s6O', 'Tk6Bxe8U', 'Mark L. Adduru', 'Tk6Bxe8U'),
(136, 'un2kt7px', 'Tk6Bxe8U', 'Mark L. Adduru', 'Tk6Bxe8U');

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
(1968, 'pexels-stywo-1261728.jpg', 'image/jpeg', 'image_1719161300026.jpg', 'Fri May 31 2024', '03:44 PM', 'un2kt7px', 'none', 'yxIKY57R'),
(1969, 'pexels-stywo-1261728.jpg', 'image/jpeg', 'image_1719161300035.jpg', 'Fri May 31 2024', '03:44 PM', 'un2kt7px', 'none', 'yjI8wqhE'),
(1970, 'pexels-stywo-1261728.jpg', 'image/jpeg', 'image_1719161300030.jpg', 'Fri May 31 2024', '03:44 PM', 'un2kt7px', 'none', 'UY47Y6EM'),
(1971, 'default', 'image/jpeg', 'default.jpg', 'Fri May 31 2024', '03:44 PM', '	 un2kt7px', 'none', 'default'),
(1975, 'fb.png', 'image/png', 'image_1721006490006.png', 'Fri May 31 2024', '03:44 PM', 'un2kt7px', 'none', '4BOq5RAZ'),
(1976, 'DICEN SALON AND BARBERSHOP LAYOUT copy.jpg', 'image/jpeg', 'image_1721006530087.jpg', 'Fri May 31 2024', '03:44 PM', 'un2kt7px', 'none', 'b3rGUPML'),
(1977, 'Kangkong-King-Sinigang-v0-Cropped2-scaled.jpg', 'image/jpeg', 'image_1721790691385.jpg', 'undefined', 'undefined', 'un2kt7px', 'none', 'VpHB3DyJ'),
(1992, '284574827_1078717512724168_7633977314528252407_n - Copy - Copy.jpg', 'image/jpeg', 'image_1722260339815.jpg', 'Mon Jul 29 2024', '09:38 PM', 'VHXQ6s6O', 'IT-CAP2', ''),
(1993, 'wp1870854.jpg', 'image/jpeg', 'image_1722261142282.jpg', 'Mon Jul 29 2024', '09:52 PM', 'VHXQ6s6O', 'IT-CAP2', ''),
(1997, 'default', 'image/jpeg', 'none', '', '', '', '', 'none'),
(1998, 'default', 'image/jpeg', 'none', '', '', '', '', 'none'),
(1999, 'default', 'image/jpeg', 'none', '', '', '', '', 'none'),
(2000, 'default', 'image/jpeg', 'none', '', '', '', '', 'default'),
(2001, 'default', 'image/jpeg', 'none', '', '', '', '', 'default'),
(2002, 'default', 'image/jpeg', 'none', '', '', '', '', 'default'),
(2003, 'default', 'image/jpeg', 'none', '', '', '', '', 'default'),
(2004, 'default', 'image/jpeg', 'none', '', '', '', '', 'default'),
(2005, 'default', 'image/jpeg', 'none', '', '', '', '', 'default');

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
(1948, '42d8800e', 'VHXQ6s6O', 'Allan', 'Caranguioan', 'Caluigiran', 'member', 'VHXQ6s6O'),
(1949, 'zjVcGFGO', 'un2kt7px', 'Rumar', 'Capoquian', 'Pamparo', 'admin', 'un2kt7px'),
(1950, 'zmPWZ1mU', 'un2kt7px', 'Rumar', 'Capoquian', 'Pamparo', 'admin', 'un2kt7px'),
(1951, 'VIhJizN4', 'un2kt7px', 'Rumar', 'Capoquian', 'Pamparo', 'admin', 'un2kt7px'),
(1952, 'sxb9Wsbg', 'un2kt7px', 'Rumar', 'Capoquian', 'Pamparo', 'admin', 'un2kt7px'),
(1953, '4BOq5RAZ', 'un2kt7px', 'Rumar', 'Capoquian', 'Pamparo', 'admin', 'un2kt7px'),
(1954, 'b3rGUPML', 'un2kt7px', 'Rumar', 'Capoquian', 'Pamparo', 'admin', 'un2kt7px'),
(1955, 'XbWegrRq', 'un2kt7px', 'Rumar', 'Capoquian', 'Pamparo', 'admin', 'un2kt7px'),
(1956, 'tkcXZz0J', 'un2kt7px', 'Rumar', 'Capoquian', 'Pamparo', 'admin', 'un2kt7px'),
(1957, '9tb8whSn', 'un2kt7px', 'Rumar', 'Capoquian', 'Pamparo', 'admin', 'un2kt7px'),
(1958, 'Twjz1w9l', 'un2kt7px', 'Rumar', 'Capoquian', 'Pamparo', 'admin', 'un2kt7px'),
(1959, 'ZwQFdwj5', 'un2kt7px', 'Rumar', 'Capoquian', 'Pamparo', 'admin', 'un2kt7px'),
(1960, 'G5kHawI4', 'un2kt7px', 'Rumar', 'Capoquian', 'Pamparo', 'admin', 'un2kt7px'),
(1961, 'jbnWPzX7', 'un2kt7px', 'Rumar', 'Capoquian', 'Pamparo', 'admin', 'un2kt7px'),
(1962, 'vHOk8HRN', 'un2kt7px', 'Rumar', 'Capoquian', 'Pamparo', 'admin', 'un2kt7px'),
(1963, '6cQZ1Hjv', 'un2kt7px', 'Rumar', 'Capoquian', 'Pamparo', 'admin', 'un2kt7px');

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
(107, 'tn2kt700', 'Tk6Bxe8U', 'Oy tols', 'un2kt7px', 'Tk6Bxe8U', 'Wed Dec 20 2023', '01:21 PM'),
(108, 'tn2kt700', 'Tk6Bxe8U', 'Oy mar', 'Tk6Bxe8U', 'un2kt7px', 'Wed Dec 20 2023', '01:25 PM'),
(109, 'tn2kt700', 'Tk6Bxe8U', 'Oy mar', 'Tk6Bxe8U', 'un2kt7px', 'Wed Dec 20 2023', '01: 15 PM'),
(110, 'pwoU9YOA', 'Tk6Bxe8U', 'sample', 'un2kt7px', 'Tk6Bxe8U', 'Fri Jul 19 2024', '12:15 PM');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `notificationID` varchar(8) NOT NULL,
  `acctID` varchar(10) NOT NULL,
  `title` varchar(100) NOT NULL,
  `data` varchar(50) NOT NULL,
  `content` varchar(100) NOT NULL,
  `date` varchar(50) NOT NULL,
  `time` varchar(50) NOT NULL,
  `type` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `notificationID`, `acctID`, `title`, `data`, `content`, `date`, `time`, `type`) VALUES
(15, 'zHL3Hu6X', 'Tk6Bxe8U', 'Allan C. Caluigiran', 'image_1701668137802.png', 'added you as a friend.', 'Fri Jul 19 2024', '04:18 PM', 'profile'),
(16, 'wWUeLTlo', 'Tk6Bxe8U', 'Rumar C. Pamparo', 'image_1701691103989.jpg', 'added you as a friend.', 'Fri Jul 19 2024', '05:15 PM', 'profile');

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
  `schedStatus` varchar(5) NOT NULL,
  `dueStatus` varchar(5) NOT NULL,
  `closeStatus` varchar(5) NOT NULL,
  `duration` int(10) NOT NULL,
  `random` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`id`, `postID`, `acctID`, `name`, `timePosted`, `datePosted`, `postContent`, `replyID`, `imageID`, `fileID`, `heartCount`, `likeCount`, `classCode`, `subjectName`, `postType`, `quizID`, `schedID`, `schedStatus`, `dueStatus`, `closeStatus`, `duration`, `random`) VALUES
(1, '5B7Rww8K', 'un2kt7px', 'Rumar C. Pamparo', '09:52 PM', 'Wed Dec 06 2023', 'Multiple Images', '5B7Rww8K', '5B7Rww8K', 'none', 0, 0, 'IT-CAP2', 'CAPSTONE 2', 'normal', 'none', 'none', 'no', 'no', 'no', 0, 'none'),
(3, 'GoWYC8s', 'un2kt7px', 'Rumar C. Pamparo', '08:51 PM', 'Thu Dec 07 2023', 'Single Images', 'GoWYC8sL', 'BgJ3t4MP', 'none', 0, 0, 'IT-CAP2', 'CAPSTONE 2', 'normal', 'none', 'none', 'no', 'no', 'no', 0, 'none'),
(4, 'lz8YnK4M', 'un2kt7px', 'Rumar C. Pamparo', '08:52 PM', 'Thu Dec 07 2023', 'Single Files', 'lz8YnK4M', 'none', 'lz8YnK4M', 0, 0, 'IT-ELECT2', 'ENTREPRENEURSHIP 2', 'normal', 'none', 'none', 'no', 'no', 'no', 0, 'none'),
(5, 'th5tRTPX', 'un2kt7px', 'Rumar C. Pamparo', '08:54 PM', 'Thu Dec 07 2023', 'Multi Files', 'th5tRTPX', 'none', 'th5tRTPX', 0, 0, 'IT-ELECT2', 'ENTREPRENEURSHIP 2', 'normal', 'none', 'none', 'no', 'no', 'no', 0, 'none'),
(258, 'mORXxJYo', 'un2kt7px', 'Rumar C. Pamparo', '07:50 PM', 'Sun Apr 14 2024', 'test', 'mORXxJYo', 'mORXxJYo', 'none', 0, 0, 'IT-CAP2', 'CAPSTONE 2', 'normal', 'none', 'none', 'no', 'no', 'no', 0, 'none'),
(259, 'dNf522yo', 'un2kt7px', 'Rumar C. Pamparo', '08:02 PM', 'Sun Apr 14 2024', 'try nga', 'dNf522yo', 'dNf522yo', 'none', 0, 0, 'IT-CAP2', 'CAPSTONE 2', 'normal', 'none', 'none', 'no', 'no', 'no', 0, 'none'),
(260, 'Bd4lkWFD', 'un2kt7px', 'Rumar C. Pamparo', '08:04 PM', 'Sun Apr 14 2024', 'test1', 'Bd4lkWFD', 'Bd4lkWFD', 'none', 0, 0, 'IT-CAP2', 'CAPSTONE 2', 'normal', 'none', 'none', 'no', 'no', 'no', 0, 'none'),
(269, 'TDVJI3IY', 'un2kt7px', 'Rumar C. Pamparo', '11:32 AM', 'Mon Apr 15 2024', 'pdf sample', 'TDVJI3IY', 'none', 'TDVJI3IY', 0, 0, 'IT-ELECT2', 'ENTREPRENEURSHIP 2', 'normal', 'none', 'none', 'no', 'no', 'no', 0, 'none'),
(270, 'iwPl3xFW', 'un2kt7px', 'Rumar C. Pamparo', '11:37 AM', 'Mon Apr 15 2024', 'sample multiple', 'iwPl3xFW', 'none', 'iwPl3xFW', 0, 0, 'IT-ELECT2', 'ENTREPRENEURSHIP 2', 'normal', 'none', 'none', 'no', 'no', 'no', 0, 'none'),
(271, 'XlcYbqYk', 'un2kt7px', 'Rumar C. Pamparo', '11:49 AM', 'Mon Apr 15 2024', 'nel', 'XlcYbqYk', 'none', 'XlcYbqYk', 0, 0, 'IT-ELECT2', 'ENTREPRENEURSHIP 2', 'normal', 'none', 'none', 'no', 'no', 'no', 0, 'none'),
(272, 'DOann9lo', 'un2kt7px', 'Rumar C. Pamparo', '09:14 AM', 'Tue Apr 16 2024', 'sample multiple post', 'DOann9lo', 'DOann9lo', 'DOann9lo', 0, 0, 'IT-ELECT2', 'ENTREPRENEURSHIP 2', 'normal', 'none', 'none', 'no', 'no', 'no', 0, 'none'),
(273, '1SXMpTpy', 'un2kt7px', 'Rumar C. Pamparo', '09:15 AM', 'Tue Apr 16 2024', 'sample', '1SXMpTpy', '1SXMpTpy', 'none', 0, 0, 'IT-ELECT2', 'ENTREPRENEURSHIP 2', 'normal', 'none', 'none', 'no', 'no', 'no', 0, 'none'),
(277, 'gb3YpAQC', 'Tk6Bxe8U', 'Mark L. Adduru', '04:33 PM', 'Thu Apr 18 2024', 'sample lang perds', 'gb3YpAQC', 'gb3YpAQC', 'gb3YpAQC', 0, 0, 'IT-ELECT2', 'ENTREPRENEURSHIP 2', 'normal', 'none', 'none', 'no', 'no', 'no', 0, 'none'),
(278, 'Ciaq97Dj', 'un2kt7px', 'Rumar C. Pamparo', '05:03 PM', 'Wed May 08 2024', 'sads', 'Ciaq97Dj', 'Ciaq97Dj', 'Ciaq97Dj', 0, 0, 'IT-CAP2', 'CAPSTONE 2', 'normal', 'none', 'none', 'no', 'no', 'no', 0, 'none'),
(279, 'Tu2qqJFY', 'un2kt7px', 'Rumar C. Pamparo', '02:24 PM', 'Mon Jul 29 2024', 'Exercise 1', 'Tu2qqJFY', 'none', 'none', 0, 0, 'IT-CAP2', 'CAPSTONE 1', 'normal', '1Oc0uJXk', 'Tu2qqJF6', 'yes', 'no', 'no', 0, '1'),
(281, 'JEK8w5Au', 'un2kt7px', 'Rumar C Pamparo', '11:43 PM', 'Mon Jun 24 2024', 'post sample', 'JEK8w5Au', 'none', 'none', 0, 0, 'IT-CAP2', 'CAPSTONE 1', 'normal', 'Kd5FbBsT', 'none', 'no', 'no', 'no', 0, '1'),
(282, 'cpGlnx6n', 'un2kt7px', 'Rumar C Pamparo', '11:47 PM', 'Mon Jun 24 2024', 'post sample 1', 'cpGlnx6n', 'none', 'none', 0, 0, 'IT-CAP2', 'CAPSTONE 1', 'normal', 'Kd5FbBsT', 'none', 'no', 'no', 'no', 0, '1'),
(283, 'Yqw1TmMC', 'un2kt7px', 'Rumar C Pamparo', '10:13 AM', 'Wed Jul 24 2024', 'try quiz', 'Yqw1TmMC', 'none', 'none', 0, 0, 'IT-CAP2', 'CAPSTONE 1', 'normal', 'chcFBWv3', 'none', 'no', 'no', 'no', 0, '1'),
(287, 'PCUTjEHf', 'un2kt7px', 'Rumar C Pamparo', '11:20 AM', 'Wed Jul 24 2024', 'sample final quiz post', 'PCUTjEHf', 'none', 'none', 0, 0, 'IT-CAP2', 'CAPSTONE 1', 'normal', 'D1d88JDT', 'none', 'no', 'no', 'no', 0, '1'),
(288, '9VXI5qTk', 'un2kt7px', 'Rumar C Pamparo', '11:33 AM', 'Wed Jul 24 2024', 'sample final quiz', '9VXI5qTk', 'none', 'none', 0, 0, 'IT-CAP2', 'CAPSTONE 1', 'normal', 'HfMjnACD', 'none', 'no', 'no', 'no', 0, '1'),
(289, '7rnywy9X', 'un2kt7px', 'Rumar C Pamparo', '11:01 AM', 'Thu Jul 25 2024', 'SAMPLE SCHED POST', '7rnywy9X', 'none', 'none', 0, 0, 'IT-CAP2', 'CAPSTONE 1', 'normal', 'TCTZ66aH', 'none', 'no', 'no', 'no', 0, '1');

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
(3, 'UICd4r8F', 'Its all about Java', 'CAPSTONE 1', 'UICd4r8F', 3, 3, '09:10 PM', 'Wed Jan 17 2024'),
(13, 'spr3Rs8E', 'sample titla', 'CAPSTONE 1', 'spr3Rs8E', 3, 3, '04:20 PM', 'Tue Jul 23 2024'),
(14, 'JCRXTlwb', 'question final test', 'CAPSTONE 1', 'JCRXTlwb', 3, 3, '11:11 AM', 'Wed Jul 24 2024');

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
(30, 'Kd5FbBsT', 3, 'In JavaScript, objects are immutable.', 'True Or False', 1, 1, 0, 'False', 1, 'none', 'none', 'none', 'ENTREPRENEURSHIP'),
(53, 'Kd5FbBsT', 1, 'none', 'fill', 1, 0, 0, 'none', 1, 'none', 'none', 'YXWApu2U', 'ENTREPRENEURSHIP'),
(55, 'Fi2qqJFY', 6, 'In Python, the print statement is used to display output to the console.', 'True Or False', 1, 0, 0, 'True', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(97, 'Kd5FbBsT', 1, 'What keyword is used to create a function in Python?', 'enumeration', 1, 0, 0, 'def', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(98, 'Kd5FbBsT', 2, 'Which of the following is used to inherit a class in Java?', 'choices', 1, 0, 0, 'none', 1, 'Pa2qqJFY', 'none', 'none', 'CAPSTONE 1'),
(99, 'Kd5FbBsT', 3, 'none', 'fill', 1, 0, 0, 'none', 2, 'none', 'none', 'wPgjtqxZ', 'CAPSTONE 1'),
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
(192, 'aCPXaMGI', 2, 'none', 'fill', 1, 0, 0, 'none', 1, 'none', 'none', 'YXWApu2U', 'ENTREPRENEURSHIP'),
(193, 'thK8Hjmu', 2, 'Which of the following is a mutable data type in Python?', 'enumeration', 1, 0, 0, 'list', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(194, 'thK8Hjmu', 3, 'Which of the following methods is used to add an element to the end of an array in JavaScript?', 'choices', 1, 0, 0, 'none', 1, 'C2pvxjPd', 'none', 'none', 'CAPSTONE 1'),
(195, 'thK8Hjmu', 1, 'In Python, the print statement is used to display output to the console.', 'True Or False', 1, 0, 0, 'True', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(196, 'thK8Hjmu', 2, 'Which of the following is a mutable data type in Python?', 'enumeration', 1, 0, 0, 'list', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(197, 'thK8Hjmu', 1, 'In Python, the print statement is used to display output to the console.', 'True Or False', 1, 0, 0, 'True', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(198, 'thK8Hjmu', 3, 'Which of the following methods is used to add an element to the end of an array in JavaScript?', 'choices', 1, 0, 0, 'none', 1, 'C2pvxjPd', 'none', 'none', 'CAPSTONE 1'),
(199, 'thK8Hjmu', 2, 'Which of the following is a mutable data type in Python?', 'enumeration', 1, 0, 0, 'list', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(200, 'thK8Hjmu', 3, 'Which of the following methods is used to add an element to the end of an array in JavaScript?', 'choices', 1, 0, 0, 'none', 1, 'C2pvxjPd', 'none', 'none', 'CAPSTONE 1'),
(201, 'thK8Hjmu', 1, 'In Python, the print statement is used to display output to the console.', 'True Or False', 1, 0, 0, 'True', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(208, 'VUO5Wd4f', 1, 'In Python, the print statement is used to display output to the console.', 'True Or False', 1, 0, 0, 'True', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(209, 'VUO5Wd4f', 2, 'Which of the following is a mutable data type in Python?', 'enumeration', 1, 0, 0, 'list', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(210, 'VUO5Wd4f', 3, 'Which of the following methods is used to add an element to the end of an array in JavaScript?', 'choices', 1, 0, 0, 'none', 1, 'C2pvxjPd', 'none', 'none', 'CAPSTONE 1'),
(211, 'UICd4r8F', 1, 'dasd', 'enumeration', 1, 0, 0, 'asd', 1, 'none', 'yxIKY57R', 'none', 'SYSTEM ADMINISTRATION AND MAINTENANCE'),
(212, 'UICd4r8F', 3, '', 'fill', 1, 0, 0, 'none', 1, 'none', 'none', 'Z22IU74j', 'SYSTEM ADMINISTRATION AND MAINTENANCE'),
(213, 'KMsigJNX', 1, 'dasd', 'enumeration', 1, 0, 0, 'asd', 1, 'none', 'yxIKY57R', 'none', 'SYSTEM ADMINISTRATION AND MAINTENANCE'),
(214, 'KMsigJNX', 4, 'Which of the following is a mutable data type in Python?', 'enumeration', 1, 0, 0, 'list', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(215, 'KMsigJNX', 3, 'In Python, the print statement is used to display output to the console.', 'True Or False', 1, 0, 0, 'True', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(216, 'KMsigJNX', 2, '', 'fill', 1, 0, 0, 'none', 1, 'none', 'none', 'Z22IU74j', 'SYSTEM ADMINISTRATION AND MAINTENANCE'),
(217, 'KMsigJNX', 1, 'dasd', 'enumeration', 1, 0, 0, 'asd', 1, 'none', 'yxIKY57R', 'none', 'SYSTEM ADMINISTRATION AND MAINTENANCE'),
(218, 'KMsigJNX', 3, 'In Python, the print statement is used to display output to the console.', 'True Or False', 1, 0, 0, 'True', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(219, 'KMsigJNX', 2, '', 'fill', 1, 0, 0, 'none', 1, 'none', 'none', 'Z22IU74j', 'SYSTEM ADMINISTRATION AND MAINTENANCE'),
(220, 'KMsigJNX', 1, 'dasd', 'enumeration', 1, 0, 0, 'asd', 1, 'none', 'yxIKY57R', 'none', 'SYSTEM ADMINISTRATION AND MAINTENANCE'),
(221, 'KMsigJNX', 4, 'Which of the following is a mutable data type in Python?', 'enumeration', 1, 0, 0, 'list', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(222, 'KMsigJNX', 3, 'In Python, the print statement is used to display output to the console.', 'True Or False', 1, 0, 0, 'True', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(223, 'KMsigJNX', 2, '', 'fill', 1, 0, 0, 'none', 1, 'none', 'none', 'Z22IU74j', 'SYSTEM ADMINISTRATION AND MAINTENANCE'),
(224, 'KMsigJNX', 4, 'Which of the following is a mutable data type in Python?', 'enumeration', 1, 0, 0, 'list', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(225, 'KMsigJNX', 1, 'dasd', 'enumeration', 1, 0, 0, 'asd', 1, 'none', 'yxIKY57R', 'none', 'SYSTEM ADMINISTRATION AND MAINTENANCE'),
(226, 'KMsigJNX', 2, '', 'fill', 1, 0, 0, 'none', 1, 'none', 'none', 'Z22IU74j', 'SYSTEM ADMINISTRATION AND MAINTENANCE'),
(227, 'KMsigJNX', 4, 'Which of the following is a mutable data type in Python?', 'enumeration', 1, 0, 0, 'list', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(228, 'KMsigJNX', 3, 'In Python, the print statement is used to display output to the console.', 'True Or False', 1, 0, 0, 'True', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(290, 'J4Gymr6X', 1, 'sample question 1', 'enumeration', 1, 0, 0, 'sample question 1', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(291, 'J4Gymr6X', 2, 'sample question 2', 'enumeration', 1, 0, 0, 'sample question 2', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(292, 'J4Gymr6X', 3, 'sample question 3', 'enumeration', 1, 0, 0, 'sample question 3', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(293, 'XXMG8ks4', 1, 'sample question 1', 'enumeration', 1, 0, 0, 'sample question 1', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(294, 'XXMG8ks4', 2, 'sample question 2', 'enumeration', 1, 0, 0, 'sample question 2', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(295, 'XXMG8ks4', 3, 'sample question 3', 'enumeration', 1, 0, 0, 'sample question 3', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(296, 'vNB77hij', 1, 'sample question 1', 'enumeration', 1, 0, 0, 'sample question 1', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(297, 'vNB77hij', 2, 'sample question 2', 'enumeration', 1, 0, 0, 'sample question 2', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(298, 'vNB77hij', 3, 'sample question 3', 'enumeration', 1, 0, 0, 'sample question 3', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(299, 'spr3Rs8E', 3, 'sample question 3', 'enumeration', 1, 0, 0, 'sample question 3', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(300, 'spr3Rs8E', 1, 'sample question 1', 'enumeration', 1, 0, 0, 'sample question 1', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(301, 'spr3Rs8E', 2, 'sample question 2', 'enumeration', 1, 0, 0, 'sample question 2', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(311, 'dN2XmVU5', 1, 'In Python, the print statement is used to display output to the console.', 'True Or False', 1, 0, 0, 'True', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(312, 'dN2XmVU5', 1, 'In Python, the print statement is used to display output to the console.', 'True Or False', 1, 0, 0, 'True', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(313, 'dN2XmVU5', 2, 'Which of the following is a mutable data type in Python?', 'enumeration', 1, 0, 0, 'list', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(314, 'dN2XmVU5', 3, 'Which of the following methods is used to add an element to the end of an array in JavaScript?', 'choices', 1, 0, 0, 'none', 1, 'C2pvxjPd', 'none', 'none', 'CAPSTONE 1'),
(315, 'dN2XmVU5', 2, 'Which of the following is a mutable data type in Python?', 'enumeration', 1, 0, 0, 'list', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(316, 'dN2XmVU5', 3, 'Which of the following methods is used to add an element to the end of an array in JavaScript?', 'choices', 1, 0, 0, 'none', 1, 'C2pvxjPd', 'none', 'none', 'CAPSTONE 1'),
(317, 'dN2XmVU5', 1, 'In Python, the print statement is used to display output to the console.', 'True Or False', 1, 0, 0, 'True', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(318, 'dN2XmVU5', 2, 'Which of the following is a mutable data type in Python?', 'enumeration', 1, 0, 0, 'list', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(319, 'dN2XmVU5', 3, 'Which of the following methods is used to add an element to the end of an array in JavaScript?', 'choices', 1, 0, 0, 'none', 1, 'C2pvxjPd', 'none', 'none', 'CAPSTONE 1'),
(329, 'LuNpxVVK', 1, 'dasd', 'enumeration', 1, 0, 0, 'asd', 1, 'none', 'yxIKY57R', 'none', 'SYSTEM ADMINISTRATION AND MAINTENANCE'),
(330, 'LuNpxVVK', 2, '', 'fill', 1, 0, 0, 'none', 1, 'none', 'none', 'Z22IU74j', 'SYSTEM ADMINISTRATION AND MAINTENANCE'),
(333, 'JCRXTlwb', 1, 'sample question', 'enumeration', 1, 0, 0, 'sample answer', 1, 'none', 'VpHB3DyJ', 'none', 'CAPSTONE 1'),
(334, 'JCRXTlwb', 2, 'sample question 2', 'enumeration', 1, 0, 0, 'sample question 2', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(335, 'JCRXTlwb', 3, 'sample', 'choices', 1, 0, 0, 'none', 1, 'cndoArXj', 'none', 'none', 'CAPSTONE 1'),
(363, 'HfMjnACD', 1, 'sample question', 'enumeration', 1, 0, 0, 'sample answer', 1, 'none', 'VpHB3DyJ', 'none', 'CAPSTONE 1'),
(364, 'HfMjnACD', 2, 'sample question 2', 'enumeration', 1, 0, 0, 'sample question 2', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(365, 'HfMjnACD', 3, 'sample', 'choices', 1, 0, 0, 'none', 1, 'cndoArXj', 'none', 'none', 'CAPSTONE 1'),
(366, 'TCTZ66aH', 1, 'dasd', 'enumeration', 1, 0, 0, 'asd', 1, 'none', 'yxIKY57R', 'none', 'SYSTEM ADMINISTRATION AND MAINTENANCE'),
(367, 'TCTZ66aH', 2, '', 'fill', 1, 0, 0, 'none', 1, 'none', 'none', 'Z22IU74j', 'SYSTEM ADMINISTRATION AND MAINTENANCE'),
(368, 'biLQsyzq', 1, 'dasd', 'enumeration', 1, 0, 0, 'asd', 1, 'none', 'yxIKY57R', 'none', 'SYSTEM ADMINISTRATION AND MAINTENANCE'),
(369, 'biLQsyzq', 2, '', 'fill', 1, 0, 0, 'none', 1, 'none', 'none', 'Z22IU74j', 'SYSTEM ADMINISTRATION AND MAINTENANCE'),
(370, 'tXND6smY', 1, 'In Python, the print statement is used to display output to the console.', 'True Or False', 1, 0, 0, 'True', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(371, 'tXND6smY', 2, 'Which of the following is a mutable data type in Python?', 'enumeration', 1, 0, 0, 'list', 1, 'none', 'none', 'none', 'CAPSTONE 1'),
(372, 'tXND6smY', 3, 'Which of the following methods is used to add an element to the end of an array in JavaScript?', 'choices', 1, 0, 0, 'none', 1, 'C2pvxjPd', 'none', 'none', 'CAPSTONE 1');

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
  `autoView` varchar(10) NOT NULL,
  `postStatus` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quiz`
--

INSERT INTO `quiz` (`quizID`, `quizTitle`, `quizInstructions`, `questionID`, `subjectName`, `totalPoints`, `totalQuestions`, `time`, `date`, `duration`, `random`, `autoView`, `postStatus`) VALUES
('1bRWITVE', 'Java Script Quiz', 'Answer properly.', 'bbLmxfIX', 'ENTREPRENEURSHIP', 2, 2, '03:35 AM', 'Mon Jan 22 2024', 0, '1', '0', 'posted'),
('1Oc0uJXk', 'Python Quiz', 'Answer properly.', 'Fi2qqJFY', 'CAPSTONE 1', 3, 3, '05:30 PM', 'Thu Jan 18 2024', 2, '1', '0', '	 posted'),
('2eb7oSeH', 'Java Quiz', 'Answer properly.', 'UICd4r8F', 'CAPSTONE 1', 3, 3, '11:09 PM', 'Wed Jan 24 2024', 0, '1', '0', '	 posted'),
('aCPXaMGI', 'java quiz', 'nice', 'aCPXaMGI', 'ENTREPRENEURSHIP', 2, 2, '12:57 PM', 'Mon Jun 24 2024', 30, '1', '0', '	 posted'),
('AtQvM5AA', 'asd', 'asd', 'AtQvM5AA', 'CAPSTONE 1', 5, 5, '11:18 PM', 'Mon Jun 24 2024', 0, '1', '0', '	 posted'),
('biLQsyzq', 'SAMPLE SCHED POST', 'SAMPLE SCHED POST', 'biLQsyzq', 'CAPSTONE 1', 2, 2, '02:31 PM', 'Wed Jul 24 2024', 0, '1', '0', 'draft'),
('D1d88JDT', 'sample final title', 'sample final inst', 'D1d88JDT', 'CAPSTONE 1', 3, 3, '11:20 AM', 'Wed Jul 24 2024', 0, '1', '0', 'posted'),
('dN2XmVU5', 'asds', 'wdasd', 'dN2XmVU5', 'CAPSTONE 1', 3, 3, '09:55 AM', 'Wed Jul 24 2024', 0, '1', '0', 'posted'),
('e61DROKC', 'ASDAS', 'DASD', 'e61DROKC', 'ENTREPRENEURSHIP', 2, 2, '09:51 AM', 'Fri Jun 21 2024', 0, '1', '0', '	 posted'),
('HfMjnACD', 'SAMPLE', 'SAMPLE', 'HfMjnACD', 'CAPSTONE 1', 3, 3, '11:33 AM', 'Wed Jul 24 2024', 0, '1', '0', 'posted'),
('Kd5FbBsT', 'asd', 'asd', 'Kd5FbBsT', 'CAPSTONE 1', 5, 5, '11:18 PM', 'Mon Jun 24 2024', 0, '1', '0', '	 posted'),
('LuNpxVVK', 'sample', 'sample', 'LuNpxVVK', 'CAPSTONE 1', 2, 2, '11:00 AM', 'Wed Jul 24 2024', 0, '1', '0', 'posted'),
('qb4sOFmH', 'asd', 'asd', 'qb4sOFmH', 'CAPSTONE 1', 5, 5, '11:13 PM', 'Mon Jun 24 2024', 0, '1', '0', '	 posted'),
('Qdr6JsPc', 'dasdas', 'dasdasd', 'Qdr6JsPc', 'CAPSTONE 1', 2, 2, '06:25 PM', 'Thu Jun 06 2024', 0, '1', '0', '	 posted'),
('rGaeUvUs', 'asd', 'asd', 'rGaeUvUs', 'CAPSTONE 1', 5, 5, '11:17 PM', 'Mon Jun 24 2024', 0, '1', '0', '	 posted'),
('TCTZ66aH', 'SAMPLE SCHED POST', 'SAMPLE SCHED POST', 'TCTZ66aH', 'CAPSTONE 1', 2, 2, '02:29 PM', 'Wed Jul 24 2024', 0, '1', '0', 'posted'),
('thK8Hjmu', 'asd', 'asd', 'thK8Hjmu', 'CAPSTONE 1', 3, 3, '05:47 PM', 'Wed Jun 26 2024', 0, '1', '0', '	 posted'),
('tXND6smY', 'sample post now', 'sample', 'tXND6smY', 'CAPSTONE 1', 3, 3, '03:17 PM', 'Mon Jul 29 2024', 0, '1', '0', 'posted'),
('UcAtwUlg', 'asd', 'asd', 'UcAtwUlg', 'CAPSTONE 1', 2, 2, '05:39 PM', 'Wed Jun 26 2024', 0, '1', '0', '	 posted'),
('UUAVMWI5', 'exercise 101', 'exercise 101', 'UUAVMWI5', 'CAPSTONE 1', 3, 3, '01:52 PM', 'Wed Jun 12 2024', 0, '1', '0', '	 posted'),
('VUO5Wd4f', 'new', 'new', 'VUO5Wd4f', 'CAPSTONE 1', 3, 3, '05:48 PM', 'Wed Jun 26 2024', 0, '1', '0', '	 posted'),
('ZLTe3e5t', 'asd', 'asd', 'ZLTe3e5t', 'CAPSTONE 1', 3, 3, '05:44 PM', 'Wed Jun 26 2024', 0, '1', '0', '	 posted');

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
(48, 'fWhVAv6d', 'gb3YpAQC', 'VHXQ6s6O', 'IT-ELECT2', 'heart'),
(49, 'r9ZhOI5P', 'JEK8w5Au', 'VHXQ6s6O', 'IT-CAP2', 'heart');

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
(52, 'Tu2qqJF6', 'Tu2qqJF6', 'Fri Jul 29 2024', '01:05 PM', 'Fri Jul 29 2024', '12:44 PM', 'Fri Jul 29 2024', '12:45 PM');

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
(2, '8ePQ5du4', '1Oc0uJXk', 'VHXQ6s6O', 'Allan C Caluigiran', 1),
(29, 'CW7weSRU', 'Kd5FbBsT', 'VHXQ6s6O', 'Allan C Caluigiran', 4);

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
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=159;

--
-- AUTO_INCREMENT for table `class`
--
ALTER TABLE `class`
  MODIFY `classID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1994;

--
-- AUTO_INCREMENT for table `class_list`
--
ALTER TABLE `class_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1862;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

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
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=137;

--
-- AUTO_INCREMENT for table `image`
--
ALTER TABLE `image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2006;

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1964;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=303;

--
-- AUTO_INCREMENT for table `questionbank`
--
ALTER TABLE `questionbank`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=373;

--
-- AUTO_INCREMENT for table `reactions`
--
ALTER TABLE `reactions`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `scores`
--
ALTER TABLE `scores`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `subject`
--
ALTER TABLE `subject`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
