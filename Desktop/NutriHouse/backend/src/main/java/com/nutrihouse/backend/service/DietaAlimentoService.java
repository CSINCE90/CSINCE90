package com.nutrihouse.backend.service;

import com.nutrihouse.backend.model.DietaAlimento;
import com.nutrihouse.backend.repository.DietaAlimentoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DietaAlimentoService {

    private final DietaAlimentoRepository dietaAlimentoRepository;

    public List<DietaAlimento> findAll() {
        return dietaAlimentoRepository.findAll();
    }

    public DietaAlimento save(DietaAlimento dietaAlimento) {
        return dietaAlimentoRepository.save(dietaAlimento);
    }

    public List<DietaAlimento> saveAll(List<DietaAlimento> dietaAlimenti) {
        return dietaAlimentoRepository.saveAll(dietaAlimenti);
    }
}
