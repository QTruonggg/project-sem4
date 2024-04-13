package hbs.booking.model.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import hbs.booking.model.entity.Customer;
import hbs.booking.model.entity.Manager;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponseDto {
    @JsonProperty("access_token")
    private String accessToken;
    @JsonProperty("refresh_token")
    private String refreshToken;
    @JsonProperty("user")
    private UserResponseDto user;
}
