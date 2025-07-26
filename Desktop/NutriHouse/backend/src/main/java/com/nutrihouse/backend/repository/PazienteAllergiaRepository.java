package com.nutrihouse.backend.repository;

import com.nutrihouse.backend.model.PazienteAllergia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PazienteAllergiaRepository extends JpaRepository<PazienteAllergia, Integer> {
    
}