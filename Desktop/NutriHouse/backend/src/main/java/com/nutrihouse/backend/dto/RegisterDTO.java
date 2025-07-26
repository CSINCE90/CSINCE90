package com.nutrihouse.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterDTO {
    private String nome;
    private String cognome;
    private String email;
    private String passw;
    private String telefono;
}
