package com.ems.dto;

import com.ems.entity.EmployeeStatus;
import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDate;

@Data
public class CreateEmployeeRequest {

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotNull(message = "Salary is required")
    @Positive(message = "Salary must be positive")
    private Double salary;

    private LocalDate joiningDate;

    private EmployeeStatus status = EmployeeStatus.ACTIVE;

    @NotNull(message = "Department ID is required")
    private Long departmentId;
}