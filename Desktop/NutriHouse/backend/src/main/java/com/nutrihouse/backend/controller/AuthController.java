package com.nutrihouse.backend.controller;

import com.nutrihouse.backend.dto.AuthRequest;
import com.nutrihouse.backend.dto.AuthResponse;
import com.nutrihouse.backend.dto.RegisterDTO;
import com.nutrihouse.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) {
        return authService.login(request);
    }

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterDTO request) {
        return authService.register(request);
    }
}
