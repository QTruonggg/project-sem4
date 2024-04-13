package hbs.booking.model.dto.response.homestay.admin;

import lombok.Data;
import lombok.ToString;

import java.util.List;

@ToString
@Data
public class HomestayListAdminResponseDto {
    private String area;
    private List<HomestayCommonAdminResponseDto> homestayList;
}
