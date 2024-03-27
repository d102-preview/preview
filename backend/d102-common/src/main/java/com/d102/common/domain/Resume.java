package com.d102.common.domain;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Resume extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "file_name", length = 128, nullable = false)
    private String fileName;

    @Column(name = "display_name", length = 16, nullable = false)
    private String displayName;

    @Column(name = "file_path", length = 512, nullable = false)
    private String filePath;

}
