package hbs.booking.controller.admin;

import hbs.booking.enums.AccountRole;
import hbs.booking.model.dto.request.user.UserCreateRequestDto;
import hbs.booking.model.dto.response.MessageResponseDto;
import hbs.booking.model.dto.response.user.*;
import hbs.booking.service.HouseholdService;
import hbs.booking.service.UserService;
import hbs.booking.util.exception.ResourceBadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/admin/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final HouseholdService householdService;
    private final MessageSource messageSource;
    @GetMapping
    @PreAuthorize("hasRole('ADMIN') OR hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> getUsersByAdmin(){
        UserForAdminResponseDto users = userService.getUsersByAdmin();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{accountId}")
    @PreAuthorize("hasRole('ADMIN') OR hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> getUserDetailByAdmin(@PathVariable("accountId") Long accountId){
        //check account exist and permission to view and return userDetailDto
        UserDetailResponseDto userDetailResponseDto = userService.getUserDetailByAdmin(accountId);

        //check role of account to return different response
        AccountRole accountRole = userDetailResponseDto.getRole();
        Map<String, Object> response = new HashMap<>();
        response.put("userDetail", userDetailResponseDto);
        switch (accountRole) {
            case MANAGER -> {
                HouseholdInfoResponseDto householdInfoResponseDto = householdService.getHouseholdInfoByAdmin(accountId);
                response.put("householdInfo", householdInfoResponseDto);
            }
            case CUSTOMER -> {
                List<BookingOfCustomerDto> bookingOfCustomerDto = userService.getBookingOfCustomerByAdmin(accountId);
                response.put("bookingOfCustomer", bookingOfCustomerDto);
            }
            default -> {
            }
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping()
    @PreAuthorize("hasRole('ADMIN') OR hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> createUserByAdmin(@RequestBody UserCreateRequestDto userCreateRequestDto){
        //check email exist
        if (userService.checkEmailExist(userCreateRequestDto.getEmail())) {
            throw new ResourceBadRequestException("account.email.exist");
        }
        //check phone number exist
        if (userService.checkPhoneNumberExits(userCreateRequestDto.getPhoneNumber())) {
            throw new ResourceBadRequestException("account.phone.exist");
        }
        //create account, sent email to user
        userService.createUser(userCreateRequestDto);
        return ResponseEntity.ok("account.create.success");
    }

    @PatchMapping("/{accountId}")
    @PreAuthorize("hasRole('ADMIN') OR hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> inactiveOrActiveAccountOfUserByAdmin(@PathVariable("accountId") Long accountId) {
        userService.inactiveOrActiveAccountOfUserByAdmin(accountId);
        return ResponseEntity.ok("account.update.status.success");
    }

    @DeleteMapping("/{accountId}")
    @PreAuthorize("hasRole('ADMIN') OR hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> deleteUserByAdmin(@PathVariable("accountId") Long accountId) {
        userService.deleteUserByAdmin(accountId);
        return ResponseEntity.ok("account.delete.success");
    }

}
