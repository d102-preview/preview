package com.d102.file.service.impl;

import com.d102.common.domain.Resume;
import com.d102.common.domain.User;
import com.d102.common.exception.ExceptionType;
import com.d102.common.exception.custom.NotFoundException;
import com.d102.common.repository.ResumeRepository;
import com.d102.common.repository.UserRepository;
import com.d102.common.util.SecurityHelper;
import com.d102.common.util.UserVerifier;
import com.d102.file.service.ManageService;
import com.querydsl.core.util.FileUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.nio.file.Path;

@RequiredArgsConstructor
@Service
public class ManageServiceImpl implements ManageService {

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;
    private final SecurityHelper securityHelper;

    @Transactional
    public void deleteResume(Long resumeId) {
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new NotFoundException(ExceptionType.ResumeNotFoundException));

        UserVerifier.checkLoginUserAndResourceUser(securityHelper.getLoginUsername(), resume.getUser().getEmail());

        Path dir = Path.of(resume.getFilePath());
        deleteFile(dir);

        resumeRepository.deleteById(resumeId);
    }

    private void deleteFile(Path dir) {
        try {
            FileUtils.delete(dir.toFile());
        } catch (Exception e) {
            throw new NotFoundException(ExceptionType.ResumeDeleteException);
        }
    }

    public User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException(ExceptionType.UserNotFoundException));
    }

}
