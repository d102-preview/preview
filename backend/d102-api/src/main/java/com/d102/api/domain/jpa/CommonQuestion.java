package com.d102.api.domain.jpa;

import com.d102.common.domain.jpa.BaseTime;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class CommonQuestion extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private CommonCategory commonCategory;

    @Column(name = "question", length = 512, nullable = false)
    private String question;

}
