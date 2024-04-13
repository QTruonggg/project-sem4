package hbs.booking.service.impl;

import hbs.booking.enums.ServiceStatus;
import hbs.booking.model.dto.request.ServiceRequest;
import hbs.booking.model.dto.response.service.admin.ServiceDetailResponse;
import hbs.booking.model.entity.HouseholdService;
import hbs.booking.model.entity.Service;
import hbs.booking.repository.HouseholdRepository;
import hbs.booking.repository.HouseholdServiceRepository;
import hbs.booking.repository.ServiceRepository;
import hbs.booking.service.ManageServiceForAdminService;
import hbs.booking.service.StorageService;
import hbs.booking.util.exception.ResourceBadRequestException;
import hbs.booking.util.exception.ResourceInternalServerErrorException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;

import java.io.IOException;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
public class ManageServiceForAdminServiceImpl implements ManageServiceForAdminService {

    private final ServiceRepository serviceRepository;
    private final HouseholdServiceRepository householdServiceRepository;
    private final StorageService storageService;

    @Override
    public List<ServiceDetailResponse> getAllService() {
        return serviceRepository.getAllServices();
    }

    @Override
    public boolean addService(ServiceRequest serviceRequest) throws IOException {
        Optional<Service> optionalService = serviceRepository.findByServiceName(serviceRequest.getServiceName());
        if (optionalService.isPresent()) {
            throw new ResourceBadRequestException("service.name.exist");
        }
        Service service = new Service();
        service.setServiceName(serviceRequest.getServiceName());
        service.setDescription(serviceRequest.getServiceDescription());
        String urlImage = storageService.uploadFile(serviceRequest.getImageFile());
        service.setImage(urlImage);
        service.setStatus(ServiceStatus.ACTIVE);
        try {
            serviceRepository.save(service);
            return true;
        } catch (Exception e) {
            storageService.deleteFile(urlImage);
            throw new ResourceInternalServerErrorException("internal.server.error");
        }
    }

    @Override
    public boolean editService(ServiceRequest serviceRequest) throws IOException {
        Service service = serviceRepository.findById(serviceRequest.getServiceId()).orElseThrow(() -> new ResourceBadRequestException("service.not.found"));
        service.setServiceName(serviceRequest.getServiceName());
        service.setDescription(serviceRequest.getServiceDescription());
        String urlImageNew = null;
        if (serviceRequest.getImageFile() != null && !serviceRequest.getImageFile().isEmpty()) {
            urlImageNew = storageService.updateFile(service.getImage(), serviceRequest.getImageFile());
            service.setImage(urlImageNew);
        }
        try {
            serviceRepository.save(service);
            return true;
        } catch (Exception e) {
            storageService.deleteFile(urlImageNew);
            throw new ResourceInternalServerErrorException("internal.server.error");
        }
    }

    @Override
    public boolean activeService(Long serviceId) {
        Optional<Service> service = serviceRepository.findById(serviceId);
        if (service.isPresent()) {
            List<HouseholdService> householdServices = serviceRepository.findAllByServiceIdAndStatusIsDeavtive(serviceId);
            if (householdServices.size() > 0) {
                householdServices.forEach(householdService -> {
                    householdService.setStatus(ServiceStatus.ACTIVE);
                    householdServiceRepository.save(householdService);
                });
            }
            service.get().setStatus(ServiceStatus.INACTIVE);
            serviceRepository.save(service.get());
            return true;
        }
        return false;
    }

    @Override
    public boolean inactiveService(Long serviceId) {
        Optional<Service> service = serviceRepository.findById(serviceId);
        if (service.isPresent()) {
            List<HouseholdService> householdServices = serviceRepository.findAllByServiceIdAndStatusIsActive(serviceId);
            if (householdServices.size() > 0) {
                householdServices.forEach(householdService -> {
                    householdService.setStatus(ServiceStatus.INACTIVE);
                    householdServiceRepository.save(householdService);
                });
            }
            service.get().setStatus(ServiceStatus.INACTIVE);
            serviceRepository.save(service.get());
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteService(Long serviceId) {
        Optional<Service> service = serviceRepository.findById(serviceId);
        if (service.isPresent()) {
            List<HouseholdService> householdServices = serviceRepository.findAllByServiceId(serviceId);
            if (householdServices.size() > 0) {
                householdServices.forEach(householdService -> {
                    householdService.setStatus(ServiceStatus.DELETED);
                    householdServiceRepository.save(householdService);
                });
            }
            service.get().setStatus(ServiceStatus.DELETED);
            serviceRepository.save(service.get());
            return true;
        }
        return false;
    }
}
