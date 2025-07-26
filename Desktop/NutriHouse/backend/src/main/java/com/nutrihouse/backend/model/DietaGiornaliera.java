package com.nutrihouse.backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "Dieta_Giornaliera")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DietaGiornaliera {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private LocalDate data;

    private String note;

    @ManyToOne
    @JoinColumn(name = "id_piano")
    private PianoAlimentare piano;

    @OneToMany(mappedBy = "dieta", cascade = CascadeType.ALL)
    private List<DietaAlimento> alimenti;
}
