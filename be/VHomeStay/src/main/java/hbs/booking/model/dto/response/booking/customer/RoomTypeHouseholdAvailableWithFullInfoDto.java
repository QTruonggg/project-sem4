package hbs.booking.model.dto.response.booking.customer;

import hbs.booking.model.entity.HomestayMedia;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomTypeHouseholdAvailableWithFullInfoDto {
    private Long roomTypeHouseholdId;
    private String roomTypeName;
    private List<String> imageListUri;
    private Integer capacity;
    private Integer singleBed;
    private Integer doubleBed;
    private BigDecimal price;
    private Boolean isChildrenBed;
    private Boolean isDorm;
    private List<String> facilities;
    private Long quantity;
}
