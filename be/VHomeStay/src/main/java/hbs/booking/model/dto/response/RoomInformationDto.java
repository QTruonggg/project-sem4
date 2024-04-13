package hbs.booking.model.dto.response;

import hbs.booking.enums.RoomStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class RoomInformationDto {
    private Long householdId;
    private Long roomId;
    private String homestayCode;
    private String roomName;
    private String  roomTypeName;
    private BigDecimal price;
    private Integer capacity;
    private RoomStatus roomStatus;
    private Integer singleBed;
    private Integer doubleBed;
    private Boolean isChildrenAndBed;
    private List<FacilityDto> facilities;
    private List<HomestayMediaDto> homestayMedias;
    private boolean isDorm;
    private Integer totalDormSlot;
}
