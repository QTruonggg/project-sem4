package hbs.booking.model.dto.response.request;

import hbs.booking.enums.RequestStatus;
import hbs.booking.model.entity.Admin;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestResponseDto {
    private Long requestId;
    private String householdName;
    private String avatarHousehold;
    private LocalDateTime createdDate;
    private String requestTitle;
    private String requestContent;
    private LocalDateTime solvedDate;
    private String adminFirstName;
    private String adminLastName;
    private RequestStatus status;
}
