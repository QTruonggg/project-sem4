package hbs.booking.service;

import hbs.booking.enums.NewsSubject;
import hbs.booking.model.dto.request.news.NewsForCreateAndUpdateRequestDto;
import hbs.booking.model.dto.response.news.NewsForAdminResponseDto;
import hbs.booking.model.dto.response.news.NewsForGuestResponseDto;
import hbs.booking.model.entity.News;

import java.util.List;

public interface NewsService extends BaseService<News, Long>{
    List<NewsForAdminResponseDto> getNewsByAdmin();

    News getNewsDetail(Long newsId);

    void createNewsByAdmin(NewsForCreateAndUpdateRequestDto newsForCreateRequestDto);

    NewsForCreateAndUpdateRequestDto getNewsForUpdateByAdmin(Long newsId);

    void updateNewsByAdmin(Long newsId, NewsForCreateAndUpdateRequestDto newsForCreateRequestDto);

    void deleteNewsByAdmin(Long newsId);

    List<NewsForGuestResponseDto> getNewsByGuest();

    List<NewsForGuestResponseDto> getThreeNewsSameSubjectAndNotThisNews(NewsSubject subject, Long newsId);

    List<NewsForGuestResponseDto> getFourNewsLatest();
}
