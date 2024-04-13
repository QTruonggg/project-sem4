package hbs.booking.model.dto.response;

import hbs.booking.enums.RoomStatus;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class DormInformationResponseDto {
    private Long roomId;
    private String homestayCode;
    private BigDecimal price;
    private String roomName;
    private Integer totalDormSlot;
    private RoomStatus roomStatus;

    public DormInformationResponseDto(Long roomId, String homestayCode, BigDecimal price, String roomName, RoomStatus roomStatus) {
        this.roomId = roomId;
        this.homestayCode = homestayCode;
        this.price = price;
        this.roomName = roomName;
        this.roomStatus = roomStatus;
    }
}
