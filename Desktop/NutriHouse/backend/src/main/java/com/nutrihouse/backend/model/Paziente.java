package com.nutrihouse.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Paziente")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Paziente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String cognome;

    private String email;
    private String telefono;

    @ManyToOne
    @JoinColumn(name = "id_user", nullable = false)
    private User user;
}