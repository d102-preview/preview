package com.d102.file.service.impl;

import com.d102.common.constant.UploadConstant;
import com.d102.file.dto.UploadDto;
import com.d102.file.service.UploadService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Paths;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class UploadServiceImpl implements UploadService {

    @Transactional
    public String uploadProfileImage(UploadDto.profileImageRequest profileImageRequestDto) {
        System.out.println("uploadProfileImage");
        System.out.println(profileImageRequestDto.getProfileImage().getOriginalFilename());
        System.out.println(profileImageRequestDto.getProfileImage().getSize());
        String path = System.getProperty("user.dir");
        saveFile(path, profileImageRequestDto.getProfileImage());
        return path;
    }

    private void saveFile(String path, MultipartFile file) {
        String fileName = file.getOriginalFilename();
        String saveFileName = UUID.randomUUID().toString() + "_" + fileName;

        File folder = new File(path);
        if (!folder.exists()) {
            try {
                folder.mkdirs();
                System.out.println("folder");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        File saveFile = new File(path, saveFileName);
        System.out.println(saveFile);
        try {
            file.transferTo(saveFile);
            System.out.println("saveFile");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
