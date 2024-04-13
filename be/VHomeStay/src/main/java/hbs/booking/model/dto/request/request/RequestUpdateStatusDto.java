package hbs.booking.model.dto.request.request;

import hbs.booking.enums.RequestStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestUpdateStatusDto {
    private Long requestId;
    private String requestResponse;
    private RequestStatus requestStatus;
}
