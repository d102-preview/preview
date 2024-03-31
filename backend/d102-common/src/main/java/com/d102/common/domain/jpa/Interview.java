package com.d102.common.domain.jpa;

import com.d102.common.constant.InterviewType;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Interview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type", length = 16, nullable = false)
    @Enumerated(EnumType.STRING)
    private InterviewType type;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @OneToMany(mappedBy = "interview")
    private List<Analysis> analysisList;

}
