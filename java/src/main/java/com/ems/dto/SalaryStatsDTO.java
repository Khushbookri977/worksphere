package com.ems.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SalaryStatsDTO {
    private Double average;
    private Double min;
    private Double max;
}