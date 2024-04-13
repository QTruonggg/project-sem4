package hbs.booking.service;

import hbs.booking.model.dto.response.service.customer.HouseholdByServiceResponse;
import hbs.booking.model.dto.response.service.customer.ServiceDetailResponse;
import hbs.booking.model.dto.response.service.customer.ServiceIntroductionDto;
import hbs.booking.model.dto.response.service.customer.ServiceResponse;

import java.util.List;

public interface ServiceForCustomerService {
    List<ServiceResponse> getAllService();
    List<HouseholdByServiceResponse> getHouseholdByService(List<Long> serviceIdList);
    ServiceDetailResponse getServiceById(Long serviceId);
    List<ServiceIntroductionDto> getAllServiceInHomePage();
}
