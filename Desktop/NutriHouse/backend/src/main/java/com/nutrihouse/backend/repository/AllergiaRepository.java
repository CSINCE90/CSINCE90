package com.nutrihouse.backend.repository;

import com.nutrihouse.backend.model.Allergia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AllergiaRepository extends JpaRepository<Allergia, Integer> {
}
