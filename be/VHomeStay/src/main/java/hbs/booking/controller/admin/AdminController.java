package hbs.booking.controller.admin;

import hbs.booking.model.dto.response.MessageResponseDto;
import hbs.booking.model.dto.response.UserResponseDto;
import hbs.booking.service.AdminService;
import hbs.booking.util.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/admins")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;

    @GetMapping("/my-profile")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getAdminProfile() {
        UserResponseDto admin = adminService.getAdminProfile()
                .orElseThrow(() -> new ResourceNotFoundException("admin.profile.not.found"));

        return ResponseEntity.ok(admin);
    }

    @PutMapping("/my-profile")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateAdminProfile(@RequestBody UserResponseDto userResponseDto) {
        adminService.updateAdminProfile(userResponseDto);
        return ResponseEntity.ok("admin.profile.update.success");
    }

    @PutMapping("/my-profile/avatar")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateAdminAvatar(@ModelAttribute MultipartFile image) throws IOException {
        adminService.updateAdminAvatar(image);
        return ResponseEntity.ok("admin.profile.avatar.update.success");
    }
}
