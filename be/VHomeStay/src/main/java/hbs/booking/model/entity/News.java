package hbs.booking.model.entity;

import hbs.booking.enums.NewsSubject;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Nationalized;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class News extends AbstractAuditingEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Nationalized
    @Column(columnDefinition = "VARCHAR(100)")
    private String title;
    @Enumerated(EnumType.STRING)
    private NewsSubject subject;
    @Nationalized
    private String shortDescription;
    private String thumbnail;
    @Nationalized
    @Column(columnDefinition = "TEXT")
    private String content;
    private Integer readTime;
}
