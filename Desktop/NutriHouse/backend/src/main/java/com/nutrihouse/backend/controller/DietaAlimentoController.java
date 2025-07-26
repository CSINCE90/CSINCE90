package com.nutrihouse.backend.controller;

import com.nutrihouse.backend.model.DietaAlimento;
import com.nutrihouse.backend.service.DietaAlimentoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dieta-alimento")
@RequiredArgsConstructor
public class DietaAlimentoController {

    private final DietaAlimentoService dietaAlimentoService;

    @GetMapping
    public List<DietaAlimento> getAll() {
        return dietaAlimentoService.findAll();
    }

    @PostMapping
    public DietaAlimento create(@RequestBody DietaAlimento dietaAlimento) {
        return dietaAlimentoService.save(dietaAlimento);
    }

    @PostMapping("/bulk")
    public List<DietaAlimento> createBulk(@RequestBody List<DietaAlimento> dietaAlimenti) {
        return dietaAlimentoService.saveAll(dietaAlimenti);
    }
}
