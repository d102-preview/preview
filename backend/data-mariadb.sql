INSERT INTO `user` (role, email, password, name, created_time, updated_time) VALUES ('ADMIN', 'admin@d102.com', '$2a$10$KRmm5j8Ti8RijXevcKQlCelvrkotD3Q/US2/fRd64NAz2z7GXaYka', '관리자', now(), now());
INSERT INTO `user` (role, email, password, name, created_time, updated_time) VALUES ('USER', 'user1@d102.com', '$2a$10$KRmm5j8Ti8RijXevcKQlCelvrkotD3Q/US2/fRd64NAz2z7GXaYka', '유저1', now(), now());
INSERT INTO `user` (role, email, password, name, created_time, updated_time) VALUES ('USER', 'user2@d102.com', '$2a$10$KRmm5j8Ti8RijXevcKQlCelvrkotD3Q/US2/fRd64NAz2z7GXaYka', '유저2', now(), now());
INSERT INTO `user` (role, email, password, name, created_time, updated_time) VALUES ('USER', 'user3@d102.com', '$2a$10$KRmm5j8Ti8RijXevcKQlCelvrkotD3Q/US2/fRd64NAz2z7GXaYka', '유저3', now(), now());

INSERT INTO `common_category` (category, created_time, updated_time) VALUES ('인성', now(), now());

INSERT INTO `common_question` (category_id, question, created_time, updated_time) VALUES (1, '1분 자기소개 해주세요.', now(), now());
INSERT INTO `common_question` (category_id, question, created_time, updated_time) VALUES (1, '동료와 친구들은 본인을 어떻게 생각하나요?', now(), now());
INSERT INTO `common_question` (category_id, question, created_time, updated_time) VALUES (1, '인생에서 가장 힘들었던 경험과 이를 어떻게 극복했나요?', now(), now());
INSERT INTO `common_question` (category_id, question, created_time, updated_time) VALUES (1, '리더쉽을 발휘했던 경험에 대해서 말씀해주세요.', now(), now());
INSERT INTO `common_question` (category_id, question, created_time, updated_time) VALUES (1, '회사를 고를 때 중요하게 생각하는 우선순위를 말씀해주세요.', now(), now());
INSERT INTO `common_question` (category_id, question, created_time, updated_time) VALUES (1, '본인만의 갈등을 해결하는 방법에 대해서 말씀해주세요.', now(), now());
INSERT INTO `common_question` (category_id, question, created_time, updated_time) VALUES (1, '인생에서 가장 소중한 가치에 대해서 말씀해주세요.', now(), now());
INSERT INTO `common_question` (category_id, question, created_time, updated_time) VALUES (1, '가장 존경하는 인물은 누구입니까?', now(), now());
INSERT INTO `common_question` (category_id, question, created_time, updated_time) VALUES (1, '팀워크를 발휘했던 경험에 대해 말씀해주세요.', now(), now());
INSERT INTO `common_question` (category_id, question, created_time, updated_time) VALUES (1, '프로젝트 경험에 대해서 소개해 주세요.', now(), now());