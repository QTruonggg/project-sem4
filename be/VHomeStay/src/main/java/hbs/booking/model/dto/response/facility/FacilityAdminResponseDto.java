package hbs.booking.model.dto.response.facility;

import hbs.booking.enums.BaseStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FacilityAdminResponseDto {
    private Long id;
    private String facilityName;
    private BaseStatus status;
}
