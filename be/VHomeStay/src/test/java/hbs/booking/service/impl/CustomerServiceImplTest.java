//package hbs.booking.service.impl;
//
//import hbs.booking.enums.AccountRole;
//import hbs.booking.enums.AccountStatus;
//import hbs.booking.enums.Gender;
//import hbs.booking.mapper.UserResponseMapper;
//import hbs.booking.model.dto.response.UserResponseDto;
//import hbs.booking.model.entity.Account;
//import hbs.booking.model.entity.Customer;
//import hbs.booking.repository.CustomerRepository;
//import hbs.booking.security.SecurityUtil;
//import hbs.booking.util.exception.ResourceBadRequestException;
//import hbs.booking.util.exception.ResourceNotFoundException;
//import org.junit.jupiter.api.Test;
//import org.junit.runner.RunWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.Mockito;
//import org.mockito.junit.MockitoJUnitRunner;
//import org.modelmapper.ModelMapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.context.MessageSource;
//import org.springframework.security.test.context.support.WithMockUser;
//
//import java.time.LocalDate;
//import java.util.Locale;
//import java.util.Map;
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@SpringBootTest
//@RunWith(MockitoJUnitRunner.class)
//class CustomerServiceImplTest {
//    @Mock
//    private CustomerRepository customerRepository;
//    @Mock
//    private MessageSource messageSource;
//    @Mock
//    private UserResponseMapper userResponseMapper;
//    @InjectMocks
//    private CustomerServiceImpl customerService;
//
//    @Test
//    @WithMockUser(username = "emailcustomer@gmail.com", roles = "CUSTOMER")
//    void testGetCustomerByAccountEmail1() {
//        String email = SecurityUtil.getCurrentUserLogin().get();
//
//        Account account = Account.builder()
//                .id(1L)
//                .email("emailcustomer@gmail.com")
//                .password("123456")
//                .status(AccountStatus.ACTIVE)
//                .role(AccountRole.CUSTOMER)
//                .otp("123456")
//                .build();
//
//
//        Customer customer = Customer.builder()
//                .id(1L)
//                .firstName("Test")
//                .lastName("Customer")
//                .dateOfBirth(LocalDate.of(2001, 8, 2))
//                .gender(Gender.FEMALE)
//                .phoneNumber("0123456789")
//                .address("Test Address")
//                .avatar("Test Avatar")
//                .account(account)
//                .build();
//
//        UserResponseDto userResponseDto = UserResponseDto.builder()
//                .id(1L)
//                .avatar("Test Avatar")
//                .email("emailcustomer@gmail.com")
//                .firstName("Test")
//                .lastName("Customer")
//                .phoneNumber("0123456789")
//                .gender(Gender.FEMALE)
//                .dateOfBirth(LocalDate.of(2001, 8, 2))
//                .address("Test Address")
//                .accountId(1L)
//                .role(AccountRole.CUSTOMER)
//                .build();
//
//        Mockito.when(customerRepository.getCustomerByAccountEmail(email)).thenReturn(Optional.of(customer));
//
//        Mockito.when(userResponseMapper.mapToCustomerDTO(customer)).thenReturn(userResponseDto);
//
//        Optional<UserResponseDto> result = customerService.getCustomerByAccountEmail(email);
//
//        assertTrue(result.isPresent());
//        assertEquals(1L, result.get().getId());
//        assertEquals("Test", result.get().getFirstName());
//        assertEquals("Customer", result.get().getLastName());
//    }
//
//    @Test
//    @WithMockUser(username = "emailcustomer@gmail.com", roles = "CUSTOMER")
//    void testUpdateCustomerProfile1(){
//        Map<String, Object> data = Map.of("dateOfBirth", "Linh");
//
//        String email = SecurityUtil.getCurrentUserLogin().get();
//
//        Account account = Account.builder()
//                .id(1L)
//                .email("emailcustomer@gmail.com")
//                .password("123456")
//                .status(AccountStatus.ACTIVE)
//                .role(AccountRole.CUSTOMER)
//                .otp("123456")
//                .build();
//
//
//        Customer customer = Customer.builder()
//                .id(1L)
//                .firstName("Test")
//                .lastName("Customer")
//                .dateOfBirth(LocalDate.of(2001, 8, 2))
//                .gender(Gender.FEMALE)
//                .phoneNumber("0123456789")
//                .address("Test Address")
//                .avatar("Test Avatar")
//                .account(account)
//                .build();
//
//        UserResponseDto userResponseDto = UserResponseDto.builder()
//                .id(1L)
//                .avatar("Test Avatar")
//                .email("emailcustomer@gmail.com")
//                .firstName("Test")
//                .lastName("Customer")
//                .phoneNumber("0123456789")
//                .gender(Gender.FEMALE)
//                .dateOfBirth(LocalDate.of(2001, 8, 2))
//                .address("Test Address")
//                .accountId(1L)
//                .role(AccountRole.CUSTOMER)
//                .build();
//
//        Customer result = Customer.builder()
//                .id(1L)
//                .firstName("He")
//                .lastName("Linh")
//                .dateOfBirth(LocalDate.of(2001, 8, 2))
//                .gender(Gender.FEMALE)
//                .phoneNumber("0123456789")
//                .address("Test Address")
//                .avatar("Test Avatar")
//                .account(account)
//                .build();
//
//        Mockito.when(customerRepository.getCustomerByAccountEmail("emailcustomer@gmail.com")).thenReturn(Optional.of(customer));
//        Mockito.when(customerService.getCustomerByAccountEmail(email)).thenReturn(Optional.of(userResponseDto));
//        Mockito.when(customerRepository.save(Mockito.any())).thenReturn(result);
//
//        assertThrows(ResourceBadRequestException.class, () -> customerService.updateCustomerProfile(data));
//    }
//}