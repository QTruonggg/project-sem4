package hbs.booking.model.dto.response;

import hbs.booking.enums.RoomStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoomEditDto {
    private Long roomId;
    private String roomName;
    private RoomStatus roomStatus;
}
