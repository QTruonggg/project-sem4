package hbs.booking.model.dto.request.question;

import hbs.booking.enums.FrequentlyQuestionType;
import hbs.booking.model.entity.FrequentlyQuestion;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@ToString
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FrequentlyQuestionInHomeResponseDto {
    private FrequentlyQuestionType type;
    private List<FrequentlyQuestion> frequentlyQuestions;
}
