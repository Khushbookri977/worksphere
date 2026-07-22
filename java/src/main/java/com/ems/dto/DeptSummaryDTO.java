package com.ems.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DeptSummaryDTO {
    private String department;
    private Long employeeCount;
}