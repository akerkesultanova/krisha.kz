package com.react.restapi.react_task_3.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "cardtasks")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CardTasks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    private Cards card;

    @Column(name = "taskText")
    private String taskText;

    @Column(name = "addedDate")
    private Date addedDate;

    @Column(name = "done")
    private boolean done;
}
