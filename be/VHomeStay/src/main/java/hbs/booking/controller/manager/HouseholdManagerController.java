package hbs.booking.controller.manager;

import hbs.booking.model.dto.request.household.HouseholdInfoRequestDto;
import hbs.booking.model.dto.request.household.HouseholdMediaRequestDto;
import hbs.booking.model.dto.response.MessageResponseDto;
import hbs.booking.model.dto.response.household.admin.HouseholdResponseDto;
import hbs.booking.model.entity.Household;
import hbs.booking.service.HouseholdService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Locale;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/manager/households")
@RequiredArgsConstructor
public class HouseholdManagerController {
    private final HouseholdService householdService;
    @GetMapping
    @PreAuthorize("hasRole('ROLE_MANAGER')")
    public ResponseEntity<?> getHouseholdByManagerEmail() {
        Optional<Household> householdOptional = householdService.getHouseholdByManagerEmail();

        HouseholdResponseDto householdResponseDto = householdService.mapToDTO(householdOptional.get());

        return ResponseEntity.ok(householdResponseDto);
    }

    @PutMapping("/information")
    public ResponseEntity<?> updateHouseholdInformation(@RequestBody HouseholdInfoRequestDto householdInfoRequestDto){
        householdService.updateHouseholdInformation(householdInfoRequestDto);

        return ResponseEntity.ok("manager.household.update.success");
    }

    @PatchMapping("/media")
    public ResponseEntity<?> updateHouseholdMedia(@ModelAttribute HouseholdMediaRequestDto householdMediaRequestDto){
        householdService.updateHouseholdMedia(householdMediaRequestDto);

        return ResponseEntity.ok("manager.household.update.success");
    }

}
