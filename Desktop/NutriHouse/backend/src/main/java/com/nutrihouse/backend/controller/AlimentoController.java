package com.nutrihouse.backend.controller;

import com.nutrihouse.backend.model.Alimento;
import com.nutrihouse.backend.service.AlimentoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alimenti")
@RequiredArgsConstructor
public class AlimentoController {

    private final AlimentoService alimentoService;

    @GetMapping
    public List<Alimento> getAll() {
        return alimentoService.findAll();
    }

    @PostMapping
    public Alimento create(@RequestBody Alimento alimento) {
        return alimentoService.save(alimento);
    }
}
