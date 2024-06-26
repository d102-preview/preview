CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `role` varchar(8) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(72) NOT NULL,
  `name` varchar(8) NOT NULL,
  `profile_image_name` varchar(128) DEFAULT NULL,
  `profile_image_url` varchar(1024) DEFAULT NULL,
  `profile_image_size` bigint DEFAULT NULL,
  `deleted_time` datetime DEFAULT NULL,
  `created_time` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `social` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `provider` varchar(8) NOT NULL,
  `provider_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `social_user_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  UNIQUE KEY `provider_provider_id_unique` (`provider`, `provider_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `resume` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `file_name` varchar(128) NOT NULL,
  `display_name` varchar(16) NOT NULL,
  `file_path` varchar(1024) NOT NULL,
  `file_size` bigint NOT NULL,
  `analysis_req_time` datetime DEFAULT NULL,
  `analysis_end_time` datetime DEFAULT NULL,
  `analysis_status` varchar(16) DEFAULT NULL,
  `created_time` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `resume_user_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `common_category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category` varchar(16) NOT NULL,
  `created_time` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `common_category_unique` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `common_question` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category_id` bigint,
  `question` varchar(512) NOT NULL,
  `created_time` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `common_question_common_category_FK` FOREIGN KEY (`category_id`) REFERENCES `common_category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `common_script` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `question_id` bigint NOT NULL,
  `script` varchar(512) NOT NULL,
  `created_time` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `common_script_user_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `common_script_question_FK` FOREIGN KEY (`question_id`) REFERENCES `common_question` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `common_keyword` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `question_id` bigint NOT NULL,
  `keyword` varchar(16) NOT NULL,
  `created_time` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `common_keyword_user_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `common_keyword_question_FK` FOREIGN KEY (`question_id`) REFERENCES `common_question` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `resume_question` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `resume_id` bigint NOT NULL,
  `question` varchar(512) NOT NULL,
  `created_time` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `resume_question_resume_FK` FOREIGN KEY (`resume_id`) REFERENCES `resume` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `resume_script` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `question_id` bigint NOT NULL,
  `script` varchar(512) NOT NULL,
  `created_time` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `resume_script_user_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `resume_script_question_FK` FOREIGN KEY (`question_id`) REFERENCES `resume_question` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `resume_keyword` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `question_id` bigint NOT NULL,
  `keyword` varchar(16) NOT NULL,
  `created_time` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `resume_keyword_question_FK` FOREIGN KEY (`question_id`) REFERENCES `resume_question` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `interview` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `type` varchar(16) NOT NULL,
  `start_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `interview_user_FK` (`user_id`),
  CONSTRAINT `interview_user_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `analysis` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `interview_id` bigint(20) NOT NULL,
  `question_type` varchar(16) NOT NULL,
  `question` varchar(512) NOT NULL,
  `answer` varchar(1024) DEFAULT NULL,
  `video_path` varchar(1024) NOT NULL,
  `thumbnail_path` varchar(1024) DEFAULT NULL,
  `keyword_list` varchar(512) DEFAULT NULL,
  `analysis_req_time` datetime DEFAULT NULL,
  `analysis_start_time` datetime DEFAULT NULL,
  `analysis_end_time` datetime DEFAULT NULL,
  `analysis_status` varchar(16) DEFAULT NULL,
  `video_length` int(11) DEFAULT NULL,
  `video_size` bigint DEFAULT NULL,
  `fps` int(11) DEFAULT NULL,
  `frames` int(11) DEFAULT NULL,
  `emotion` text DEFAULT NULL,
  `intent` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `analysis_interview_fk` (`interview_id`),
  CONSTRAINT `analysis_interview_fk` FOREIGN KEY (`interview_id`) REFERENCES `interview` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;