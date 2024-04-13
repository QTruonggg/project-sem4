package hbs.booking.service.impl;

import hbs.booking.enums.Gender;
import hbs.booking.mapper.UserResponseMapper;
import hbs.booking.model.dto.response.UserResponseDto;
import hbs.booking.model.dto.response.user.UserInfoResponseDto;
import hbs.booking.security.SecurityUtil;
import hbs.booking.service.StorageService;
import hbs.booking.util.exception.ResourceBadRequestException;
import hbs.booking.util.exception.ResourceInternalServerErrorException;
import hbs.booking.util.exception.ResourceNotFoundException;
import hbs.booking.model.entity.Customer;
import hbs.booking.repository.CustomerRepository;
import hbs.booking.service.CustomerService;
import hbs.booking.util.exception.ResourceUnauthorizedException;
import hbs.booking.util.validation.Validation;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.lang.reflect.Field;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl
        extends BaseServiceImpl<Customer, Long, CustomerRepository>
        implements CustomerService {
    private final CustomerRepository customerRepository;
    private final StorageService storageService;
    private final UserResponseMapper userResponseMapper;

    @Override
    public Optional<UserResponseDto> getCustomerProfile() {
        Optional<String> getCurrentUserEmail = SecurityUtil.getCurrentUserLogin();

        return getCurrentUserEmail.map(e -> getCustomerByAccountEmail(e))
                .orElseThrow(() -> new ResourceUnauthorizedException("customer.profile.unauthorized"));
    }

    @Override
    public Optional<UserResponseDto> getCustomerByAccountEmail(String email) {
        Optional<Customer> customerOptional = customerRepository.getCustomerByAccountEmail(email);

        return Optional.ofNullable(customerOptional.map(c -> mapToDTO(c))
                .orElseThrow(() -> new ResourceNotFoundException("customer.profile.notfound")));
    }

    @Override
    public boolean updateCustomerProfile(Map<String, Object> updateFields) {
        Optional<String> getCurrentUserEmail = SecurityUtil.getCurrentUserLogin();

        return getCurrentUserEmail.map(e -> {
            Optional<UserResponseDto> customerOptional = getCustomerByAccountEmail(e);
            if (customerOptional.isPresent()) {
                updateFields.forEach((k, v) -> {
                    Field field = ReflectionUtils.findField(UserResponseDto.class, k);
                    field.setAccessible(true);
                    if (field.getType().isEnum()) {
                        Class<Gender> enumType = (Class<Gender>) field.getType();
                        Enum<?> enumValue = Enum.valueOf(enumType, v.toString());
                        ReflectionUtils.setField(field, customerOptional.get(), enumValue);
                    } else if (field.getType().equals(LocalDate.class)) {
                        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

                        LocalDate dateValue = LocalDate.parse(v.toString(), formatter);
                        ReflectionUtils.setField(field, customerOptional.get(), dateValue);
                    } else {
                        ReflectionUtils.setField(field, customerOptional.get(), v);
                    }
                });
                try {
                    Customer customer = mapToEntity(customerOptional.get());
                    customerRepository.save(customer);
                    return true;
                } catch (Exception ex) {
                    throw new ResourceInternalServerErrorException("internal.server.error");
                }
            }
            return false;
        }).orElseThrow(() -> new ResourceUnauthorizedException("customer.profile.unauthorized"));
    }

    @Override
    public UserResponseDto mapToDTO(Customer customer) {
        return userResponseMapper.mapToCustomerDTO(customer);
    }

    @Override
    public Customer mapToEntity(UserResponseDto userResponseDto) {
        return userResponseMapper.mapToCustomerEntity(userResponseDto);
    }

    @Override
    public void uploadAvatar(MultipartFile image) throws IOException {
        Optional<String> getCurrentUserEmail = SecurityUtil.getCurrentUserLogin();

        if (!getCurrentUserEmail.isPresent()) {
            throw new ResourceUnauthorizedException("customer.profile.unauthorized");
        }

        Optional<UserResponseDto> customerOptional = getCustomerByAccountEmail(getCurrentUserEmail.get());

        String imageUrl = storageService.uploadFile(image);
        customerOptional.get().setAvatar(imageUrl);

        Customer customer = mapToEntity(customerOptional.get());

        customerRepository.save(customer);
    }

    @Override
    public String updateAvatar(MultipartFile image) throws IOException {
        if (image == null) {
            throw new ResourceBadRequestException("customer.profile.update.avatar.null");
        }
        Optional<String> getCurrentUserEmail = SecurityUtil.getCurrentUserLogin();

        Optional<UserResponseDto> customerOptional = getCustomerByAccountEmail(getCurrentUserEmail.get());

        String oldImageUrl = customerOptional.get().getAvatar();
        String newImageUrl = storageService.updateFile(oldImageUrl, image);

        customerOptional.get().setAvatar(newImageUrl);
        Customer customer = mapToEntity(customerOptional.get());
        try {
            customerRepository.save(customer);
            return newImageUrl;
        } catch (Exception e) {
            storageService.deleteFile(newImageUrl);
            throw new ResourceInternalServerErrorException("internal.server.error");
        }
    }

    @Override
    public boolean deleteAvatar() {
        Optional<String> getCurrentUserEmail = SecurityUtil.getCurrentUserLogin();

        if (!getCurrentUserEmail.isPresent()) {
            throw new ResourceUnauthorizedException("customer.profile.unauthorized");
        }

        Optional<UserResponseDto> customerOptional = getCustomerByAccountEmail(getCurrentUserEmail.get());

        String oldImageUrl = customerOptional.get().getAvatar();
        storageService.deleteFile(oldImageUrl);

        customerOptional.get().setAvatar(null);
        Customer customer = mapToEntity(customerOptional.get());

        try {
            customerRepository.save(customer);
            return true;
        } catch (Exception e) {
            throw new ResourceInternalServerErrorException("internal.server.error");
        }
    }

    @Override
    public List<UserInfoResponseDto> findAllByAdmin() {
        return customerRepository.findAllByAdmin();
    }

}
