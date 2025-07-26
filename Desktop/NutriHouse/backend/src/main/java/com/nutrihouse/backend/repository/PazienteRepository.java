package com.nutrihouse.backend.repository;

import com.nutrihouse.backend.model.Paziente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PazienteRepository extends JpaRepository<Paziente, Long> {
    List<Paziente> findByUserId(Long userId); // pazienti gestiti da uno specifico nutrizionista
}