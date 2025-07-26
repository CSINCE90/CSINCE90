package com.nutrihouse.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Dieta_Alimento")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DietaAlimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Float grammi;

    @ManyToOne
    @JoinColumn(name = "id_dieta")
    private DietaGiornaliera dieta;

    @ManyToOne
    @JoinColumn(name = "id_alimento")
    private Alimento alimento;
}
