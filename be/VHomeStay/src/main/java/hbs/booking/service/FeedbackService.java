package hbs.booking.service;

import hbs.booking.model.dto.response.FeedbackResponseDto;
import hbs.booking.model.dto.response.feedback.AddFeedbackForm;
import hbs.booking.model.dto.response.feedback.EditFeedbackForm;
import hbs.booking.model.entity.Feedback;

import java.util.List;
import java.util.Optional;

public interface FeedbackService extends BaseService<Feedback, Long>{
    List<FeedbackResponseDto> getFeedbacksByEmail();
    Optional<FeedbackResponseDto> getFeedbackById(Long id);
    FeedbackResponseDto mapToDTO(Feedback feedback);
    Feedback mapToEntity(FeedbackResponseDto feedbackResponseDto);
    AddFeedbackForm showAddFeedbackForm(String bookingCode);
    EditFeedbackForm showEditFeedbackForm(Long feedbackId);
    boolean addFeedback(String bookingCode, String content, int rating);
    boolean editFeedback(Long feedbackId, String content, int rating);
}
