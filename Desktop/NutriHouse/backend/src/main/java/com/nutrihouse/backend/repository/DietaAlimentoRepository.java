package com.nutrihouse.backend.repository;

import com.nutrihouse.backend.model.DietaAlimento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DietaAlimentoRepository extends JpaRepository<DietaAlimento, Integer> {
    
}
