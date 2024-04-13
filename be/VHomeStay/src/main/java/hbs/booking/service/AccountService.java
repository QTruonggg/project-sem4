package hbs.booking.service;


import hbs.booking.model.dto.request.*;
import hbs.booking.model.dto.response.LoginResponseDto;
import hbs.booking.model.dto.response.UserResponseDto;
import hbs.booking.model.entity.Account;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequestWrapper;
import jakarta.servlet.http.HttpServletResponseWrapper;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.Optional;

public interface AccountService extends BaseService<Account, Long>{
    Optional<Account> findByEmail(String account);
    boolean register(RegisterRequestDto request) throws MessagingException;
    LoginResponseDto login(LoginRequestDto request);
    boolean resetPassword(ResetPasswordRequestDto request) throws MessagingException;
    String verifyOTPForResetPassword(Account account);
    boolean changePassword(ChangePasswordRequestDto request, String email);
    boolean changePasswordForResetPassword(ChangePasswordForResetRequestDto request);
    LoginResponseDto refreshToken(String refreshToken) throws IOException;
    boolean confirmEmail(String confirmationToken, String firstName, String lastName);
    boolean reSendConfirmEmail(String email, String firstName, String lastName) throws MessagingException;
    Optional<Account> findByOtp(String otp);
    LoginResponseDto socialLogin(RegisterWithoutVerifyRequest request);
}
