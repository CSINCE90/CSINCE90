package com.nutrihouse.backend.service;

import com.nutrihouse.backend.model.PianoAlimentare;
import com.nutrihouse.backend.repository.PianoAlimentareRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PianoAlimentareService {

    private final PianoAlimentareRepository pianoRepository;

    public List<PianoAlimentare> findAll() {
        return pianoRepository.findAll();
    }

    public PianoAlimentare save(PianoAlimentare piano) {
        return pianoRepository.save(piano);
    }
}
