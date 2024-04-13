package hbs.booking.model.dto.response.user;

import hbs.booking.enums.AccountRole;
import hbs.booking.enums.AccountStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class UserInfoResponseDto {
    private Long accountId;
    private String avatar;
    private String email;
    private String firstName;
    private String lastName;
    private AccountRole role;
    private LocalDateTime createdDate;
    private String houseHoldName;
    private AccountStatus status;

}
