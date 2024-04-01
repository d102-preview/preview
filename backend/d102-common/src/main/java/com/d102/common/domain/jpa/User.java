package com.d102.common.domain.jpa;

import com.d102.common.constant.RoleName;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
public class User extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "role", length = 8, nullable = false)
    @Enumerated(EnumType.STRING)
    private RoleName role;

    @Column(name = "email", length = 64, unique = true, nullable = false)
    private String email;

    @Column(name = "password", length = 72, unique = true, nullable = false)
    private String password;

    @Column(name = "name", length = 8, nullable = false)
    private String name;

    @Column(name = "profile_image_name", length = 128)
    private String profileImageName;

    @Column(name = "profile_image_url", length = 512)
    private String profileImageUrl;

    @Column(name = "profile_image_size")
    private Long profileImageSize;

    @Column(name = "deleted_time")
    private LocalDateTime deletedTime;

    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    private List<Resume> resumeList;

}
