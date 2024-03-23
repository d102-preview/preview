package com.d102.api.service.impl;

import com.d102.api.domain.redis.EmailHash;
import com.d102.api.dto.EmailDto;
import com.d102.api.repository.redis.EmailHashRepository;
import com.d102.api.service.EmailService;
import com.d102.common.constant.EmailConstant;
import com.d102.common.exception.ExceptionType;
import com.d102.common.exception.custom.ConflictException;
import com.d102.common.exception.custom.NotFoundException;
import com.d102.common.exception.custom.TooManyException;
import com.d102.common.repository.UserRepository;
import com.d102.common.util.RandomGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class EmailServiceImpl implements EmailService {

    private final UserRepository userRepository;
    private final EmailHashRepository emailHashRepository;
    private final JavaMailSender mailSender;

    @Transactional(readOnly = true)
    public Boolean checkAvailableEmail(String email) {
        return userRepository.findByEmail(email).isEmpty();
    }

    @Transactional
    public void sendAuthorizationCode(EmailDto.Request requestDto) {
        checkExistedEmail(requestDto.getEmail());
        checkEmailSendLimit(requestDto.getEmail());

        EmailHash emailHash = emailHashRepository.findById(requestDto.getEmail())
                .orElse(getInitialEmailHash(requestDto));

        int authorizationCode = RandomGenerator.createAuthorizationCode();
        int count = emailHash.getCount();

        sendEmail(emailHash.getEmail(), EmailConstant.EMAIL_CODE_SUBJECT, EmailConstant.EMAIL_CODE_CONTENT + authorizationCode);

        emailHash.setCount(++count);
        emailHash.setAuthorizationCode(authorizationCode);

        emailHashRepository.save(emailHash);
    }

    @Transactional(readOnly = true)
    public Boolean verifyAuthorizationCode(EmailDto.VerifyRequest verifyRequestDto) {
        return emailHashRepository.findById(verifyRequestDto.getEmail())
                .map(emailHash -> emailHash.getAuthorizationCode() == verifyRequestDto.getAuthorizationCode())
                .orElseThrow(() -> new NotFoundException(ExceptionType.EmailHashNotFoundException));
    }

    private void sendEmail(String email, String subject, String content) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject(subject);
        message.setText(content);
        mailSender.send(message);
    }

    private EmailHash getInitialEmailHash(EmailDto.Request requestDto) {
        return EmailHash.builder()
                .email(requestDto.getEmail())
                .build();
    }

    private void checkEmailSendLimit(String email) {
        emailHashRepository.findById(email)
                .ifPresent(emailHash -> {
                    if (emailHash.getCount() >= EmailConstant.EMAIL_SEND_LIMIT) {
                        throw new TooManyException(ExceptionType.EmailSendLimitException);
                    }
                });
    }

    private void checkExistedEmail(String email) {
        userRepository.findByEmail(email)
                .ifPresent(user -> {
                    throw new ConflictException(ExceptionType.EmailExistedException);
                });
    }

}
