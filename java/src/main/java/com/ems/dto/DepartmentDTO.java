package com.ems.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DepartmentDTO {
    private Long id;
    private String name;
    private String location;
    private int employeeCount;
}