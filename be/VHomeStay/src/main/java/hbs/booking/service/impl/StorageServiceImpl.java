package hbs.booking.service.impl;

import com.cloudinary.Cloudinary;
import com.google.cloud.storage.*;
import hbs.booking.service.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StorageServiceImpl implements StorageService {

    private final Cloudinary cloudinary;
    @Override
    public String uploadFile(MultipartFile imageFile) throws IOException {
        String url = cloudinary.uploader().upload(imageFile.getBytes(), Map.of("public_id", UUID.randomUUID().toString())).get("url").toString();

        return url;
    }

    @Override
    public String getFile(String fileName) {
        return null;
    }

    @Override
    public String updateFile(String fileName, MultipartFile imageFile) throws IOException {
        return null;
    }

    @Override
    public void deleteFile(String fileName) {

    }
}
