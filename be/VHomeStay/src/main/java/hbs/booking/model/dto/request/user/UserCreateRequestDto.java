package hbs.booking.model.dto.request.user;

import hbs.booking.enums.AccountRole;
import lombok.Data;

@Data
public class UserCreateRequestDto {
    private AccountRole role;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private Long householdId;
}
