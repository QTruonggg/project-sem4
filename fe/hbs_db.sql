-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 12, 2024 at 07:24 PM
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
-- Database: `hbs_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `otp` varchar(255) DEFAULT NULL,
  `otp_creation_time` datetime DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `provider_id` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `created_date`, `email`, `otp`, `otp_creation_time`, `password`, `provider`, `provider_id`, `role`, `status`) VALUES
(1, NULL, 'emailcustomer@gmail.com', NULL, NULL, '$2a$10$5LSJJPHCX6kNxSs/rS7WfewQP2Ocy/kCBWIDpl88JccRXJsPUBvtq', NULL, NULL, 'CUSTOMER', 'ACTIVE'),
(2, NULL, 'emailmanager@gmail.com', NULL, NULL, '$2a$10$5LSJJPHCX6kNxSs/rS7WfewQP2Ocy/kCBWIDpl88JccRXJsPUBvtq', NULL, NULL, 'MANAGER', 'ACTIVE'),
(3, NULL, 'emailadmin@gmail.com', NULL, NULL, '$2a$10$5LSJJPHCX6kNxSs/rS7WfewQP2Ocy/kCBWIDpl88JccRXJsPUBvtq', NULL, NULL, 'ADMIN', 'ACTIVE'),
(4, NULL, 'emailsuperadmin@gmail.com', NULL, NULL, '$2a$10$5LSJJPHCX6kNxSs/rS7WfewQP2Ocy/kCBWIDpl88JccRXJsPUBvtq', NULL, NULL, 'SUPER_ADMIN', 'ACTIVE'),
(9, '2023-12-20 07:46:41', 'truong@gmail.com', NULL, NULL, '$2a$10$A/kSJbQTlCXasLxN9CrJ4O6EwglSs8hQUo4lbTohkDHoTj4zmzeOu', NULL, NULL, 'CUSTOMER', 'INACTIVE'),
(10, '2024-01-27 11:40:43', 'truonglqth2202004@fpt.edu.vn', NULL, NULL, '$2a$10$5LSJJPHCX6kNxSs/rS7WfewQP2Ocy/kCBWIDpl88JccRXJsPUBvtq', NULL, NULL, 'MANAGER', 'ACTIVE'),
(11, '2024-01-27 12:15:03', 'devtool.001@gmail.com', NULL, NULL, '$2a$10$5LSJJPHCX6kNxSs/rS7WfewQP2Ocy/kCBWIDpl88JccRXJsPUBvtq', NULL, NULL, 'CUSTOMER', 'ACTIVE'),
(16, '2024-03-12 11:46:02', 'nguyenntth2202020@fpt.edu.vn', NULL, '2024-03-12 11:48:14', '$2a$10$5LSJJPHCX6kNxSs/rS7WfewQP2Ocy/kCBWIDpl88JccRXJsPUBvtq', NULL, NULL, 'MANAGER', 'ACTIVE'),
(17, '2024-03-12 13:34:56', 'nguyenthai012012@gmail.com', NULL, NULL, '$2a$10$6mkN4rs2rWN56OXHan3bcunhNzUh2ImhczDWmCkgCU0uY22ktBDBm', NULL, NULL, 'MANAGER', 'ACTIVE'),
(18, '2024-03-19 13:28:09', 'dohongquantc@gmail.com', NULL, NULL, '$2a$10$5LSJJPHCX6kNxSs/rS7WfewQP2Ocy/kCBWIDpl88JccRXJsPUBvtq', NULL, NULL, 'MANAGER', 'ACTIVE');

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` bigint(20) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `account_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `address`, `avatar`, `date_of_birth`, `first_name`, `gender`, `last_name`, `phone_number`, `account_id`) VALUES
(1, 'Hải Dương', NULL, '2001-08-02', 'Admin', 'FEMALE', 'This is', '012345678', 3),
(5, 'hn', NULL, '2001-08-02', 'SAdmin', 'FEMALE', 'This is', '0999888777', 4);

-- --------------------------------------------------------

--
-- Table structure for table `area`
--

CREATE TABLE `area` (
  `id` bigint(20) NOT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `last_modified_by` varchar(255) DEFAULT NULL,
  `last_modified_date` datetime DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `area`
--

INSERT INTO `area` (`id`, `created_by`, `created_date`, `last_modified_by`, `last_modified_date`, `image`, `name`, `status`) VALUES
(1, 'emailadmin@gmail.com', '2024-01-27 11:39:44', 'emailadmin@gmail.com', '2024-01-27 11:39:44', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1706355583/61cd45b9-db5a-42e5-8b30-862d9fc10d52.jpg', 'Khu A', 'ACTIVE'),
(2, 'emailadmin@gmail.com', '2024-01-27 12:04:39', 'emailadmin@gmail.com', '2024-01-27 12:04:39', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1706357079/a53ba60a-41fc-4332-9d03-62f2cd97dbce.jpg', 'Khu B', 'ACTIVE'),
(3, 'emailadmin@gmail.com', '2024-03-12 11:52:43', 'emailadmin@gmail.com', '2024-03-12 11:52:43', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1710244361/662b7137-a53b-40fc-877e-8022ea3f2f73.jpg', 'Khu C', 'ACTIVE');

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `booking_code` varchar(255) NOT NULL,
  `check_in_date` date DEFAULT NULL,
  `check_in_name` varchar(255) DEFAULT NULL,
  `check_in_phone_number` varchar(255) DEFAULT NULL,
  `check_out_date` date DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `last_modified_date` datetime DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `total_guest` int(11) DEFAULT NULL,
  `total_night` int(11) DEFAULT NULL,
  `total_price` decimal(38,2) DEFAULT NULL,
  `total_room` int(11) DEFAULT NULL,
  `customer_id` bigint(20) DEFAULT NULL,
  `household_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`booking_code`, `check_in_date`, `check_in_name`, `check_in_phone_number`, `check_out_date`, `created_date`, `last_modified_date`, `status`, `total_guest`, `total_night`, `total_price`, `total_room`, `customer_id`, `household_id`) VALUES
('AMZ001', '2023-12-10', 'This is Customer', '1234567890', '2023-12-12', '2023-12-14 16:48:00', NULL, 'CHECKED_OUT', 2, 1, '500000.00', 1, 1, 1),
('AMZ002', '2023-11-24', 'This is Customer', '1234567890', '2023-11-25', '2023-11-24 16:48:00', NULL, 'CHECKED_OUT', 3, 1, '700.00', 1, 1, 1),
('AMZ003', '2023-11-24', 'This is Customer', '1234567890', '2023-11-25', '2023-11-24 16:48:00', NULL, 'CHECKED_OUT', 3, 2, '1080.00', 1, 1, 1),
('AMZ004', '2023-12-15', 'This is Customer', '1234567890', '2023-12-15', '2023-11-24 16:48:00', NULL, 'BOOKED', 5, 7, '8400.00', 2, 1, 1),
('AMZ005', '2023-12-15', 'This is Customer', '1234567890', '2023-12-15', '2023-11-24 16:48:00', NULL, 'CANCELLED', 2, 7, '7000.00', 2, 1, 1),
('PAVI1020966178', '2024-04-03', 'Truong', '0822493000', '2024-04-04', '2024-04-03 15:56:17', '2024-04-03 15:57:25', 'CANCELLED', 1, 1, '900000.00', 1, NULL, 1),
('PAVI1020966346', '2024-04-03', 'Trường', '0822493001', '2024-04-04', '2024-04-03 15:59:05', '2024-04-03 16:05:10', 'CANCELLED', 1, 1, '700000.00', 1, NULL, 1),
('PAVI1020966753', '2024-04-03', 'Trường', '0822493001', '2024-04-04', '2024-04-03 16:05:52', '2024-04-03 16:09:28', 'CANCELLED', 1, 1, '1200000.00', 1, NULL, 1),
('PAVI1020967127', '2024-04-03', 'Trường', '0822493001', '2024-04-04', '2024-04-03 16:12:06', '2024-04-03 16:12:12', 'CANCELLED', 1, 1, '500000.00', 1, NULL, 1),
('PAVI1020967176', '2024-04-03', 'Trường', '0822493001', '2024-04-04', '2024-04-03 16:12:55', '2024-04-03 16:13:01', 'CANCELLED', 1, 1, '1200000.00', 1, NULL, 1),
('PAVI1020967368', '2024-04-03', 'Trường', '0822493001', '2024-04-04', '2024-04-03 16:16:07', '2024-04-03 16:16:12', 'CANCELLED', 1, 1, '1200000.00', 1, NULL, 1),
('PAVI1021035891', '2024-04-04', 'Trường', '0822493001', '2024-04-05', '2024-04-04 11:18:10', '2024-04-04 12:11:57', 'CHECKED_OUT', 1, 1, '500000.00', 1, NULL, 1),
('PAVI1021036219', '2024-04-06', 'Trường', '0822493001', '2024-04-09', '2024-04-04 11:23:38', '2024-04-04 11:23:38', 'BOOKED', 2, 3, '1500000.00', 1, NULL, 1),
('PAVI1021038939', '2024-04-02', 'Trường', '0822493001', '2024-04-03', '2024-04-03 12:08:58', '2024-04-03 12:11:36', 'CHECKED_OUT', 2, 1, '1200000.00', 1, NULL, 1),
('PAVI1321038689', '2024-04-04', 'Nguyen Nguyen', '0988888888', '2024-04-05', '2024-04-04 12:04:48', '2024-04-04 13:14:53', 'CANCELLED', 1, 1, '500000.00', 1, 3, 1),
('PAVI1321042581', '2024-04-04', 'Nguyen Nguyen', '0988888888', '2024-04-05', '2024-04-04 13:09:40', '2024-04-04 13:16:26', 'CHECKED_OUT', 1, 1, '1000000.00', 2, 3, 1),
('PAVI1321043022', '2024-04-04', 'Nguyen Nguyen', '0988888888', '2024-04-05', '2024-04-04 13:17:01', '2024-04-04 13:18:08', 'DELETED', 1, 1, '500000.00', 1, 3, 1),
('PAVI3315165466', '2024-01-22', 'Truong', '0369852147', '2024-01-25', '2024-01-22 12:37:45', '2024-01-25 13:25:00', 'CHECKED_OUT', 2, 4, '2000000.00', 1, 3, 3),
('PAVI3315165880', '2024-01-27', 'Nguyen Nguyen', '0369852147', '2024-01-29', '2024-01-27 12:44:39', '2024-01-27 13:24:52', 'CHECKED_IN', 1, 2, '1000000.00', 1, 3, 3),
('PAVI3315595472', '2024-02-01', 'Nguyen Nguyen', '0369852147', '2024-02-02', '2024-02-01 12:04:31', '2024-04-03 15:31:58', 'CANCELLED', 1, 1, '500000.00', 1, 3, 3),
('PAVI3317583251', '2024-02-25', 'Nguyen Nguyen', '0369852147', '2024-03-07', '2024-02-24 12:14:10', '2024-02-24 12:18:42', 'CHECKED_OUT', 2, 11, '5500000.00', 1, 3, 3),
('PAVI3317583820', '2024-03-01', 'Nguyen Nguyen', '0369852147', '2024-03-05', '2024-02-24 12:23:39', '2024-02-24 12:24:59', 'CANCELLED', 1, 4, '2000000.00', 1, 3, 3),
('PAVI3317848458', '2024-02-27', 'Nguyen Nguyen', '0369852147', '2024-02-28', '2024-02-27 13:54:17', '2024-02-27 13:55:42', 'CANCELLED', 1, 1, '500000.00', 1, 3, 3),
('PAVI3318185096', '2024-03-02', 'Nguyen', '', '2024-03-03', '2024-03-02 11:24:56', '2024-04-03 15:34:44', 'CANCELLED', 2, 1, '500000.00', 1, 3, 3),
('PAVI3319057694', '2024-03-12', 'Nguyen Nguyen', '0369852147', '2024-03-13', '2024-03-12 13:48:13', '2024-03-12 13:52:13', 'CHECKED_OUT', 1, 1, '900000.00', 1, 3, 3),
('PAVI3320965010', '2024-04-03', 'Nguyen Nguyen', '0988888888', '2024-04-04', '2024-04-03 15:36:49', '2024-04-03 15:39:55', 'CANCELLED', 1, 1, '500000.00', 1, 3, 3),
('PAVI3320965389', '2024-04-03', 'Nguyen Nguyen', '0988888888', '2024-04-04', '2024-04-03 15:43:08', '2024-04-03 16:04:54', 'BOOKED', 1, 1, '500000.00', 1, 3, 3),
('PAVI4319053580', '2024-03-12', 'Nguyen Nguyen', '0369852147', '2024-03-13', '2024-03-12 12:39:39', '2024-03-12 12:45:46', 'CHECKED_OUT', 1, 1, '500000.00', 1, 3, 4),
('PAVI4319054020', '2024-03-22', 'Nguyen Nguyen', '0369852147', '2024-03-25', '2024-03-12 12:46:59', '2024-03-12 12:50:47', 'CANCELLED', 1, 3, '1500000.00', 1, 3, 4);

-- --------------------------------------------------------

--
-- Table structure for table `booking_detail`
--

CREATE TABLE `booking_detail` (
  `id` bigint(20) NOT NULL,
  `check_in_customer_name` varchar(255) DEFAULT NULL,
  `price` decimal(38,2) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `sub_total` decimal(38,2) DEFAULT NULL,
  `booking_code` varchar(255) DEFAULT NULL,
  `dorm_slot_id` bigint(20) DEFAULT NULL,
  `homestay_id` bigint(20) DEFAULT NULL,
  `household_room_type_id` bigint(20) DEFAULT NULL,
  `room_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `booking_detail`
--

INSERT INTO `booking_detail` (`id`, `check_in_customer_name`, `price`, `status`, `sub_total`, `booking_code`, `dorm_slot_id`, `homestay_id`, `household_room_type_id`, `room_id`) VALUES
(1, 'Nguyễn Hải Linh', '500.00', 'CHECKED_OUT', '500.00', 'AMZ001', NULL, 1, 1, 1),
(2, 'Trịnh Đức Anh', '700.00', 'CHECKED_OUT', '700.00', 'AMZ002', NULL, 2, 2, 2),
(3, 'Đặng Đức Thọ', '180.00', 'CHECKED_OUT', '360.00', 'AMZ003', 1, 2, 6, 10),
(4, 'Hà Hữu Việt', '180.00', 'CHECKED_OUT', '360.00', 'AMZ003', 2, 2, 6, 10),
(5, 'Nguyễn Trọng Tuấn', '180.00', 'CHECKED_OUT', '360.00', 'AMZ003', 3, 2, 6, 10),
(6, 'Trịnh Đức Anh', '500.00', 'BOOKED', '3500.00', 'AMZ004', NULL, 1, 1, 1),
(7, 'Nguyễn Trọng Tuấn', '700.00', 'BOOKED', '4900.00', 'AMZ004', NULL, 1, 2, 2),
(8, 'Nguyễn Hải Linh', '500.00', 'CANCELLED', '3500.00', 'AMZ005', NULL, 1, 1, 3),
(9, 'Nguyễn Hải Linh', '500.00', 'CANCELLED', '3500.00', 'AMZ005', NULL, 1, 1, 6),
(10, 'Truong', '500000.00', 'CHECKED_OUT', '2000000.00', 'PAVI3315165466', NULL, 7, 13, 29),
(11, 'Nguyen', '500000.00', 'CHECKED_IN', '1000000.00', 'PAVI3315165880', NULL, 7, 13, 30),
(12, 'Truong', '500000.00', 'CANCELLED', '500000.00', 'PAVI3315595472', NULL, 7, 13, 29),
(13, 'Nguyen', '500000.00', 'CHECKED_OUT', '5500000.00', 'PAVI3317583251', NULL, 7, 13, 29),
(14, 'Truong', '500000.00', 'CANCELLED', '2000000.00', 'PAVI3317583820', NULL, 7, 13, 29),
(15, 'Nguyen', '500000.00', 'CANCELLED', '500000.00', 'PAVI3317848458', NULL, 7, 13, 29),
(16, 'Nguyen', '500000.00', 'CANCELLED', '500000.00', 'PAVI3318185096', NULL, 7, 13, 29),
(17, 'Nguyen', '500000.00', 'CHECKED_OUT', '500000.00', 'PAVI4319053580', NULL, 9, 16, 35),
(18, 'Truong', '500000.00', 'CANCELLED', '1500000.00', 'PAVI4319054020', NULL, 9, 16, 35),
(19, 'Truong', '900000.00', 'CHECKED_OUT', '900000.00', 'PAVI3319057694', NULL, 8, 15, 34),
(20, 'Nguyen', '500000.00', 'CANCELLED', '500000.00', 'PAVI3320965010', NULL, 7, 13, 29),
(21, 'Nguyen', '500000.00', 'BOOKED', '500000.00', 'PAVI3320965389', NULL, 7, 13, 29),
(22, 'Truong', '900000.00', 'CANCELLED', '900000.00', 'PAVI1020966178', NULL, 1, 3, 9),
(23, 'Trường', '700000.00', 'CANCELLED', '700000.00', 'PAVI1020966346', NULL, 1, 2, 8),
(24, 'Trường', '1200000.00', 'CANCELLED', '1200000.00', 'PAVI1020966753', NULL, 1, 4, 4),
(25, 'Trường', '500000.00', 'CANCELLED', '500000.00', 'PAVI1020967127', NULL, 1, 1, 5),
(26, 'Trường', '1200000.00', 'CANCELLED', '1200000.00', 'PAVI1020967176', NULL, 1, 4, 4),
(27, 'Trường', '1200000.00', 'CANCELLED', '1200000.00', 'PAVI1020967368', NULL, 1, 4, 4),
(28, 'Trường', '500000.00', 'CHECKED_OUT', '500000.00', 'PAVI1021035891', NULL, 1, 1, 6),
(29, 'Trường', '500000.00', 'BOOKED', '1500000.00', 'PAVI1021036219', NULL, 1, 1, 7),
(30, 'Nguyen', '500000.00', 'CANCELLED', '500000.00', 'PAVI1321038689', NULL, 1, 1, 1),
(31, 'Trường', '1200000.00', 'CHECKED_OUT', '1200000.00', 'PAVI1021038939', NULL, 1, 4, 4),
(32, 'Nguyen', '500000.00', 'CHECKED_OUT', '500000.00', 'PAVI1321042581', NULL, 1, 1, 17),
(33, 'truong', '500000.00', 'CHECKED_OUT', '500000.00', 'PAVI1321042581', NULL, 1, 1, 5),
(34, 'Nguyen', '500000.00', 'DELETED', '500000.00', 'PAVI1321043022', NULL, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `cancellation_history`
--

CREATE TABLE `cancellation_history` (
  `id` bigint(20) NOT NULL,
  `cancellation_date` datetime DEFAULT NULL,
  `cancellation_reason` varchar(255) DEFAULT NULL,
  `refund_amount` decimal(38,2) DEFAULT NULL,
  `refund_date` datetime DEFAULT NULL,
  `refund_status` varchar(255) DEFAULT NULL,
  `booking_code` varchar(255) DEFAULT NULL,
  `customer_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cancellation_history`
--

INSERT INTO `cancellation_history` (`id`, `cancellation_date`, `cancellation_reason`, `refund_amount`, `refund_date`, `refund_status`, `booking_code`, `customer_id`) VALUES
(1, '2023-11-24 16:48:00', 'Tôi đặt nhầm', '7000.00', NULL, 'PENDING', 'AMZ005', 1),
(2, '2024-02-24 12:24:59', 'Sự cố khẩn cấp', '2000000.00', NULL, 'REFUNDED', 'PAVI3317583820', 3),
(3, '2024-02-27 13:55:42', 'Vấn đề tài chính', '0.00', NULL, 'NOT_REFUNDED', 'PAVI3317848458', 3),
(7, '2024-03-12 12:50:47', 'Vấn đề tài chính', '1500000.00', NULL, 'REFUNDED', 'PAVI4319054020', 3),
(8, '2024-04-03 15:31:58', 'Thay đổi kế hoạch', '0.00', NULL, 'NOT_REFUNDED', 'PAVI3315595472', 3),
(9, '2024-04-03 15:34:44', 'Sự cố khẩn cấp', '0.00', NULL, 'NOT_REFUNDED', 'PAVI3318185096', 3),
(10, '2024-04-03 15:39:55', 'Sự cố khẩn cấp', '0.00', NULL, 'NOT_REFUNDED', 'PAVI3320965010', 3),
(11, '2024-04-03 15:50:18', 'Vấn đề tài chính', '0.00', NULL, 'NOT_REFUNDED', 'PAVI3320965389', 3),
(12, '2024-04-03 15:57:25', 'Thay đổi kế hoạch', '0.00', NULL, 'NOT_REFUNDED', 'PAVI1020966178', NULL),
(13, '2024-04-03 16:05:10', 'Thay đổi kế hoạch', '0.00', NULL, 'NOT_REFUNDED', 'PAVI1020966346', NULL),
(14, '2024-04-03 16:09:28', 'Thay đổi kế hoạch', '0.00', NULL, 'NOT_REFUNDED', 'PAVI1020966753', NULL),
(15, '2024-04-03 16:12:12', 'Thay đổi kế hoạch', '0.00', NULL, 'NOT_REFUNDED', 'PAVI1020967127', NULL),
(16, '2024-04-03 16:13:01', 'Vấn đề tài chính', '0.00', NULL, 'NOT_REFUNDED', 'PAVI1020967176', NULL),
(17, '2024-04-03 16:16:12', 'Thay đổi kế hoạch', '0.00', NULL, 'NOT_REFUNDED', 'PAVI1020967368', NULL),
(18, '2024-04-04 13:14:53', 'Vấn đề tài chính', '0.00', NULL, 'NOT_REFUNDED', 'PAVI1321038689', 3);

-- --------------------------------------------------------

--
-- Table structure for table `cancellation_reason`
--

CREATE TABLE `cancellation_reason` (
  `id` bigint(20) NOT NULL,
  `reason` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cancellation_reason`
--

INSERT INTO `cancellation_reason` (`id`, `reason`) VALUES
(1, 'Thay đổi kế hoạch'),
(2, 'Vấn đề tài chính'),
(3, 'Sự cố khẩn cấp'),
(4, 'Thời gian đặt phòng sai'),
(5, 'Chất lượng không đạt yêu cầu');

-- --------------------------------------------------------

--
-- Table structure for table `contact_us`
--

CREATE TABLE `contact_us` (
  `id` bigint(20) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `live_chat` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contact_us`
--

INSERT INTO `contact_us` (`id`, `address`, `email`, `live_chat`, `phone`) VALUES
(1, 'Mèo Vạc - Hà Giang ', 'VhomeStay@vht.com', 'https://www.google.com.vn/?hl=vi', '098.888.8888');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` bigint(20) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) NOT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `account_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `address`, `avatar`, `date_of_birth`, `first_name`, `gender`, `last_name`, `phone_number`, `account_id`) VALUES
(1, 'Hải Phòng', NULL, '2001-12-12', 'Customer', 'MALE', 'This is', '9876543210', 1),
(2, 'Hải Phòng', NULL, '2001-12-12', 'Customer', 'MALE', 'This is', '9876543210', 1),
(3, 'hn', NULL, '2003-09-20', 'Nguyen', 'OTHER', 'Nguyen', '0988888888', 11);

-- --------------------------------------------------------

--
-- Table structure for table `customer_bank_information`
--

CREATE TABLE `customer_bank_information` (
  `id` bigint(20) NOT NULL,
  `account_holder` varchar(255) DEFAULT NULL,
  `account_number` varchar(255) DEFAULT NULL,
  `bank_name` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `last_modified_date` datetime DEFAULT NULL,
  `customer_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer_bank_information`
--

INSERT INTO `customer_bank_information` (`id`, `account_holder`, `account_number`, `bank_name`, `created_date`, `last_modified_date`, `customer_id`) VALUES
(1, 'Nguyen', '000', 'Techcombank', '2024-02-24 12:24:59', '2024-03-12 12:50:47', 3);

-- --------------------------------------------------------

--
-- Table structure for table `customer_testimonials`
--

CREATE TABLE `customer_testimonials` (
  `id` bigint(20) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `job` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `dorm_slot`
--

CREATE TABLE `dorm_slot` (
  `id` bigint(20) NOT NULL,
  `slot_number` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `room_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dorm_slot`
--

INSERT INTO `dorm_slot` (`id`, `slot_number`, `status`, `room_id`) VALUES
(1, 1, 'ACTIVE', 10),
(2, 2, 'ACTIVE', 10),
(3, 3, 'ACTIVE', 10),
(4, 4, 'ACTIVE', 10),
(5, 5, 'ACTIVE', 10),
(6, 1, 'ACTIVE', 11),
(7, 2, 'ACTIVE', 11),
(8, 3, 'ACTIVE', 11),
(9, 4, 'ACTIVE', 11),
(10, 5, 'ACTIVE', 11),
(11, 1, 'ACTIVE', 10),
(12, 2, 'ACTIVE', 10),
(13, 3, 'ACTIVE', 10),
(14, 4, 'ACTIVE', 10),
(15, 5, 'ACTIVE', 10),
(16, 1, 'ACTIVE', 11),
(17, 2, 'ACTIVE', 11),
(18, 3, 'ACTIVE', 11),
(19, 4, 'ACTIVE', 11),
(20, 5, 'ACTIVE', 11);

-- --------------------------------------------------------

--
-- Table structure for table `facility`
--

CREATE TABLE `facility` (
  `id` bigint(20) NOT NULL,
  `facility_name` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `facility`
--

INSERT INTO `facility` (`id`, `facility_name`, `status`) VALUES
(1, '25m2', NULL),
(2, 'Tivi', NULL),
(3, 'Tủ lạnh', NULL),
(4, 'Ban công', NULL),
(5, 'Có mèo cảnh', NULL),
(6, 'Có chó cảnh', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` bigint(20) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `last_modified_date` datetime DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `booking_code` varchar(255) DEFAULT NULL,
  `customer_id` bigint(20) DEFAULT NULL,
  `household_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`id`, `content`, `created_date`, `last_modified_date`, `rating`, `status`, `booking_code`, `customer_id`, `household_id`) VALUES
(1, 'Quá tuyệt vời mọi người ơi', '2023-11-25 12:00:00', NULL, 5, 'SHOWED', 'AMZ001', 1, 1),
(2, 'Phòng bẩn', '2024-03-12 13:53:37', '2024-04-04 13:19:48', 1, 'HIDED', 'PAVI3319057694', 3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `id` bigint(20) NOT NULL,
  `url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `frequently_question`
--

CREATE TABLE `frequently_question` (
  `id` bigint(20) NOT NULL,
  `answer` text DEFAULT NULL,
  `question` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `homestay`
--

CREATE TABLE `homestay` (
  `id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `full_address` varchar(255) DEFAULT NULL,
  `homestay_code` varchar(255) NOT NULL,
  `last_modified_date` datetime DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `area_id` bigint(20) DEFAULT NULL,
  `household_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `homestay`
--

INSERT INTO `homestay` (`id`, `created_date`, `description`, `full_address`, `homestay_code`, `last_modified_date`, `latitude`, `longitude`, `status`, `area_id`, `household_id`) VALUES
(1, '2023-11-24 16:48:00', 'Bà con trong làng có truyền thống làm rượu lâu đời, tạo nên rượu Thiên Hương nổi tiếng. ', 'Nhà A1 - Làng văn hóa du lịch cộng đồng dân tộc Mông - Đường Hạnh Phúc, xã Pả Vi, huyện Mèo Vạc Hà Giang', 'A1', '2024-02-27 12:09:04', NULL, NULL, 'ACTIVE', NULL, 1),
(2, '2023-11-24 16:48:00', 'Rượu Thiên Hương có hương vị thơm ngon, ngọt hậu, tạo cảm giác êm ái và ấm bụng, khác biệt với các loại rượu truyền thống.', 'Nhà A2 - Làng văn hóa du lịch cộng đồng dân tộc Mông - Đường Hạnh Phúc, xã Pả Vi, huyện Mèo Vạc Hà Giang', 'A2', '2024-02-27 12:11:16', NULL, NULL, 'ACTIVE', NULL, 1),
(3, '2023-11-24 16:48:00', 'Nếu có dịp đến đây hãy thưởng thức và để lại cảm nhận của bạn cho chúng mình được biết nhé', 'Nhà A3 - Làng văn hóa du lịch cộng đồng dân tộc Mông - Đường Hạnh Phúc, xã Pả Vi, huyện Mèo Vạc Hà Giang', 'A3', '2024-02-27 12:11:47', NULL, NULL, 'ACTIVE', NULL, 1),
(7, '2024-01-27 11:40:11', 'Nếu có dịp đến đây hãy thưởng thức và để lại cảm nhận của bạn cho chúng mình được biết nhé.', 'Ha giang 1', 'T1', '2024-01-27 12:29:15', NULL, NULL, 'ACTIVE', 1, 3),
(8, '2024-01-27 12:05:21', 'Nếu có dịp đến đây hãy thưởng thức và để lại cảm nhận của bạn cho chúng mình được biết nhé', 'Ha Giang 2', 'T2', '2024-01-27 12:22:38', NULL, NULL, 'ACTIVE', 2, 3),
(9, '2024-03-12 11:52:58', NULL, 'Khu C', 'N1', '2024-03-12 12:20:26', NULL, NULL, 'ACTIVE', 3, 4),
(10, '2024-03-12 11:53:40', NULL, 'Số nhà 59 - Mèo Vạc - Hà Giang', 'N2', '2024-03-12 12:22:36', NULL, NULL, 'ACTIVE', 3, 4),
(11, '2024-03-19 13:32:54', NULL, NULL, 'DC', NULL, NULL, NULL, 'ACTIVE', 3, 6);

-- --------------------------------------------------------

--
-- Table structure for table `homestay_media`
--

CREATE TABLE `homestay_media` (
  `id` bigint(20) NOT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `homestay_id` bigint(20) DEFAULT NULL,
  `household_room_type_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `homestay_media`
--

INSERT INTO `homestay_media` (`id`, `file_name`, `file_path`, `type`, `homestay_id`, `household_room_type_id`) VALUES
(1, 'ht23.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1706356459/2a4376fe-6a2c-46a1-9aaf-d18a1740b76a.jpg', 'IMAGE', NULL, 13),
(2, 'ht22.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1706356461/ec2a2349-d32c-4fb4-b1f0-06e11909b6a6.jpg', 'IMAGE', NULL, 13),
(3, 'ht2.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1706356462/d657a167-582b-4852-9e93-cc06a5ae636f.jpg', 'IMAGE', NULL, 13),
(4, 'ht33.png', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1706356691/d1cfc069-a0ba-4b7c-8cdf-894136330d5c.png', 'IMAGE', NULL, 14),
(5, 'ht32.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1706356693/1aa7339a-3739-44e4-b790-d65831d4b0b9.jpg', 'IMAGE', NULL, 14),
(6, 'ht3.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1706356695/940cc69f-be62-47f0-804b-cf309f554c28.jpg', 'IMAGE', NULL, 14),
(7, 'ht43.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1706356901/497dcc6d-0259-4661-b120-09d52d218914.jpg', 'IMAGE', NULL, 15),
(8, 'ht42.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1706356904/961ac8f1-eb5c-4676-baa6-22bc51b1a6b7.jpg', 'IMAGE', NULL, 15),
(9, 'ht4.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1706356906/d448066f-9452-4b1e-aae3-fffa307689d8.jpg', 'IMAGE', NULL, 15),
(10, 'h1.webp', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1706358139/d3a4bad4-5fa6-4ad1-b058-110cd3c37e49.webp', 'IMAGE', 7, NULL),
(11, 'h2.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1706358158/330fd634-3caf-48ab-b19b-b2f2c2e87a5b.jpg', 'IMAGE', 8, NULL),
(12, '1.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1706358424/c7b09fcf-3b80-46fb-bc06-4d1122c8e7a7.jpg', 'IMAGE', 7, NULL),
(13, '2.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1706358425/9943d775-5b65-4b6e-b6a9-64a05c856146.jpg', 'IMAGE', 7, NULL),
(14, '4.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1706358549/a0b33fc7-ef09-448a-a946-55788502dbfe.jpg', 'IMAGE', 7, NULL),
(15, '3.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1706358552/4af9f236-b020-4075-838e-ba7c41a2dc15.jpg', 'IMAGE', 7, NULL),
(16, '5.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1706358554/6cc2a664-66a2-40fc-91b1-95dd697393b1.jpg', 'IMAGE', 7, NULL),
(17, 'download.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1709035733/867500b8-31af-4ebc-a393-2b251ce83772.jpg', 'IMAGE', 1, NULL),
(18, 'download (1).jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1709035739/73a399f9-6eb9-4b0e-b88d-49d19cf137a1.jpg', 'IMAGE', 1, NULL),
(19, 'ht4.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1709035742/c16f5751-a5c7-4388-9e1d-91bb36335089.jpg', 'IMAGE', 1, NULL),
(20, 'h2.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1709035744/426cd198-3a29-4179-984a-a46fce5a209d.jpg', 'IMAGE', 1, NULL),
(21, 'h1.webp', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1709035868/bca382d6-90e2-400f-95c1-74009d3996c2.webp', 'IMAGE', 2, NULL),
(22, 'ht43.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1709035871/0f93bb67-0cef-422b-825d-49f83897de77.jpg', 'IMAGE', 2, NULL),
(23, '3.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1709035873/6815215d-82bd-4236-bc3e-3a794dc210e8.jpg', 'IMAGE', 2, NULL),
(24, '5.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1709035876/67ec531b-571f-4176-be0a-a1e68d6b9d02.jpg', 'IMAGE', 2, NULL),
(25, '4.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1709035898/638a4064-99ac-4c5c-afb9-96f30cb364ab.jpg', 'IMAGE', 3, NULL),
(26, '3.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1709035902/47671ce3-670c-434d-ba5a-2cf5ecbe586b.jpg', 'IMAGE', 3, NULL),
(27, '1.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1709035904/73dac3ab-9892-444b-8cdf-9b4023da3714.jpg', 'IMAGE', 3, NULL),
(28, 'download.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1709035908/696d5bc1-33b7-4f16-b447-f9fe36c77a9e.jpg', 'IMAGE', 3, NULL),
(29, 'ht4.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1710244568/1178a99b-7387-4901-be53-caafc6cfeaf4.jpg', 'IMAGE', NULL, 16),
(30, 'ht42.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1710244573/f9fe6bc7-3112-4120-97f6-626e6b466664.jpg', 'IMAGE', NULL, 16),
(31, 'ht32.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1710244576/dc9b394d-8f90-42ef-8aa7-8401a96bcee8.jpg', 'IMAGE', NULL, 16),
(32, 'ht43.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1710244580/b48cce3d-d42b-441a-ac1c-5d47e21c183c.jpg', 'IMAGE', NULL, 16),
(33, '5.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1710246010/aa320a82-09d1-4d50-80fe-90e9d85a07f4.jpg', 'IMAGE', 9, NULL),
(34, 'ht43.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1710246014/d35f6d50-cb58-4f88-95bf-a97e078030e9.jpg', 'IMAGE', 9, NULL),
(35, 'ht23.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1710246024/9332a408-ff1d-473e-b338-4487776d8a86.jpg', 'IMAGE', 9, NULL),
(36, 'ht2.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1710246025/0331c463-fbcf-425d-8758-929edd469aa8.jpg', 'IMAGE', 9, NULL),
(37, 'ht3.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1710246144/65d8b21b-ca57-4478-aeb5-17eae96c50a3.jpg', 'IMAGE', 10, NULL),
(38, '1.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1710246147/84730abe-f936-4f33-9f65-a2f2d2298cb5.jpg', 'IMAGE', 10, NULL),
(39, 'ht42.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1710246151/ef889a30-3641-4e73-8743-003f09821ffe.jpg', 'IMAGE', 10, NULL),
(40, 'ht43.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1710246155/5571c9de-f64d-4dbd-95b9-c0ef29abcadb.jpg', 'IMAGE', 10, NULL),
(41, 'download (1).jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1710246366/fcdf51d2-fbed-41d4-893d-5c898983fb8e.jpg', 'IMAGE', NULL, 17),
(42, '2.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1710246368/a3fbd75f-9735-49b3-b6f9-3b7165cbd260.jpg', 'IMAGE', NULL, 17),
(43, '1.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1710246370/d7508997-6e5d-4ad9-b64a-2fc37141ba4d.jpg', 'IMAGE', NULL, 17),
(44, 'h2.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1710246374/9ceb8054-51b9-4fac-bd64-74f91cf94d36.jpg', 'IMAGE', NULL, 17),
(45, '4.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1710246544/48982714-9fb3-4a8d-a0fb-0d32e752b972.jpg', 'IMAGE', NULL, 18),
(46, '3.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1710246548/0ab9d346-b968-4c3c-9473-2dbb42cf88eb.jpg', 'IMAGE', NULL, 18),
(47, '2.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1710246550/6d705ab2-db64-488f-bbd4-de49eec9d899.jpg', 'IMAGE', NULL, 18),
(48, 'ht22.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1710246552/271de277-067a-4f7d-bcac-bef643242f0f.jpg', 'IMAGE', NULL, 18),
(49, 'ht2.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1710246554/d2473bf7-1e02-487c-b707-a766fbd89880.jpg', 'IMAGE', NULL, 18),
(50, '2.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1710250666/6269a5a8-9a5f-4bc5-a441-96028c779442.jpg', 'IMAGE', NULL, 19),
(51, '1.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1710250669/eaeebec3-cc52-4ee1-90eb-d35ac7844c2e.jpg', 'IMAGE', NULL, 19),
(52, 'h2.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1710250671/82771f57-722e-4a36-9b6c-86cf59dad0e6.jpg', 'IMAGE', NULL, 19),
(53, 'h1.webp', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1710250674/a352eeca-9e07-4693-ae91-1292208f990a.webp', 'IMAGE', NULL, 19),
(54, 'ht43.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1710250677/242e871d-623b-4041-b104-913d5f89bf99.jpg', 'IMAGE', NULL, 19),
(55, 'ht43.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1710855222/5ca896c8-174d-4d89-ac76-051957cfcf4f.jpg', 'IMAGE', NULL, 20),
(56, 'ht42.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1710855230/ce46d550-489d-4626-b65c-f7e738d6e604.jpg', 'IMAGE', NULL, 20),
(57, 'ht4.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1710855245/b1421087-44d5-4738-9dc1-43efa5ad1a14.jpg', 'IMAGE', NULL, 20),
(58, 'ht33.png', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1710855255/3d7ae375-837f-456a-af63-46e0bc0f0f8f.png', 'IMAGE', NULL, 20);

-- --------------------------------------------------------

--
-- Table structure for table `household`
--

CREATE TABLE `household` (
  `id` bigint(20) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `cancellation_period` int(11) DEFAULT NULL,
  `check_in_time` time DEFAULT NULL,
  `check_out_time` time DEFAULT NULL,
  `cover_image` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `description` text DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `household_name` varchar(255) NOT NULL,
  `last_modified_date` datetime DEFAULT NULL,
  `link_facebook` varchar(255) DEFAULT NULL,
  `link_tiktok` varchar(255) DEFAULT NULL,
  `link_youtube` varchar(255) DEFAULT NULL,
  `phone_number_first` varchar(255) DEFAULT NULL,
  `phone_number_second` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `top` int(11) DEFAULT NULL,
  `manager_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `household`
--

INSERT INTO `household` (`id`, `avatar`, `cancellation_period`, `check_in_time`, `check_out_time`, `cover_image`, `created_date`, `description`, `email`, `household_name`, `last_modified_date`, `link_facebook`, `link_tiktok`, `link_youtube`, `phone_number_first`, `phone_number_second`, `status`, `top`, `manager_id`) VALUES
(1, 'https://res.cloudinary.com/dzdpfyjh8/image/upload/v1712935328/111111_hrr3be.jpg', 7, '08:00:00', '15:00:00', NULL, '2023-11-24 16:44:00', 'Tọa lạc tại thị trấn Mèo Vạc, cách Mia Xu chưa đầy 1 km, Lo Lo Homestay & Cafe Meo Vac cung cấp chỗ nghỉ với nhà hàng, chỗ đỗ xe riêng miễn phí, quầy bar và sảnh khách chung.', 'quan@gmail.com', 'Quân', '2024-02-24 11:57:47', 'https://www.facebook.com/amazingmeovac', 'https://www.tiktok.com/@Vhomestay', 'https://www.youtube.com/@Vhomestay', '03.8888.9999', '09.7777.5555', 'ACTIVE', 1, 1),
(3, 'https://res.cloudinary.com/dzdpfyjh8/image/upload/v1712935537/555555_kmwfpp.jpg', 5, '09:00:00', '17:00:00', NULL, '2024-01-27 11:32:25', 'Satori Homestay bố trí 6 phòng ngủ cho nhóm bạn đông người thuê phòng với giá thành cực kỳ hữu nghị. Lợi thế khi lựa chọn Satori Homestay đó chính là có thể dễ dàng di chuyển đến nhiều địa điểm khác với giá thuê chỉ từ 500.000 VNĐ/đêm.', 'truonglqth2202004@fpt.edu.vn', 'Trường', '2024-03-12 13:00:17', 'https://www.google.com.vn/?hl=vi', 'https://www.tiktok.com.vn/?hl=vi', 'https://www.youtube.com.vn/?hl=vi', '0123456789', '0987654321', 'ACTIVE', 2, 3),
(4, 'https://res.cloudinary.com/dzdpfyjh8/image/upload/v1712935493/444444_qnnwld.jpg', 3, '09:00:00', '15:00:00', NULL, '2024-03-12 11:32:16', 'Satori Homestay bố trí 6 phòng ngủ cho nhóm bạn đông người thuê phòng với giá thành cực kỳ hữu nghị. Lợi thế khi lựa chọn Satori Homestay đó chính là có thể dễ dàng di chuyển đến nhiều địa điểm khác với giá thuê chỉ từ 500.000 VNĐ/đêm.', 'nguyenntth2202020@fpt.edu.vn', 'Nguyên', '2024-03-12 12:58:30', 'fb.com', 'tt.com', 'https://www.youtube.com/watch?v=pyZVqG1n_KQ', '0988899999', '0988899998', 'ACTIVE', 3, 8),
(5, 'https://res.cloudinary.com/dzdpfyjh8/image/upload/v1712935464/3333333_nsv8xw.png', NULL, NULL, NULL, NULL, '2024-03-12 13:12:24', NULL, NULL, 'Hoàng', '2024-03-30 07:06:32', NULL, NULL, NULL, NULL, NULL, 'ACTIVE', 4, 9),
(6, 'https://res.cloudinary.com/dzdpfyjh8/image/upload/v1712935417/222222_h5kbnn.jpg', NULL, NULL, NULL, NULL, '2024-03-19 13:25:51', NULL, NULL, 'Duy', '2024-03-19 13:28:54', NULL, NULL, NULL, NULL, NULL, 'ACTIVE', 5, 10);

-- --------------------------------------------------------

--
-- Table structure for table `household_bank_information`
--

CREATE TABLE `household_bank_information` (
  `id` bigint(20) NOT NULL,
  `qr_code` varchar(255) DEFAULT NULL,
  `household_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `household_room_type`
--

CREATE TABLE `household_room_type` (
  `id` bigint(20) NOT NULL,
  `capacity` int(11) DEFAULT NULL,
  `is_children_and_bed` tinyint(1) DEFAULT NULL,
  `price` decimal(38,2) DEFAULT NULL,
  `price_update` decimal(38,2) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `household_id` bigint(20) DEFAULT NULL,
  `room_type_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `household_room_type`
--

INSERT INTO `household_room_type` (`id`, `capacity`, `is_children_and_bed`, `price`, `price_update`, `status`, `household_id`, `room_type_id`) VALUES
(1, 2, 0, '500000.00', '500000.00', 'ACTIVE', 1, 1),
(2, 3, 0, '700000.00', '700000.00', 'ACTIVE', 1, 2),
(3, 4, 0, '900000.00', '900000.00', 'ACTIVE', 1, 3),
(4, 6, 0, '1200000.00', '1200000.00', 'ACTIVE', 1, 4),
(5, 12, 0, '2500000.00', '2500000.00', 'ACTIVE', 1, 5),
(6, 35, 0, '180000.00', '180000.00', 'ACTIVE', 1, 6),
(7, 2, 0, '500000.00', NULL, 'ACTIVE', 1, 1),
(8, 3, 0, '700000.00', NULL, 'ACTIVE', 1, 2),
(9, 4, 0, '900000.00', NULL, 'ACTIVE', 1, 3),
(10, 6, 0, '1200000.00', NULL, 'ACTIVE', 1, 4),
(11, 12, 0, '2500000.00', NULL, 'ACTIVE', 1, 5),
(12, 35, 0, '180000.00', NULL, 'ACTIVE', 1, 6),
(13, 2, 1, '500000.00', '500000.00', 'ACTIVE', 3, 1),
(14, 3, 1, '700000.00', '700000.00', 'ACTIVE', 3, 2),
(15, 4, 1, '900000.00', '900000.00', 'ACTIVE', 3, 3),
(16, 3, 1, '500000.00', '500000.00', 'ACTIVE', 4, 1),
(17, 5, 1, '1200000.00', '1200000.00', 'ACTIVE', 4, 3),
(18, 6, 0, '2000000.00', '2000000.00', 'ACTIVE', 4, 9),
(19, 4, 0, '1000000.00', '1000000.00', 'ACTIVE', 5, 2),
(20, 5, 0, '750000.00', '750000.00', 'ACTIVE', 6, 3);

-- --------------------------------------------------------

--
-- Table structure for table `household_service`
--

CREATE TABLE `household_service` (
  `id` bigint(20) NOT NULL,
  `service_description` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `household_id` bigint(20) DEFAULT NULL,
  `service_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `household_service`
--

INSERT INTO `household_service` (`id`, `service_description`, `status`, `household_id`, `service_id`) VALUES
(11, 'Sân đốt lửa ....', 'ACTIVE', 1, 12),
(12, 'Gái dân tộc ...', 'ACTIVE', 1, 13),
(13, 'Sân khấu ...', 'ACTIVE', 1, 14),
(14, 'Gái dân tộc ...', 'ACTIVE', 1, 16),
(15, 'A đến Á ...', 'ACTIVE', 1, 17);

-- --------------------------------------------------------

--
-- Table structure for table `local_product`
--

CREATE TABLE `local_product` (
  `id` bigint(20) NOT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `last_modified_by` varchar(255) DEFAULT NULL,
  `last_modified_date` datetime DEFAULT NULL,
  `highest_price` decimal(38,2) DEFAULT NULL,
  `local_product_position` varchar(255) DEFAULT NULL,
  `lowest_price` decimal(38,2) DEFAULT NULL,
  `product_description` text DEFAULT NULL,
  `product_name` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `unit` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `local_product`
--

INSERT INTO `local_product` (`id`, `created_by`, `created_date`, `last_modified_by`, `last_modified_date`, `highest_price`, `local_product_position`, `lowest_price`, `product_description`, `product_name`, `status`, `type`, `unit`) VALUES
(1, 'emailadmin@gmail.com', '2024-02-22 13:12:14', 'emailadmin@gmail.com', '2024-02-24 11:56:54', '1000000.00', 'TOP1', '500000.00', 'Là món ăn đặc sẳn của dân tốc Tháu Đen. Thường dùng để thiết đãi khách quý. Được làm từ con trâu...', 'Thịt trâu gác bếp ', 'ACTIVE', 'FOOD', 'kg'),
(2, 'emailadmin@gmail.com', '2024-02-22 13:12:18', 'emailadmin@gmail.com', '2024-02-22 13:12:34', '1000000.00', NULL, '500000.00', 'Là món ăn đặc sẳn của dân tốc Tháu Đen. Thường dùng để thiết đãi khách quý. Được làm từ con trâu...', 'Thịt trâu gác bếp ', 'DELETED', 'FOOD', 'kg'),
(3, 'emailadmin@gmail.com', '2024-02-24 13:01:20', 'emailadmin@gmail.com', '2024-02-24 13:09:29', '300000.00', 'TOP2', '100000.00', 'Lợn cắp nách là loài lai giữa lợn rừng và lợn Mường, có nhiều đặc tính khác biệt so với các giống lợn ở miền xuôi và rất được người dân Hà Giang ưa chuộng. Vẻ ngoài của Lợn cắp nách rất dễ nhận biết với cái mõm dài, bộ lông cứng màu đen tuyền phủ từ mũi đến đuôi, nhỏ chỉ bằng một con chó nhà trường thành.', 'Thịt lợn cắp nách', 'ACTIVE', 'FOOD', 'kg'),
(4, 'emailadmin@gmail.com', '2024-02-24 13:04:37', 'emailadmin@gmail.com', '2024-02-24 13:09:35', '50000.00', 'TOP3', '25000.00', 'Hà Giang là một vùng đất trông được nhiều loại gạo nếp nổi tiếng thơm ngon, góp phần khẳng định chỗ đứng cho món Cơm lam Bắc Mê – đặc sản đặc trưng của dân tộc Tày nơi đây. Mang vẻ bình dị, chỉ có cơm nướng hay nấu ăn cùng với muối vừng hay sang hơn là thịt gà nướng thôi mà cũng đủ sức làm bao con tim lưu luyến.\r\n\r\nNấu cơm lam Bắc Mê không chỉ có mỗi gạo nếp dẻo ngon là đủ, còn phải kể đến ống tre, ống nứa, trúc – là những nguyên liệu tạo nên độ thơm, độ hấp dẫn, nét độc đáo, vị ngon ngọt của món ăn này.', 'Cơm Lam Bắc Mê', 'ACTIVE', 'FOOD', 'ống'),
(5, 'emailadmin@gmail.com', '2024-02-24 13:06:24', 'emailadmin@gmail.com', '2024-02-24 13:09:41', '40000.00', 'TOP4', '30000.00', 'Bánh cuốn Đồng Văn có lẽ là lựa chọn hàng đầu khi nói về món ngon Hà Giang. Điểm đặc biệt của món ăn là bánh cuốn được tráng mỏng, cuốn dài, to, không ăn cùng với nước mắm mà lại ăn cùng với nước xương hầm đậm đà, điểm thêm vài nhánh rau mùi trông đã sướng con mắt.Bánh thường có 2 kiểu nhân, một là nhân thịt băm mộc nhĩ, hay là nhân trứng béo béo, ngậy ngậy, chắc chắn đủ sức gọi mời bạn đến thưởng thức thêm một lần nữa.', 'Bánh cuốn Đồng Văn', 'ACTIVE', 'FOOD', 'bát'),
(6, 'emailadmin@gmail.com', '2024-02-24 13:08:34', 'emailadmin@gmail.com', '2024-02-24 13:09:46', '15000.00', 'TOP5', '10000.00', 'Hạt tam giác mạch được xay để làm bột bánh, giúp món bánh không bị khô cứng mà lại có lớp vỏ min màng hơn. Thường, bánh tam giác mạch sẽ được nướng trên than có độ thơm, bên trong bánh mềm xốp, là món ăn đường phố, nhẹ nhàng, cũng có thể mang một ít về làm quà cũng rất ổn.', 'Bánh tam giác mạch', 'ACTIVE', 'FOOD', 'chiếc');

-- --------------------------------------------------------

--
-- Table structure for table `manager`
--

CREATE TABLE `manager` (
  `id` bigint(20) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `account_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `manager`
--

INSERT INTO `manager` (`id`, `address`, `avatar`, `date_of_birth`, `first_name`, `gender`, `last_name`, `phone_number`, `account_id`) VALUES
(1, 'Hà Nội', NULL, '2001-08-09', 'Quân', 'MALE', 'Manager', '5432167890', 2),
(3, NULL, NULL, NULL, 'Truong', NULL, 'Trường', '0822493001', 10),
(8, NULL, 'https://res.cloudinary.com/dzdpfyjh8/image/upload/v1708606755/1f116cd6-be9d-4334-8ad1-7ab3c07c0da1.jpg', NULL, 'Thái ', NULL, 'Nguyên', '0988888888', 16),
(9, NULL, NULL, NULL, 'Hoàng ', NULL, 'Bảnh', '0899777999', 17),
(10, NULL, NULL, NULL, 'Duy', NULL, 'Duy', '0912345678', 18);

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` bigint(20) NOT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `last_modified_by` varchar(255) DEFAULT NULL,
  `last_modified_date` datetime DEFAULT NULL,
  `content` text DEFAULT NULL,
  `read_time` int(11) DEFAULT NULL,
  `short_description` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `created_by`, `created_date`, `last_modified_by`, `last_modified_date`, `content`, `read_time`, `short_description`, `subject`, `thumbnail`, `title`) VALUES
(1, 'emailadmin@gmail.com', '2024-02-24 12:54:30', 'emailadmin@gmail.com', '2024-02-24 12:54:30', '<h3>- Là tỉnh miền núi cao nên khí hậu ở Hà Giang lạnh rõ rệt so với vùng thấp và trung du kế cận. Nhiệt độ trung bình năm khoảng 21-23 độ C. Nét nổi bật của khí hậu là độ ẩm cao trong năm, mưa nhiều và kéo dài.</h3><h3>- Bạn có thể du lịch Hà Giang vào bất kỳ mùa nào trong năm. Người ta thường đến Hà Giang vào mùa thu lúa chín vàng. Thời gian đẹp nhất là tháng 10, 11 và 12, khi hoa tam giác mạch hay những cánh đồng cải khoe sắc. Còn mùa xuân, hoa mơ, hoa mận nở trắng rừng khiến bạn như đang bồng bềnh trên mây.</h3><h3>- Tháng 5, những thửa ruộng lấp loáng mùa nước đổ. Tháng 6 và tháng 7, nhiều người bỏ lỡ Hà Giang vì những cơn mưa hè réo rắt bất chợt. Nhưng cũng nhờ sự ẩm ướt này, núi rừng nơi đây lại khoác lên mình một màu xanh mướt say đắm lòng người.</h3><p><br></p>', 3, 'Là tỉnh miền núi cao nên khí hậu ở Hà Giang lạnh rõ rệt so với vùng thấp và trung du kế cận. Nhiệt độ trung bình năm khoảng 21-23 độ C. Nét nổi bật của khí hậu là độ ẩm cao trong năm, mưa nhiều và kéo dài.', 'TRAVEL_NEWS', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1708779270/91b80d6b-aa4a-40bd-86c6-fc48ee25d6ba.jpg', 'Hà Giang mùa nào đẹp?'),
(2, 'emailadmin@gmail.com', '2024-02-24 13:13:40', 'emailadmin@gmail.com', '2024-02-24 13:13:40', '<h2>Du lịch Hà Giang thì nghỉ ngơi ở đâu?</h2><p class=\"ql-align-justify\">Hiện nay hệ thống nhà nghỉ, khách sạn tại Hà Giang rất phát triển với mức giá 150.000VNĐ- 500.000VNĐ tùy theo điều kiện kinh tế mà bạn có thể lựa chọn dịch vụ phù hợp. Theo quan sát của MIA.vn có 2 khu vực thường được mọi người lựa chọn đặt khách sạn nhiều nhất là Đồng Văn và Mèo Vạc. Bởi 2 địa điểm này rất gần các điểm tham quan, view cũng rất đẹp. Một số khách sạn có tiếng là chất lượng tốt và nhiệt tình mà bạn có thể tham khảo như: nhà nghỉ Hoàng Ngọc, nhà nghỉ Khải Hoàn, nhà nghỉ Lũng Cú, nhà nghỉ Khâu Vai…</p><p class=\"ql-align-justify\">Tuy nhiên nếu bạn không kịp đặt phòng ở Mèo Vạc hoặc Đồng Văn thì cũng có thể thuê ở những vị trí xa hơn như Yên Minh, Quản Bạ. Một lưu ý nhỏ là bạn nên đặt phòng trước khi đi du lịch tầm 1 tháng đặc biệt là khi đi du lịch vào mùa hoa tam giác mạch và đối với những khách sạn có view đồi núi.&nbsp;</p><h2 class=\"ql-align-justify\">Ăn gì khi đi du lịch Hà Giang?</h2><p class=\"ql-align-justify\">Ẩm thực Hà Giang nổi tiếng với nhiều món ngon đặc sản, trong số đó phải kể đến các món ngon như: thắng cố, xôi ngũ sắc, bánh tam giác mạch, thắng dền… làm say lòng không ít du khách.&nbsp;</p><p class=\"ql-align-justify\">Một số món ăn mà bạn không nên bỏ lỡ như:&nbsp;</p><h3 class=\"ql-align-justify\"><strong>3.1 Đặc sản Thắng Cố</strong></h3><p class=\"ql-align-justify\">Sẽ là một thiếu sót lớn nếu bạn đã đi du lịch Hà Giang mà chưa thử qua món Thắng Cố. Thắng Cố là một trong những món ăn đặc sản vô cùng nổi tiếng của vùng đất Tây Bắc. Đây là món canh thịt truyền thống được nấu từ thịt ngực cùng với nước dùng vô cùng đặc biệt. Tinh túy của món Thắng Cố phải nói đến nước dùng của món ăn này được ninh nhừ từ xương, lục phủ ngũ tạng kết hợp với hơn 12 loại gia vị đặc trưng như: quế, hồi, lá chanh… tạo nên một nồi nước vô cùng chất lượng. Bí quyết để nước dùng ngon hơn đó là phải rán sơ phần thịt trước khi cho vào nước dùng để ninh mềm.</p><p class=\"ql-align-justify\">Về hương vị, Thắng Cố là một món có mùi ngai ngái khá khó ăn đối với những ai được thưởng thức món ăn này lần đầu nhưng càng ăn sẽ càng ghiền đấy nhé. Không những thế, khi thưởng thức Thắng Cố bạn nên kết hợp thêm rượu ngô để gia tăng hương vị cho món ăn này. Bạn có thể ăn Thắng Cố ở các chợ phiên thuộc Mèo Vạc, Lũng Cú, Đồng Văn… với mức giá vô cùng rẻ chỉ khoảng 20.000 VNĐ/bát.</p><p class=\"ql-align-center\"><img src=\"https://mia.vn/media/uploads/blog-du-lich/kinh-nghiem-di-ha-giang-tu-tuc-danh-cho-nguoi-di-lan-dau-chi-tiet-nhat-05-1644383052.jpg\" alt=\"Kinh nghiệm đi Hà Giang tự túc dành cho người đi lần đầu chi tiết nhất 6\"><em>Món thắng cố được làm từ nhiều nguyên liệu khi ăn có hương vị vô cùng đặc biệt</em></p><h3 class=\"ql-align-justify\"><strong>3.2 Đặc sản Thắng Dền</strong></h3><p class=\"ql-align-justify\">Thắng Dền cũng là một trong những đặc sản không thể thiếu khi đến Hà Giang. Món ăn này có nhân đậu xanh, đậu đỏ để gia tăng mùi vị. Sau đã đậu được nấu nhừ và sên thành khối thì chúng sẽ được bỏ vào giữa lớp bột, vo tròn lại. Món ăn này chỉ được chế biến khi có khách đến ăn. Thắng Dền dẻo dẻo, nhiều màu sắc lại có vị ngọt nhẹ và thơm thơm mùi gạo nếp. Chỉ cần nấu một chút cay từ nước đường hoa mai nấu gừng và bùi béo của cốt dừa, lạc rang thì thơm ngon khó cưỡng.</p><p class=\"ql-align-justify\"><br></p><h3 class=\"ql-align-justify\"><strong>3.3 Cháo ấu tẩu</strong></h3><p class=\"ql-align-justify\">Người ta có câu: “Chưa ăn cháo ấu tẩu thì chưa đến Hà Giang”. Tác dụng chính của món ăn này là giúp người ăn ngủ sâu giấc, ngủ ngon hơn và xua tan đi mệt mỏi suốt một ngày dài. Cháo ấu tẩu<a href=\"https://mia.vn/cam-nang-du-lich/chao-au-tau-ha-giang-mon-dac-san-doc-dao-cua-dan-toc-mong-3425\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(240, 79, 36);\">&nbsp;</a>là món ăn có quanh năm nhưng nếu bạn muốn ăn thì phải dạo chợ, ghé quán vào lúc chiều tối.</p><p class=\"ql-align-justify\"><br></p><h3 class=\"ql-align-justify\"><strong>3.4 Thịt trâu gác bếp</strong></h3><p class=\"ql-align-justify\">Khô trâu là món ăn được dùng để quảng bá hình ảnh của mảnh đất Hà Giang. Món thịt trâu được làm chủ yếu từ bắp trâu, tẩm ướp muối, tiêu, gừng, ớt và mắc khén cho thấm. Sau đó miếng thịt đã được tẩm ướp sẽ được treo lên giàn bếp, hun khói từ củi cây rừng trong vòng 2 tháng cho khô lại. Chính vì thế mà miếng thịt trâu sau khi ra thành phẩm sẽ có màu nâu đen và ám mùi khói.</p><p class=\"ql-align-center\"><img src=\"https://mia.vn/media/uploads/blog-du-lich/kinh-nghiem-di-ha-giang-tu-tuc-danh-cho-nguoi-di-lan-dau-chi-tiet-nhat-06-1644383056.jpg\" alt=\"Kinh nghiệm đi Hà Giang tự túc dành cho người đi lần đầu chi tiết nhất 7\"><em>Thịt trâu gác bếp mềm dai ngon khó cưỡng đấy</em></p><h3 class=\"ql-align-justify\"><strong>3.5 Rượu ngô</strong></h3><p class=\"ql-align-justify\">Có thể nói rằng rượu ngô là món thức uống gần gũi với nhiều người dân vùng cao nguyên đá. Trong nhà người dân ở đây ai cũng có ít nhất là từ 3 - 5 lít rượu dùng để đãi khách. Món thức uống này được yêu thích bởi thời tiết Hà Giang khá mát vào hè, tuyết rơi vào mùa đông nên người dân có thói quen uống rượu để giữ ấm cơ thể. Vị của rượu ngô cũng rất dễ uống, vị ngọt dễ uống và có hương thơm đặc trưng của ngô.</p><p class=\"ql-align-justify\"><br></p><p><br></p>', 4, 'Kinh nghiệm đi Hà Giang tự túc dành cho người đi lần đầu luôn được nhiều du khách tìm kiếm để chuẩn bị thật tốt cho chuyến hành trình của mình. Nếu bạn cũng đang có ý định vi vu đến mảnh đất này thì đừng bỏ qua bài viết bên dưới đây. MIA.vn sẽ chia sẻ bên', 'TRAVEL_GUIDE', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1708780419/123d4076-fc91-42d9-a973-ff62c34d9710.jpg', 'Kinh nghiệm đi Hà Giang tự túc dành cho người đi lần đầu chi tiết nhất'),
(3, 'emailadmin@gmail.com', '2024-02-24 13:24:13', 'emailadmin@gmail.com', '2024-02-24 13:24:13', '<p>Thời tiết miền Bắc bắt đầu se sắt những cơn gió lạnh đầu mùa. Chẳng mấy nữa mà trời chuyển đông, lòng bỗng thấy thèm một chuyến đi về miền địa đầu Tổ quốc với những cung đường uốn lượn quanh co và núi đồi rặt những đá, để rồi cứ thế mà co ro bên bếp lửa bập bùng, choáng váng nhấp một ngụm rượu ngô cay nổng rồi ngật ngà say đắm trước cảnh sắc, con người vùng đất ấy.</p><p>Nhắc đến Hà Giang, người ta liền nghĩ đến Mã Pí Lèng, Cột cờ Lũng Cú, Phố cổ Đồng Văn, Chợ tình Mèo Vạc… Nhưng bạn biết không, ngoài những địa điểm nổi tiếng và quen thuộc đó, còn có làng cổ ở Hà Giang tên là Thiên Hương với những ngôi nhà trình tường trăm tuổi và làng cổ Ma Lé lẩn khuất, im lìm giữa vòng ôm của cây cối, núi đồi.</p><p><img src=\"https://t.vietgiaitri.com/2020/2/2/di-ha-giang-co-gai-duoc-me-chup-cho-loat-anh-nghin-like-cau-chuyen-phia-sau-khien-tat-ca-thich-thu-ae1.jpg\" alt=\"Đi Hà Giang, cô gái được mẹ chụp cho loạt ảnh nghìn like: Câu chuyện phía  sau khiến tất cả thích thú - Netizen - Việt Giải Trí\"></p><p>Ma Lé nằm trên đường đi Cột cờ Lũng Cú, cách trung tâm thị trấn Đồng Văn khoảng 13 km. Chỉ nghe tên thôi cũng đã thôi thúc trí tưởng tượng và bước chân khám phá của du khách về ngôi làng cổ xưa, có phần ma mị này.<span class=\"ql-cursor\">﻿</span></p><p>Có diện tích khoảng 1000m2, Má Lé được ôm ấp, bao quanh bởi những dãy núi trùng trùng điệp điệp. Đây là nơi sinh sống của dân tộc Giá. Ngày nay, ngôi làng có khoảng 100 hộ dân sinh sống. Ở Má Lé có nhiều ngôi nhà cổ với tuổi đời 100 - 200 năm, mang vẻ đẹp đặc trưng của miền núi phía Bắc: nhà sàn với 2 tầng, vách đất vàng óng, mái nhà lợp ngói âm dương màu xám, kết hợp thêm móng nhà bằng đá, giữ cho nhà ở được bền bỉ theo thời gian. Đã trải qua biết bao thăng trầm và đổi thay, những lớp bụi thời gian và ký ức đã phủ dày trên những mái nhà xưa nhưng ngôi làng cổ tại Hà Giang vẫn còn nguyên những nét văn hóa bản địa truyền thống.</p><p class=\"ql-align-center\"><img src=\"https://ik.imagekit.io/tvlk/blog/2023/11/go-and-share-ngoi-lang-co-o-ha-giang-2-767x1024.webp?tr=dpr-2,w-675\" alt=\"Khung cảnh bình yên tại những làng cổ ở Hà Giang\">Khung cảnh bình yên tại những làng cổ ở Hà Giang</p><p class=\"ql-align-center\"><img src=\"https://ik.imagekit.io/tvlk/blog/2023/11/go-and-share-ngoi-lang-co-o-ha-giang-3-767x1024.webp?tr=dpr-2,w-675\" alt=\"Đường dẫn vào nhà\">Đường dẫn vào nhà</p><p class=\"ql-align-center\"><img src=\"https://ik.imagekit.io/tvlk/blog/2023/11/go-and-share-ngoi-lang-co-o-ha-giang-4-767x1024.webp?tr=dpr-2,w-675\" alt=\"Mái nhà âm dương\">Mái nhà âm dương</p><p>Má Lé homestay là một trong những điểm dừng chân thú vị cho du khách khi ghé thăm Làng . Đây là căn nhà cổ 200 tuổi của người Giáy đang được vận hành để khai thác du lịch và phục vụ du khách. Nơi đây không nhộn nhịp, đông đúc như thị trấn Đồng Văn mà bình yên, tĩnh tại, lặng lẽ khoác màu trầm của thời gian.</p><p class=\"ql-align-center\"><img src=\"https://ik.imagekit.io/tvlk/blog/2023/11/go-and-share-ngoi-lang-co-o-ha-giang-5-767x1024.webp?tr=dpr-2,w-675\" alt=\"Nhà cổ của người Giáy\">Nhà cổ của người Giáy</p><p>Căn nhà cổ 2 tầng này vẫn giữ nguyên những nét kiến trúc đặc trưng của người Giáy: hình chạm khắc trên đá, gỗ, tường gạch, ô cửa sổ nan trám,... Bên trong ngôi nhà còn những vật dụng truyền thống như cối giã, bếp lửa,...</p><p><br></p>', 5, 'Hà Giang không chỉ nổi tiếng với mùa hoa Tam Giác Mạch, với hẻm Tu Sản, sông Nho Quế,... mà còn có những ngôi làng cổ đẹp nguyên sơ, như Má Lé và Thiên Hương.', 'TRAVEL_NEWS', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1708781053/066713d2-a044-4de2-a49b-36188a2d9023.jpg', 'Khám phá gái đẹp ít người biết ở Hà Giang'),
(4, 'emailadmin@gmail.com', '2024-03-26 11:55:17', 'emailadmin@gmail.com', '2024-03-26 12:01:13', '<h2><strong>1. Cột Cờ Lũng Cú</strong></h2><p><br></p><p><a href=\"https://www.klook.com/vi/city/34-hanoi-things-to-do/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(32, 115, 249);\"><img src=\"https://res.klook.com/image/upload/fl_lossy.progressive,q_85/c_fill,w_1000/v1696079920/esbpbnzlhzxoxlkmdsnn.webp\" alt=\"dia-diem-du-lich-ha-giang\"></a></p><p class=\"ql-align-center\"><a href=\"https://www.klook.com/vi/city/34-hanoi-things-to-do/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(32, 115, 249);\">Nguồn ảnh: Báo Dân tộc và Phát triển</a></p><p>Cột cờ Lũng Cú tọa lạc trên đỉnh ngọn núi Rồng ở độ cao 1.470 mét so với mực nước biển. Là một trong bốn điểm cực của Tổ quốc, cột cờ Lũng Cú tại Hà Giang đánh dấu điểm cực Bắc của đất nước.&nbsp;</p><p>Cột cờ đã được trùng tu xây dựng lại vào năm 2010, mang theo lá cờ đỏ sao vàng rộng 54 mét vuông tượng trưng cho 54 dân tộc anh em bay phấp phới trên độ cao hơn 33 mét. Cột cờ Lũng Cú có thiết kế thân hình bát giác cùng tám tấm phù điêu bằng đá xanh dưới chân cột cờ mô phỏng họa tiết Trống đồng Đông Sơn và những trang lịch sử hào hùng của dân tộc.</p><p>Để lên đến cột cờ, du khách sẽ đi qua 839 bậc thang và chiêm ngưỡng cảnh non nước hữu tình dần hiện ra. Đứng trên đỉnh núi và phóng tầm mắt ra xa, bạn sẽ cảm nhận được khí trời mát lạnh của vùng núi Đông Bắc và không khí trang nghiêm tự hào nơi đây. Ngoài ra khi đến đây, bạn cũng có thể dạo qua bản người Lô Lô và người Mông cùng ao nước Mắt Rồng trong xanh nằm ngay dưới chân núi.</p><p><strong>Địa chỉ:&nbsp;</strong>Đỉnh núi Long Sơn, Lũng Cú, Đồng Văn, Hà Giang</p><p><br></p><h2><strong>2. Đèo Mã Pí Lèng</strong>&nbsp;</h2><p><br></p><p><a href=\"https://www.klook.com/vi/city/34-hanoi-things-to-do/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(32, 115, 249);\"><img src=\"https://res.klook.com/image/upload/fl_lossy.progressive,q_85/c_fill,w_1000/v1696080004/heojpdimfomlh2msniyh.webp\" alt=\"dia-diem-du-lich-ha-giang\"></a></p><p class=\"ql-align-center\"><a href=\"https://www.klook.com/vi/city/34-hanoi-things-to-do/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(32, 115, 249);\">Nguồn ảnh: Canva</a></p><p>Đèo Mã Pí Lèng nằm trên quốc lộ 4C thuộc địa phận xã Pải Vi và Pải Lủng, nối liền giữa thành phố Hà Giang và hai thị trấn Mèo Vạc và Đồng Văn. Được mệnh danh là một trong “tứ đại đỉnh đèo” của Việt Nam, con đèo này là địa điểm du lịch Hà Giang nổi tiếng bậc nhất.</p><p>Mã Pí Lèng là cung đường đèo dài 20 km ngoằn nghèo và hiểm trở ở độ cao trên 1.200 mét so với mặt nước biển. Du khách có thể&nbsp;<a href=\"https://www.klook.com/vi/activity/92135-motorbike-rental-ha-giang-vietnam/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(32, 115, 249); background-color: transparent;\"><u>thuê xe máy</u></a>&nbsp;và khám phá hành trình đầy mạo hiểm “phượt” qua những khúc cua quanh co giữa những vách đá dựng đứng và vực sâu thăm thẳm. Trên đường đi đừng quên dừng lại tại mỏm đá tử thần giữa sườn núi để check-in những bức ảnh “sống ảo” tuyệt đẹp.</p><p><br></p><h2><strong>3. Phố Cổ Đồng Văn</strong></h2><p><br></p><p><a href=\"https://www.klook.com/vi/city/34-hanoi-things-to-do/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(32, 115, 249);\"><img src=\"https://res.klook.com/image/upload/fl_lossy.progressive,q_85/c_fill,w_1000/v1696080101/ap6g2efiqwjelgow8dp0.webp\" alt=\"dia-diem-du-lich-ha-giang\"></a></p><p>Phố cổ Đồng Văn là khu phố được xây dựng từ thế kỷ 20 tại thị trấn Đồng Văn, tỉnh Hà Giang. Đây không chỉ là nơi sinh sống của nhiều dân tộc đồng bào mà còn là một trong những nét văn hóa và kiến trúc cần gìn giữ và bảo tồn của tỉnh Hà Giang.&nbsp;</p><p>Trong khu phố cổ chỉ có khoảng 40 ngôi nhà hơn 100 năm tuổi nằm san sát nhau, bao quanh bởi núi đá. Tại đây, du khách sẽ có cơ hội ngắm nhìn vẻ đẹp yên bình, cổ kính của những bức tường màu xám nhuộm trong ánh nắng vàng vào buổi sáng. Đêm đến sẽ là khung cảnh nhộn nhịp giữa những tiếng kèn môi và điệu múa giao duyên của trai gái trong bản.&nbsp;</p><p>Đặc biệt, phố cổ Đồng Văn vào các ngày từ 14 đến 16 âm lịch tháng ba, sẽ tràn ngập những chiếc đèn lồng đỏ và tổ chức đêm hội với nhiều hoạt động đặc sắc. Hãy khám phá khu chợ Đồng Văn ở trung tâm phố cổ để trải nghiệm nền văn hóa đa dạng của người dân bản địa nơi đây nhé.</p><p><strong>Địa chỉ:&nbsp;</strong>Thị trấn Đồng Văn, Hà Giang</p><p><br></p><p><br></p><h2><strong>4. Thị Trấn Phó Bảng</strong></h2><p><br></p><p><a href=\"https://www.klook.com/vi/city/34-hanoi-things-to-do/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(32, 115, 249);\"><img src=\"https://res.klook.com/image/upload/fl_lossy.progressive,q_85/c_fill,w_1000/v1696080393/kpis0kx2mjsf2buow6tj.webp\" alt=\"dia-diem-du-lich-ha-giang\"></a></p><p class=\"ql-align-center\"><a href=\"https://www.klook.com/vi/city/34-hanoi-things-to-do/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(32, 115, 249);\">Nguồn ảnh: Mia.vn</a></p><p>Thị trấn Phó Bảng, hay còn gọi là Phố Bảng, nằm tại phía Tây của huyện Đồng Văn. Khác với một Đồng Văn hay Mèo Vạc nhộn nhịp, Phó Bảng là một thị trấn nhỏ bé, yên bình ẩn giữa núi rừng Hà Giang.</p><p>Tại thị trấn Phó Bảng chỉ có khoảng gần 3.000 người chủ yếu là người Mông và người Hoa Hán sinh sống. Những ngôi nhà ở đây được đắp bằng đất nung đơn sơ, lợp mái ngói âm dương cùng những cánh cửa gỗ cũ kĩ. Đi dọc qua thị trấn, du khách có thể tận hưởng bầu không khí sinh hoạt bình dị của con người nơi đây. Đặc biệt, nếu ghé thăm Phó Bảng vào những ngày mưa, bạn sẽ còn cảm nhận nét buồn và tĩnh lặng không đâu có được. Gần đó, bạn cũng có thể ngắm nhìn thung lũng hoa hồng cùng những bông hoa tam giác mạch nở rộ ven đường.&nbsp;</p><p>Thị trấn không quá khó tìm, tuy nhiên bạn cần lưu ý đường sẽ khá khó đi vào những ngày mưa. Trên quốc lộ 4C từ thành phố Hà Giang tới cao nguyên đá Đồng Văn, bạn rẽ trái ở ngã ba Lũng Cú và đi khoảng 4 km nữa là sẽ tìm thấy một Phó Bảng yên bình.&nbsp;</p><p><strong>Địa chỉ:&nbsp;</strong>Phó Bảng, Đồng Văn, Hà Giang</p>', 10, 'Khám phá 15 địa điểm du lịch Hà Giang nổi tiếng và trải nghiệm văn hóa độc đáo tại vùng cao này. Đặt tour du lịch nhanh chóng và tiện lợi cùng Klook nhé!', 'TRAVEL_NEWS', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1711454115/748a6d97-df94-4a31-b97a-23867c6e880a.webp', '15 Địa Điểm Du Lịch Hà Giang Nổi Tiếng Không Thể Bỏ Lỡ'),
(5, 'emailadmin@gmail.com', '2024-03-26 11:59:01', 'emailadmin@gmail.com', '2024-03-26 11:59:01', '<p class=\"ql-align-justify\">Hà Giang hiện có bốn đặc sản lọt Top 100 đặc sản quà tặng nổi bật gồm: Mật ong bạc hà, chè san tuyết Hoàng Su Phì, bánh tam giác mạch và hồng không hạt Quản Bạ và bốn món ăn lọt Top 100 đặc sản quà tặng nổi bật gồm: Mèn mén, cháo ấu tẩu, thắng cố và thịt treo gác bếp, 03 món nằm trong top 121 món ẩm thực tiêu biểu Việt Nam gồm cá bỗng, phở ngô, cháu ấu tẩu. Những món ngon khó cưỡng mang phong vị núi rừng này cùng với xôi ngũ sắc, bánh tam giác mạch, rượu ngô men lá, rêu đá nướng, bánh trưng gù, lạp xường, thắng cố ... là tinh hoa ẩm thực khởi nguồn từ quá trình sinh sống, lao động của cộng đồng 19 dân tộc nơi đây vốn có nhiều món ăn truyền thống, mang sắc thái đặc trưng từng dân tộc cùng với những nguyên liệu chế biến đặc sắc được tạo hóa ban tặng riêng cho vùng núi phía bắc Tổ quốc như: Mắc khén, hạt dổi, hoa hồi, thảo quả, mật ong.</p><p class=\"ql-align-justify\">Đến với Hà Giang, bên cạnh trải nghiệm danh lam thắng cảnh, những phong tục tập quán riêng có, du khách chắc chắn không thể bỏ qua thưởng thức các món ăn đặc sản truyền thống tại điểm dừng chân ở các bản làng.</p><p class=\"ql-align-justify\">Nhắc tới Hà Giang du khách thường nhớ tới đặc sản cháo ấu tẩu. Món này ăn khá lạ miệng. Bát cháo có vị béo bùi pha lẫn chút đắng của ấu tẩu, mùi thơm ngon từ trứng gà và các loại rau gia vị ăn kèm. Ấu tẩu là loại củ đặc trưng của Hà Giang, chứa độc tố. Nhưng người Mông khử độc củ ấu bằng cách ngâm chúng vào nước vo gạo, rồi ninh tầm 4-5 tiếng. Sau đó đem tán nhuyễn, nấu cùng nước hầm xương và gạo nếp cái hoa vàng pha một ít gạo nếp tẻ. Cháo khi chín sẽ được múc ra bát ăn kèm thịt nạc băm, muối, tiêu và hành hoa. Ấu tẩu là món ăn bổ dưỡng, chữa cảm mạo, đau nhức… Trong những ngày đông giá lạnh trên miền đá núi, thưởng thức bát cháo ấu tẩu bổ dưỡng, nóng hổi chắc chắn là trải nghiệm rất khó quên của du khách.</p><p><a href=\"https://file1.dangcongsan.vn/data/0/images/2023/12/05/upload_2673/33ad796e0c8ca5d2fc9d.jpg\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(0, 0, 0); background-color: initial;\"><img src=\"https://file1.dangcongsan.vn/data/0/images/2023/12/05/upload_2673/33ad796e0c8ca5d2fc9d.jpg?dpi=150&amp;quality=100&amp;w=800\"></a><em>Bánh trưng gù cũng là một trong những tinh hoa ẩm thực của xứ sở cao nguyên Đá Hà Giang.</em></p><p class=\"ql-align-justify\">Ngoài cháo ấu tẩu, thắng cố là món ngon khó cưỡng đối với thực khách khi tới cao nguyên đá. Thắng cố có nghĩa là canh thịt, là món ăn truyền thống của người Mông, được chế biến từ thịt ngựa với hương vị vô cùng đặc trưng. Ngày nay, để phù hợp với khách du lịch, chủ quán đã thay thế nguyên liệu bằng thịt trâu, bò, lợn. Đồng bào nơi đây cũng dùng nội tạng bò để nấu, vì thịt ngựa rất khó mua. Tinh túy của thắng cố đặc biệt ở nước dùng, được ninh từ xương và lục phủ ngũ tạng và phối trộn cùng 12 loại gia vị đặc trưng như hoa hồi, thảo quả và lá chanh… tạo nên nồi nước dùng thơm ngào ngạt. Phần thịt sẽ được rán sơ qua rồi cho vào nước dùng để ninh mềm. Món này có mùi ngai ngái đối với những người lần đầu nếm thử, nhưng càng ăn càng nghiền. Sẽ hấp dẫn hơn khi ăn kèm với mèn mén, bánh ngô nướng và nhắm rượu ngô.</p><p><br></p>', 5, 'Hà Giang không chỉ nức tiếng gần xa với phong cảnh non cao trùng điệp, hùng vĩ, những thửa ruộng bậc thang vàng óng mùa lúa chín, cánh đồng hoa tam giác mạch thơ mộng, rực rỡ sắc hồng tươi hay bản sắc văn hoá dân tộc độc đáo, mà còn là nơi hội tụ tinh hoa', 'CULTURE_AND_FOOD', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1711454338/609a9099-a98b-4f80-b7e1-aa261aa17ab4.jpg', 'Đặc sắc ẩm thực cao nguyên đá Hà Giang'),
(6, 'emailadmin@gmail.com', '2024-03-26 12:00:51', 'emailadmin@gmail.com', '2024-03-26 12:00:51', '<p class=\"ql-align-justify\"><span style=\"color: black; background-color: rgb(255, 255, 255);\">Hưởng ứng Tháng Thanh niên năm 2024, đoàn viên, thanh niên 2 đơn vị Trường THPT và Trung tâm GDTX huyện Hoàng Su Phì đã tiến hành vệ sinh môi trường, trồng và chăm sóc cây cảnh quan đoạn đầu tuyến đường từ huyện Hoàng Su Phì đi huyện Xín Mần.&nbsp;Một diện mạo sạch đẹp được dựng nên từ sự chung tay góp sức và trách nhiệm trong bảo vệ môi trường sáng, xanh, sạch, đẹp, an toàn.</span></p><p><img src=\"http://hagiangtv.vn/file/8a10a0d36ee998fd016f17e4ed0d65f3/032024/tn2_20240325230159.png\">Tuổi trẻ Hà Giang đã thực hiện được nhiều công trình, phần việc góp phần xây dựng nông thôn mới nâng cao, đô thị văn minh</p><p class=\"ql-align-justify\"><span style=\"color: black; background-color: rgb(255, 255, 255);\">Trong Tháng Thanh niên 2024, tuổi trẻ Hà Giang đã thực hiện được nhiều công trình, phần việc góp phần xây dựng nông thôn mới nâng cao, đô thị văn minh, như: Triển khai các công trình, phần việc tham gia xây dựng nông thôn mới; xây dựng nhà văn hóa thôn, làm mới đường giao thông nông thôn, cầu nông thôn, triển khai các công trình “Thắp sáng đường quê\", chỉnh trang, dọn dẹp vệ sinh môi trường.</span></p><p><img src=\"http://hagiangtv.vn/file/8a10a0d36ee998fd016f17e4ed0d65f3/032024/tn3_20240325230220.png\">Tuổi trẻ Hà Giang đã thực hiện được nhiều công trình, phần việc góp phần xây dựng nông thôn mới nâng cao, đô thị văn minh</p><p class=\"ql-align-justify\"><span style=\"color: black; background-color: rgb(255, 255, 255);\">Hoạt động thiết thực của tuổi trẻ Hà Giang trong Tháng Thanh niên năm 2024 đã phát huy vai trò xung kích, tình nguyện của thanh niên trong tham gia thực hiện các công trình, phần việc góp phần hoàn thành nhiệm vụ chính trị và tham gia phát triển kinh tế - xã hội tại địa phương, đơn vị.</span></p><p><br></p>', 5, 'Với chủ đề “Thanh niên Hà Giang xung kích, tình nguyện vì cộng đồng”, Tháng Thanh niên năm 2024 là dịp để mỗi đoàn viên, thanh niên phát huy vai trò, trách nhiệm, tinh thần của tuổi trẻ trong tham gia các hoạt động vì lợi ích của cộng đồng.', 'VOLUNTEER', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1711454450/925f6e02-7fb9-4e31-b465-54eea66db023.png', 'Tuổi trẻ Hà Giang xung kích tình nguyện vì cộng đồng');

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id` bigint(20) NOT NULL,
  `content` text DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `to_whom` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`id`, `content`, `is_read`, `type`, `to_whom`) VALUES
(1, '{\"type\":\"request_result\",\"title\":\"Yêu cầu của bạn đã được xử lý\",\"householdRoomTypeName\":\"Phòng 2 người\",\"requestStatus\":\"APPROVED\"}', 0, 'REQUEST_RESULT', 3),
(2, '{\"type\":\"request_result\",\"title\":\"Yêu cầu của bạn đã được xử lý\",\"householdRoomTypeName\":\"Phòng 3 người\",\"requestStatus\":\"APPROVED\"}', 0, 'REQUEST_RESULT', 3),
(3, '{\"type\":\"request_result\",\"title\":\"Yêu cầu của bạn đã được xử lý\",\"householdRoomTypeName\":\"Phòng 4 người\",\"requestStatus\":\"APPROVED\"}', 0, 'REQUEST_RESULT', 3),
(4, '{\"type\":\"request_result\",\"title\":\"Yêu cầu của bạn đã được xử lý\",\"householdRoomTypeName\":\"Dorm\",\"requestStatus\":\"APPROVED\"}', 0, 'REQUEST_RESULT', 1),
(5, '{\"type\":\"request_result\",\"title\":\"Yêu cầu của bạn đã được xử lý\",\"householdRoomTypeName\":\"Phòng gia đình (12 người)\",\"requestStatus\":\"APPROVED\"}', 0, 'REQUEST_RESULT', 1),
(6, '{\"type\":\"request_result\",\"title\":\"Yêu cầu của bạn đã được xử lý\",\"householdRoomTypeName\":\"Phòng 6 người\",\"requestStatus\":\"APPROVED\"}', 0, 'REQUEST_RESULT', 1),
(7, '{\"type\":\"request_result\",\"title\":\"Yêu cầu của bạn đã được xử lý\",\"householdRoomTypeName\":\"Phòng 4 người\",\"requestStatus\":\"APPROVED\"}', 0, 'REQUEST_RESULT', 1),
(8, '{\"type\":\"request_result\",\"title\":\"Yêu cầu của bạn đã được xử lý\",\"householdRoomTypeName\":\"Phòng 3 người\",\"requestStatus\":\"APPROVED\"}', 0, 'REQUEST_RESULT', 1),
(9, '{\"type\":\"request_result\",\"title\":\"Yêu cầu của bạn đã được xử lý\",\"householdRoomTypeName\":\"Phòng 2 người\",\"requestStatus\":\"APPROVED\"}', 0, 'REQUEST_RESULT', 1),
(10, '{\"checkOutDate\":\"2024-02-02\",\"totalGuest\":\"1\",\"bookingCode\":\"PAVI3315595472\",\"title\":\"Có đơn đặt phòng mới\",\"type\":\"booking_success\",\"checkInDate\":\"2024-02-01\",\"customerName\":\"Nguyen Nguyen\"}', 0, 'BOOKING_SUCCESS', 3),
(11, '{\"checkOutDate\":\"2024-03-07\",\"totalGuest\":\"2\",\"bookingCode\":\"PAVI3317583251\",\"type\":\"booking_success\",\"title\":\"Có đơn đặt phòng mới\",\"checkInDate\":\"2024-02-25\",\"customerName\":\"Nguyen Nguyen\"}', 0, 'BOOKING_SUCCESS', 3),
(12, '{\"checkOutDate\":\"2024-03-07\",\"totalGuest\":\"2\",\"bookingCode\":\"PAVI3317583251\",\"type\":\"booking_success\",\"title\":\"Có đơn đặt phòng mới\",\"checkInDate\":\"2024-02-25\",\"customerName\":\"Nguyen Nguyen\"}', 0, 'BOOKING_SUCCESS', 3),
(13, '{\"checkOutDate\":\"2024-03-05\",\"totalGuest\":\"1\",\"bookingCode\":\"PAVI3317583820\",\"type\":\"booking_success\",\"title\":\"Có đơn đặt phòng mới\",\"checkInDate\":\"2024-03-01\",\"customerName\":\"Nguyen Nguyen\"}', 0, 'BOOKING_SUCCESS', 3),
(14, '{\"checkOutDate\":\"2024-03-05\",\"totalGuest\":\"1\",\"bookingCode\":\"PAVI3317583820\",\"type\":\"booking_success\",\"title\":\"Có đơn đặt phòng mới\",\"checkInDate\":\"2024-03-01\",\"customerName\":\"Nguyen Nguyen\"}', 0, 'BOOKING_SUCCESS', 3),
(15, '{\"deadlineRefundDate\":\"2024-02-26\",\"bookingCode\":\"PAVI3317583820\",\"title\":\"Thông báo hủy đặt phòng\",\"type\":\"booking_cancel\",\"customerName\":\"Nguyen Nguyen\",\"refundAmount\":\"2000000\"}', 0, 'BOOKING_CANCEL', 3),
(16, '{\"checkOutDate\":\"2024-02-28\",\"totalGuest\":\"1\",\"bookingCode\":\"PAVI3317848458\",\"title\":\"Có đơn đặt phòng mới\",\"type\":\"booking_success\",\"checkInDate\":\"2024-02-27\",\"customerName\":\"Nguyen Nguyen\"}', 0, 'BOOKING_SUCCESS', 3),
(17, '{\"checkOutDate\":\"2024-02-28\",\"totalGuest\":\"1\",\"bookingCode\":\"PAVI3317848458\",\"title\":\"Có đơn đặt phòng mới\",\"type\":\"booking_success\",\"checkInDate\":\"2024-02-27\",\"customerName\":\"Nguyen Nguyen\"}', 0, 'BOOKING_SUCCESS', 3),
(18, '{\"deadlineRefundDate\":\"2024-02-29\",\"bookingCode\":\"PAVI3317848458\",\"type\":\"booking_cancel\",\"title\":\"Thông báo hủy đặt phòng\",\"customerName\":\"Nguyen Nguyen\",\"refundAmount\":\"0\"}', 0, 'BOOKING_CANCEL', 3),
(19, '{\"checkOutDate\":\"2024-03-03\",\"totalGuest\":\"2\",\"bookingCode\":\"PAVI3318185096\",\"type\":\"booking_success\",\"title\":\"Có đơn đặt phòng mới\",\"checkInDate\":\"2024-03-02\",\"customerName\":\"Nguyen Nguyen\"}', 0, 'BOOKING_SUCCESS', 3),
(20, '{\"checkOutDate\":\"2024-03-03\",\"totalGuest\":\"2\",\"bookingCode\":\"PAVI3318185096\",\"type\":\"booking_success\",\"title\":\"Có đơn đặt phòng mới\",\"checkInDate\":\"2024-03-02\",\"customerName\":\"Nguyen Nguyen\"}', 0, 'BOOKING_SUCCESS', 3),
(21, '{\"householdRoomTypeName\":\"Phòng 2 người\",\"title\":\"Yêu cầu của bạn đã được xử lý\",\"type\":\"request_result\",\"requestStatus\":\"APPROVED\"}', 0, 'REQUEST_RESULT', 8),
(22, '{\"householdRoomTypeName\":\"Phòng 4 người\",\"title\":\"Yêu cầu của bạn đã được xử lý\",\"type\":\"request_result\",\"requestStatus\":\"APPROVED\"}', 0, 'REQUEST_RESULT', 8),
(23, '{\"householdRoomTypeName\":\"Phòng 4 người\",\"title\":\"Yêu cầu của bạn đã được xử lý\",\"type\":\"request_result\",\"requestStatus\":\"REJECTED\"}', 0, 'REQUEST_RESULT', 8),
(24, '{\"householdRoomTypeName\":\"Phòng 4 người VIP\",\"title\":\"Yêu cầu của bạn đã được xử lý\",\"type\":\"request_result\",\"requestStatus\":\"APPROVED\"}', 0, 'REQUEST_RESULT', 8),
(25, '{\"checkOutDate\":\"2024-03-13\",\"totalGuest\":\"1\",\"bookingCode\":\"PAVI4319053580\",\"title\":\"Có đơn đặt phòng mới\",\"type\":\"booking_success\",\"checkInDate\":\"2024-03-12\",\"customerName\":\"Nguyen Nguyen\"}', 0, 'BOOKING_SUCCESS', 8),
(26, '{\"checkOutDate\":\"2024-03-13\",\"totalGuest\":\"1\",\"bookingCode\":\"PAVI4319053580\",\"title\":\"Có đơn đặt phòng mới\",\"type\":\"booking_success\",\"checkInDate\":\"2024-03-12\",\"customerName\":\"Nguyen Nguyen\"}', 0, 'BOOKING_SUCCESS', 8),
(27, '{\"checkOutDate\":\"2024-03-25\",\"totalGuest\":\"1\",\"bookingCode\":\"PAVI4319054020\",\"title\":\"Có đơn đặt phòng mới\",\"type\":\"booking_success\",\"checkInDate\":\"2024-03-22\",\"customerName\":\"Nguyen Nguyen\"}', 0, 'BOOKING_SUCCESS', 8),
(28, '{\"checkOutDate\":\"2024-03-25\",\"totalGuest\":\"1\",\"bookingCode\":\"PAVI4319054020\",\"title\":\"Có đơn đặt phòng mới\",\"type\":\"booking_success\",\"checkInDate\":\"2024-03-22\",\"customerName\":\"Nguyen Nguyen\"}', 0, 'BOOKING_SUCCESS', 8),
(29, '{\"deadlineRefundDate\":\"2024-03-14\",\"bookingCode\":\"PAVI4319054020\",\"type\":\"booking_cancel\",\"title\":\"Thông báo hủy đặt phòng\",\"customerName\":\"Nguyen Nguyen\",\"refundAmount\":\"1500000\"}', 0, 'BOOKING_CANCEL', 8),
(30, '{\"type\":\"request_result\",\"householdRoomTypeName\":\"Phòng 3 người\",\"title\":\"Yêu cầu của bạn đã được xử lý\",\"requestStatus\":\"APPROVED\"}', 0, 'REQUEST_RESULT', 9),
(31, '{\"checkOutDate\":\"2024-03-13\",\"totalGuest\":\"1\",\"bookingCode\":\"PAVI3319057694\",\"title\":\"Có đơn đặt phòng mới\",\"type\":\"booking_success\",\"checkInDate\":\"2024-03-12\",\"customerName\":\"Nguyen Nguyen\"}', 0, 'BOOKING_SUCCESS', 3),
(32, '{\"checkOutDate\":\"2024-03-13\",\"totalGuest\":\"1\",\"bookingCode\":\"PAVI3319057694\",\"title\":\"Có đơn đặt phòng mới\",\"type\":\"booking_success\",\"checkInDate\":\"2024-03-12\",\"customerName\":\"Nguyen Nguyen\"}', 0, 'BOOKING_SUCCESS', 3),
(33, '{\"householdRoomTypeName\":\"Phòng 4 người\",\"title\":\"Yêu cầu của bạn đã được xử lý\",\"type\":\"request_result\",\"requestStatus\":\"APPROVED\"}', 0, 'REQUEST_RESULT', 10),
(34, '{\"checkOutDate\":\"2024-04-04\",\"totalGuest\":\"1\",\"bookingCode\":\"PAVI3320965010\",\"type\":\"booking_success\",\"title\":\"Có đơn đặt phòng mới\",\"checkInDate\":\"2024-04-03\",\"customerName\":\"Nguyen Nguyen\"}', 0, 'BOOKING_SUCCESS', 3),
(35, '{\"checkOutDate\":\"2024-04-04\",\"totalGuest\":\"1\",\"bookingCode\":\"PAVI3320965010\",\"type\":\"booking_success\",\"title\":\"Có đơn đặt phòng mới\",\"checkInDate\":\"2024-04-03\",\"customerName\":\"Nguyen Nguyen\"}', 0, 'BOOKING_SUCCESS', 3),
(36, '{\"deadlineRefundDate\":\"2024-04-05\",\"bookingCode\":\"PAVI3320965010\",\"type\":\"booking_cancel\",\"title\":\"Thông báo hủy đặt phòng\",\"customerName\":\"Nguyen Nguyen\",\"refundAmount\":\"0\"}', 0, 'BOOKING_CANCEL', 3),
(37, '{\"checkOutDate\":\"2024-04-04\",\"totalGuest\":\"1\",\"bookingCode\":\"PAVI3320965389\",\"type\":\"booking_success\",\"title\":\"Có đơn đặt phòng mới\",\"checkInDate\":\"2024-04-03\",\"customerName\":\"Nguyen Nguyen\"}', 0, 'BOOKING_SUCCESS', 3),
(38, '{\"checkOutDate\":\"2024-04-04\",\"totalGuest\":\"1\",\"bookingCode\":\"PAVI3320965389\",\"type\":\"booking_success\",\"title\":\"Có đơn đặt phòng mới\",\"checkInDate\":\"2024-04-03\",\"customerName\":\"Nguyen Nguyen\"}', 0, 'BOOKING_SUCCESS', 3),
(39, '{\"checkOutDate\":\"2024-04-04\",\"totalGuest\":\"1\",\"bookingCode\":\"PAVI3320965389\",\"type\":\"booking_success\",\"title\":\"Có đơn đặt phòng mới\",\"checkInDate\":\"2024-04-03\",\"customerName\":\"Nguyen Nguyen\"}', 0, 'BOOKING_SUCCESS', 3),
(40, '{\"checkOutDate\":\"2024-04-04\",\"totalGuest\":\"1\",\"bookingCode\":\"PAVI3320965389\",\"type\":\"booking_success\",\"title\":\"Có đơn đặt phòng mới\",\"checkInDate\":\"2024-04-03\",\"customerName\":\"Nguyen Nguyen\"}', 0, 'BOOKING_SUCCESS', 3),
(41, '{\"checkOutDate\":\"2024-04-05\",\"totalGuest\":\"1\",\"bookingCode\":\"PAVI1321038689\",\"title\":\"Có đơn đặt phòng mới\",\"type\":\"booking_success\",\"checkInDate\":\"2024-04-04\",\"customerName\":\"Nguyen Nguyen\"}', 0, 'BOOKING_SUCCESS', 1),
(42, '{\"checkOutDate\":\"2024-04-05\",\"totalGuest\":\"1\",\"bookingCode\":\"PAVI1321038689\",\"title\":\"Có đơn đặt phòng mới\",\"type\":\"booking_success\",\"checkInDate\":\"2024-04-04\",\"customerName\":\"Nguyen Nguyen\"}', 0, 'BOOKING_SUCCESS', 1),
(43, '{\"checkOutDate\":\"2024-04-05\",\"totalGuest\":\"1\",\"bookingCode\":\"PAVI1321042581\",\"title\":\"Có đơn đặt phòng mới\",\"type\":\"booking_success\",\"checkInDate\":\"2024-04-04\",\"customerName\":\"Nguyen Nguyen\"}', 0, 'BOOKING_SUCCESS', 1),
(44, '{\"checkOutDate\":\"2024-04-05\",\"totalGuest\":\"1\",\"bookingCode\":\"PAVI1321042581\",\"title\":\"Có đơn đặt phòng mới\",\"type\":\"booking_success\",\"checkInDate\":\"2024-04-04\",\"customerName\":\"Nguyen Nguyen\"}', 0, 'BOOKING_SUCCESS', 1),
(45, '{\"deadlineRefundDate\":\"2024-04-06\",\"bookingCode\":\"PAVI1321038689\",\"type\":\"booking_cancel\",\"title\":\"Thông báo hủy đặt phòng\",\"customerName\":\"Nguyen Nguyen\",\"refundAmount\":\"0\"}', 0, 'BOOKING_CANCEL', 1);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id` bigint(20) NOT NULL,
  `amount` decimal(38,2) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `gateway` varchar(255) DEFAULT NULL,
  `payment_date` datetime DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `booking_code` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`id`, `amount`, `description`, `gateway`, `payment_date`, `status`, `type`, `booking_code`) VALUES
(1, '500000.00', NULL, NULL, '2023-12-10 16:48:00', 'PAID', 'SYSTEM', 'AMZ001'),
(2, '700000.00', NULL, NULL, '2023-11-24 16:48:00', 'PAID', 'SYSTEM', 'AMZ002'),
(3, '1080.00', NULL, NULL, '2023-11-24 16:48:00', 'PAID', 'SYSTEM', 'AMZ003'),
(4, '8400.00', NULL, NULL, '2023-11-24 16:48:00', 'PAID', 'SYSTEM', 'AMZ004'),
(5, '7000.00', NULL, NULL, '2023-11-24 16:48:00', 'PAID', 'SYSTEM', 'AMZ005'),
(6, '2000000.00', 'Thanh toan dat phong PAVI3315165466', 'VN_PAY', '2024-01-27 12:38:29', 'PAID', 'SYSTEM', 'PAVI3315165466'),
(7, '1000000.00', 'Thanh toan dat phong PAVI3315165880', 'VN_PAY', '2024-01-27 12:45:35', 'PAID', 'SYSTEM', 'PAVI3315165880'),
(8, '500000.00', 'Thanh toan dat phong PAVI3315595472', 'VN_PAY', '2024-02-01 12:08:28', 'PAID', 'SYSTEM', 'PAVI3315595472'),
(9, '5500000.00', 'Thanh toan dat phong PAVI3317583251', 'VN_PAY', '2024-02-24 12:15:51', 'PAID', 'SYSTEM', 'PAVI3317583251'),
(10, '2000000.00', 'Thanh toan dat phong PAVI3317583820', 'VN_PAY', '2024-02-24 12:24:08', 'PAID', 'SYSTEM', 'PAVI3317583820'),
(11, '500000.00', 'Thanh toan dat phong PAVI3317848458', 'VN_PAY', '2024-02-27 13:55:01', 'PAID', 'SYSTEM', 'PAVI3317848458'),
(12, '500000.00', 'Thanh toan dat phong PAVI3318185096', 'VN_PAY', '2024-03-02 11:26:05', 'PAID', 'SYSTEM', 'PAVI3318185096'),
(13, '500000.00', 'Thanh toan dat phong PAVI4319053580', 'VN_PAY', '2024-03-12 12:41:14', 'PAID', 'SYSTEM', 'PAVI4319053580'),
(14, '1500000.00', 'Thanh toan dat phong PAVI4319054020', 'VN_PAY', '2024-03-12 12:48:50', 'PAID', 'SYSTEM', 'PAVI4319054020'),
(15, '900000.00', 'Thanh toan dat phong PAVI3319057694', 'VN_PAY', '2024-03-12 13:48:42', 'PAID', 'SYSTEM', 'PAVI3319057694'),
(16, '500000.00', 'Thanh toan dat phong PAVI3320965010', 'VN_PAY', '2024-04-03 15:38:19', 'PAID', 'SYSTEM', 'PAVI3320965010'),
(17, '500000.00', 'Thanh toan dat phong PAVI3320965389', 'VN_PAY', '2024-04-03 15:43:25', 'PAID', 'SYSTEM', 'PAVI3320965389'),
(18, '900000.00', NULL, NULL, '2024-04-03 15:56:17', 'UNPAID', 'OUTSIDE_SYSTEM', 'PAVI1020966178'),
(19, '700000.00', NULL, NULL, '2024-04-03 15:59:05', 'UNPAID', 'OUTSIDE_SYSTEM', 'PAVI1020966346'),
(20, '1200000.00', NULL, NULL, '2024-04-03 16:05:52', 'UNPAID', 'OUTSIDE_SYSTEM', 'PAVI1020966753'),
(21, '500000.00', NULL, NULL, '2024-04-03 16:12:06', 'UNPAID', 'OUTSIDE_SYSTEM', 'PAVI1020967127'),
(22, '1200000.00', NULL, NULL, '2024-04-03 16:12:55', 'UNPAID', 'OUTSIDE_SYSTEM', 'PAVI1020967176'),
(23, '1200000.00', NULL, NULL, '2024-04-03 16:16:07', 'UNPAID', 'OUTSIDE_SYSTEM', 'PAVI1020967368'),
(24, '500000.00', NULL, NULL, '2024-04-04 11:18:10', 'PAID', 'OUTSIDE_SYSTEM', 'PAVI1021035891'),
(25, '1500000.00', NULL, NULL, '2024-04-04 11:23:38', 'UNPAID', 'OUTSIDE_SYSTEM', 'PAVI1021036219'),
(26, '500000.00', 'Thanh toan dat phong PAVI1321038689', 'VN_PAY', '2024-04-04 12:05:11', 'PAID', 'SYSTEM', 'PAVI1321038689'),
(27, '1200000.00', NULL, NULL, '2024-04-04 12:08:58', 'PAID', 'OUTSIDE_SYSTEM', 'PAVI1021038939'),
(28, '1000000.00', 'Thanh toan dat phong PAVI1321042581', 'VN_PAY', '2024-04-04 13:09:59', 'PAID', 'SYSTEM', 'PAVI1321042581'),
(29, '500000.00', 'Thanh toan dat phong PAVI1321043022', 'VN_PAY', '2024-04-04 13:17:01', 'ERROR', 'SYSTEM', 'PAVI1321043022');

-- --------------------------------------------------------

--
-- Table structure for table `request`
--

CREATE TABLE `request` (
  `id` bigint(20) NOT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `last_modified_by` varchar(255) DEFAULT NULL,
  `last_modified_date` datetime DEFAULT NULL,
  `request_content` varchar(255) DEFAULT NULL,
  `request_data` varchar(255) DEFAULT NULL,
  `request_response` varchar(255) DEFAULT NULL,
  `request_status` varchar(255) DEFAULT NULL,
  `request_title` varchar(255) DEFAULT NULL,
  `request_type` varchar(255) DEFAULT NULL,
  `solved_date` datetime DEFAULT NULL,
  `admin_id` bigint(20) DEFAULT NULL,
  `household_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `request`
--

INSERT INTO `request` (`id`, `created_by`, `created_date`, `last_modified_by`, `last_modified_date`, `request_content`, `request_data`, `request_response`, `request_status`, `request_title`, `request_type`, `solved_date`, `admin_id`, `household_id`) VALUES
(1, 'truonglqth2202004@fpt.edu.vn', '2024-01-27 11:54:16', 'emailadmin@gmail.com', '2024-01-27 11:56:09', 'Đăng giá phòng \'Phòng 2 người\' với giá 500,000 VNĐ', '{\"householdRoomTypeId\":13,\"roomTypeName\":\"Phòng 2 người\",\"price\":0.00,\"priceUpdate\":500000}', 'ok', 'APPROVED', 'Tạo mới giá phòng', 'CREATE_ROOM', '2024-01-27 11:56:09', 1, 3),
(2, 'truonglqth2202004@fpt.edu.vn', '2024-01-27 11:58:07', 'emailadmin@gmail.com', '2024-01-27 11:58:49', 'Đăng giá phòng \'Phòng 3 người\' với giá 700,000 VNĐ', '{\"householdRoomTypeId\":14,\"roomTypeName\":\"Phòng 3 người\",\"price\":0.00,\"priceUpdate\":700000}', 'ok', 'APPROVED', 'Tạo mới giá phòng', 'CREATE_ROOM', '2024-01-27 11:58:49', 1, 3),
(3, 'truonglqth2202004@fpt.edu.vn', '2024-01-27 12:01:39', 'emailadmin@gmail.com', '2024-01-27 12:02:30', 'Đăng giá phòng \'Phòng 4 người\' với giá 900,000 VNĐ', '{\"householdRoomTypeId\":15,\"roomTypeName\":\"Phòng 4 người\",\"price\":0.00,\"priceUpdate\":900000}', 'ok', 'APPROVED', 'Tạo mới giá phòng', 'CREATE_ROOM', '2024-01-27 12:02:30', 1, 3),
(4, 'emailmanager@gmail.com', '2024-01-27 13:51:33', 'emailadmin@gmail.com', '2024-01-27 13:55:39', 'Thay đổi giá phòng \'Phòng 2 người\' từ 500 VNĐ sang 500,000 VNĐ', '{\"householdRoomTypeId\":1,\"roomTypeName\":\"Phòng 2 người\",\"price\":500.00,\"priceUpdate\":500000}', 'ok', 'APPROVED', 'Cập nhật giá phòng', 'UPDATE_ROOM', '2024-01-27 13:55:39', 1, 1),
(5, 'emailmanager@gmail.com', '2024-01-27 13:51:38', 'emailadmin@gmail.com', '2024-01-27 13:55:34', 'Thay đổi giá phòng \'Phòng 3 người\' từ 700 VNĐ sang 700,000 VNĐ', '{\"householdRoomTypeId\":2,\"roomTypeName\":\"Phòng 3 người\",\"price\":700.00,\"priceUpdate\":700000}', 'ok', 'APPROVED', 'Cập nhật giá phòng', 'UPDATE_ROOM', '2024-01-27 13:55:34', 1, 1),
(6, 'emailmanager@gmail.com', '2024-01-27 13:51:44', 'emailadmin@gmail.com', '2024-01-27 13:55:30', 'Thay đổi giá phòng \'Phòng 4 người\' từ 900 VNĐ sang 900,000 VNĐ', '{\"householdRoomTypeId\":3,\"roomTypeName\":\"Phòng 4 người\",\"price\":900.00,\"priceUpdate\":900000}', 'ok', 'APPROVED', 'Cập nhật giá phòng', 'UPDATE_ROOM', '2024-01-27 13:55:30', 1, 1),
(7, 'emailmanager@gmail.com', '2024-01-27 13:51:50', 'emailadmin@gmail.com', '2024-01-27 13:55:27', 'Thay đổi giá phòng \'Phòng 6 người\' từ 1,200 VNĐ sang 1,200,000 VNĐ', '{\"householdRoomTypeId\":4,\"roomTypeName\":\"Phòng 6 người\",\"price\":1200.00,\"priceUpdate\":1200000}', 'ok', 'APPROVED', 'Cập nhật giá phòng', 'UPDATE_ROOM', '2024-01-27 13:55:27', 1, 1),
(8, 'emailmanager@gmail.com', '2024-01-27 13:51:56', 'emailadmin@gmail.com', '2024-01-27 13:55:23', 'Thay đổi giá phòng \'Phòng gia đình (12 người)\' từ 2,500 VNĐ sang 2,500,000 VNĐ', '{\"householdRoomTypeId\":5,\"roomTypeName\":\"Phòng gia đình (12 người)\",\"price\":2500.00,\"priceUpdate\":2500000}', 'ok', 'APPROVED', 'Cập nhật giá phòng', 'UPDATE_ROOM', '2024-01-27 13:55:23', 1, 1),
(9, 'emailmanager@gmail.com', '2024-01-27 13:52:03', 'emailadmin@gmail.com', '2024-01-27 13:55:19', 'Thay đổi giá phòng \'Dorm\' từ 180 VNĐ sang 180,000 VNĐ', '{\"householdRoomTypeId\":6,\"roomTypeName\":\"Dorm\",\"price\":180.00,\"priceUpdate\":180000}', 'ok', 'APPROVED', 'Cập nhật giá phòng', 'UPDATE_ROOM', '2024-01-27 13:55:19', 1, 1),
(10, 'nguyenntth2202020@fpt.edu.vn', '2024-03-12 11:56:03', 'emailadmin@gmail.com', '2024-03-12 12:00:53', 'Đăng giá phòng \'Phòng 2 người\' với giá 500,000 VNĐ', '{\"householdRoomTypeId\":16,\"roomTypeName\":\"Phòng 2 người\",\"price\":0.00,\"priceUpdate\":500000}', 'ok', 'APPROVED', 'Tạo mới giá phòng', 'CREATE_ROOM', '2024-03-12 12:00:52', 1, 4),
(11, 'nguyenntth2202020@fpt.edu.vn', '2024-03-12 12:26:05', 'emailadmin@gmail.com', '2024-03-12 12:26:33', 'Đăng giá phòng \'Phòng 4 người\' với giá 1,200,000 VNĐ', '{\"householdRoomTypeId\":17,\"roomTypeName\":\"Phòng 4 người\",\"price\":0.00,\"priceUpdate\":1200000}', 'ok\n', 'APPROVED', 'Tạo mới giá phòng', 'CREATE_ROOM', '2024-03-12 12:26:33', 1, 4),
(12, 'nguyenntth2202020@fpt.edu.vn', '2024-03-12 12:29:03', 'emailadmin@gmail.com', '2024-03-12 12:31:54', 'Đăng giá phòng \'Phòng 4 người\' với giá 2,000,000 VNĐ', '{\"householdRoomTypeId\":18,\"roomTypeName\":\"Phòng 4 người\",\"price\":0.00,\"priceUpdate\":2000000}', 'ok', 'REJECTED', 'Tạo mới giá phòng', 'CREATE_ROOM', '2024-03-12 12:31:54', 1, 4),
(13, 'nguyenntth2202020@fpt.edu.vn', '2024-03-12 12:31:33', 'emailadmin@gmail.com', '2024-03-12 12:32:01', 'Đăng giá phòng \'Phòng 4 người VIP\' với giá 2,000,000 VNĐ', '{\"householdRoomTypeId\":18,\"roomTypeName\":\"Phòng 4 người VIP\",\"price\":0.00,\"priceUpdate\":2000000}', 'ok', 'APPROVED', 'Tạo mới giá phòng', 'CREATE_ROOM', '2024-03-12 12:32:01', 1, 4),
(14, 'nguyenthai012012@gmail.com', '2024-03-12 13:37:45', 'emailadmin@gmail.com', '2024-03-12 13:40:21', 'Đăng giá phòng \'Phòng 3 người\' với giá 1,000,000 VNĐ', '{\"householdRoomTypeId\":19,\"roomTypeName\":\"Phòng 3 người\",\"price\":0.00,\"priceUpdate\":1000000}', 'ok', 'APPROVED', 'Tạo mới giá phòng', 'CREATE_ROOM', '2024-03-12 13:40:21', 1, 5),
(15, 'dohongquantc@gmail.com', '2024-03-19 13:33:38', 'emailadmin@gmail.com', '2024-03-19 13:34:49', 'Đăng giá phòng \'Phòng 4 người\' với giá 750,000 VNĐ', '{\"householdRoomTypeId\":20,\"roomTypeName\":\"Phòng 4 người\",\"price\":0.00,\"priceUpdate\":750000}', 'ok', 'APPROVED', 'Tạo mới giá phòng', 'CREATE_ROOM', '2024-03-19 13:34:49', 1, 6);

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `last_modified_date` datetime DEFAULT NULL,
  `room_name` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `homestay_id` bigint(20) DEFAULT NULL,
  `household_room_type_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`id`, `created_date`, `description`, `last_modified_date`, `room_name`, `status`, `homestay_id`, `household_room_type_id`) VALUES
(1, '2023-11-24 16:48:00', NULL, NULL, 'Phòng 1', 'ACTIVE', 1, 1),
(2, '2023-11-24 16:48:00', NULL, '2024-04-04 11:45:11', 'Phòng 2', 'INACTIVE', 1, 2),
(3, '2023-11-24 16:48:00', NULL, '2024-04-04 11:47:10', 'Phòng 3', 'INACTIVE', 1, 1),
(4, '2023-11-24 16:48:00', NULL, NULL, 'Phòng 4', 'ACTIVE', 1, 4),
(5, '2023-11-24 16:48:00', NULL, NULL, 'Phòng 5', 'ACTIVE', 1, 1),
(6, '2023-11-24 16:48:00', NULL, NULL, 'Phòng 6', 'ACTIVE', 1, 1),
(7, '2023-11-24 16:48:00', NULL, '2024-04-04 11:46:52', 'Phòng 7', 'INACTIVE', 1, 1),
(8, '2023-11-24 16:48:00', NULL, '2024-04-04 11:46:46', 'Phòng 8', 'INACTIVE', 1, 2),
(9, '2023-11-24 16:48:00', NULL, '2024-04-04 11:46:51', 'Phòng 9', 'INACTIVE', 1, 3),
(10, '2023-11-24 16:48:00', NULL, NULL, 'D1', 'ACTIVE', 2, 6),
(11, '2023-11-24 16:48:00', NULL, NULL, 'D2', 'ACTIVE', 3, 6),
(12, '2023-11-24 16:48:00', NULL, '2024-04-04 11:46:07', 'Family 1', 'INACTIVE', 2, 5),
(13, '2023-11-24 16:48:00', NULL, NULL, 'Family 2', 'ACTIVE', 2, 5),
(14, '2023-11-24 16:48:00', NULL, NULL, 'Family 3', 'ACTIVE', 3, 5),
(15, '2023-11-24 16:48:00', NULL, '2024-04-04 11:45:43', 'Phòng 1', 'INACTIVE', 1, 1),
(16, '2023-11-24 16:48:00', NULL, NULL, 'Phòng 2', 'ACTIVE', 1, 2),
(17, '2023-11-24 16:48:00', NULL, NULL, 'Phòng 3', 'ACTIVE', 1, 1),
(18, '2023-11-24 16:48:00', NULL, '2024-04-04 11:47:13', 'Phòng 4', 'INACTIVE', 1, 4),
(19, '2023-11-24 16:48:00', NULL, '2024-04-04 11:46:42', 'Phòng 5', 'INACTIVE', 1, 1),
(20, '2023-11-24 16:48:00', NULL, '2024-04-04 11:44:12', 'Phòng 6', 'INACTIVE', 1, 1),
(21, '2023-11-24 16:48:00', NULL, NULL, 'Phòng 7', 'ACTIVE', 1, 1),
(22, '2023-11-24 16:48:00', NULL, NULL, 'Phòng 8', 'ACTIVE', 1, 2),
(23, '2023-11-24 16:48:00', NULL, NULL, 'Phòng 9', 'ACTIVE', 1, 3),
(24, '2023-11-24 16:48:00', NULL, NULL, 'D1', 'ACTIVE', 2, 6),
(25, '2023-11-24 16:48:00', NULL, NULL, 'D2', 'ACTIVE', 3, 6),
(26, '2023-11-24 16:48:00', NULL, NULL, 'Family 1', 'ACTIVE', 2, 5),
(27, '2023-11-24 16:48:00', NULL, NULL, 'Family 2', 'ACTIVE', 2, 5),
(28, '2023-11-24 16:48:00', NULL, NULL, 'Family 3', 'ACTIVE', 3, 5),
(29, '2024-01-27 12:06:13', NULL, '2024-03-30 07:11:03', 'P1', 'ACTIVE', 7, 13),
(30, '2024-01-27 12:06:13', NULL, NULL, 'P2', 'ACTIVE', 7, 13),
(31, '2024-01-27 12:07:35', NULL, NULL, 'T3', 'ACTIVE', 8, 13),
(32, '2024-01-27 12:07:35', NULL, NULL, 'T4', 'ACTIVE', 8, 13),
(33, '2024-01-27 12:08:03', NULL, NULL, 'T5', 'ACTIVE', 7, 14),
(34, '2024-01-27 12:08:15', NULL, '2024-03-30 07:11:58', 't6', 'ACTIVE', 8, 15),
(35, '2024-03-12 12:25:00', NULL, NULL, 'P-Vip1', 'ACTIVE', 9, 16),
(36, '2024-03-12 12:27:34', NULL, NULL, 'Phòng thường', 'ACTIVE', 10, 17),
(37, '2024-03-12 12:27:34', NULL, NULL, 'Phòng Vip', 'ACTIVE', 10, 17);

-- --------------------------------------------------------

--
-- Table structure for table `room_type`
--

CREATE TABLE `room_type` (
  `id` bigint(20) NOT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `last_modified_by` varchar(255) DEFAULT NULL,
  `last_modified_date` datetime DEFAULT NULL,
  `double_bed` int(11) DEFAULT NULL,
  `is_dorm` tinyint(1) DEFAULT NULL,
  `room_type_name` varchar(255) DEFAULT NULL,
  `single_bed` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `room_type`
--

INSERT INTO `room_type` (`id`, `created_by`, `created_date`, `last_modified_by`, `last_modified_date`, `double_bed`, `is_dorm`, `room_type_name`, `single_bed`) VALUES
(1, NULL, '2023-11-24 16:48:00', NULL, NULL, 1, 0, 'Phòng 2 người', 0),
(2, NULL, '2023-11-24 16:48:00', NULL, NULL, 1, 0, 'Phòng 3 người', 1),
(3, NULL, '2023-11-24 16:48:00', NULL, NULL, 2, 0, 'Phòng 4 người', 0),
(4, NULL, '2023-11-24 16:48:00', NULL, NULL, 3, 0, 'Phòng 6 người', 0),
(5, NULL, '2023-11-24 16:48:00', NULL, NULL, 6, 0, 'Phòng gia đình (12 người)', 0),
(6, NULL, '2023-11-24 16:48:00', NULL, NULL, 0, 1, 'Dorm', 5),
(7, NULL, '2023-11-24 16:48:00', 'emailadmin@gmail.com', '2024-03-12 12:30:02', 1, 1, 'Phòng 2 VIP', 0),
(8, NULL, '2023-11-24 16:48:00', 'emailadmin@gmail.com', '2024-03-12 12:30:27', 1, 1, 'Phòng 3 người VIP', 1),
(9, NULL, '2023-11-24 16:48:00', 'emailadmin@gmail.com', '2024-03-12 12:30:35', 2, 1, 'Phòng 4 người VIP', 0),
(10, NULL, '2023-11-24 16:48:00', 'emailadmin@gmail.com', '2024-03-12 12:30:43', 3, 1, 'Phòng 6 người VIP', 0),
(11, NULL, '2023-11-24 16:48:00', 'emailadmin@gmail.com', '2024-03-12 12:30:51', 6, 1, 'Phòng gia đình (12 người) VIP', 0),
(12, NULL, '2023-11-24 16:48:00', 'emailadmin@gmail.com', '2024-03-12 12:30:58', 5, 1, 'Dorm VIP', 5);

-- --------------------------------------------------------

--
-- Table structure for table `room_type_facility`
--

CREATE TABLE `room_type_facility` (
  `id` bigint(20) NOT NULL,
  `facility_id` bigint(20) DEFAULT NULL,
  `household_room_type_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `room_type_facility`
--

INSERT INTO `room_type_facility` (`id`, `facility_id`, `household_room_type_id`) VALUES
(46, 1, 13),
(47, 2, 13),
(48, 3, 13),
(49, 4, 13),
(50, 5, 13),
(51, 6, 13),
(58, 1, 14),
(59, 2, 14),
(60, 3, 14),
(61, 4, 14),
(62, 5, 14),
(63, 6, 14),
(64, 1, 15),
(65, 2, 15),
(66, 3, 15),
(67, 4, 15),
(68, 5, 15),
(69, 6, 15),
(70, 1, 1),
(71, 2, 1),
(72, 3, 1),
(73, 4, 1),
(74, 5, 1),
(75, 6, 1),
(76, 1, 2),
(77, 2, 2),
(78, 3, 2),
(79, 4, 2),
(80, 5, 2),
(81, 6, 2),
(82, 1, 3),
(83, 2, 3),
(84, 3, 3),
(85, 4, 3),
(86, 5, 3),
(87, 6, 3),
(88, 1, 4),
(89, 2, 4),
(90, 3, 4),
(91, 4, 4),
(92, 5, 4),
(93, 6, 4),
(94, 1, 5),
(95, 2, 5),
(96, 3, 5),
(97, 4, 5),
(98, 5, 5),
(99, 1, 6),
(100, 2, 6),
(101, 3, 6),
(102, 4, 6),
(103, 1, 16),
(104, 2, 16),
(105, 3, 16),
(106, 5, 16),
(107, 6, 16),
(108, 1, 17),
(109, 2, 17),
(110, 3, 17),
(111, 4, 17),
(112, 5, 17),
(113, 6, 17),
(120, 1, 18),
(121, 2, 18),
(122, 3, 18),
(123, 4, 18),
(124, 5, 18),
(125, 6, 18),
(126, 1, 19),
(127, 2, 19),
(128, 3, 19),
(129, 4, 19),
(130, 1, 20),
(131, 2, 20),
(132, 3, 20);

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `id` bigint(20) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `service_name` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`id`, `description`, `image`, `service_name`, `status`) VALUES
(12, 'Tổ chức các sự kiện ngoài trời (lửa trại, văn nghệ,...)', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1708605911/38d0a744-a749-48e5-b07b-482d68ee9e64.jpg', 'Thuê sân - bãi', 'ACTIVE'),
(13, 'Ca múa hát bởi các em gái dân tộc ...', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1708606221/c2d0d8c3-3d38-42a5-9442-f77748151e1d.jpg', 'Ca múa nhạc do các nghệ sĩ dân tộc biểu diễn', 'ACTIVE'),
(14, 'Dịch vụ lắp đặt sân khấu, âm thanh, ánh sáng,...', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1708606442/9880c0cd-26a4-45cd-9c0b-95c91bb6c119.jpg', 'Gói thuê âm thanh ánh sáng', 'ACTIVE'),
(15, 'Phục vụ các món ăn đặc sản đến tận nơi...', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1708606544/2721087d-176e-4921-84ef-5992f60686d9.jpg', 'Phục vụ ăn uống cho các cá nhân, khách đoàn', 'ACTIVE'),
(16, 'Ca múa hát bởi các nghệ sĩ chuyên nghiệp...', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1708607099/7e0f1293-cc11-46bb-9d28-a04165b4d4a4.jpg', 'Ca múa nhạc do các nghệ sĩ dân tộc biểu diễn', 'ACTIVE'),
(17, '...', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1708607250/41cd2ea6-7bc1-412a-a339-79961e3d1cd3.jpg', 'Giải trí ', 'ACTIVE');

-- --------------------------------------------------------

--
-- Table structure for table `token`
--

CREATE TABLE `token` (
  `id` int(11) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `expired` bit(1) NOT NULL,
  `revoked` bit(1) NOT NULL,
  `token` varchar(255) NOT NULL,
  `token_type` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `token`
--

INSERT INTO `token` (`id`, `created_date`, `expired`, `revoked`, `token`, `token_type`, `user_id`) VALUES
(1, '2023-12-20 07:46:42', b'0', b'0', '624310336555', 'BEARER', 9),
(43, NULL, b'0', b'0', 'eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6IlJPTEVfTUFOQUdFUiIsInN1YiI6Im5ndXllbnRoYWkwMTIwMTJAZ21haWwuY29tIiwiaWF0IjoxNzEwMjUwNjI3LCJleHAiOjE3MTExMDQ2Mjd9.UZED63zzBkAwLhylJUypYEP7RYq5vQ6-k1B5Mit9PTc', 'REFRESH', 17),
(51, NULL, b'0', b'0', 'eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6IlJPTEVfTUFOQUdFUiIsInN1YiI6Im5ndXllbm50dGgyMjAyMDIwQGZwdC5lZHUudm4iLCJpYXQiOjE3MTA4NTM3NjAsImV4cCI6MTcxMTcwNzc2MH0.Gqtw3nGIp_vN0P7sFYkkyQ_0nXyNzQ4VZ3WoblAqSNM', 'REFRESH', 16),
(61, NULL, b'0', b'0', 'eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6IlJPTEVfTUFOQUdFUiIsInN1YiI6ImRvaG9uZ3F1YW50Y0BnbWFpbC5jb20iLCJpYXQiOjE3MTIxNTY5NjgsImV4cCI6MTcxMzAxMDk2OH0.cWsDyZBHGXTWYd-NLQcT8Bgwu7PiaB3bL2vxaGBo7ZQ', 'REFRESH', 18),
(72, NULL, b'0', b'0', 'eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6IlJPTEVfU1VQRVJfQURNSU4iLCJzdWIiOiJlbWFpbHN1cGVyYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNzEyMjMwMjAxLCJleHAiOjE3MTMwODQyMDF9.hJSnDFJ8MeLn1Z8IaF_8wRIwS9E34yMT-T2f7E0ktCE', 'REFRESH', 4),
(77, NULL, b'0', b'0', 'eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6IlJPTEVfQURNSU4iLCJzdWIiOiJlbWFpbGFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcxMjIzMzgxMCwiZXhwIjoxNzEzMDg3ODEwfQ.GKP9W7drgnAPxi7gUtIIOIFOaeocb9NbM97rd1UrGK8', 'REFRESH', 3),
(78, NULL, b'0', b'0', 'eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6IlJPTEVfQ1VTVE9NRVIiLCJzdWIiOiJkZXZ0b29sLjAwMUBnbWFpbC5jb20iLCJpYXQiOjE3MTIyMzYxNjAsImV4cCI6MTcxMzA5MDE2MH0.pB8Ik1lEKnI-hUufgvPTYg8VRVi9c2RZQ-WPAoa5ZHk', 'REFRESH', 11),
(79, NULL, b'0', b'0', 'eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6IlJPTEVfTUFOQUdFUiIsInN1YiI6InRydW9uZ2xxdGgyMjAyMDA0QGZwdC5lZHUudm4iLCJpYXQiOjE3MTIyMzY3ODAsImV4cCI6MTcxMzA5MDc4MH0.WY5GIGdEabCmIabVaixGZds9nvcFlzKVBTPUqRgc1K4', 'REFRESH', 10),
(80, NULL, b'0', b'0', 'eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6IlJPTEVfTUFOQUdFUiIsInN1YiI6ImVtYWlsbWFuYWdlckBnbWFpbC5jb20iLCJpYXQiOjE3MTIyMzcwMzYsImV4cCI6MTcxMzA5MTAzNn0.I1t3po5X10ymXUsGCO-wo3tzuK2jI6hUrtlUxoMdljI', 'REFRESH', 2);

-- --------------------------------------------------------

--
-- Table structure for table `village_information`
--

CREATE TABLE `village_information` (
  `id` bigint(20) NOT NULL,
  `description` longtext DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `total_visited_customer` bigint(20) DEFAULT NULL,
  `total_visitor` bigint(20) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `village_information`
--

INSERT INTO `village_information` (`id`, `description`, `title`, `total_visited_customer`, `total_visitor`, `type`) VALUES
(1, 'Mô tả...', 'Title', 200, 50, 'chữ');

-- --------------------------------------------------------

--
-- Table structure for table `village_media`
--

CREATE TABLE `village_media` (
  `id` bigint(20) NOT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `local_product_id` bigint(20) DEFAULT NULL,
  `village_information_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `village_media`
--

INSERT INTO `village_media` (`id`, `file_name`, `file_path`, `position`, `type`, `local_product_id`, `village_information_id`) VALUES
(12, 'khach-san-tinh-yeu-12.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1708430029/ed2671fe-154a-47ac-b041-9f10c641d600.jpg', 'HOME_MAIN', 'IMAGE', NULL, NULL),
(13, 'momo-upload-api-220102154452-637767350924938334.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1708430031/62314cba-695c-4143-b55c-0dafa9622f96.jpg', 'GALLERY', 'IMAGE', NULL, NULL),
(20, '18209581_20102316560092868459.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1708602117/890d7cc9-278c-4920-8ea4-54305c1e882b.jpg', 'GALLERY', 'IMAGE', NULL, NULL),
(21, 'dac-san-ha-giang-1.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1708607536/4275abba-5362-409b-b577-a0bfe29503ae.jpg', NULL, 'IMAGE', 1, NULL),
(22, 'ha-giang-co-dac-san-gi-x-dac-san-ha-giang-mua-lam-qua-202206020943360605.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1708607538/c2ba6ac9-44f3-4073-ae3c-b84d39432f93.jpg', NULL, 'IMAGE', 1, NULL),
(23, 'dac-san-ha-giang-1.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1708607540/ccb514b8-6ed2-4727-bc83-5cc5d33599e0.jpg', NULL, 'IMAGE', 2, NULL),
(24, 'tong-hop-10-dac-san-ha-giang-lam-qua-y-nghia-nhat-627b8e0b0edb5.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1708607540/f18c4e9f-0393-45c7-b49d-c975648e6cb5.jpg', NULL, 'IMAGE', 1, NULL),
(25, 'ha-giang-co-dac-san-gi-x-dac-san-ha-giang-mua-lam-qua-202206020943360605.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1708607542/7d7a94d9-3255-4e17-9ac9-3a8495491b9c.jpg', NULL, 'IMAGE', 2, NULL),
(26, 'tong-hop-10-dac-san-ha-giang-lam-qua-y-nghia-nhat-627b8e0b0edb5.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1708607544/d7b20443-4149-495c-8b5d-596dbc9ba439.jpg', NULL, 'IMAGE', 2, NULL),
(27, 'khach-san-tinh-yeu-2.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1708608355/f8b2dfd3-e964-4910-9bf6-894247713189.jpg', 'GALLERY', 'IMAGE', NULL, NULL),
(28, 'lon-cap-nach-ha-giang-dac-san-dan-da-cua-vung-cao-ha-giang-05-1642338392.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1708779683/61135a67-eb0a-49da-97db-76240212b6a9.jpg', NULL, 'IMAGE', 3, NULL),
(29, 'lon-cap-nach-ha-giang-dac-san-dan-da-cua-vung-cao-ha-giang-04-1642338389.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1708779685/aefde496-ee02-426a-83d9-4891d7f6146e.jpg', NULL, 'IMAGE', 3, NULL),
(30, 'lon-cap-nach-ha-giang-dac-san-dan-da-cua-vung-cao-ha-giang-03-1642338385.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1708779688/98236686-b9eb-40b7-b53e-44ed469581a0.jpg', NULL, 'IMAGE', 3, NULL),
(31, 'lon-cap-nach-ha-giang-dac-san-dan-da-cua-vung-cao-ha-giang-01-1642338380.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1708779690/4b05e82d-bf78-4423-a3db-8a4953e61d6b.jpg', NULL, 'IMAGE', 3, NULL),
(32, 'com-lam-bac-me-mon-ngon-gian-di-cua-vung-cao-tay-bac-7-1642342996.jpeg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1708779880/cde54671-997d-4bec-9812-919c275927ab.jpg', NULL, 'IMAGE', 4, NULL),
(33, 'com-lam-bac-me-mon-ngon-gian-di-cua-vung-cao-tay-bac-6-1642342996.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1708779882/e448a62e-afeb-4638-8a6f-0c9a412b79e6.jpg', NULL, 'IMAGE', 4, NULL),
(34, 'com-lam-bac-me-mon-ngon-gian-di-cua-vung-cao-tay-bac-5-1642342811.jpeg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1708779884/85f8321a-4e7a-453a-afd7-4b3aa6f59c18.jpg', NULL, 'IMAGE', 4, NULL),
(35, 'com-lam-bac-me-mon-ngon-gian-di-cua-vung-cao-tay-bac-4-1642342811.jpeg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1708779887/61a12d87-214c-4b21-b29b-9e8c9147d20e.jpg', NULL, 'IMAGE', 4, NULL),
(36, 'com-lam-bac-me-mon-ngon-gian-di-cua-vung-cao-tay-bac-1-1642342811.png', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1708779889/7e747221-9a07-4209-b3aa-2c04b405750f.jpg', NULL, 'IMAGE', 4, NULL),
(37, 'banh-cuong-dong-van-5.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1708779986/352d8efa-c25d-4dc7-b5fb-3f132073a3fb.jpg', NULL, 'IMAGE', 5, NULL),
(38, 'banh-cuong-dong-van-4-1.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1708779989/a466b22c-bc24-408d-a442-37c82dcf3c78.jpg', NULL, 'IMAGE', 5, NULL),
(39, 'banh-cuong-dong-van.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1708779991/3911e9bf-3339-4463-b5c2-fa25bae4fcd2.jpg', NULL, 'IMAGE', 5, NULL),
(40, 'banh-cuong-dong-van-2.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1708779994/670377cf-801e-44b0-883b-971bb7c6ce8a.jpg', NULL, 'IMAGE', 5, NULL),
(41, 'hoang-tung.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1708780116/53516af9-965a-4f75-a8d5-480c55a4a12b.jpg', NULL, 'IMAGE', 6, NULL),
(42, 'ngke-nguyen.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1708780119/e66d52dc-2a30-4a92-aa5b-3ed134f88e09.jpg', NULL, 'IMAGE', 6, NULL),
(43, 'rinji-w00.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1708780121/232fd52d-842c-41f6-aed9-9c9a97a933e8.jpg', NULL, 'IMAGE', 6, NULL),
(44, 'Banh-tam-giac-mach-nuong.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1708780123/694f4670-0e6c-4d80-a0e2-357fcf472558.jpg', NULL, 'IMAGE', 6, NULL),
(45, '5.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1711453007/64df2ba4-77d0-4647-b9ff-e6d0a729ee35.jpg', 'GALLERY', 'IMAGE', NULL, NULL),
(46, 'h1.webp', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1711453010/1309d688-1dea-431b-baf6-393bf0b0c786.webp', 'GALLERY', 'IMAGE', NULL, NULL),
(47, 'ht43.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1711453013/9592760b-41fe-4212-bd75-1e1b0f9bc5eb.jpg', 'GALLERY', 'IMAGE', NULL, NULL),
(48, '1.jpg', 'http://res.cloudinary.com/dzdpfyjh8/image/upload/v1711453869/ef49dcf5-f07f-47bd-95e0-6ebf983b82c4.jpg', 'GALLERY', 'IMAGE', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_q0uja26qgu1atulenwup9rxyr` (`email`),
  ADD UNIQUE KEY `UK_qcc7w4gg3xdhrgt1j3km2cepe` (`provider_id`);

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_ema32g9ju0a46v3ovs4d2imte` (`phone_number`),
  ADD KEY `FKn2eatyxq78i3wg18tt0jf56lw` (`account_id`);

--
-- Indexes for table `area`
--
ALTER TABLE `area`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`booking_code`),
  ADD KEY `FKlnnelfsha11xmo2ndjq66fvro` (`customer_id`),
  ADD KEY `FK4kyvrd2exi5nmmjetw6udj2ey` (`household_id`);

--
-- Indexes for table `booking_detail`
--
ALTER TABLE `booking_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKfbs3ee7097j79gjxv8prfuage` (`booking_code`),
  ADD KEY `FKjdyi3kbvo5jhvy2iyu6gade48` (`dorm_slot_id`),
  ADD KEY `FKljulnvdp1ma58kr72l7cfw49s` (`homestay_id`),
  ADD KEY `FK9ddae6afkc3lb75fh433kd0na` (`household_room_type_id`),
  ADD KEY `FK2as656q44xfhmm1ohbea9co6b` (`room_id`);

--
-- Indexes for table `cancellation_history`
--
ALTER TABLE `cancellation_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKaluj6180g75er5032yiggr07` (`booking_code`),
  ADD KEY `FKfli0xky22qh358v5hc6r80gpr` (`customer_id`);

--
-- Indexes for table `cancellation_reason`
--
ALTER TABLE `cancellation_reason`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_us`
--
ALTER TABLE `contact_us`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKn9x2k8svpxj3r328iy1rpur83` (`account_id`);

--
-- Indexes for table `customer_bank_information`
--
ALTER TABLE `customer_bank_information`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKm00ohvgdrqd2ck2teuu3d5o45` (`customer_id`);

--
-- Indexes for table `customer_testimonials`
--
ALTER TABLE `customer_testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dorm_slot`
--
ALTER TABLE `dorm_slot`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKjeujqqf35cplo3as6lsiqnp8v` (`room_id`);

--
-- Indexes for table `facility`
--
ALTER TABLE `facility`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK5x8hu6ijok1qix7y6vpcm1319` (`booking_code`),
  ADD KEY `FKpi2y2j7n01ypo49fone3knjry` (`customer_id`),
  ADD KEY `FK331ogxe67xwjpsasfdxh3x6a1` (`household_id`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `frequently_question`
--
ALTER TABLE `frequently_question`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `homestay`
--
ALTER TABLE `homestay`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_dyotucm1p02rxqnxcoatvvay2` (`homestay_code`),
  ADD KEY `FKqlyjv6gebld8d93qrguft5cw0` (`area_id`),
  ADD KEY `FK5blda7k28sivj9rp3yte17i7u` (`household_id`);

--
-- Indexes for table `homestay_media`
--
ALTER TABLE `homestay_media`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKeluu1gix15svscdo8iks636c3` (`homestay_id`),
  ADD KEY `FKp80ilsd3licp5cl7ycajt2p4l` (`household_room_type_id`);

--
-- Indexes for table `household`
--
ALTER TABLE `household`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_j0n47e157m5inj8mhoyjl98x2` (`household_name`),
  ADD UNIQUE KEY `UK_s0ln2j4milaj6bye4oca6sd4g` (`email`),
  ADD KEY `FKq2yg30swlvrdp07u1q33ebb5y` (`manager_id`);

--
-- Indexes for table `household_bank_information`
--
ALTER TABLE `household_bank_information`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK8tw9gbp2wlptoqvn2c4cdd7dc` (`household_id`);

--
-- Indexes for table `household_room_type`
--
ALTER TABLE `household_room_type`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKatfwpe4sbq71ke02ipjjvtwt` (`household_id`),
  ADD KEY `FK3e4vkq4tih0a8o90ds61ryqhk` (`room_type_id`);

--
-- Indexes for table `household_service`
--
ALTER TABLE `household_service`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKkqj6wjp8xof0xbp6u76kmcdkg` (`household_id`),
  ADD KEY `FKb5j70psu84c40khty1bfoddx9` (`service_id`);

--
-- Indexes for table `local_product`
--
ALTER TABLE `local_product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `manager`
--
ALTER TABLE `manager`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_pyml1lqwg7l8xm745sir34c6e` (`phone_number`),
  ADD KEY `FKs8vxfog0lwxdn09g7d71fkuxp` (`account_id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK7lvpj8u9is288c6qin56mjbvl` (`to_whom`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKmvfgbcutu757p5waqhc3fu3sg` (`booking_code`);

--
-- Indexes for table `request`
--
ALTER TABLE `request`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKms4u2nlimmmc5tetpj0jo583n` (`admin_id`),
  ADD KEY `FK51t377iv3ilp17ogsqseg26lk` (`household_id`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKqcvstr3bg2lmknhdjwitgr3jm` (`homestay_id`),
  ADD KEY `FKaxww5mbb6d3seqdysctij787y` (`household_room_type_id`);

--
-- Indexes for table `room_type`
--
ALTER TABLE `room_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `room_type_facility`
--
ALTER TABLE `room_type_facility`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKsv4ftl38uh35cvbt4am16talh` (`facility_id`),
  ADD KEY `FKjsqbva6cujyvvmleu62v1wm2s` (`household_room_type_id`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_pddrhgwxnms2aceeku9s2ewy5` (`token`),
  ADD KEY `FKcmaeto5oi5o878gndh99ryn8q` (`user_id`);

--
-- Indexes for table `village_information`
--
ALTER TABLE `village_information`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `village_media`
--
ALTER TABLE `village_media`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKgpyt0wiclk6vx8axrdqnonn21` (`local_product_id`),
  ADD KEY `FK16ut4rcm5bg0ujt0kfob7qfdg` (`village_information_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `area`
--
ALTER TABLE `area`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `booking_detail`
--
ALTER TABLE `booking_detail`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `cancellation_history`
--
ALTER TABLE `cancellation_history`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `cancellation_reason`
--
ALTER TABLE `cancellation_reason`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `contact_us`
--
ALTER TABLE `contact_us`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `customer_bank_information`
--
ALTER TABLE `customer_bank_information`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `customer_testimonials`
--
ALTER TABLE `customer_testimonials`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dorm_slot`
--
ALTER TABLE `dorm_slot`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `facility`
--
ALTER TABLE `facility`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `frequently_question`
--
ALTER TABLE `frequently_question`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `homestay`
--
ALTER TABLE `homestay`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `homestay_media`
--
ALTER TABLE `homestay_media`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `household`
--
ALTER TABLE `household`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `household_bank_information`
--
ALTER TABLE `household_bank_information`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `household_room_type`
--
ALTER TABLE `household_room_type`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `household_service`
--
ALTER TABLE `household_service`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `local_product`
--
ALTER TABLE `local_product`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `manager`
--
ALTER TABLE `manager`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `request`
--
ALTER TABLE `request`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `room`
--
ALTER TABLE `room`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `room_type`
--
ALTER TABLE `room_type`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `room_type_facility`
--
ALTER TABLE `room_type_facility`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=133;

--
-- AUTO_INCREMENT for table `service`
--
ALTER TABLE `service`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `token`
--
ALTER TABLE `token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `village_information`
--
ALTER TABLE `village_information`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `village_media`
--
ALTER TABLE `village_media`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `FKn2eatyxq78i3wg18tt0jf56lw` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`);

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `FK4kyvrd2exi5nmmjetw6udj2ey` FOREIGN KEY (`household_id`) REFERENCES `household` (`id`),
  ADD CONSTRAINT `FKlnnelfsha11xmo2ndjq66fvro` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`);

--
-- Constraints for table `booking_detail`
--
ALTER TABLE `booking_detail`
  ADD CONSTRAINT `FK2as656q44xfhmm1ohbea9co6b` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`),
  ADD CONSTRAINT `FK9ddae6afkc3lb75fh433kd0na` FOREIGN KEY (`household_room_type_id`) REFERENCES `household_room_type` (`id`),
  ADD CONSTRAINT `FKfbs3ee7097j79gjxv8prfuage` FOREIGN KEY (`booking_code`) REFERENCES `booking` (`booking_code`),
  ADD CONSTRAINT `FKjdyi3kbvo5jhvy2iyu6gade48` FOREIGN KEY (`dorm_slot_id`) REFERENCES `dorm_slot` (`id`),
  ADD CONSTRAINT `FKljulnvdp1ma58kr72l7cfw49s` FOREIGN KEY (`homestay_id`) REFERENCES `homestay` (`id`);

--
-- Constraints for table `cancellation_history`
--
ALTER TABLE `cancellation_history`
  ADD CONSTRAINT `FKaluj6180g75er5032yiggr07` FOREIGN KEY (`booking_code`) REFERENCES `booking` (`booking_code`),
  ADD CONSTRAINT `FKfli0xky22qh358v5hc6r80gpr` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`);

--
-- Constraints for table `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `FKn9x2k8svpxj3r328iy1rpur83` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`);

--
-- Constraints for table `customer_bank_information`
--
ALTER TABLE `customer_bank_information`
  ADD CONSTRAINT `FKm00ohvgdrqd2ck2teuu3d5o45` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`);

--
-- Constraints for table `dorm_slot`
--
ALTER TABLE `dorm_slot`
  ADD CONSTRAINT `FKjeujqqf35cplo3as6lsiqnp8v` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`);

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `FK331ogxe67xwjpsasfdxh3x6a1` FOREIGN KEY (`household_id`) REFERENCES `household` (`id`),
  ADD CONSTRAINT `FK5x8hu6ijok1qix7y6vpcm1319` FOREIGN KEY (`booking_code`) REFERENCES `booking` (`booking_code`),
  ADD CONSTRAINT `FKpi2y2j7n01ypo49fone3knjry` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`);

--
-- Constraints for table `homestay`
--
ALTER TABLE `homestay`
  ADD CONSTRAINT `FK5blda7k28sivj9rp3yte17i7u` FOREIGN KEY (`household_id`) REFERENCES `household` (`id`),
  ADD CONSTRAINT `FKqlyjv6gebld8d93qrguft5cw0` FOREIGN KEY (`area_id`) REFERENCES `area` (`id`);

--
-- Constraints for table `homestay_media`
--
ALTER TABLE `homestay_media`
  ADD CONSTRAINT `FKeluu1gix15svscdo8iks636c3` FOREIGN KEY (`homestay_id`) REFERENCES `homestay` (`id`),
  ADD CONSTRAINT `FKp80ilsd3licp5cl7ycajt2p4l` FOREIGN KEY (`household_room_type_id`) REFERENCES `household_room_type` (`id`);

--
-- Constraints for table `household`
--
ALTER TABLE `household`
  ADD CONSTRAINT `FKq2yg30swlvrdp07u1q33ebb5y` FOREIGN KEY (`manager_id`) REFERENCES `manager` (`id`);

--
-- Constraints for table `household_bank_information`
--
ALTER TABLE `household_bank_information`
  ADD CONSTRAINT `FK8tw9gbp2wlptoqvn2c4cdd7dc` FOREIGN KEY (`household_id`) REFERENCES `household` (`id`);

--
-- Constraints for table `household_room_type`
--
ALTER TABLE `household_room_type`
  ADD CONSTRAINT `FK3e4vkq4tih0a8o90ds61ryqhk` FOREIGN KEY (`room_type_id`) REFERENCES `room_type` (`id`),
  ADD CONSTRAINT `FKatfwpe4sbq71ke02ipjjvtwt` FOREIGN KEY (`household_id`) REFERENCES `household` (`id`);

--
-- Constraints for table `household_service`
--
ALTER TABLE `household_service`
  ADD CONSTRAINT `FKb5j70psu84c40khty1bfoddx9` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`),
  ADD CONSTRAINT `FKkqj6wjp8xof0xbp6u76kmcdkg` FOREIGN KEY (`household_id`) REFERENCES `household` (`id`);

--
-- Constraints for table `manager`
--
ALTER TABLE `manager`
  ADD CONSTRAINT `FKs8vxfog0lwxdn09g7d71fkuxp` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`);

--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `FK7lvpj8u9is288c6qin56mjbvl` FOREIGN KEY (`to_whom`) REFERENCES `manager` (`id`);

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `FKmvfgbcutu757p5waqhc3fu3sg` FOREIGN KEY (`booking_code`) REFERENCES `booking` (`booking_code`);

--
-- Constraints for table `request`
--
ALTER TABLE `request`
  ADD CONSTRAINT `FK51t377iv3ilp17ogsqseg26lk` FOREIGN KEY (`household_id`) REFERENCES `household` (`id`),
  ADD CONSTRAINT `FKms4u2nlimmmc5tetpj0jo583n` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`);

--
-- Constraints for table `room`
--
ALTER TABLE `room`
  ADD CONSTRAINT `FKaxww5mbb6d3seqdysctij787y` FOREIGN KEY (`household_room_type_id`) REFERENCES `household_room_type` (`id`),
  ADD CONSTRAINT `FKqcvstr3bg2lmknhdjwitgr3jm` FOREIGN KEY (`homestay_id`) REFERENCES `homestay` (`id`);

--
-- Constraints for table `room_type_facility`
--
ALTER TABLE `room_type_facility`
  ADD CONSTRAINT `FKjsqbva6cujyvvmleu62v1wm2s` FOREIGN KEY (`household_room_type_id`) REFERENCES `household_room_type` (`id`),
  ADD CONSTRAINT `FKsv4ftl38uh35cvbt4am16talh` FOREIGN KEY (`facility_id`) REFERENCES `facility` (`id`);

--
-- Constraints for table `token`
--
ALTER TABLE `token`
  ADD CONSTRAINT `FKcmaeto5oi5o878gndh99ryn8q` FOREIGN KEY (`user_id`) REFERENCES `account` (`id`);

--
-- Constraints for table `village_media`
--
ALTER TABLE `village_media`
  ADD CONSTRAINT `FK16ut4rcm5bg0ujt0kfob7qfdg` FOREIGN KEY (`village_information_id`) REFERENCES `village_information` (`id`),
  ADD CONSTRAINT `FKgpyt0wiclk6vx8axrdqnonn21` FOREIGN KEY (`local_product_id`) REFERENCES `local_product` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
