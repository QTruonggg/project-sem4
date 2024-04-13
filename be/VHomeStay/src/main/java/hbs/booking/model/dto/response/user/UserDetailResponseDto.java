package hbs.booking.model.dto.response.user;

import hbs.booking.enums.AccountRole;
import hbs.booking.enums.AccountStatus;
import hbs.booking.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDetailResponseDto {
    private String avatar;
    private String email;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String address;
    private LocalDate dateOfBirth;
    private Gender gender;
    private AccountRole role;
    private AccountStatus status;
}
