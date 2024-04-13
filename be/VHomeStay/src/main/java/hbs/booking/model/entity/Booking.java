package hbs.booking.model.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import hbs.booking.enums.BookingStatus;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import net.minidev.json.annotate.JsonIgnore;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@ToString(exclude = {"customer", "household", "feedback", "bookingDetails", "payment", "cancellationHistory"})
public class Booking {

    @Id
    private String bookingCode;
    private Integer totalRoom;
    private Integer totalGuest;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private BigDecimal totalPrice;
    private String checkInName;
    private String checkInPhoneNumber;
    private Integer totalNight;
    @Enumerated(EnumType.STRING)
    private BookingStatus status;
    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdDate;
    @LastModifiedDate
    private LocalDateTime lastModifiedDate;

    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    @JsonIgnore
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "household_id", referencedColumnName = "id")
    @JsonIgnore
    private Household household;

    @OneToOne(mappedBy = "booking")
    @JsonIgnore
    private Feedback feedback;

    @OneToMany(mappedBy = "booking", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JsonIgnore
    private List<BookingDetail> bookingDetails;

    @OneToOne(mappedBy = "booking", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JsonIgnore
    private Payment payment;

    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL)
    @JsonIgnore
    private CancellationHistory cancellationHistory;

    @PrePersist
    public void prePersist() {
        this.createdDate = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.lastModifiedDate = LocalDateTime.now();
    }
}
