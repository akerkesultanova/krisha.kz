package com.react.restapi.react_task_3.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "t_favorites")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Favorites {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    private Users user;

    @ManyToOne(fetch = FetchType.EAGER)
    private Ad ad;

}
