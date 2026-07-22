package com.ems.dto;

import com.ems.entity.EmployeeStatus;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDate;

@Data
@Builder
public class EmployeeDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private Double salary;
    private LocalDate joiningDate;
    private EmployeeStatus status;
    private Long departmentId;
    private String departmentName;
}