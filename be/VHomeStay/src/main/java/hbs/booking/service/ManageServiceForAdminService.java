package hbs.booking.service;

import hbs.booking.model.dto.request.ServiceRequest;
import hbs.booking.model.dto.response.service.admin.ServiceDetailResponse;

import java.io.IOException;
import java.util.List;

public interface ManageServiceForAdminService {
    List<ServiceDetailResponse> getAllService();
    boolean addService(ServiceRequest serviceRequest) throws IOException;
    boolean editService(ServiceRequest serviceRequest) throws IOException;
    boolean activeService(Long serviceId);
    boolean inactiveService(Long serviceId);
    boolean deleteService(Long serviceId);
}
