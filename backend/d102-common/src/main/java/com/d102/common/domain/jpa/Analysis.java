package com.d102.common.domain.jpa;

import com.d102.common.util.StringListConverter;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Analysis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "type", length = 16, nullable = false)
    private String type;

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

    @Column(name = "script", length = 1024)
    private String script;

    @Column(name = "set_start_time", nullable = false)
    private LocalDateTime setStartTime;

    @Column(name = "analysis_req_time")
    private LocalDateTime analysisReqTime;

    @Column(name = "analysis_start_time")
    private LocalDateTime analysisStartTime;

    @Column(name = "analysis_end_time")
    private LocalDateTime analysisEndTime;

    @Column(name = "video_length")
    private int videoLength;

    @Column(name = "fps")
    private int fps;

    @Column(name = "frames")
    private int frames;

    @Column(name = "emotion")
    private String emotion;

    @Column(name = "intent")
    private String intent;

}
