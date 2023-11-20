package com.bootcamp.apirest.model;

import jakarta.persistence.*;
import lombok.Data;
import jakarta.validation.constraints.*;


@Entity
@Data
public class User {

    @Id
    @Column(unique = true)
    @NotNull(message = "The DNI cannot be null.")

    private Long dni;

    @NotNull(message = "The first name cannot be null.")
    @NotBlank(message = "The first name cannot be blank.")
    @Pattern(regexp = "^[a-zA-Z]+(?:\\s[a-zA-Z]+)?$", message = "The last name must contain only letters, and if there is a space, it should be followed by at least one letter.")
    private String first_name;

    @NotNull(message = "The last name cannot be null.")
    @NotBlank(message = "The last name cannot be blank.")
    @Pattern(regexp = "^[a-zA-Z]+(?:\\s[a-zA-Z]+)?$", message = "The last name must contain only letters, and if there is a space, it should be followed by at least one letter.")
    private String last_name;

    @NotNull(message = "The JOB cannot be null.")
    @NotBlank(message = "The JOB cannot be blank.")
    @Pattern(regexp = "^[a-zA-Z ]+$", message = "The last name must contain only letters and spaces.")
    private String job;

}
