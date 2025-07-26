

package com.nutrihouse.backend.service;

import com.nutrihouse.backend.dto.AuthRequest;
import com.nutrihouse.backend.dto.AuthResponse;
import com.nutrihouse.backend.dto.RegisterDTO;
import com.nutrihouse.backend.model.User;
import com.nutrihouse.backend.repository.UserRepository;
import com.nutrihouse.backend.security.CustomUserDetails;
//import com.nutrihouse.backend.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterDTO request) {
        User user = new User();
        user.setEmail(request.getEmail());
        user.setNome(request.getNome());
        user.setCognome(request.getCognome());
        user.setPassw(passwordEncoder.encode(request.getPassw()));

        User savedUser = userRepository.save(user);
        String token = jwtService.generateToken(new CustomUserDetails(savedUser));
        return new AuthResponse(token);
    }

    public AuthResponse login(AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassw())
        );

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        String token = jwtService.generateToken(userDetails);
        return new AuthResponse(token);
    }
}