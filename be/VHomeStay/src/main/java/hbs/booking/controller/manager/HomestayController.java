package hbs.booking.controller.manager;

import hbs.booking.model.dto.response.*;
import hbs.booking.model.dto.response.homestay.HomestayForSearchRoomManagerResponseDto;
import hbs.booking.model.entity.Homestay;
import hbs.booking.model.entity.Household;
import hbs.booking.repository.RoomRepository;
import hbs.booking.security.SecurityUtil;
import hbs.booking.service.HomestayService;
import hbs.booking.service.impl.HouseholdServiceImpl;
import hbs.booking.util.exception.ResourceBadRequestException;
import hbs.booking.util.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/manager/homestay")
@RequiredArgsConstructor
public class HomestayController {

    private final HomestayService homestayService;

    @GetMapping
    public HomestayListResponseDto getAllHomestayDetailForManager() {
        Optional<String> currentUserLoginEmailOptional = SecurityUtil.getCurrentUserLogin();
        String managerEmail = currentUserLoginEmailOptional.get();
        List<HomestayInformationForManager> homestayInformationForManagerList =
                homestayService.getAllHomestayDetailForManager(managerEmail);
        return HomestayListResponseDto.builder().
                homestayListForManager(homestayInformationForManagerList).build();
    }

    @GetMapping("/{homestayId}")
    public HomestayInformationForManager getHomestayDetail(@PathVariable Long homestayId) {
        Optional<String> currentUserLoginEmailOptional = SecurityUtil.getCurrentUserLogin();
        String managerEmail = currentUserLoginEmailOptional.get();
        Optional<Homestay> homestay = homestayService.getHomestayByManagerEmailAndHomestayId(managerEmail, homestayId);
        if (homestay.isEmpty()){
            throw new ResourceNotFoundException("no.permission");
        }
        return homestayService.getHomestayDetail(homestayId);
    }

    @PutMapping("/{homestayId}")
    public ResponseEntity<?> editHomestay(@PathVariable("homestayId") Long homestayId,
                                          @ModelAttribute HomestayInformationForManager homestayInformationForManager) throws IOException {
        if (homestayService.editHomestay(homestayId, homestayInformationForManager)){
            MessageResponseDto messageResponseDto = new MessageResponseDto("homestay.update.success", HttpStatus.OK);
            return ResponseEntity.ok(messageResponseDto);
        } else {
            throw new ResourceBadRequestException("homestay.update.failed");
        }
    }

    @DeleteMapping("/{homestayId}")
    public ResponseEntity<?> deletedHomestay(@PathVariable("homestayId") Long homestayId) {
        if (homestayService.deletedHomestay(homestayId)){
            MessageResponseDto messageResponseDto = new MessageResponseDto("homestay.delete.success", HttpStatus.OK);
            return ResponseEntity.ok(messageResponseDto);
        }
        return ResponseEntity.badRequest().body("homestay.not.found");
    }

    @DeleteMapping("/{homestayId}/hide")
    public ResponseEntity<?> hideOrShowHomestay(@PathVariable("homestayId") Long homestayId) {
        if (homestayService.hideOrShowHomestay(homestayId)){
            MessageResponseDto messageResponseDto = new MessageResponseDto("homestay.hide.success", HttpStatus.OK);
            return ResponseEntity.ok(messageResponseDto);
        }
        return ResponseEntity.badRequest().body("homestay.not.found");
    }
    @GetMapping("/form-search")
    public ResponseEntity<?> showHomestaysForSearchRooms(){
        List<HomestayForSearchRoomManagerResponseDto> homestayForSearchRoomManagerResponseDtos = homestayService.showHomestaysForSearchRooms();

        Map<String, Object> response = Map.of(
                "homestays", homestayForSearchRoomManagerResponseDtos
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/search")
    public ResponseEntity<?> showHomestaysSearchRooms(){
        List<HomestayForSearchRoomManagerResponseDto> homestayForSearchRoomManagerResponseDtos = homestayService.showHomestaysForSearchRooms();

        Map<String, Object> response = Map.of(
                "homestays", homestayForSearchRoomManagerResponseDtos
        );
        return ResponseEntity.ok(response);
    }
}
