package com.ems.service;

import com.ems.dto.*;
import com.ems.entity.Department;
import com.ems.entity.Employee;
import com.ems.exception.DuplicateResourceException;
import com.ems.exception.ResourceNotFoundException;
import com.ems.repository.DepartmentRepository;
import com.ems.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import java.util.Arrays;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;

    public Page<EmployeeDTO> getAllEmployees(int page, int size, String sortBy) {
        return employeeRepository
                .findAll(PageRequest.of(page, size, Sort.by(sortBy)))
                .map(this::toDTO);
    }

    public EmployeeDTO getById(Long id) {
        return employeeRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
    }

    public EmployeeDTO create(CreateEmployeeRequest request) {
        if (employeeRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already registered: " + request.getEmail());
        }
        Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + request.getDepartmentId()));

        Employee employee = Employee.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .salary(request.getSalary())
                .joiningDate(request.getJoiningDate())
                .status(request.getStatus())
                .department(department)
                .build();

        return toDTO(employeeRepository.save(employee));
    }

    public EmployeeDTO update(Long id, CreateEmployeeRequest request) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));

        Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + request.getDepartmentId()));

        employee.setFirstName(request.getFirstName());
        employee.setLastName(request.getLastName());
        employee.setEmail(request.getEmail());
        employee.setSalary(request.getSalary());
        employee.setJoiningDate(request.getJoiningDate());
        employee.setStatus(request.getStatus());
        employee.setDepartment(department);

        return toDTO(employeeRepository.save(employee));
    }

    public void delete(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new ResourceNotFoundException("Employee not found with id: " + id);
        }
        employeeRepository.deleteById(id);
    }

    public List<DeptSummaryDTO> getDeptSummary() {
        try {
            List<Object[]> results = employeeRepository.countByDepartment();
            if (results == null || results.isEmpty()) {
                return new ArrayList<>();
            }
            return results.stream()
                    .map(row -> new DeptSummaryDTO((String) row[0], (Long) row[1]))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            log.error("Error getting department summary", e);
            return new ArrayList<>();
        }
    }

    public SalaryStatsDTO getSalaryStats() {
        try {
            List<Object[]>  results = employeeRepository.getSalaryStats();
            Object[] result = results.get(0);
            
            Double avg = 0.0;
            Double min = 0.0;
            Double max = 0.0;
            
            if (result != null) {
                if (result[0] != null) avg = ((Number) result[0]).doubleValue();
                if (result[1] != null) min = ((Number) result[1]).doubleValue();
                if (result[2] != null) max = ((Number) result[2]).doubleValue();
            }
            
            return new SalaryStatsDTO(avg, min, max);
        } catch (Exception e) {
            log.error("Error getting salary stats", e);
            return new SalaryStatsDTO(0.0, 0.0, 0.0);
        }
    }

    private EmployeeDTO toDTO(Employee e) {
        return EmployeeDTO.builder()
                .id(e.getId())
                .firstName(e.getFirstName())
                .lastName(e.getLastName())
                .email(e.getEmail())
                .salary(e.getSalary())
                .joiningDate(e.getJoiningDate())
                .status(e.getStatus())
                .departmentId(e.getDepartment() != null ? e.getDepartment().getId() : null)
                .departmentName(e.getDepartment() != null ? e.getDepartment().getName() : null)
                .build();
    }
}