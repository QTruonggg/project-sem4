package hbs.booking.model.dto.response;

import hbs.booking.model.entity.Homestay;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoomCreateFormResponseDto {
    private List<String> roomNameList;
    private List<HouseholdRoomTypeDto> roomType;
    private List<HomestayDto> homestay;
}
