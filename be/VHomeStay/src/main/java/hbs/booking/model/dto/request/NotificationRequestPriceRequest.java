package hbs.booking.model.dto.request;

import hbs.booking.enums.RequestStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class NotificationRequestPriceRequest {
    private String title;
    private String householdRoomTypeName;
    private RequestStatus requestStatus;
}
