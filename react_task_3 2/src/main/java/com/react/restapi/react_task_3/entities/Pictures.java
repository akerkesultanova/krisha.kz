package com.react.restapi.react_task_3.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "t_pictures")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Pictures {


        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "id")
        private Long id;

        @Column(name = "url")
        private String url;

        @Column(name = "addedDate")
        private Date addedDate;

        @ManyToOne(fetch = FetchType.EAGER)
        private Ad ad;
    }
