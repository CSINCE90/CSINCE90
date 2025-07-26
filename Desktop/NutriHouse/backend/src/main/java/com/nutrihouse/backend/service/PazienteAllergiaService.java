package com.nutrihouse.backend.service;

import com.nutrihouse.backend.model.PazienteAllergia;
import com.nutrihouse.backend.repository.PazienteAllergiaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PazienteAllergiaService {

    private final PazienteAllergiaRepository pazienteAllergiaRepository;

    public List<PazienteAllergia> findAll() {
        return pazienteAllergiaRepository.findAll();
    }

    public PazienteAllergia save(PazienteAllergia pazienteAllergia) {
        return pazienteAllergiaRepository.save(pazienteAllergia);
    }
}
