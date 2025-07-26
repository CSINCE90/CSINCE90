package com.nutrihouse.backend.service;

import com.nutrihouse.backend.model.Paziente;
import com.nutrihouse.backend.repository.PazienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PazienteService {

    private final PazienteRepository pazienteRepository;

    public PazienteService(PazienteRepository pazienteRepository) {
        this.pazienteRepository = pazienteRepository;
    }

    public List<Paziente> getAllPazienti() {
        return pazienteRepository.findAll();
    }

    public List<Paziente> getByNutrizionista(Long userId) {
        return pazienteRepository.findByUserId(userId);
    }

    public Optional<Paziente> getById(Long id) {
        return pazienteRepository.findById(id);
    }

    public Paziente create(Paziente paziente) {
        return pazienteRepository.save(paziente);
    }
}