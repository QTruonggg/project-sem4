package hbs.booking.controller.manager;

import hbs.booking.model.dto.response.MessageResponseDto;
import hbs.booking.model.dto.response.UserResponseDto;
import hbs.booking.service.ManagerService;
import hbs.booking.util.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Locale;

@RestController
@RequestMapping("/api/v1/managers")
@RequiredArgsConstructor
public class ManagerController {
    private final ManagerService managerService;

    @GetMapping("/my-profile")
    @PreAuthorize("hasRole('ROLE_MANAGER')")
    public ResponseEntity<?> getManagerProfile() {
        UserResponseDto userResponseDto = managerService.getManagerProfile()
                .orElseThrow(() -> new ResourceNotFoundException("manager.profile.notfound"));

        return ResponseEntity.ok(userResponseDto);
    }

    @PutMapping("/my-profile")
    @PreAuthorize("hasRole('ROLE_MANAGER')")
    public ResponseEntity<?> updateManagerProfile(@RequestBody UserResponseDto userResponseDto) {
        managerService.updateManagerProfile(userResponseDto);

        return ResponseEntity.ok("manager.profile.update.success");
    }

    @PutMapping("/my-profile/avatar")
    @PreAuthorize("hasRole('ROLE_MANAGER')")
    public ResponseEntity<?> updateManagerAvatar(@ModelAttribute MultipartFile image) throws IOException {
        managerService.updateManagerAvatar(image);

        return ResponseEntity.ok("manager.profile.update.success");
    }
}
