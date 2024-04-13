package hbs.booking.service.impl;

import com.cloudinary.Cloudinary;
import hbs.booking.model.entity.File;
import hbs.booking.repository.FileRepository;
import hbs.booking.service.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CloudinaryServiceImpl implements CloudinaryService {

private final Cloudinary cloudinary;
@Autowired
private FileRepository fileRepository;
    @Override
    public String uploadFile(MultipartFile imageFile) throws IOException {
        String url = cloudinary.uploader().upload(imageFile.getBytes(), Map.of("public_id", UUID.randomUUID().toString())).get("url").toString();
        File file = new File();
        file.setUrl(url);
        fileRepository.save(file);
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
