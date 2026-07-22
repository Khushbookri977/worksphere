package com.ems.repository;

import com.ems.entity.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    boolean existsByEmail(String email);

    List<Employee> findByDepartmentId(Long departmentId);

    Page<Employee> findAll(Pageable pageable);

    @Query("SELECT e.department.name, COUNT(e) FROM Employee e GROUP BY e.department.name")
    List<Object[]> countByDepartment();

    @Query("SELECT AVG(e.salary), MIN(e.salary), MAX(e.salary) FROM Employee e")
    List<Object[]> getSalaryStats();
}