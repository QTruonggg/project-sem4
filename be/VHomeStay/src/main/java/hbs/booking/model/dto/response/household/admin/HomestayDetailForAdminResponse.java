package hbs.booking.model.dto.response.household.admin;

import hbs.booking.enums.HomestayStatus;
import hbs.booking.model.entity.Room;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class HomestayDetailForAdminResponse {
    private Long homestayId;
    private String homestayCode;
    private HomestayStatus homestayStatus;
    private Integer numberOfRoom;
    private Integer numberOfDorm;
    private Integer totalCapacity;

    public HomestayDetailForAdminResponse(Long homestayId, String homestayCode, HomestayStatus homestayStatus, List<Room> roomList) {
        this.homestayId = homestayId;
        this.homestayCode = homestayCode;
        this.homestayStatus = homestayStatus;
    }
}
