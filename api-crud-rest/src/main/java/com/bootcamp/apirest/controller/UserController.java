package com.bootcamp.apirest.controller;

import com.bootcamp.apirest.exception.*;
import com.bootcamp.apirest.model.User;
import com.bootcamp.apirest.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.*;

@RestController
@CrossOrigin({"http://localhost:3000/", "http://localhost:8081"})

public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private RestTemplate restTemplate; // Necesitarás un bean RestTemplate para realizar solicitudes a la API de validación

    @PostMapping("/users")
    public ResponseEntity<Object> newUser(@Valid @RequestBody User newUser) {
        try {
            // Antes de guardar el usuario, realiza la validación utilizando la API de validación
            validateDni(newUser.getDni());

            User savedUser = userService.saveUser(newUser);
            return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
        } catch (DuplicateDniException e) {
            return new ResponseEntity<>(new ApiError(HttpStatus.BAD_REQUEST, e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    private void validateDni(Long dni) {
        // Realiza una solicitud a la API de validación para validar el DNI
        ResponseEntity<String> responseEntity = restTemplate.getForEntity("http://localhost:8081/validate/dni/" + dni, String.class);

        if (responseEntity.getStatusCode() != HttpStatus.OK) {
            throw new RuntimeException("Invalid DNI");
        }
    }


    @GetMapping("/users")
    List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/users/{dni}")
    Optional<User> getUserByDni(@PathVariable Long dni) {
        return userService.getUserByDni(dni);
    }

    @PutMapping("/users/{dni}")
    User updateUser(@RequestBody User newUser, @PathVariable Long dni) {
        return userService.updateUser(dni, newUser);
    }

    @DeleteMapping("/users/{dni}")
    public ResponseEntity<String> deleteUser(@PathVariable Long dni) {
        userService.deleteUser(dni);
        return new ResponseEntity<>("User with DNI " + dni + " deleted successfully", HttpStatus.OK);
    }
}
