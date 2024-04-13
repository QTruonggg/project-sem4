package hbs.booking.model.dto.response.booking.customer;

import hbs.booking.model.dto.response.FacilityDto;
import hbs.booking.model.dto.response.HomestayDto;
import hbs.booking.model.entity.Facility;
import hbs.booking.model.entity.HomestayMedia;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
public class RoomTypeHouseholdAvailableDto {
    private Long roomTypeHouseholdId;
    private String roomTypeName;
    private Integer capacity;
    private Integer singleBed;
    private Integer doubleBed;
    private BigDecimal price;
    private Boolean isChildrenBed;
    private Boolean isDorm;
    private Long quantity;

    public RoomTypeHouseholdAvailableDto(Long roomTypeHouseholdId, String roomTypeName, Integer capacity, Integer singleBed, Integer doubleBed, BigDecimal price, Boolean isChildrenBed, Boolean isDorm, Long quantity) {
        this.roomTypeHouseholdId = roomTypeHouseholdId;
        this.roomTypeName = roomTypeName;
        this.capacity = capacity;
        this.singleBed = singleBed;
        this.doubleBed = doubleBed;
        this.price = price;
        this.isChildrenBed = isChildrenBed;
        this.isDorm = isDorm;
        this.quantity = quantity;
    }
}
