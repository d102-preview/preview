CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `role` varchar(8) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(72) NOT NULL,
  `name` varchar(8) NOT NULL,
  `profile_image` varchar(512) DEFAULT NULL,
  `deleted_time` datetime DEFAULT NULL,
  `created_time` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;