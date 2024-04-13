//package hbs.booking.service.impl;
//
//import hbs.booking.enums.AccountRole;
//import hbs.booking.enums.AccountStatus;
//import hbs.booking.model.dto.request.*;
//import hbs.booking.model.entity.Account;
//import hbs.booking.repository.*;
//import hbs.booking.security.TokenProvider;
//import hbs.booking.util.exception.ResourceBadRequestException;
//import hbs.booking.util.exception.ResourceExceptionHandler;
//import hbs.booking.util.exception.ResourceNotFoundException;
//import jakarta.mail.MessagingException;
//import lombok.RequiredArgsConstructor;
//import org.junit.jupiter.api.MethodOrderer;
//import org.junit.jupiter.api.Order;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.TestMethodOrder;
//import org.junit.runner.RunWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//import org.mockito.junit.MockitoJUnitRunner;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.context.MessageSource;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.thymeleaf.TemplateEngine;
//
//import java.util.Optional;
//
//import static org.mockito.Mockito.when;
//import static org.junit.jupiter.api.Assertions.*;
//@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
//@SpringBootTest
//class AccountServiceImplTest {
//
//    @Autowired
//    private AccountServiceImpl accountService;
//    @Autowired
//    private AccountRepository accountRepository;
//
//    private final String otp = null;
////    @Test
////    @Order(1)
////    void register_success() throws MessagingException {
////        RegisterRequestDto registerRequestDto = new RegisterRequestDto();
////        registerRequestDto.setEmail("hmongpavivillage@gmail.com");
////        registerRequestDto.setPassword("@Testregister");
////        registerRequestDto.setFirstName("H'Mong");
////        registerRequestDto.setLastName("Pa Vi Village");
////
////        assertTrue(accountService.register(registerRequestDto));
////    }
//
//    @Test
//    @Order(2)
//    void register_exits_email() throws MessagingException {
//        RegisterRequestDto registerRequestDto = new RegisterRequestDto();
//        registerRequestDto.setEmail("hmongpavivillage@gmail.com");
//        registerRequestDto.setPassword("@Testregister");
//        registerRequestDto.setFirstName("H'Mong");
//        registerRequestDto.setLastName("Pa Vi Village");
//
//        assertThrows(ResourceBadRequestException.class, ()-> accountService.register(registerRequestDto));
//    }
//
//    @Test
//    @Order(5)
//    void login_success() {
//        LoginRequestDto loginRequestDto = new LoginRequestDto();
//        loginRequestDto.setEmail("emailcustomer@gmail.com");
//        loginRequestDto.setPassword("12345678");
//
//        assertNotNull(accountService.login(loginRequestDto));
//    }
//
//    @Test
//    @Order(6)
//    void login_email_not_exits() {
//        LoginRequestDto loginRequestDto = new LoginRequestDto();
//        loginRequestDto.setEmail("testnotexit@gmail.com");
//        loginRequestDto.setPassword("12345678");
//
//        assertThrows(ResourceNotFoundException.class, () -> accountService.login(loginRequestDto));
//    }
//
//    @Test
//    @Order(7)
//    void login_password_not_correct() {
//        LoginRequestDto loginRequestDto = new LoginRequestDto();
//        loginRequestDto.setEmail("emailcustomer@gmail.com");
//        loginRequestDto.setPassword("nottruepassword");
//
//        assertThrows(ResourceNotFoundException.class, () -> accountService.login(loginRequestDto));
//    }
//
//    @Test
//    @Order(8)
//    void login_account_not_active() {
//        LoginRequestDto loginRequestDto = new LoginRequestDto();
//        loginRequestDto.setEmail("hmongpavivillage@gmail.com");
//        loginRequestDto.setPassword("@Testregister");
//
//        assertThrows(ResourceNotFoundException.class, () -> accountService.login(loginRequestDto));
//    }
//
//    @Test
//    @Order(9)
//    void resetPassword_email_not_exits() throws MessagingException {
//        ResetPasswordRequestDto resetPasswordRequestDto = new ResetPasswordRequestDto();
//        resetPasswordRequestDto.setEmail("notexitsemail@gmail.com");
//
//        assertFalse(accountService.resetPassword(resetPasswordRequestDto));
//    }
//
//    @Test
//    @Order(10)
//    void resetPassword_success() throws MessagingException {
//        ResetPasswordRequestDto resetPasswordRequestDto = new ResetPasswordRequestDto();
//        resetPasswordRequestDto.setEmail("emailcustomer@gmail.com");
//
//        assertTrue(accountService.resetPassword(resetPasswordRequestDto));
//    }
//
//    @Test
//    @Order(11)
//    void findByOtp_otp_not_exits() {
//        String otp = "notexitsotp";
//        assertThrows(ResourceNotFoundException.class, () -> accountService.findByOtp(otp));
//    }
//
//    @Test
//    @Order(12)
//    void findByOtp_success() {
//        Optional<Account> optionalAccount = accountRepository.findByEmail("emailcustomer@gmail.com");
//        String otp = optionalAccount.get().getOtp();
//        assertNotNull(accountService.findByOtp(otp));
//    }
//
//    @Test
//    @Order(13)
//    void changePasswordForResetPassword_email_not_exits(){
//        ChangePasswordForResetRequestDto changePasswordForResetRequestDto = new ChangePasswordForResetRequestDto();
//        changePasswordForResetRequestDto.setEmail("emailnotexits@gmail.com");
//        changePasswordForResetRequestDto.setNewPassword("@TestchangePassword");
//        changePasswordForResetRequestDto.setConfirmPassword("@TestchangePassword");
//
//        assertFalse(accountService.changePasswordForResetPassword(changePasswordForResetRequestDto));
//    }
//
//    @Test
//    @Order(14)
//    void changePasswordForResetPassword_newPassword_and_confirmPassword_not_match(){
//        ChangePasswordForResetRequestDto changePasswordForResetRequestDto = new ChangePasswordForResetRequestDto();
//        changePasswordForResetRequestDto.setEmail("emailcustomer@gmail.com");
//        changePasswordForResetRequestDto.setNewPassword("notsameconfimpassword");
//        changePasswordForResetRequestDto.setConfirmPassword("notsamenewpassword");
//
//        assertFalse(accountService.changePasswordForResetPassword(changePasswordForResetRequestDto));
//    }
//
//    @Test
//    @Order(15)
//    void changePasswordForResetPassword_success(){
//        ChangePasswordForResetRequestDto changePasswordForResetRequestDto = new ChangePasswordForResetRequestDto();
//        changePasswordForResetRequestDto.setEmail("emailcustomer@gmail.com");
//        changePasswordForResetRequestDto.setNewPassword("12345678");
//        changePasswordForResetRequestDto.setConfirmPassword("12345678");
//
//        assertTrue(accountService.changePasswordForResetPassword(changePasswordForResetRequestDto));
//    }
//
//    @Test
//    @Order(16)
//    void changePassword_old_email_not_exits() {
//        String email = "emailnotexits@gmail.com";
//        ChangePasswordRequestDto changePasswordRequestDto = new ChangePasswordRequestDto();
//        changePasswordRequestDto.setOldPassword("12345678");
//        changePasswordRequestDto.setNewPassword("newpassword");
//        changePasswordRequestDto.setConfirmPassword("newpassword");
//
//        assertFalse(accountService.changePassword(changePasswordRequestDto, email));
//    }
//    @Test
//    @Order(17)
//    void changePassword_old_password_not_true() {
//        String email = "emailcustomer@gmail.com";
//        ChangePasswordRequestDto changePasswordRequestDto = new ChangePasswordRequestDto();
//        changePasswordRequestDto.setOldPassword("nottruepassword");
//        changePasswordRequestDto.setNewPassword("newpassword");
//        changePasswordRequestDto.setConfirmPassword("newpassword");
//
//        assertFalse(accountService.changePassword(changePasswordRequestDto, email));
//    }
//
//    @Test
//    @Order(19)
//    void changePassword_newPassword_not_match_confirmPassword(){
//        String email = "emailcustomer@gmail.com";
//        ChangePasswordRequestDto changePasswordRequestDto = new ChangePasswordRequestDto();
//        changePasswordRequestDto.setOldPassword("12345678");
//        changePasswordRequestDto.setNewPassword("newpassword");
//        changePasswordRequestDto.setConfirmPassword("confirmpassword");
//
//        assertFalse(accountService.changePassword(changePasswordRequestDto, email));
//    }
//
//    @Test
//    @Order(18)
//    void changePassword_success(){
//        String email = "emailcustomer@gmail.com";
//        ChangePasswordRequestDto changePasswordRequestDto = new ChangePasswordRequestDto();
//        changePasswordRequestDto.setOldPassword("12345678");
//        changePasswordRequestDto.setNewPassword("newpassword");
//        changePasswordRequestDto.setConfirmPassword("newpassword");
//
//        assertTrue(accountService.changePassword(changePasswordRequestDto, email));
//    }
//
//
//}