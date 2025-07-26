package com.nutrihouse.backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "Piano_Alimentare")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PianoAlimentare {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "data")
    private LocalDate data;

    private String note;

    @ManyToOne
    @JoinColumn(name = "id_paziente")
    private Paziente paziente;

    @OneToMany(mappedBy = "piano", cascade = CascadeType.ALL)
    private List<DietaGiornaliera> dieteGiornaliere;
}
