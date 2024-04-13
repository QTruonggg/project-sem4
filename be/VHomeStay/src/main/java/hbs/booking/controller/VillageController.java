package hbs.booking.controller;

import hbs.booking.model.dto.request.question.FrequentlyQuestionInHomeResponseDto;
import hbs.booking.model.dto.response.ContactUsResponseDto;
import hbs.booking.model.dto.response.VillageInformationResponseDto;
import hbs.booking.model.entity.ContactUs;
import hbs.booking.model.entity.VillageInformation;
import hbs.booking.service.VillageInformationService;
import hbs.booking.util.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/village")
@RequiredArgsConstructor
public class VillageController {
    private final VillageInformationService villageInformationService;
    @GetMapping("/information")
    public ResponseEntity<?> getVillageInformation(){
        VillageInformationResponseDto villageInformations = villageInformationService.getVillageInformation().orElseThrow(()-> new ResourceNotFoundException("Village information not found"));

        return ResponseEntity.ok(villageInformations);
    }

    @GetMapping("/contact-us")
    public ResponseEntity<?> getContactUs(){
        List<ContactUs> contactUs = villageInformationService.getContactUs();

        Map<String, Object> response = Map.of(
                "contactUs", contactUs
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/frequently-questions")
    public ResponseEntity<?> getFrequentlyQuestions(){
        List<FrequentlyQuestionInHomeResponseDto> frequentlyQuestions = villageInformationService.getFrequentlyQuestions();

        Map<String, Object> response = Map.of(
                "frequentlyQuestions", frequentlyQuestions
        );
        return ResponseEntity.ok(response);
    }
}
