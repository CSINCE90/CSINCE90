package com.nutrihouse.backend.controller;

import com.nutrihouse.backend.model.Allergia;
import com.nutrihouse.backend.service.AllergiaService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/allergie")
@RequiredArgsConstructor
public class AllergiaController {

    private final AllergiaService allergiaService;

    @GetMapping
    public List<Allergia> getAll() {
        return allergiaService.findAll();
    }

    @PostMapping
    public Allergia create(@RequestBody Allergia allergia) {
        return allergiaService.save(allergia);
    }
}
