package com.nutrihouse.backend.controller;

import com.nutrihouse.backend.model.DietaGiornaliera;
import com.nutrihouse.backend.service.DietaGiornalieraService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/diete")
@RequiredArgsConstructor
public class DietaGiornalieraController {

    private final DietaGiornalieraService dietaGiornalieraService;

    @GetMapping
    public List<DietaGiornaliera> getAll() {
        return dietaGiornalieraService.findAll();
    }

    @PostMapping
    public DietaGiornaliera create(@RequestBody DietaGiornaliera dieta) {
        return dietaGiornalieraService.save(dieta);
    }
}
