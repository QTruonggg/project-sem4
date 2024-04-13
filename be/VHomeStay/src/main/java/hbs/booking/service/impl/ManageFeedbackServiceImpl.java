package hbs.booking.service.impl;

import hbs.booking.constant.AppConstant;
import hbs.booking.enums.FeedbackStatus;
import hbs.booking.model.dto.response.feedback.FeedbackForManagerResponse;
import hbs.booking.model.dto.response.feedback.FeedbackListForManager;
import hbs.booking.model.entity.Feedback;
import hbs.booking.repository.FeedbackRepository;
import hbs.booking.service.ManageFeedbackService;
import hbs.booking.util.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


import java.text.DecimalFormat;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class ManageFeedbackServiceImpl implements ManageFeedbackService {

    private final FeedbackRepository feedbackRepository;

    @Override
    public FeedbackListForManager getAllFeedbackForManager(String managerEmail) {
        FeedbackListForManager feedbackListForManager = new FeedbackListForManager();
        List<FeedbackForManagerResponse> feedbackForManagerResponses = feedbackRepository.getAllFeedbackByManagerEmail(managerEmail);
        feedbackListForManager.setFeedbackListForManager(feedbackForManagerResponses);
        int size = feedbackForManagerResponses.size();
        if (size != 0 ){
            int i;
            double avgRating, sum = 0;
            for (i = 0; i < size; i++) {
                sum += feedbackForManagerResponses.get(i).getRating();
            }
            avgRating = sum / size;
            DecimalFormat formatter = new DecimalFormat("#.0");
            avgRating = Double.parseDouble(formatter.format(avgRating));
            feedbackListForManager.setAverageRating(avgRating);
            return feedbackListForManager;
        }
        return null;
    }

    @Override
    public boolean hideFeedback(Long feedbackId) {
        Optional<Feedback> feedbackOptional = feedbackRepository.findById(feedbackId);
        if (feedbackOptional.isPresent()) {
            Feedback feedback = feedbackOptional.get();
            feedback.setStatus(FeedbackStatus.HIDED);
            feedbackRepository.save(feedback);
            return true;
        }
        return false;
    }

    @Override
    public boolean showFeedback(Long feedbackId) {
        Optional<Feedback> feedbackOptional = feedbackRepository.findById(feedbackId);
        if (feedbackOptional.isPresent()) {
            Feedback feedback = feedbackOptional.get();
            feedback.setStatus(FeedbackStatus.SHOWED);
            feedbackRepository.save(feedback);
            return true;
        }
        return false;
    }


}
