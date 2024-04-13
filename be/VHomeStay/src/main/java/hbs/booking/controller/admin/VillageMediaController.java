package hbs.booking.controller.admin;

import hbs.booking.model.dto.response.MessageResponseDto;
import hbs.booking.model.dto.response.village.VillageMediaCreateAndUpdateResponse;
import hbs.booking.service.VillageMediaService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Locale;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/village-media")
@RequiredArgsConstructor
public class VillageMediaController {
    private final VillageMediaService villageMediaService;
    private final MessageSource messageSource;

    @GetMapping()
    @PreAuthorize("hasRole('ADMIN') OR hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> getAllVillageMedia() {
        VillageMediaCreateAndUpdateResponse response = villageMediaService.getAllVillageMedia();
        return ResponseEntity.ok(response);
    }
    @PutMapping()
    @PreAuthorize("hasRole('ADMIN') OR hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> createAndUpdateVillageMedia(@ModelAttribute VillageMediaCreateAndUpdateResponse villageMediaCreateAndUpdateResponse) {
        villageMediaService.createAndUpdateVillageMedia(villageMediaCreateAndUpdateResponse);
        return ResponseEntity.ok("media.create.and.update.success");
    }

}
