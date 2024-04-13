package hbs.booking.model.dto.response.household.admin;

import hbs.booking.model.dto.response.household.admin.HouseholdDetailForAdminResponse;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class HouseholdDetailListForAdminResponse {
    List<HouseholdDetailForAdminResponse> householdDetailListForAdmin;
}
