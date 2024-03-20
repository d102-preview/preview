package com.d102.common.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

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

    @Column(length = 16, nullable = false)
    private String type;

    @Column(length = 512, nullable = false)
    private String question;

    @Column(name = "video_path", length = 512, nullable = false)
    private String videoPath;

    @Column(name = "thumbnail_path", length = 512, nullable = false)
    private String thumbnailPath;

    @Column(length = 128, nullable = false)
    private String keyword;

    @Column(name = "set_start_time", nullable = false)
    private LocalDateTime setStartTime;

    @Column(name = "analysis_req_time", nullable = false)
    private LocalDateTime analysisReqTime;

    @Column(name = "analysis_start_time")
    private LocalDateTime analysisStartTime;

    @Column(name = "analysis_end_time")
    private LocalDateTime analysisEndTime;

}
