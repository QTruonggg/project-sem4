package hbs.booking.controller;

import hbs.booking.model.entity.File;
import hbs.booking.service.CloudinaryService;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Controller
@RestController
@RequiredArgsConstructor
public class UploadFIleController {
    private final CloudinaryService cloudinaryService;
    @PostMapping("/upload")
    public String uploadFile(@RequestParam("imageFile") MultipartFile imageFile) throws IOException {
       String url =   cloudinaryService.uploadFile(imageFile);
         return url;
    }

}
