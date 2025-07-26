package com.nutrihouse.backend.service;

import com.nutrihouse.backend.model.Alimento;
import com.nutrihouse.backend.repository.AlimentoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlimentoService {

    private final AlimentoRepository alimentoRepository;

    public List<Alimento> findAll() {
        return alimentoRepository.findAll();
    }

    public Alimento save(Alimento alimento) {
        return alimentoRepository.save(alimento);
    }
}
