package hbs.booking.service.impl;

import hbs.booking.enums.ServiceStatus;
import hbs.booking.model.dto.request.AddHouseholdServiceRequest;
import hbs.booking.model.dto.request.EditHouseholdServiceRequest;
import hbs.booking.model.dto.response.service.customer.ServiceResponse;
import hbs.booking.model.dto.response.service.manager.ServiceDetailForAddResponse;
import hbs.booking.model.dto.response.service.manager.ServiceDetailResponse;
import hbs.booking.model.entity.Household;
import hbs.booking.model.entity.HouseholdService;
import hbs.booking.model.entity.Service;
import hbs.booking.repository.HouseholdRepository;
import hbs.booking.repository.HouseholdServiceRepository;
import hbs.booking.repository.ServiceRepository;
import hbs.booking.security.SecurityUtil;
import hbs.booking.service.ManageServiceForManagerService;
import hbs.booking.util.exception.ResourceBadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
public class ManageServiceForManagerServiceImpl implements ManageServiceForManagerService {

    private final ServiceRepository serviceRepository;
    private final HouseholdRepository householdRepository;
    private final HouseholdServiceRepository householdServiceRepository;

    @Override
    public List<ServiceDetailResponse> getAllService(String managerEmail) {
        return serviceRepository.getServicesByManagerEmail(managerEmail);
    }

    @Override
    public List<ServiceDetailForAddResponse> getAllServiceForAdd() {
        List<ServiceDetailForAddResponse> serviceList = serviceRepository.getAllServiceForAdd();
        return serviceList;
    }

    @Override
    public List<ServiceResponse> getAllServiceAvailable(String managerEmail) {
        List<ServiceResponse> allServiceAvailable = serviceRepository.getAllServiceAvailable(managerEmail);
        return allServiceAvailable;
    }

    @Override
    public boolean createService(AddHouseholdServiceRequest addHouseholdServiceRequest, String managerEmail) {
        HouseholdService householdService = new HouseholdService();
        Optional<Household> optionalHousehold = householdRepository.findByManagerEmail(managerEmail);
        Optional<Service> optionalService = serviceRepository.findById(addHouseholdServiceRequest.getServiceId());
        householdService.setService(optionalService.get());
        householdService.setHousehold(optionalHousehold.get());
        householdService.setServiceDescription(addHouseholdServiceRequest.getServiceDescription());
        householdService.setStatus(ServiceStatus.ACTIVE);
        householdServiceRepository.save(householdService);
        return true;
    }

    @Override
    public boolean editService(EditHouseholdServiceRequest editHouseholdServiceRequest) {
        Optional<HouseholdService> optionalHouseholdService = householdServiceRepository.findById(editHouseholdServiceRequest.getHouseholdServiceId());
        if (optionalHouseholdService.isEmpty()){
            throw new ResourceBadRequestException("service.not.found");
        }
        HouseholdService householdService = optionalHouseholdService.get();
        householdService.setServiceDescription(editHouseholdServiceRequest.getServiceDescription());
        householdServiceRepository.save(householdService);
        return true;
    }

    @Override
    public boolean activeService(Long householdServiceId) {
        String managerEmail = SecurityUtil.getCurrentUserLogin().get();
        Optional<Household> householdOptional = householdRepository.findByManagerEmail(managerEmail);
        Optional<HouseholdService> optionalHouseholdService = householdServiceRepository.findById(householdServiceId);
        if (optionalHouseholdService.isEmpty()){
            throw new ResourceBadRequestException("service.not.found");
        }
        HouseholdService householdService = optionalHouseholdService.get();
        if (householdService.getHousehold().getId().equals(householdOptional.get().getId())){
            householdService.setStatus(ServiceStatus.ACTIVE);
            householdServiceRepository.save(householdService);
            return true;
        }
        return false;
    }

    @Override
    public boolean inactiveService(Long householdServiceId) {
        String managerEmail = SecurityUtil.getCurrentUserLogin().get();
        Optional<Household> householdOptional = householdRepository.findByManagerEmail(managerEmail);
        Optional<HouseholdService> optionalHouseholdService = householdServiceRepository.findById(householdServiceId);
        if (optionalHouseholdService.isEmpty()){
            throw new ResourceBadRequestException("service.not.found");
        }
        HouseholdService householdService = optionalHouseholdService.get();
        if (householdService.getHousehold().getId().equals(householdOptional.get().getId())){
            householdService.setStatus(ServiceStatus.INACTIVE);
            householdServiceRepository.save(householdService);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteService(Long householdServiceId) {
        String managerEmail = SecurityUtil.getCurrentUserLogin().get();
        Optional<Household> householdOptional = householdRepository.findByManagerEmail(managerEmail);
        Optional<HouseholdService> optionalHouseholdService = householdServiceRepository.findById(householdServiceId);
        if (optionalHouseholdService.isEmpty()){
            throw new ResourceBadRequestException("service.not.found");
        }
        HouseholdService householdService = optionalHouseholdService.get();
        if (householdService.getHousehold().getId().equals(householdOptional.get().getId())){
            householdService.setStatus(ServiceStatus.DELETED);
            householdServiceRepository.save(householdService);
            return true;
        }
        return false;
    }
}
