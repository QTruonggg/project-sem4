package hbs.booking.service;

import hbs.booking.model.dto.response.feedback.FeedbackListForManager;
import org.springframework.data.domain.Pageable;

public interface ManageFeedbackService {
    FeedbackListForManager getAllFeedbackForManager(String managerEmail);
    boolean hideFeedback(Long feedbackId);
    boolean showFeedback(Long feedbackId);
}
