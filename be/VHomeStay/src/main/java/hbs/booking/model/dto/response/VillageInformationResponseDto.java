package hbs.booking.model.dto.response;

import hbs.booking.model.dto.response.household.HouseholdVillageInforResponseDto;
import hbs.booking.model.entity.CustomerTestimonials;
import hbs.booking.model.entity.VillageInformation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@ToString
@Data
@AllArgsConstructor
@NoArgsConstructor
public class VillageInformationResponseDto {
    private List<VillageInformation> villageInformations;
    private List<CustomerTestimonials> customerTestimonials;
    private Integer totalHousehold;
    private Integer totalHomestay;
    private List<HouseholdVillageInforResponseDto> householdResponseDtos;
}
