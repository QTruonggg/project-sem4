package hbs.booking.model.dto.response;

import hbs.booking.enums.HouseholdTypeRoomStatus;
import hbs.booking.model.entity.Facility;
import hbs.booking.model.entity.HomestayMedia;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HouseholdRoomTypeResponseDto {
    private Long householdRoomTypeId;
    private String roomTypeName;
    private Integer capacity;
    private BigDecimal price;
    private BigDecimal priceUpdate;
    private Integer singleBed;
    private Integer doubleBed;
    private Boolean isChildrenAndBed;
    private List<FacilityDto> facilities;
    private List<HomestayMedia> homestayMedias;
    private List<MultipartFile> imageFiles;
    private List<FacilityDto> facilityVillageList;
    private HouseholdTypeRoomStatus status;
}
