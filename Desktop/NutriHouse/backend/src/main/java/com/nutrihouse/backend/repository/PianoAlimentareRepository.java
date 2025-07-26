package com.nutrihouse.backend.repository;

import com.nutrihouse.backend.model.PianoAlimentare;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PianoAlimentareRepository extends JpaRepository<PianoAlimentare, Integer> {
}
