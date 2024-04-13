package hbs.booking.service;

import hbs.booking.model.dto.request.AddHouseholdServiceRequest;
import hbs.booking.model.dto.request.EditHouseholdServiceRequest;
import hbs.booking.model.dto.response.service.customer.ServiceResponse;
import hbs.booking.model.dto.response.service.manager.ServiceDetailForAddResponse;
import hbs.booking.model.dto.response.service.manager.ServiceDetailResponse;

import java.util.List;

public interface ManageServiceForManagerService {
    List<ServiceDetailResponse> getAllService(String managerEmail);
    List<ServiceDetailForAddResponse> getAllServiceForAdd();
    List<ServiceResponse> getAllServiceAvailable(String managerEmail);
    boolean createService(AddHouseholdServiceRequest addHouseholdServiceRequest, String managerEmail);
    boolean editService(EditHouseholdServiceRequest editHouseholdServiceRequest);
    boolean activeService(Long householdServiceId);
    boolean inactiveService(Long householdServiceId);
    boolean deleteService(Long householdServiceId);
}
