package com.bootcamp.validationapi.controller;

import com.bootcamp.validationapi.exception.InvalidDniFormatException;
import com.bootcamp.validationapi.service.DniValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/validate")
@CrossOrigin("http://localhost:8080")

public class ValidationController {

    @Autowired
    private DniValidationService dniValidationService;

    @GetMapping("/dni/{dni}")
    public ResponseEntity<String> validateDni(@PathVariable String dni) {
        try {
            dniValidationService.validateDniFormat(dni);
            // Puedes agregar lógica adicional aquí, como verificar en la API CRUD si ya existe el DNI.
            return new ResponseEntity<>("DNI is valid", HttpStatus.OK);
        } catch (InvalidDniFormatException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
