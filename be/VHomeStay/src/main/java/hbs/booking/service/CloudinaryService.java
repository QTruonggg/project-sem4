package hbs.booking.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface CloudinaryService {
    String uploadFile(MultipartFile imageFile) throws IOException;
    String getFile(String fileName);
    String updateFile(String fileName, MultipartFile imageFile) throws IOException;
    void deleteFile(String fileName);
}
