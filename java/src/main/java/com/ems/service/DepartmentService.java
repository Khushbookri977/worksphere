package com.ems.service;

import com.ems.dto.CreateDepartmentRequest;
import com.ems.dto.DepartmentDTO;
import com.ems.entity.Department;
import com.ems.exception.DuplicateResourceException;
import com.ems.exception.ResourceNotFoundException;
import com.ems.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public List<DepartmentDTO> getAll() {
        return departmentRepository.findAll()
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public DepartmentDTO getById(Long id) {
        return departmentRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + id));
    }

    public DepartmentDTO create(CreateDepartmentRequest request) {
        if (departmentRepository.existsByName(request.getName())) {
            throw new DuplicateResourceException("Department already exists: " + request.getName());
        }
        Department dept = Department.builder()
                .name(request.getName())
                .location(request.getLocation())
                .build();
        return toDTO(departmentRepository.save(dept));
    }

    public DepartmentDTO update(Long id, CreateDepartmentRequest request) {
        Department dept = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + id));
        dept.setName(request.getName());
        dept.setLocation(request.getLocation());
        return toDTO(departmentRepository.save(dept));
    }

    public void delete(Long id) {
        if (!departmentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Department not found with id: " + id);
        }
        departmentRepository.deleteById(id);
    }

    private DepartmentDTO toDTO(Department d) {
        return DepartmentDTO.builder()
                .id(d.getId())
                .name(d.getName())
                .location(d.getLocation())
                .employeeCount(d.getEmployees() != null ? d.getEmployees().size() : 0)
                .build();
    }
}
