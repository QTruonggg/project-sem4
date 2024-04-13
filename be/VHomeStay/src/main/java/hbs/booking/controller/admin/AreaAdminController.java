package hbs.booking.controller.admin;

import hbs.booking.model.dto.request.area.AreaAdminRequestDto;
import hbs.booking.model.dto.response.area.AreaAdminResponseDto;
import hbs.booking.service.AreaService;
import hbs.booking.util.exception.ResourceBadRequestException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/admin/areas")
@RequiredArgsConstructor
public class AreaAdminController {
    private final AreaService areaService;
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addAreasByAdmin(@Valid @ModelAttribute AreaAdminRequestDto area, BindingResult result) throws IOException {
        if(result.hasErrors()){
            throw new ResourceBadRequestException(result.getFieldError().getDefaultMessage());
        }
        areaService.addAreaByAdmin(area);
        return ResponseEntity.ok("area.add.success");
    }

    @GetMapping("/{areaId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAreaByAdmin(@PathVariable Long areaId){
        Optional<AreaAdminResponseDto> areaAdminResponseDto = areaService.getAreaByAdmin(areaId);

        if (areaAdminResponseDto.isEmpty()){
            throw new ResourceBadRequestException("area.not.found");
        }

        return ResponseEntity.ok(areaAdminResponseDto.get());
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAreasByAdmin(){
        List<AreaAdminResponseDto> areaAdminResponseDtos = areaService.getAreasByAdmin();

        Map<String, Object> response = Map.of("areaAdminResponseDtos", areaAdminResponseDtos);

        return ResponseEntity.ok(response);
    }

    @PutMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateAreaByAdmin(@Valid @ModelAttribute AreaAdminRequestDto area) {
        areaService.updateAreaByAdmin(area);

        return ResponseEntity.ok("area.update.success");
    }

    @DeleteMapping("/{areaId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteAreaByAdmin(@PathVariable Long areaId){
        areaService.deleteAreaByAdmin(areaId);

        return ResponseEntity.ok("area.delete.success");
    }
}
