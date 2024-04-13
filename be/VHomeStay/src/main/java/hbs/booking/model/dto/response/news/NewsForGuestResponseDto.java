package hbs.booking.model.dto.response.news;

import hbs.booking.enums.NewsSubject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewsForGuestResponseDto {
    private Long id;
    private String title;
    private NewsSubject subject;
    private String shortDescription;
    private String thumbnail;
    private Integer readTime;
    private LocalDateTime createdDate;

}
