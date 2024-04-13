package hbs.booking.controller.customer;

import hbs.booking.model.dto.request.HouseholdDetailRequest;
import hbs.booking.model.dto.response.household.customer.HouseholdDetailForCustomer;
import hbs.booking.service.HouseholdService;
import hbs.booking.service.impl.HouseholdServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/customer/household")
@RequiredArgsConstructor
public class HouseholdCustomerController {

    private final HouseholdService householdService;

    @GetMapping("{householdId}")
    public HouseholdDetailForCustomer getHouseholdForCustomerById(@PathVariable Long householdId) {
        HouseholdDetailForCustomer householdDetailForCustomer = householdService.getHouseholdDetailForCustomer(householdId);
        if (householdDetailForCustomer != null)
            return householdDetailForCustomer;
        else
            throw new RuntimeException("manager.household.notfound");
    }
}
