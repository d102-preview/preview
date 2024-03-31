package com.d102.file.service.impl;

import com.d102.common.constant.FileConstant;
import com.d102.common.constant.QuestionType;
import com.d102.common.domain.jpa.Analysis;
import com.d102.common.domain.jpa.Interview;
import com.d102.common.domain.jpa.Resume;
import com.d102.common.domain.jpa.User;
import com.d102.common.exception.ExceptionType;
import com.d102.common.exception.custom.InvalidException;
import com.d102.common.exception.custom.NotFoundException;
import com.d102.common.repository.jpa.AnalysisRepository;
import com.d102.common.repository.jpa.InterviewRepository;
import com.d102.common.repository.jpa.ResumeRepository;
import com.d102.common.repository.jpa.UserRepository;
import com.d102.common.service.AsyncService;
import com.d102.common.util.FastAiApi;
import com.d102.common.util.SecurityHelper;
import com.d102.common.util.TimeConverter;
import com.d102.file.dto.UploadDto;
import com.d102.file.mapper.UploadMapper;
import com.d102.file.service.UploadService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.util.*;

@RequiredArgsConstructor
@Service
public class UploadServiceImpl implements UploadService {

    @Value("${download.profile.base-url}")
    private String profileBaseUrl;

    private final InterviewRepository interviewRepository;
    private final UserRepository userRepository;
    private final ResumeRepository resumeRepository;
    private final AnalysisRepository analysisRepository;
    private final SecurityHelper securityHelper;
    private final UploadMapper uploadMapper;
    private final AsyncService asyncService;
    private final FastAiApi fastAiApi;

    @Transactional
    public UploadDto.ProfileResponse uploadProfile(UploadDto.ProfileRequest profileRequestDto) {
        Path basePath = FileConstant.PROFILE_SAVE_DIR.resolve(securityHelper.getLoginUsername());
        String savePath = saveProfile(basePath, profileRequestDto.getProfile());
        String profileUrl = makeProfileUrl(savePath);

        User user = userRepository.findByEmail(securityHelper.getLoginUsername()).orElseThrow(() -> new NotFoundException(ExceptionType.UserNotFoundException));
        user.setProfileImageName(profileRequestDto.getProfile().getOriginalFilename());
        user.setProfileImageUrl(profileUrl);

        return uploadMapper.toProfileResponseDto(userRepository.saveAndFlush(user));
    }

    @Transactional
    public UploadDto.ResumeResponse uploadResume(UploadDto.ResumeRequest resumeRequestDto) {
        checkResumeLimit();

        Path basePath = FileConstant.RESUME_SAVE_DIR.resolve(securityHelper.getLoginUsername());
        String savePath = saveResume(basePath, resumeRequestDto.getResume());

        Resume resume = uploadMapper.toResume(resumeRequestDto);
        resume.setFileName(resumeRequestDto.getResume().getOriginalFilename());
        resume.setFilePath(savePath);
        resume.setUser(userRepository.findByEmail(securityHelper.getLoginUsername()).orElseThrow(() -> new NotFoundException(ExceptionType.UserNotFoundException)));
        resumeRepository.saveAndFlush(resume);

        asyncService.generateAndSaveQuestionList(savePath, resume);

        return uploadMapper.toResumeResponseDto(resume);
    }

    @Transactional
    public void uploadAndAnalyzeVideo(UploadDto.AnalysisRequest analysisRequestDto, MultipartFile video) {
        Interview interview = interviewRepository.findById(analysisRequestDto.getInterviewId()).orElseThrow(() -> new NotFoundException(ExceptionType.InterviewNotFoundException));
        interview.setUser(userRepository.findByEmail(securityHelper.getLoginUsername()).orElseThrow(() -> new NotFoundException(ExceptionType.UserNotFoundException)));

        Path basePath = FileConstant.VIDEO_SAVE_DIR.resolve(securityHelper.getLoginUsername()).resolve(TimeConverter.convertToFormattedTime(interview.getStartTime()));
        String savePath = saveVideo(basePath, video);

        Analysis analysis = uploadMapper.toAnalysis(analysisRequestDto);
        analysis.setInterview(interview);
        analysis.setQuestionType(QuestionType.valueOf(analysisRequestDto.getQuestionType()));
        analysis.setQuestion(analysisRequestDto.getQuestion());
        analysis.setAnswer(analysisRequestDto.getAnswer());
        analysis.setKeywordList(analysisRequestDto.getKeywordList());
        analysis.setVideoPath(savePath);
        analysisRepository.saveAndFlush(analysis);

        if (!analysisRequestDto.getSkip()) {
            analysis.setAnalysisReqTime(LocalDateTime.now());
            analysisRepository.saveAndFlush(analysis);

            FastAiApi.Response response = null;
            try {
                response = fastAiApi.analyzeVideo(analysis.getId());
            } catch (RestClientException e) {
                throw new InvalidException(ExceptionType.FastAiApiException);
            }
            if (!StringUtils.equals(response.getCode(), FileConstant.FASTAI_API_SUCCESS))  {
                throw new InvalidException(ExceptionType.AnalysisException);
            }
        }
    }

    private String saveVideo(Path basePath, MultipartFile video) {
        /**
         * 영상의 경우에는 날짜별로 디렉토리를 나눠서 관리할 예정이므로 기존 makeSavePath()를 이용하지 않음
         */
        try {
            Files.createDirectories(basePath);
            Path dest = basePath.resolve(video.getOriginalFilename());
            video.transferTo(dest);

            return dest.toString();
        } catch (IOException e) {
            throw new InvalidException(ExceptionType.VideoUploadException);
        }
    }

    private String saveResume(Path basePath, MultipartFile resume) {
        try {
            Files.createDirectories(basePath);
            Path dest = makeSavePathByUuid(basePath, resume);
            resume.transferTo(dest);

            return dest.toString();
        } catch (IOException e) {
            throw new InvalidException(ExceptionType.ResumeUploadException);
        }
    }

    private void checkResumeLimit() {
        int numOfResume = resumeRepository.countByUser_Email(securityHelper.getLoginUsername());
        if (numOfResume >= FileConstant.RESUME_UPLOAD_LIMIT) {
            throw new InvalidException(ExceptionType.ResumeLimitException);
        }
    }

    private String makeProfileUrl(String savePath) {
        try {
            return new StringBuilder()
                    .append(profileBaseUrl)
                    .append(URLEncoder.encode(savePath, StandardCharsets.UTF_8))
                    .toString();
        } catch (Exception e) {
            throw new InvalidException(ExceptionType.ProfileUrlException);
        }
    }

    private String saveProfile(Path dir, MultipartFile profile) {
        try {
            Files.createDirectories(dir);
            FileUtils.cleanDirectory(new File(dir.toString()));

            Path dest = makeSavePathByUuid(dir, profile);
            profile.transferTo(dest);

            return dest.toString();
        } catch (IOException e) {
            throw new InvalidException(ExceptionType.ProfileUploadException);
        }
    }

    private Path makeSavePathByUuid(Path dir, MultipartFile file) {
        String fileName = new StringJoiner("_")
                .add(UUID.randomUUID().toString())
                .add(file.getOriginalFilename())
                .toString();
        return dir.resolve(fileName);
    }

}
