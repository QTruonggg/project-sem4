package hbs.booking.controller.customer;

import hbs.booking.model.dto.request.HouseholdByServiceRequest;
import hbs.booking.model.dto.response.service.customer.*;
import hbs.booking.service.ServiceForCustomerService;
import hbs.booking.service.impl.ServiceForCustomerServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/customer/service")
@RequiredArgsConstructor
public class ServiceCustomerController {
    private final ServiceForCustomerService serviceForCustomerService;
    @GetMapping
    public ServiceListResponse getAllService() {
        List<ServiceResponse> serviceResponseList = serviceForCustomerService.getAllService();
        return ServiceListResponse.builder().serviceListForCustomer(serviceResponseList).build();
    }
    @PostMapping("/search-by-service")
    public HouseholdByServiceSearchResponse getHouseholdByService(@RequestBody HouseholdByServiceRequest serviceIdList) {
        List<HouseholdByServiceResponse> householdByServiceResponseList = serviceForCustomerService.getHouseholdByService(serviceIdList.getServiceIdList());
        return HouseholdByServiceSearchResponse.builder().householdListForCustomer(householdByServiceResponseList).build();
    }
    @GetMapping("/{serviceId}")
    public ServiceDetailResponse getServiceById(@PathVariable Long serviceId) {
        return serviceForCustomerService.getServiceById(serviceId);
    }
}
