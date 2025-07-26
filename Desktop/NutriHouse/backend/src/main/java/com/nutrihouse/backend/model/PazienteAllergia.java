package com.nutrihouse.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Paziente_Allergia")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PazienteAllergia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_paziente")
    private Paziente paziente;

    @ManyToOne
    @JoinColumn(name = "id_allergia")
    private Allergia allergia;
}
