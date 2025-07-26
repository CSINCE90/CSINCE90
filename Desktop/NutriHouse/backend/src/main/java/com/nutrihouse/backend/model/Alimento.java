package com.nutrihouse.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Alimento")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Alimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nome;

    private String categoria;

    @Column(name = "kcal_100g")
    private Float kcal100g;

    private Float proteine;

    private Float carboidrati;

    private Float grassi;
}