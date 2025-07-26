package com.nutrihouse.backend.controller;

import com.nutrihouse.backend.model.PianoAlimentare;
import com.nutrihouse.backend.service.PianoAlimentareService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/piani")
@RequiredArgsConstructor
public class PianoAlimentareController {

    private final PianoAlimentareService pianoAlimentareService;

    @GetMapping
    public List<PianoAlimentare> getAllPianiAlimentari() {
        return pianoAlimentareService.findAll();
    }

    @PostMapping
    public PianoAlimentare create(@RequestBody PianoAlimentare piano) {
        return pianoAlimentareService.save(piano);
    }
}
