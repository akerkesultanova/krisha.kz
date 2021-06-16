package com.react.restapi.react_task_3.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GeneratorType;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "cards")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cards {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "addedDate")
    private Date date;

}
