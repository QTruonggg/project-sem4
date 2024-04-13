package hbs.booking.model.dto.response.user;

import hbs.booking.model.dto.response.booking.customer.HouseholdNameDto;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class UserForAdminResponseDto {
    private int numberOfAdmin;
    private int numberOfManager;
    private int numberOfCustomer;
    private List<UserInfoResponseDto> userInfoResponseDto;
    private List<HouseholdNameDto> householdName;
}
