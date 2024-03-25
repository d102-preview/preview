package com.d102.file.service.impl;

import com.d102.common.domain.Resume;
import com.d102.common.domain.User;
import com.d102.common.exception.ExceptionType;
import com.d102.common.exception.custom.ManageException;
import com.d102.common.exception.custom.NotFoundException;
import com.d102.common.repository.ResumeRepository;
import com.d102.common.repository.UserRepository;
import com.d102.common.util.SecurityHelper;
import com.d102.file.service.ManageService;
import com.querydsl.core.util.FileUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
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
                .orElseThrow(() -> new ManageException(ExceptionType.ResumeNotFoundException));
        Long userId = resume.getUser().getId();
        if (!userId.equals(userRepository.findByEmail(securityHelper.getLoginUsername())
                .map(User::getId)
                .orElseThrow(() -> new NotFoundException(ExceptionType.UserNotFoundException))) &&
                !securityHelper.isAdmin()) {
            throw new ManageException(ExceptionType.UnAuthorizeException);
        }


        Path dir = Path.of(resumeRepository.findById(resumeId)
                .map(resume -> resume.getFilePath())
                .orElseThrow(() -> new ManageException(ExceptionType.ResumeDeleteException)));

        deleteFile(dir);

        resumeRepository.deleteById(resumeId);
    }

    private void deleteFile(Path dir) {
        try {
            FileUtils.delete(dir.toFile());
        } catch (Exception e) {
            throw new ManageException(ExceptionType.ResumeDeleteException);
        }
    }

}
