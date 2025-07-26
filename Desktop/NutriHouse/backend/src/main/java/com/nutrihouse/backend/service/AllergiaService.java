package com.nutrihouse.backend.service;

import com.nutrihouse.backend.model.Allergia;
import com.nutrihouse.backend.repository.AllergiaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AllergiaService {

    private final AllergiaRepository allergiaRepository;

    public List<Allergia> findAll() {
        return allergiaRepository.findAll();
    }

    public Allergia save(Allergia allergia) {
        return allergiaRepository.save(allergia);
    }
}
