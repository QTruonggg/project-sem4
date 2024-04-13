package hbs.booking.controller.admin;

import hbs.booking.model.dto.request.request.RequestUpdateStatusDto;
import hbs.booking.model.dto.response.MessageResponseDto;
import hbs.booking.model.dto.response.request.RequestDetailResponseDto;
import hbs.booking.model.dto.response.request.RequestResponseDto;
import hbs.booking.model.dto.response.request.RoomTypeHouseholdUpdatePriceDto;
import hbs.booking.service.RequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/request")
@RequiredArgsConstructor
public class RequestForAdminController {
    private final RequestService requestService;
    private final MessageSource messageSource;

    @GetMapping()
    @PreAuthorize("hasRole('ADMIN') OR hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> getRequestByAdmin(){
        List<RequestResponseDto> requests = requestService.getRequestByAdmin();
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/{requestId}")
    @PreAuthorize("hasRole('ADMIN') OR hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> getRequestDetailByAdmin(@PathVariable("requestId") Long requestId){
        RequestDetailResponseDto requestDetailResponseDto = requestService.getRequestDetailByAdmin(requestId);
        RoomTypeHouseholdUpdatePriceDto roomTypeHouseholdUpdatePriceDto = requestService.getRoomTypeHouseholdUpdatePriceDto(requestId);
        Map<String, Object> response = new HashMap<>();
        response.put("requestDetail", requestDetailResponseDto);
        response.put("roomTypeHouseholdUpdatePrice", roomTypeHouseholdUpdatePriceDto);
        return ResponseEntity.ok(response);
    }

    @PutMapping()
    @PreAuthorize("hasRole('ADMIN') OR hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> updateRequestByAdmin(@RequestBody RequestUpdateStatusDto requestUpdateStatusDto){
        requestService.updateRequestByAdmin(requestUpdateStatusDto);
        return ResponseEntity.ok("request.update.status.success");
    }
}
