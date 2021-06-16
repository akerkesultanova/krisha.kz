package com.react.restapi.react_task_3.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GeneratorType;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;

@Entity
@Table(name = "t_ad")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Ad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "addedDate")
    private Date date;

    @Column(name = "room")
    private int room;

    @Column(name = "price")
    private Double price;

    @Column(name = "image", length = 200)
    private String image;

    @ManyToOne(fetch = FetchType.EAGER)
    private Type type;

    @ManyToOne(fetch = FetchType.EAGER)
    private Category category;

    @ManyToOne(fetch = FetchType.EAGER)
    private Region region;

    @ManyToOne(fetch = FetchType.EAGER)
    private Users user;


}
