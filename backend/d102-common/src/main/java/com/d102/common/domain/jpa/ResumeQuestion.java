package com.d102.common.domain.jpa;

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
public class ResumeQuestion extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resume_id", nullable = false)
    private Resume resume;

    @Column(name = "question", length = 512, nullable = false)
    private String question;

    @OneToOne(mappedBy = "resumeQuestion", fetch = FetchType.LAZY)
    private ResumeScript resumeScript;

    @OneToMany(mappedBy = "resumeQuestion")
    private List<ResumeKeyword> resumeKeywordList;

}
