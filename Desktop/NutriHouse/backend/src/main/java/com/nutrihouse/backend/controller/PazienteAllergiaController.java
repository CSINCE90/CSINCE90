package com.nutrihouse.backend.controller;

import com.nutrihouse.backend.model.PazienteAllergia;
import com.nutrihouse.backend.service.PazienteAllergiaService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/paziente-allergie")
@RequiredArgsConstructor
public class PazienteAllergiaController {

    private final PazienteAllergiaService pazienteAllergiaService;

    @GetMapping
    public List<PazienteAllergia> getAll() {
        return pazienteAllergiaService.findAll();
    }

    @PostMapping
    public PazienteAllergia create(@RequestBody PazienteAllergia pazienteAllergia) {
        return pazienteAllergiaService.save(pazienteAllergia);
    }
}
