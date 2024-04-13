package hbs.booking.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FeedbackListResponseDto {
    private List<FeedbackResponseDto> feedbackResponseDtos;
}
