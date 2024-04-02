package com.d102.common.domain.jpa;

import com.d102.common.constant.QuestionType;
import com.d102.common.util.StringListConverter;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Analysis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "interview_id", nullable = false)
    private Interview interview;

    @Column(name = "question_type", length = 16, nullable = false)
    @Enumerated(EnumType.STRING)
    private QuestionType questionType;

    @Column(name = "question", length = 512, nullable = false)
    private String question;

    @Column(name = "answer", length = 1024)
    private String answer;

    @Column(name = "video_path", length = 1024, nullable = false)
    private String videoPath;

    @Column(name = "thumbnail_path", length = 1024, nullable = false)
    private String thumbnailPath;

    @Column(name = "keyword_list", length = 512, nullable = false)
    @Convert(converter = StringListConverter.class)
    private List<String> keywordList;

    @Column(name = "analysis_req_time")
    private LocalDateTime analysisReqTime;

    @Column(name = "analysis_start_time")
    private LocalDateTime analysisStartTime;

    @Column(name = "analysis_end_time")
    private LocalDateTime analysisEndTime;

    @Column(name = "analysis_status", length = 16)
    private String analysisStatus;

    @Column(name = "video_length")
    private Integer videoLength;

    @Column(name = "video_size")
    private Long videoSize;

    @Column(name = "fps")
    private Integer fps;

    @Column(name = "frames")
    private Integer frames;

    @Column(name = "emotion")
    private String emotion;

    @Column(name = "intent")
    private String intent;

}
