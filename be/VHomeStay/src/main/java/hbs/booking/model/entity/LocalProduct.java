package hbs.booking.model.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import hbs.booking.enums.BaseStatus;
import hbs.booking.enums.LocalProductPosition;
import hbs.booking.enums.LocalProductType;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Nationalized;

import java.math.BigDecimal;
import java.util.List;

@Data
@Entity
public class LocalProduct extends AbstractAuditingEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    @Nationalized
    private String productName;
    @Nationalized
    @Column(columnDefinition = "TEXT")
    private String productDescription;
    private String unit;
    @Enumerated(EnumType.STRING)
    private LocalProductType type;
    private BigDecimal lowestPrice;
    private BigDecimal highestPrice;
    @Enumerated(EnumType.STRING)
    private BaseStatus status;
    @Enumerated(EnumType.STRING)
    private LocalProductPosition localProductPosition;
    @OneToMany(mappedBy = "localProduct")
    @JsonManagedReference
    private List<VillageMedia> villageMedias;
}
