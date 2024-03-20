package com.d102.api.domain;

import com.d102.common.domain.BaseTime;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class CommonCategory extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "category", length = 16, nullable = false)
    private String category;

    @OneToMany(mappedBy = "commonCategory", orphanRemoval = true)
    private List<CommonQuestion> commonQuestions;

}
