/*
 Navicat Premium Data Transfer

 Source Server         : LOCALHOST
 Source Server Type    : MySQL
 Source Server Version : 110802 (11.8.2-MariaDB)
 Source Host           : localhost:3306
 Source Schema         : react_temp

 Target Server Type    : MySQL
 Target Server Version : 110802 (11.8.2-MariaDB)
 File Encoding         : 65001

 Date: 05/01/2026 00:04:44
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for access
-- ----------------------------
DROP TABLE IF EXISTS `access`;
CREATE TABLE `access` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menu_id` int(11) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `view` tinyint(1) DEFAULT 0,
  `add` tinyint(1) DEFAULT 0,
  `update` tinyint(1) DEFAULT 0,
  `remove` tinyint(1) DEFAULT 0,
  `createdAt` timestamp NULL DEFAULT NULL,
  `createdBy` varchar(35) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of access
-- ----------------------------
BEGIN;
INSERT INTO `access` (`id`, `menu_id`, `group_id`, `view`, `add`, `update`, `remove`, `createdAt`, `createdBy`) VALUES (131, 20, 21, 1, 0, 0, 0, '2025-10-24 19:05:20', 'i33wtesojro8e65d');
INSERT INTO `access` (`id`, `menu_id`, `group_id`, `view`, `add`, `update`, `remove`, `createdAt`, `createdBy`) VALUES (132, 21, 21, 1, 1, 1, 1, '2025-10-24 19:05:20', 'i33wtesojro8e65d');
INSERT INTO `access` (`id`, `menu_id`, `group_id`, `view`, `add`, `update`, `remove`, `createdAt`, `createdBy`) VALUES (133, 31, 21, 1, 0, 0, 0, '2025-10-24 19:05:20', 'i33wtesojro8e65d');
INSERT INTO `access` (`id`, `menu_id`, `group_id`, `view`, `add`, `update`, `remove`, `createdAt`, `createdBy`) VALUES (134, 20, 22, 1, 0, 0, 0, '2025-11-25 21:15:49', 'i33wtesojro8e65d');
INSERT INTO `access` (`id`, `menu_id`, `group_id`, `view`, `add`, `update`, `remove`, `createdAt`, `createdBy`) VALUES (135, 20, 23, 1, 1, 1, 1, '2025-12-30 03:58:28', 'i33wtesojro8e65d');
INSERT INTO `access` (`id`, `menu_id`, `group_id`, `view`, `add`, `update`, `remove`, `createdAt`, `createdBy`) VALUES (136, 21, 23, 1, 1, 1, 1, '2025-12-30 03:58:28', 'i33wtesojro8e65d');
INSERT INTO `access` (`id`, `menu_id`, `group_id`, `view`, `add`, `update`, `remove`, `createdAt`, `createdBy`) VALUES (137, 26, 23, 1, 1, 1, 1, '2025-12-30 03:58:28', 'i33wtesojro8e65d');
INSERT INTO `access` (`id`, `menu_id`, `group_id`, `view`, `add`, `update`, `remove`, `createdAt`, `createdBy`) VALUES (138, 27, 23, 1, 1, 1, 1, '2025-12-30 03:58:28', 'i33wtesojro8e65d');
INSERT INTO `access` (`id`, `menu_id`, `group_id`, `view`, `add`, `update`, `remove`, `createdAt`, `createdBy`) VALUES (139, 28, 23, 1, 1, 1, 1, '2025-12-30 03:58:28', 'i33wtesojro8e65d');
INSERT INTO `access` (`id`, `menu_id`, `group_id`, `view`, `add`, `update`, `remove`, `createdAt`, `createdBy`) VALUES (140, 29, 23, 1, 1, 1, 1, '2025-12-30 03:58:28', 'i33wtesojro8e65d');
INSERT INTO `access` (`id`, `menu_id`, `group_id`, `view`, `add`, `update`, `remove`, `createdAt`, `createdBy`) VALUES (141, 30, 23, 1, 1, 1, 1, '2025-12-30 03:58:28', 'i33wtesojro8e65d');
INSERT INTO `access` (`id`, `menu_id`, `group_id`, `view`, `add`, `update`, `remove`, `createdAt`, `createdBy`) VALUES (142, 31, 23, 1, 1, 1, 1, '2025-12-30 03:58:28', 'i33wtesojro8e65d');
INSERT INTO `access` (`id`, `menu_id`, `group_id`, `view`, `add`, `update`, `remove`, `createdAt`, `createdBy`) VALUES (143, 20, 24, 1, 1, 1, 1, '2026-01-04 23:47:40', 'i33wtesojro8e65d');
INSERT INTO `access` (`id`, `menu_id`, `group_id`, `view`, `add`, `update`, `remove`, `createdAt`, `createdBy`) VALUES (144, 21, 24, 1, 1, 1, 1, '2026-01-04 23:47:40', 'i33wtesojro8e65d');
COMMIT;

-- ----------------------------
-- Table structure for access_tahapan
-- ----------------------------
DROP TABLE IF EXISTS `access_tahapan`;
CREATE TABLE `access_tahapan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) DEFAULT NULL,
  `master_tahapan_id` int(11) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `group_id` (`group_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of access_tahapan
-- ----------------------------
BEGIN;
INSERT INTO `access_tahapan` (`id`, `group_id`, `master_tahapan_id`, `status`) VALUES (10, 23, 4, 1);
INSERT INTO `access_tahapan` (`id`, `group_id`, `master_tahapan_id`, `status`) VALUES (11, 23, 5, 1);
INSERT INTO `access_tahapan` (`id`, `group_id`, `master_tahapan_id`, `status`) VALUES (12, 23, 6, 1);
INSERT INTO `access_tahapan` (`id`, `group_id`, `master_tahapan_id`, `status`) VALUES (13, 23, 15, 1);
INSERT INTO `access_tahapan` (`id`, `group_id`, `master_tahapan_id`, `status`) VALUES (14, 23, 16, 1);
INSERT INTO `access_tahapan` (`id`, `group_id`, `master_tahapan_id`, `status`) VALUES (15, 23, 17, 1);
INSERT INTO `access_tahapan` (`id`, `group_id`, `master_tahapan_id`, `status`) VALUES (16, 23, 18, 1);
INSERT INTO `access_tahapan` (`id`, `group_id`, `master_tahapan_id`, `status`) VALUES (17, 23, 19, 1);
INSERT INTO `access_tahapan` (`id`, `group_id`, `master_tahapan_id`, `status`) VALUES (18, 23, 20, 1);
INSERT INTO `access_tahapan` (`id`, `group_id`, `master_tahapan_id`, `status`) VALUES (19, 24, 4, 0);
INSERT INTO `access_tahapan` (`id`, `group_id`, `master_tahapan_id`, `status`) VALUES (20, 24, 5, 1);
INSERT INTO `access_tahapan` (`id`, `group_id`, `master_tahapan_id`, `status`) VALUES (21, 24, 6, 0);
INSERT INTO `access_tahapan` (`id`, `group_id`, `master_tahapan_id`, `status`) VALUES (22, 24, 15, 0);
INSERT INTO `access_tahapan` (`id`, `group_id`, `master_tahapan_id`, `status`) VALUES (23, 24, 16, 0);
INSERT INTO `access_tahapan` (`id`, `group_id`, `master_tahapan_id`, `status`) VALUES (24, 24, 17, 0);
INSERT INTO `access_tahapan` (`id`, `group_id`, `master_tahapan_id`, `status`) VALUES (25, 24, 18, 0);
INSERT INTO `access_tahapan` (`id`, `group_id`, `master_tahapan_id`, `status`) VALUES (26, 24, 19, 0);
INSERT INTO `access_tahapan` (`id`, `group_id`, `master_tahapan_id`, `status`) VALUES (27, 24, 20, 0);
INSERT INTO `access_tahapan` (`id`, `group_id`, `master_tahapan_id`, `status`) VALUES (28, 24, 24, 0);
COMMIT;

-- ----------------------------
-- Table structure for documents
-- ----------------------------
DROP TABLE IF EXISTS `documents`;
CREATE TABLE `documents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) DEFAULT NULL,
  `uraian` text DEFAULT NULL,
  `no` varchar(100) DEFAULT NULL COMMENT 'Nomor SPP/SPM',
  `master_jns_pencairan_id` int(11) DEFAULT NULL COMMENT 'diambil dari tabel master_jns_pencairan',
  `nilai` float DEFAULT NULL,
  `pengusul` varchar(50) DEFAULT NULL,
  `sub_unit_kerja` varchar(50) DEFAULT NULL,
  `status_temp` tinyint(4) DEFAULT 0 COMMENT '0=proses, 1=diterima 2=dikembalikan, ini temporari saja, status yang sebenarnya ada di tracking doc',
  `status_update` tinyint(4) DEFAULT 1 COMMENT '0= gak bisa update, 1 = bisa update',
  `master_tag_id` int(11) DEFAULT NULL,
  `createdAt` varchar(255) DEFAULT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`) USING BTREE,
  KEY `nilai` (`nilai`) USING BTREE,
  KEY `sub_unit_kerja` (`sub_unit_kerja`) USING BTREE,
  KEY `status_temp` (`status_temp`) USING BTREE,
  KEY `code` (`code`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of documents
-- ----------------------------
BEGIN;
INSERT INTO `documents` (`id`, `code`, `uraian`, `no`, `master_jns_pencairan_id`, `nilai`, `pengusul`, `sub_unit_kerja`, `status_temp`, `status_update`, `master_tag_id`, `createdAt`, `createdBy`) VALUES (34, 'vwert234', 'Belanja Pengadaan GPU (Graphics Processing Unit)', '123/321', 12, 47000000, '198011192008031001', 'EtTbFb6EzYZt9mMJL', 0, 1, NULL, '2025-12-28 11:58:49', 'i33wtesojro8e65d');
INSERT INTO `documents` (`id`, `code`, `uraian`, `no`, `master_jns_pencairan_id`, `nilai`, `pengusul`, `sub_unit_kerja`, `status_temp`, `status_update`, `master_tag_id`, `createdAt`, `createdBy`) VALUES (35, 'asdfa0rte', 'Belanja Pengadaan Intel Core i7 14700F Gigabyte Z790 ', '234/432', 12, 21480000, NULL, 'EtTbFb6EzYZt9mMJL', 1, 0, NULL, '2025-12-28 11:59:54', 'i33wtesojro8e65d');
INSERT INTO `documents` (`id`, `code`, `uraian`, `no`, `master_jns_pencairan_id`, `nilai`, `pengusul`, `sub_unit_kerja`, `status_temp`, `status_update`, `master_tag_id`, `createdAt`, `createdBy`) VALUES (36, 'dafasdfty', 'Pembayaran Gaji dan Tunjangan Bulan November', '345/543', 12, 47000000, NULL, 'EtTbFb6EzYZt9mMJL', 0, 0, NULL, '2025-12-28 12:01:10', 'i33wtesojro8e65d');
INSERT INTO `documents` (`id`, `code`, `uraian`, `no`, `master_jns_pencairan_id`, `nilai`, `pengusul`, `sub_unit_kerja`, `status_temp`, `status_update`, `master_tag_id`, `createdAt`, `createdBy`) VALUES (37, 'poyljqdh7', 'Hibah PWI', '456/654', 13, 50000000, '199807022022031010', 'EtTbFb6EzYZt9mMJL', 0, 1, NULL, '2025-12-28 12:01:50', 'i33wtesojro8e65d');
INSERT INTO `documents` (`id`, `code`, `uraian`, `no`, `master_jns_pencairan_id`, `nilai`, `pengusul`, `sub_unit_kerja`, `status_temp`, `status_update`, `master_tag_id`, `createdAt`, `createdBy`) VALUES (39, '460u41hkdmjtk4zei', 'Contoh 2', '567/765', 9, 15000000, NULL, 'EtTbFb6EzYZt9mMJL', 1, 0, NULL, '2025-12-31 13:10:18', 'i33wtesojro8e65d');
INSERT INTO `documents` (`id`, `code`, `uraian`, `no`, `master_jns_pencairan_id`, `nilai`, `pengusul`, `sub_unit_kerja`, `status_temp`, `status_update`, `master_tag_id`, `createdAt`, `createdBy`) VALUES (45, '460u4i21mjzutn4w', 'Hibah PWI xxxxxxxx', '456/654', 13, 50000000, '198511202014061001', 'EtTbFb6EzYZt9mMJL', 2, 1, NULL, '2026-01-04 22:56:02', 'i33wtesojro8e65d');
COMMIT;

-- ----------------------------
-- Table structure for documents_history
-- ----------------------------
DROP TABLE IF EXISTS `documents_history`;
CREATE TABLE `documents_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `master_tahapan_id` int(11) NOT NULL,
  `documents_id` int(11) NOT NULL,
  `createdBy` varchar(50) DEFAULT NULL,
  `status` tinyint(4) NOT NULL COMMENT '0 = proses, 1=diterima, 2 = dikembalikan',
  `keterangan` text DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `documents_id` (`documents_id`) USING BTREE,
  KEY `master_tahapan_id` (`master_tahapan_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of documents_history
-- ----------------------------
BEGIN;
INSERT INTO `documents_history` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (35, 5, 34, 'i33wtesojro8e65d', 1, '<p>Di&nbsp;approve&nbsp;untuk&nbsp;diproses&nbsp;selanjutnya.</p>', '2025-12-28 12:02:40');
INSERT INTO `documents_history` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (36, 6, 34, 'i33wtesojro8e65d', 2, '<p>Pajak&nbsp;keliru.</p>', '2025-12-28 12:03:09');
INSERT INTO `documents_history` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (37, 5, 35, 'i33wtesojro8e65d', 1, '<p>Di&nbsp;proses&nbsp;selanjutnya.</p>', '2025-12-28 12:04:19');
INSERT INTO `documents_history` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (38, 6, 35, 'i33wtesojro8e65d', 1, '<p>Di&nbsp;proses&nbsp;selanjutnya.</p>', '2025-12-28 12:04:25');
INSERT INTO `documents_history` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (39, 15, 35, 'i33wtesojro8e65d', 1, '<p>Di&nbsp;proses&nbsp;selanjutnya.</p>', '2025-12-28 12:04:32');
INSERT INTO `documents_history` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (40, 16, 35, 'i33wtesojro8e65d', 1, '<p>Di&nbsp;proses&nbsp;selanjutnya.</p>', '2025-12-28 12:04:36');
INSERT INTO `documents_history` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (41, 17, 35, 'i33wtesojro8e65d', 1, '<p>Di&nbsp;proses&nbsp;selanjutnya.</p>', '2025-12-28 12:04:42');
INSERT INTO `documents_history` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (42, 18, 35, 'i33wtesojro8e65d', 1, '<p>Di&nbsp;proses&nbsp;selanjutnya.</p>', '2025-12-28 12:04:46');
INSERT INTO `documents_history` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (43, 19, 35, 'i33wtesojro8e65d', 1, '<p>Di&nbsp;proses&nbsp;selanjutnya.</p>', '2025-12-28 12:04:51');
INSERT INTO `documents_history` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (44, 20, 35, 'i33wtesojro8e65d', 1, '<p>Di&nbsp;proses&nbsp;selanjutnya.</p>', '2025-12-28 12:05:09');
INSERT INTO `documents_history` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (45, 6, 34, 'i33wtesojro8e65d', 2, '<p>Baaah&nbsp;tetap&nbsp;salah&nbsp;pajaknya.</p><ul><li>Kamu&nbsp;tidak&nbsp;melampirkan&nbsp;data&nbsp;Pajak</li><li>entahlah&nbsp;ini&nbsp;apa&nbsp;lagi&nbsp;yang&nbsp;saya&nbsp;mau&nbsp;tulis</li><li>sebenarnya&nbsp;ini&nbsp;hanya&nbsp;contoh&nbsp;reject</li></ul>', '2025-12-29 00:12:59');
INSERT INTO `documents_history` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (46, 6, 34, 'i33wtesojro8e65d', 2, '<p>Entah&nbsp;apa&nbsp;yang&nbsp;harus&nbsp;saya&nbsp;katakan</p>', '2025-12-29 00:27:12');
INSERT INTO `documents_history` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (47, 6, 34, 'i33wtesojro8e65d', 2, '<p>Dan&nbsp;untuk&nbsp;kesekian&nbsp;kalinya&nbsp;di&nbsp;reject</p>', '2025-12-29 00:28:50');
INSERT INTO `documents_history` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (48, 20, 35, 'i33wtesojro8e65d', 1, '<p>-</p>', '2025-12-29 21:54:13');
INSERT INTO `documents_history` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (49, 5, 39, 'i33wtesojro8e65d', 2, '<p>Kurang&nbsp;ganteng</p>', '2025-12-31 13:10:28');
INSERT INTO `documents_history` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (50, 5, 39, 'i33wtesojro8e65d', 1, '<p>-</p>', '2025-12-31 13:14:43');
INSERT INTO `documents_history` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (51, 6, 39, 'i33wtesojro8e65d', 1, '<p>-</p>', '2025-12-31 13:14:49');
INSERT INTO `documents_history` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (52, 16, 39, 'i33wtesojro8e65d', 1, '<p>-</p>', '2025-12-31 13:14:55');
INSERT INTO `documents_history` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (53, 17, 39, 'i33wtesojro8e65d', 1, '<p>-</p>', '2025-12-31 13:15:13');
INSERT INTO `documents_history` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (54, 18, 39, 'i33wtesojro8e65d', 1, '<p>-</p>', '2025-12-31 13:15:30');
INSERT INTO `documents_history` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (55, 19, 39, 'i33wtesojro8e65d', 1, '<p>-</p>', '2025-12-31 13:15:35');
INSERT INTO `documents_history` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (56, 20, 39, 'i33wtesojro8e65d', 1, '<p>Okeee</p>', '2025-12-31 13:15:44');
INSERT INTO `documents_history` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (57, 5, 36, 'i33wtesojro8e65d', 1, '<p>yah&nbsp;okelah</p>', '2026-01-04 13:12:05');
INSERT INTO `documents_history` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (58, 5, 45, 'i33wtesojro8e65d', 2, '<p>Ini&nbsp;hanya&nbsp;test&nbsp;ya?</p>', '2026-01-04 23:13:23');
INSERT INTO `documents_history` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (59, 5, 45, 'i33wtesojro8e65d', 2, '<p>jelek</p>', '2026-01-04 23:39:16');
COMMIT;

-- ----------------------------
-- Table structure for documents_tracking
-- ----------------------------
DROP TABLE IF EXISTS `documents_tracking`;
CREATE TABLE `documents_tracking` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `master_tahapan_id` int(11) NOT NULL,
  `documents_id` int(11) NOT NULL,
  `createdBy` varchar(50) DEFAULT NULL,
  `status` tinyint(4) NOT NULL COMMENT '0 = proses, 1=diterima, 2 = dikembalikan',
  `keterangan` text DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `documents_id` (`documents_id`) USING BTREE,
  KEY `master_tahapan_id` (`master_tahapan_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of documents_tracking
-- ----------------------------
BEGIN;
INSERT INTO `documents_tracking` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (26, 4, 34, 'i33wtesojro8e65d', 1, 'Dokumen telah diregistrasi', '2025-12-28 11:58:49');
INSERT INTO `documents_tracking` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (27, 5, 34, 'i33wtesojro8e65d', 1, '<p>Di&nbsp;approve&nbsp;untuk&nbsp;diproses&nbsp;selanjutnya.</p>', '2025-12-28 12:02:40');
INSERT INTO `documents_tracking` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (28, 4, 35, 'i33wtesojro8e65d', 1, 'Dokumen telah diregistrasi', '2025-12-28 11:59:54');
INSERT INTO `documents_tracking` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (29, 5, 35, 'i33wtesojro8e65d', 1, '<p>Di&nbsp;proses&nbsp;selanjutnya.</p>', '2025-12-28 12:04:19');
INSERT INTO `documents_tracking` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (30, 4, 36, 'i33wtesojro8e65d', 1, 'Dokumen telah diregistrasi', '2025-12-28 12:01:10');
INSERT INTO `documents_tracking` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (31, 5, 36, 'i33wtesojro8e65d', 1, '<p>yah&nbsp;okelah</p>', '2026-01-04 13:12:05');
INSERT INTO `documents_tracking` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (32, 4, 37, 'i33wtesojro8e65d', 1, 'Dokumen telah diregistrasi', '2025-12-28 12:01:50');
INSERT INTO `documents_tracking` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (33, 5, 37, 'i33wtesojro8e65d', 0, 'Dokumen sedang diverifikasi', '2025-12-28 12:01:50');
INSERT INTO `documents_tracking` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (34, 6, 34, 'i33wtesojro8e65d', 0, '<p>Dan&nbsp;untuk&nbsp;kesekian&nbsp;kalinya&nbsp;di&nbsp;reject</p>', '2026-01-04 23:09:24');
INSERT INTO `documents_tracking` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (35, 6, 35, 'i33wtesojro8e65d', 1, '<p>Di&nbsp;proses&nbsp;selanjutnya.</p>', '2025-12-28 12:04:25');
INSERT INTO `documents_tracking` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (36, 15, 35, 'i33wtesojro8e65d', 1, '<p>Di&nbsp;proses&nbsp;selanjutnya.</p>', '2025-12-28 12:04:32');
INSERT INTO `documents_tracking` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (37, 16, 35, 'i33wtesojro8e65d', 1, '<p>Di&nbsp;proses&nbsp;selanjutnya.</p>', '2025-12-28 12:04:36');
INSERT INTO `documents_tracking` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (38, 17, 35, 'i33wtesojro8e65d', 1, '<p>Di&nbsp;proses&nbsp;selanjutnya.</p>', '2025-12-28 12:04:42');
INSERT INTO `documents_tracking` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (39, 18, 35, 'i33wtesojro8e65d', 1, '<p>Di&nbsp;proses&nbsp;selanjutnya.</p>', '2025-12-28 12:04:46');
INSERT INTO `documents_tracking` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (40, 19, 35, 'i33wtesojro8e65d', 1, '<p>Di&nbsp;proses&nbsp;selanjutnya.</p>', '2025-12-28 12:04:51');
INSERT INTO `documents_tracking` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (41, 20, 35, 'i33wtesojro8e65d', 1, '<p>-</p>', '2025-12-29 21:54:13');
INSERT INTO `documents_tracking` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (42, 0, 35, 'i33wtesojro8e65d', 0, 'Dokumen sedang diverifikasi', '2025-12-28 12:05:09');
INSERT INTO `documents_tracking` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (45, 4, 39, 'i33wtesojro8e65d', 1, 'Dokumen telah diregistrasi', '2025-12-31 13:10:18');
INSERT INTO `documents_tracking` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (46, 5, 39, 'i33wtesojro8e65d', 1, '<p>-</p>', '2025-12-31 13:14:43');
INSERT INTO `documents_tracking` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (47, 6, 39, 'i33wtesojro8e65d', 1, '<p>-</p>', '2025-12-31 13:14:49');
INSERT INTO `documents_tracking` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (48, 16, 39, 'i33wtesojro8e65d', 1, '<p>-</p>', '2025-12-31 13:14:55');
INSERT INTO `documents_tracking` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (49, 17, 39, 'i33wtesojro8e65d', 1, '<p>-</p>', '2025-12-31 13:15:13');
INSERT INTO `documents_tracking` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (50, 18, 39, 'i33wtesojro8e65d', 1, '<p>-</p>', '2025-12-31 13:15:30');
INSERT INTO `documents_tracking` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (51, 19, 39, 'i33wtesojro8e65d', 1, '<p>-</p>', '2025-12-31 13:15:35');
INSERT INTO `documents_tracking` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (52, 20, 39, 'i33wtesojro8e65d', 1, '<p>Okeee</p>', '2025-12-31 13:15:44');
INSERT INTO `documents_tracking` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (53, 0, 39, 'i33wtesojro8e65d', 0, 'Dokumen sedang diverifikasi', '2025-12-31 13:15:44');
INSERT INTO `documents_tracking` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (58, 6, 36, 'i33wtesojro8e65d', 0, 'Dokumen sedang diverifikasi', '2026-01-04 13:12:05');
INSERT INTO `documents_tracking` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (65, 4, 45, 'i33wtesojro8e65d', 1, 'Dokumen telah diregistrasi', '2026-01-04 22:56:02');
INSERT INTO `documents_tracking` (`id`, `master_tahapan_id`, `documents_id`, `createdBy`, `status`, `keterangan`, `createdAt`) VALUES (66, 5, 45, 'i33wtesojro8e65d', 2, '<p>jelek</p>', '2026-01-04 23:39:16');
COMMIT;

-- ----------------------------
-- Table structure for file_ref
-- ----------------------------
DROP TABLE IF EXISTS `file_ref`;
CREATE TABLE `file_ref` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text DEFAULT NULL,
  `file` text DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `db_name` varchar(50) NOT NULL,
  `ref_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `db_name` (`db_name`) USING BTREE,
  KEY `ref_id` (`ref_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of file_ref
-- ----------------------------
BEGIN;
INSERT INTO `file_ref` (`id`, `title`, `file`, `type`, `db_name`, `ref_id`) VALUES (41, 'CertificateOfCompletion_Learning the JavaScript Language.pdf', 'CertificateOfCompletion_Learning the JavaScript Language-1766894329182-75483509.pdf', 'application/pdf', 'documents', 34);
INSERT INTO `file_ref` (`id`, `title`, `file`, `type`, `db_name`, `ref_id`) VALUES (42, '9961bad9-ee30-434e-932d-4f6b259916f8.png', '9961bad9-ee30-434e-932d-4f6b259916f8-1766894329173-845844325.png', 'image/png', 'documents', 34);
INSERT INTO `file_ref` (`id`, `title`, `file`, `type`, `db_name`, `ref_id`) VALUES (43, 'ChatGPT Image 27 Des 2025, 20.27.17.png', 'ChatGPT Image 27 Des 2025, 20.27.17-1766894394180-891782306.png', 'image/png', 'documents', 35);
INSERT INTO `file_ref` (`id`, `title`, `file`, `type`, `db_name`, `ref_id`) VALUES (44, 'ChatGPT Image 2 Nov 2025, 20.16.15.png', 'ChatGPT Image 2 Nov 2025, 20.16.15-1766894470224-340906933.png', 'image/png', 'documents', 36);
INSERT INTO `file_ref` (`id`, `title`, `file`, `type`, `db_name`, `ref_id`) VALUES (45, 'ahmer_cv.pdf', 'ahmer_cv-1766894510028-490147210.pdf', 'application/pdf', 'documents', 37);
INSERT INTO `file_ref` (`id`, `title`, `file`, `type`, `db_name`, `ref_id`) VALUES (50, 'CertificateOfCompletion_Learning the JavaScript Language.pdf', 'CertificateOfCompletion_Learning the JavaScript Language-1766939330120-667850480.pdf', 'application/pdf', 'documents_history', 47);
INSERT INTO `file_ref` (`id`, `title`, `file`, `type`, `db_name`, `ref_id`) VALUES (51, '9961bad9-ee30-434e-932d-4f6b259916f8.png', '9961bad9-ee30-434e-932d-4f6b259916f8-1766939330120-392479162.png', 'image/png', 'documents_history', 47);
INSERT INTO `file_ref` (`id`, `title`, `file`, `type`, `db_name`, `ref_id`) VALUES (52, 'd779fd10da404c24a4c9d2fee85684ff.jpg', 'd779fd10da404c24a4c9d2fee85684ff-1767157818419-765340951.jpg', 'image/jpeg', 'documents', 39);
COMMIT;

-- ----------------------------
-- Table structure for group
-- ----------------------------
DROP TABLE IF EXISTS `group`;
CREATE TABLE `group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `access_unit` tinyint(4) DEFAULT 0 COMMENT '0 = sub unit kerja, 1=unit kerja, 2 = instansi',
  `createdAt` timestamp NULL DEFAULT NULL,
  `createdBy` varchar(35) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of group
-- ----------------------------
BEGIN;
INSERT INTO `group` (`id`, `title`, `access_unit`, `createdAt`, `createdBy`) VALUES (21, 'OPD', 0, '2025-10-24 19:05:20', 'i33wtesojro8e65d');
INSERT INTO `group` (`id`, `title`, `access_unit`, `createdAt`, `createdBy`) VALUES (22, 'No Access', 0, '2025-11-25 21:15:49', 'i33wtesojro8e65d');
INSERT INTO `group` (`id`, `title`, `access_unit`, `createdAt`, `createdBy`) VALUES (23, 'Administrator', 0, '2025-12-30 03:58:28', 'i33wtesojro8e65d');
INSERT INTO `group` (`id`, `title`, `access_unit`, `createdAt`, `createdBy`) VALUES (24, 'Verifikator', 0, '2026-01-04 23:47:40', 'i33wtesojro8e65d');
COMMIT;

-- ----------------------------
-- Table structure for master_jns_pencairan
-- ----------------------------
DROP TABLE IF EXISTS `master_jns_pencairan`;
CREATE TABLE `master_jns_pencairan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uraian` varchar(255) NOT NULL,
  `keterangan` text DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `createdBy` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of master_jns_pencairan
-- ----------------------------
BEGIN;
INSERT INTO `master_jns_pencairan` (`id`, `uraian`, `keterangan`, `createdAt`, `createdBy`) VALUES (9, 'LS Gaji dan Tunjangan', 'Jenis LS ini digunakan untuk pembayaran gaji pokok dan tunjangan kepada pegawai pemerintah, baik PNS maupun non-ASN jika Pemda mengatur demikian. Pembayaran gaji melibatkan dokumen seperti daftar gaji, SK pegawai, perubahan data gaji, serta bukti potongan wajib seperti pajak, iuran pensiun, dan BPJS. Karena sifatnya rutin dan menyangkut hak pegawai, LS Gaji menjadi salah satu prioritas utama dalam pencairan Kasda.', '2025-12-10 18:47:15', 'i33wtesojro8e65d');
INSERT INTO `master_jns_pencairan` (`id`, `uraian`, `keterangan`, `createdAt`, `createdBy`) VALUES (10, 'LS Honorarium', 'LS Honor digunakan untuk membayar honor bagi panitia kegiatan, narasumber, pembicara, tenaga ahli, dan pihak lain yang memberikan jasa berdasarkan SK atau undangan resmi. Meskipun bukan gaji, honor tetap masuk kategori LS karena pembayarannya harus tepat kepada orang yang menerima jasa. Dokumen pendukung biasanya berupa daftar hadir, SK panitia, surat tugas, serta bukti hasil kegiatan.', '2025-12-10 18:50:12', 'i33wtesojro8e65d');
INSERT INTO `master_jns_pencairan` (`id`, `uraian`, `keterangan`, `createdAt`, `createdBy`) VALUES (11, 'LS Barang dan Jasa', 'Digunakan untuk membayar penyedia barang atau jasa sesuai kontrak atau nota pembelian. Jenis LS ini merupakan yang paling sering digunakan oleh OPD ketika melakukan pengadaan seperti ATK, jasa internet, sewa alat, konsultan, dan kebutuhan operasional lainnya. Dokumen yang harus dilampirkan mencakup kontrak/SPK, berita acara serah terima, faktur, bukti PPN/PPH, serta dokumentasi yang membuktikan barang/jasa telah diterima dan digunakan.', '2025-12-10 18:50:24', 'i33wtesojro8e65d');
INSERT INTO `master_jns_pencairan` (`id`, `uraian`, `keterangan`, `createdAt`, `createdBy`) VALUES (12, 'LS Belanja Modal', 'Jenis LS ini digunakan untuk membayar pekerjaan yang menghasilkan aset pemerintah seperti pembangunan gedung, jalan, panggung, kantor, kendaraan dinas, komputer, dan infrastruktur lainnya. Karena menyangkut aset daerah, LS modal memiliki persyaratan yang lebih ketat, seperti berita acara kemajuan pekerjaan, dokumen teknis, foto progres, hingga RAB dan perhitungan volume. Selain itu, setiap pembayaran harus sesuai dengan termin atau progres fisik yang dicapai.', '2025-12-10 18:50:36', 'i33wtesojro8e65d');
INSERT INTO `master_jns_pencairan` (`id`, `uraian`, `keterangan`, `createdAt`, `createdBy`) VALUES (13, 'LS Hibah', 'Pencairan LS hibah diberikan kepada organisasi, lembaga, atau kelompok masyarakat yang menerima hibah dari pemerintah daerah. Hibah hanya dapat diberikan kepada pihak yang memenuhi syarat sesuai peraturan daerah. Dokumen seperti proposal, surat pernyataan tanggung jawab bermaterai, dan keputusan kepala daerah diperlukan untuk memastikan bahwa hibah digunakan sebagaimana mestinya.', '2025-12-10 18:50:46', 'i33wtesojro8e65d');
INSERT INTO `master_jns_pencairan` (`id`, `uraian`, `keterangan`, `createdAt`, `createdBy`) VALUES (14, 'LS Bantuan Sosial', 'LS bansos diberikan kepada individu, keluarga, atau kelompok masyarakat dalam rangka membantu kondisi sosial tertentu. Berbeda dengan hibah yang sifatnya mendukung program lembaga, bansos lebih berfokus pada kebutuhan masyarakat yang rentan. Dokumen pendukungnya biasanya berupa keputusan kepala daerah, daftar penerima, serta laporan pertanggungjawaban dari penerima bansos.', '2025-12-10 18:48:35', 'i33wtesojro8e65d');
INSERT INTO `master_jns_pencairan` (`id`, `uraian`, `keterangan`, `createdAt`, `createdBy`) VALUES (15, 'UP – Uang Persediaan', 'UP merupakan dana awal atau kas kecil yang diberikan kepada Bendahara Pengeluaran untuk membiayai kebutuhan operasional harian OPD. Penggunaan UP ini biasanya untuk pengeluaran kecil, mendesak, atau berulang seperti pembelian ATK kecil, konsumsi rapat, atau ongkos yang tidak bisa direncanakan melalui LS. UP tidak boleh digunakan untuk belanja modal atau pembayaran besar lainnya. Seluruh penggunaan UP harus dibuktikan dengan SPJ lengkap sebagai dasar pengajuan GU.', '2025-12-10 18:49:04', 'i33wtesojro8e65d');
INSERT INTO `master_jns_pencairan` (`id`, `uraian`, `keterangan`, `createdAt`, `createdBy`) VALUES (16, 'GU – Ganti Uang', 'GU adalah pengajuan untuk mengganti dana UP yang sudah digunakan. Setelah bendahara menggunakan sebagian atau seluruh UP, ia membuat laporan pertanggungjawaban yang dilampirkan saat mengusulkan GU ke BKAD. Setelah GU diterbitkan dan cair, saldo UP kembali penuh dan dapat digunakan lagi untuk operasional. Secara sederhana, UP adalah “modal awal”, sedangkan GU adalah “pengisian kembali” atas penggunaan modal tersebut.', '2025-12-10 18:49:22', 'i33wtesojro8e65d');
INSERT INTO `master_jns_pencairan` (`id`, `uraian`, `keterangan`, `createdAt`, `createdBy`) VALUES (17, 'TU – Tambahan Uang', 'TU adalah tambahan dana di luar UP untuk kegiatan yang membutuhkan biaya besar atau mendadak, misalnya perjalanan dinas banyak orang, acara besar, atau kegiatan non-rutin yang tidak bisa tertutup oleh UP biasa. TU harus dipertanggungjawabkan sepenuhnya, dan tidak boleh digunakan untuk hal-hal lain di luar kegiatan tersebut. Selain itu, sebelum tahun anggaran berakhir, seluruh TU wajib diselesaikan SPJ-nya tanpa sisa.', '2025-12-10 18:49:40', 'i33wtesojro8e65d');
INSERT INTO `master_jns_pencairan` (`id`, `uraian`, `keterangan`, `createdAt`, `createdBy`) VALUES (18, 'Nihil', 'SPM/SP2D Nihil adalah jenis pencairan di mana tidak ada uang yang keluar dari Kasda. Biasanya digunakan untuk keperluan administratif seperti perubahan data, koreksi kesalahan akun, pergeseran jenis belanja, atau penyesuaian dokumen lain. Meski tidak ada uang yang dicairkan, prosedur verifikasinya tetap harus mengikuti aturan karena berpengaruh pada laporan keuangan Pemerintah Daerah.', '2025-12-10 19:00:21', 'i33wtesojro8e65d');
COMMIT;

-- ----------------------------
-- Table structure for master_jns_pencairan_list
-- ----------------------------
DROP TABLE IF EXISTS `master_jns_pencairan_list`;
CREATE TABLE `master_jns_pencairan_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `master_tahapan_id` int(11) DEFAULT NULL COMMENT 'di ambil dari tabel  master_tahapan',
  `master_jns_pencairan_id` int(11) DEFAULT NULL COMMENT 'di ambil dari tabel master_jns_pencairan',
  `urut` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `createdBy` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of master_jns_pencairan_list
-- ----------------------------
BEGIN;
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (29, 4, 9, 1, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (30, 5, 9, 2, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (31, 6, 9, 3, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (32, 16, 9, 4, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (33, 17, 9, 5, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (34, 18, 9, 6, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (35, 19, 9, 7, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (36, 20, 9, 8, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (37, 4, 10, 1, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (38, 5, 10, 2, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (39, 6, 10, 3, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (40, 16, 10, 4, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (41, 17, 10, 5, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (42, 18, 10, 6, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (43, 19, 10, 7, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (44, 20, 10, 8, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (45, 4, 11, 1, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (46, 5, 11, 2, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (47, 6, 11, 3, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (48, 15, 11, 4, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (49, 16, 11, 5, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (50, 17, 11, 6, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (51, 18, 11, 7, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (52, 19, 11, 8, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (53, 20, 11, 9, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (54, 4, 12, 1, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (55, 5, 12, 2, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (56, 6, 12, 3, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (57, 15, 12, 4, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (58, 16, 12, 5, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (59, 17, 12, 6, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (60, 18, 12, 7, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (61, 19, 12, 8, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (62, 20, 12, 9, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (63, 4, 13, 1, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (64, 5, 13, 2, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (65, 6, 13, 3, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (66, 16, 13, 4, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (67, 17, 13, 5, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (68, 18, 13, 6, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (69, 19, 13, 7, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (70, 20, 13, 8, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (71, 4, 14, 1, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (72, 5, 14, 2, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (73, 6, 14, 3, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (74, 16, 14, 4, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (75, 17, 14, 5, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (76, 18, 14, 6, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (77, 19, 14, 7, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (78, 20, 14, 8, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (79, 4, 15, 1, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (80, 5, 15, 2, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (81, 16, 15, 3, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (82, 17, 15, 4, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (83, 18, 15, 5, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (84, 19, 15, 6, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (85, 20, 15, 7, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (86, 4, 16, 1, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (87, 5, 16, 2, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (88, 6, 16, 3, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (89, 16, 16, 4, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (90, 17, 16, 5, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (91, 18, 16, 6, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (92, 19, 16, 7, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (93, 20, 16, 8, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (94, 4, 17, 1, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (95, 5, 17, 2, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (96, 16, 17, 3, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (97, 17, 17, 4, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (98, 18, 17, 5, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (99, 19, 17, 6, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (100, 20, 17, 7, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (113, 4, 18, 1, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (114, 5, 18, 2, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (115, 16, 18, 3, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (116, 17, 18, 4, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (117, 18, 18, 5, NULL, NULL);
INSERT INTO `master_jns_pencairan_list` (`id`, `master_tahapan_id`, `master_jns_pencairan_id`, `urut`, `createdAt`, `createdBy`) VALUES (118, 19, 18, 6, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for master_pph
-- ----------------------------
DROP TABLE IF EXISTS `master_pph`;
CREATE TABLE `master_pph` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uraian` varchar(50) DEFAULT NULL,
  `keterangan` text DEFAULT NULL,
  `nilai` float DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `createdBy` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of master_pph
-- ----------------------------
BEGIN;
INSERT INTO `master_pph` (`id`, `uraian`, `keterangan`, `nilai`, `createdAt`, `createdBy`) VALUES (3, 'PPh Pasal 21 (5%)', 'Untuk penghasilan berupa gaji, upah, honorarium, tunjangan, imbalan kerja atau jasa kepada pegawai / orang pribadi (misalnya ASN, pegawai non-ASN, penerima honor)', 5, '2025-12-10 21:46:56', 'i33wtesojro8e65d');
INSERT INTO `master_pph` (`id`, `uraian`, `keterangan`, `nilai`, `createdAt`, `createdBy`) VALUES (4, 'PPh Pasal 21 (15%)', 'Untuk penghasilan berupa gaji, upah, honorarium, tunjangan, imbalan kerja atau jasa kepada pegawai / orang pribadi (misalnya ASN, pegawai non-ASN, penerima honor)', 15, '2025-12-10 21:47:08', 'i33wtesojro8e65d');
INSERT INTO `master_pph` (`id`, `uraian`, `keterangan`, `nilai`, `createdAt`, `createdBy`) VALUES (5, 'PPh Pasal 21 (25%)', 'Untuk penghasilan berupa gaji, upah, honorarium, tunjangan, imbalan kerja atau jasa kepada pegawai / orang pribadi (misalnya ASN, pegawai non-ASN, penerima honor)', 25, '2025-12-10 21:47:20', 'i33wtesojro8e65d');
COMMIT;

-- ----------------------------
-- Table structure for master_ppn
-- ----------------------------
DROP TABLE IF EXISTS `master_ppn`;
CREATE TABLE `master_ppn` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uraian` varchar(50) DEFAULT NULL,
  `keterangan` text DEFAULT NULL,
  `nilai` float DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `createdBy` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of master_ppn
-- ----------------------------
BEGIN;
INSERT INTO `master_ppn` (`id`, `uraian`, `keterangan`, `nilai`, `createdAt`, `createdBy`) VALUES (2, 'Non-PPN', 'Tanpa Pajak Pertambahan Nilai', 0, '2025-12-10 21:42:58', 'i33wtesojro8e65d');
INSERT INTO `master_ppn` (`id`, `uraian`, `keterangan`, `nilai`, `createdAt`, `createdBy`) VALUES (3, 'PPN', 'Pajak Pertambahan Nilai', 11, '2025-12-10 21:42:43', 'i33wtesojro8e65d');
COMMIT;

-- ----------------------------
-- Table structure for master_tag
-- ----------------------------
DROP TABLE IF EXISTS `master_tag`;
CREATE TABLE `master_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uraian` varchar(255) DEFAULT NULL,
  `keterangan` text DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL COMMENT '0 = tidak aktif, 1 = Aktif',
  `createdBy` varchar(50) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `id` (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of master_tag
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for master_tahapan
-- ----------------------------
DROP TABLE IF EXISTS `master_tahapan`;
CREATE TABLE `master_tahapan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uraian` varchar(255) NOT NULL,
  `keterangan` text DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `createdBy` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of master_tahapan
-- ----------------------------
BEGIN;
INSERT INTO `master_tahapan` (`id`, `uraian`, `keterangan`, `createdAt`, `createdBy`) VALUES (4, 'Registrasi Dokumen', 'Penerimaan resmi dokumen Surat Permintaan Pembayaran (SPP) dan kelengkapannya dari Organisasi Perangkat Daerah (OPD) atau pengguna anggaran. Dokumen dicatat dalam buku register atau sistem untuk diberikan nomor urut dan tanggal penerimaan.', '2025-12-10 18:30:50', 'i33wtesojro8e65d');
INSERT INTO `master_tahapan` (`id`, `uraian`, `keterangan`, `createdAt`, `createdBy`) VALUES (5, 'Verifikasi Dokumen', 'Pemeriksaan kelengkapan, keabsahan, dan kesesuaian dokumen SPP terhadap peraturan perundang-undangan, ketersediaan anggaran (DPA), serta spesifikasi teknis. Ini dilakukan untuk memastikan dana yang diminta wajar dan sah.', '2025-12-10 18:31:08', 'i33wtesojro8e65d');
INSERT INTO `master_tahapan` (`id`, `uraian`, `keterangan`, `createdAt`, `createdBy`) VALUES (6, 'Verifikasi Pajak', '-', '2025-12-10 18:39:24', 'i33wtesojro8e65d');
INSERT INTO `master_tahapan` (`id`, `uraian`, `keterangan`, `createdAt`, `createdBy`) VALUES (15, 'Pencatatan Dokumen', 'Tahapan khusus ini mengacu pada pencatatan aset: Jika pembayaran berkaitan dengan pembelian aset (aset tetap), data perolehan aset tersebut diinput ke dalam sistem informasi aset daerah sebagai bagian dari proses akuntansi aset.', '2025-12-10 18:34:25', 'i33wtesojro8e65d');
INSERT INTO `master_tahapan` (`id`, `uraian`, `keterangan`, `createdAt`, `createdBy`) VALUES (16, 'Disposisi Kuasa BUD', 'Pemberian arahan, persetujuan awal, atau perintah oleh Kuasa Bendahara Umum Daerah (BUD) kepada staf terkait (seperti petugas penguji) untuk memproses permintaan pembayaran lebih lanjut, setelah dokumen dianggap lengkap dan benar.', '2025-12-10 18:34:37', 'i33wtesojro8e65d');
INSERT INTO `master_tahapan` (`id`, `uraian`, `keterangan`, `createdAt`, `createdBy`) VALUES (17, 'Verifikasi Kepala Badan', 'Pemeriksaan dan persetujuan akhir oleh Kepala Badan Keuangan dan Aset Daerah (selaku BUD definitif) atas semua dokumen yang telah diverifikasi dan didisposisi, sebelum perintah pencairan dana diterbitkan. Ini adalah tingkat pengawasan tertinggi.', '2025-12-10 18:34:55', 'i33wtesojro8e65d');
INSERT INTO `master_tahapan` (`id`, `uraian`, `keterangan`, `createdAt`, `createdBy`) VALUES (18, 'Penerbitan SP2D', 'Penerbitan Surat Perintah Pencairan Dana (SP2D), yaitu dokumen perintah resmi dari BUD kepada Bank Daerah untuk mencairkan atau mentransfer sejumlah dana dari Rekening Kas Umum Daerah (RKUD) ke rekening pihak yang berhak (OPD atau pihak ketiga).', '2025-12-10 18:35:08', 'i33wtesojro8e65d');
INSERT INTO `master_tahapan` (`id`, `uraian`, `keterangan`, `createdAt`, `createdBy`) VALUES (19, 'Daftar Penguji', 'Proses penyusunan daftar atau rekapitulasi dokumen yang telah terbit SP2D-nya. Daftar ini digunakan sebagai laporan pengujian (verifikasi) akhir sebelum eksekusi pembayaran dilakukan oleh Bank, memastikan akurasi data.', '2025-12-10 18:35:21', 'i33wtesojro8e65d');
INSERT INTO `master_tahapan` (`id`, `uraian`, `keterangan`, `createdAt`, `createdBy`) VALUES (20, 'Pencairan Bank', 'Eksekusi perintah pencairan atau transfer dana oleh Bank Daerah berdasarkan SP2D yang diterima. Dana secara fisik dipindahkan dari Rekening Kas Umum Daerah (RKUD) ke rekening penerima yang sah.', '2025-12-10 18:39:20', 'i33wtesojro8e65d');
INSERT INTO `master_tahapan` (`id`, `uraian`, `keterangan`, `createdAt`, `createdBy`) VALUES (24, 'Resepsionis', '-', '2025-12-31 13:16:46', 'i33wtesojro8e65d');
COMMIT;

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` int(11) DEFAULT NULL,
  `title` varchar(100) NOT NULL,
  `icon` varchar(50) DEFAULT NULL,
  `path` varchar(50) DEFAULT NULL,
  `parent` int(11) DEFAULT NULL,
  `multiple` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` timestamp NULL DEFAULT NULL,
  `createdBy` varchar(35) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of menu
-- ----------------------------
BEGIN;
INSERT INTO `menu` (`id`, `number`, `title`, `icon`, `path`, `parent`, `multiple`, `createdAt`, `createdBy`) VALUES (20, 1, 'Dashboard', 'DashboardIcon', '/Dashboard', NULL, 0, '2025-09-08 00:01:24', 'i33wtesojro8e65d');
INSERT INTO `menu` (`id`, `number`, `title`, `icon`, `path`, `parent`, `multiple`, `createdAt`, `createdBy`) VALUES (21, 2, 'Profile', 'PeopleAltIcon', '/profile', NULL, 0, '2025-09-08 00:01:44', 'i33wtesojro8e65d');
INSERT INTO `menu` (`id`, `number`, `title`, `icon`, `path`, `parent`, `multiple`, `createdAt`, `createdBy`) VALUES (22, 3, 'e-Tracking', 'InboxIcon', '', NULL, 1, '2025-09-08 00:02:05', 'i33wtesojro8e65d');
INSERT INTO `menu` (`id`, `number`, `title`, `icon`, `path`, `parent`, `multiple`, `createdAt`, `createdBy`) VALUES (23, 4, 'Master Data', 'SettingsIcon', '', NULL, 1, '2025-09-08 00:02:24', 'i33wtesojro8e65d');
INSERT INTO `menu` (`id`, `number`, `title`, `icon`, `path`, `parent`, `multiple`, `createdAt`, `createdBy`) VALUES (24, 1, 'User Management', 'StopIcon', '', 23, 1, '2025-09-08 00:02:58', 'i33wtesojro8e65d');
INSERT INTO `menu` (`id`, `number`, `title`, `icon`, `path`, `parent`, `multiple`, `createdAt`, `createdBy`) VALUES (25, 2, 'Template', 'StopIcon', '', 23, 1, '2025-09-08 00:03:11', 'i33wtesojro8e65d');
INSERT INTO `menu` (`id`, `number`, `title`, `icon`, `path`, `parent`, `multiple`, `createdAt`, `createdBy`) VALUES (26, 1, 'Add User', 'FiberManualRecordIcon', '/Registration', 24, 0, '2025-09-08 00:03:41', 'i33wtesojro8e65d');
INSERT INTO `menu` (`id`, `number`, `title`, `icon`, `path`, `parent`, `multiple`, `createdAt`, `createdBy`) VALUES (27, 2, 'User groups', 'FiberManualRecordIcon', '/userGroup', 24, 0, '2025-09-08 00:03:55', 'i33wtesojro8e65d');
INSERT INTO `menu` (`id`, `number`, `title`, `icon`, `path`, `parent`, `multiple`, `createdAt`, `createdBy`) VALUES (28, 3, 'Menu Setting', 'FiberManualRecordIcon', '/MenuSetting', 24, 0, '2025-09-08 00:04:11', 'i33wtesojro8e65d');
INSERT INTO `menu` (`id`, `number`, `title`, `icon`, `path`, `parent`, `multiple`, `createdAt`, `createdBy`) VALUES (29, 1, 'Template 1', 'FiberManualRecordIcon', '/Template1', 25, 0, '2025-09-08 00:04:46', 'i33wtesojro8e65d');
INSERT INTO `menu` (`id`, `number`, `title`, `icon`, `path`, `parent`, `multiple`, `createdAt`, `createdBy`) VALUES (30, 2, 'Template 2', 'FiberManualRecordIcon', '/Template2', 25, 0, '2025-09-08 00:04:55', 'i33wtesojro8e65d');
INSERT INTO `menu` (`id`, `number`, `title`, `icon`, `path`, `parent`, `multiple`, `createdAt`, `createdBy`) VALUES (31, 2, 'Documentation', 'FiberManualRecordIcon', '/Documentation', 25, 0, '2025-09-08 00:05:07', 'i33wtesojro8e65d');
COMMIT;

-- ----------------------------
-- Table structure for pph
-- ----------------------------
DROP TABLE IF EXISTS `pph`;
CREATE TABLE `pph` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `documents_id` int(11) DEFAULT NULL COMMENT 'diambil dari tabel documents',
  `master_pph_id` int(11) DEFAULT NULL COMMENT 'diambil dari tabel master_pph',
  PRIMARY KEY (`id`),
  KEY `documents_id` (`documents_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of pph
-- ----------------------------
BEGIN;
INSERT INTO `pph` (`id`, `documents_id`, `master_pph_id`) VALUES (33, 35, 3);
INSERT INTO `pph` (`id`, `documents_id`, `master_pph_id`) VALUES (34, 36, 3);
INSERT INTO `pph` (`id`, `documents_id`, `master_pph_id`) VALUES (35, 36, 4);
INSERT INTO `pph` (`id`, `documents_id`, `master_pph_id`) VALUES (47, 34, 3);
INSERT INTO `pph` (`id`, `documents_id`, `master_pph_id`) VALUES (48, 37, 3);
INSERT INTO `pph` (`id`, `documents_id`, `master_pph_id`) VALUES (49, 45, 3);
COMMIT;

-- ----------------------------
-- Table structure for ppn
-- ----------------------------
DROP TABLE IF EXISTS `ppn`;
CREATE TABLE `ppn` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `documents_id` int(11) DEFAULT NULL COMMENT 'diambil dari tabel documents',
  `master_ppn_id` int(11) DEFAULT NULL COMMENT 'diambil dari tabel master_ppn',
  PRIMARY KEY (`id`),
  KEY `documents_id` (`documents_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of ppn
-- ----------------------------
BEGIN;
INSERT INTO `ppn` (`id`, `documents_id`, `master_ppn_id`) VALUES (33, 35, 3);
INSERT INTO `ppn` (`id`, `documents_id`, `master_ppn_id`) VALUES (45, 34, 3);
INSERT INTO `ppn` (`id`, `documents_id`, `master_ppn_id`) VALUES (46, 37, 3);
INSERT INTO `ppn` (`id`, `documents_id`, `master_ppn_id`) VALUES (47, 45, 3);
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` varchar(35) NOT NULL,
  `username` varchar(25) NOT NULL,
  `password` varchar(250) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(35) NOT NULL,
  `address` text DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `createdBy` varchar(35) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for users_group
-- ----------------------------
DROP TABLE IF EXISTS `users_group`;
CREATE TABLE `users_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`) USING BTREE,
  KEY `group_id` (`group_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of users_group
-- ----------------------------
BEGIN;
INSERT INTO `users_group` (`id`, `user_id`, `group_id`) VALUES (14, 'i33wtesojro8e65d', 10);
INSERT INTO `users_group` (`id`, `user_id`, `group_id`) VALUES (15, '5rhptobbm2hmritp', 24);
INSERT INTO `users_group` (`id`, `user_id`, `group_id`) VALUES (16, '3lqn324kdulty2y9q1', 21);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
