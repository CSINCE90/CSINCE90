package com.nutrihouse.backend.controller;

import com.nutrihouse.backend.model.Paziente;
import com.nutrihouse.backend.model.User;
import com.nutrihouse.backend.repository.PazienteRepository;
import com.nutrihouse.backend.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pazienti")
public class PazienteController {

    private final PazienteRepository pazienteRepository;
    private final UserRepository userRepository;

    public PazienteController(PazienteRepository pazienteRepository, UserRepository userRepository) {
        this.pazienteRepository = pazienteRepository;
        this.userRepository = userRepository;
    }

    // ✅ GET /pazienti → tutti i pazienti
    @GetMapping
    public List<Paziente> getAll(@RequestParam(required = false) Long nutrizionistaId) {
        if (nutrizionistaId != null) {
            return pazienteRepository.findByUserId(nutrizionistaId);
        } else {
            return pazienteRepository.findAll();
        }
    }

    // ✅ GET /pazienti/{id}
    @GetMapping("/{id}")
    public Paziente getById(@PathVariable Long id) {
        return pazienteRepository.findById(id).orElse(null);
    }

    // ✅ POST /pazienti → inserimento paziente
    @PostMapping
    public Paziente create(@RequestBody Paziente paziente) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email;

        if (principal instanceof UserDetails) {
            email = ((UserDetails) principal).getUsername();
        } else {
            email = principal.toString();
        }

        User nutrizionista = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
        paziente.setUser(nutrizionista);

        return pazienteRepository.save(paziente);
    }
}