package hbs.booking.service;

import hbs.booking.enums.FrequentlyQuestionType;
import hbs.booking.model.dto.request.question.FrequentlyQuestionInHomeResponseDto;
import hbs.booking.model.dto.request.villageInformation.InformationAdminRequestDto;
import hbs.booking.model.dto.response.ContactUsResponseDto;
import hbs.booking.model.dto.response.VillageInformationResponseDto;
import hbs.booking.model.entity.ContactUs;
import hbs.booking.model.entity.FrequentlyQuestion;
import hbs.booking.model.entity.VillageInformation;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface VillageInformationService extends BaseService<VillageInformation, Long> {
    Optional<VillageInformationResponseDto> getVillageInformation();

    List<ContactUs> getContactUs();

    void updateContactUsByAdmin(ContactUs contactUs);

    List<InformationAdminRequestDto> getVillageInformationByAdmin();

    void updateVillageInformationByAdmin(InformationAdminRequestDto informationAdminRequestDto) throws IOException;

    List<FrequentlyQuestion> getFrequentlyQuestionsByAdmin();

    void createFrequentlyQuestionsByAdmin(FrequentlyQuestion frequentlyQuestion);

    List<FrequentlyQuestionType> getAllFrequentlyQuestionType();

    Optional<FrequentlyQuestion> findFrequentlyQuestionById(Long questionId);

    void updateFrequentlyQuestionsByAdmin(FrequentlyQuestion frequentlyQuestion);

    List<FrequentlyQuestionInHomeResponseDto> getFrequentlyQuestions();

    void deleteFrequentlyQuestionsByAdmin(Long questionId);
}
