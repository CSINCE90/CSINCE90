package com.nutrihouse.backend.repository;

import com.nutrihouse.backend.model.DietaGiornaliera;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DietaGiornalieraRepository extends JpaRepository<DietaGiornaliera, Integer> {
}
