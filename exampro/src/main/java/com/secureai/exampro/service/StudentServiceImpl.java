package com.secureai.exampro.service;

import com.secureai.exampro.entity.Department;
import com.secureai.exampro.entity.Student;
import com.secureai.exampro.repository.StudentRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

    // Constructor Injection
    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    // Register new student
    @Override
    public Student createStudent(Student student) {

        if (studentRepository.existsByRollNumber(
                student.getRollNumber())) {

            throw new RuntimeException(
                    "Roll number already exists!");
        }

        return studentRepository.save(student);
    }

    // Get all students
    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Get student by ID
    @Override
    public Student getStudentById(Long id) {

        return studentRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                        "Student not found with ID: " + id));
    }

    // Get student by roll number
    @Override
    public Student getStudentByRollNumber(
            String rollNumber) {

        return studentRepository
                .findByRollNumber(rollNumber)
                .orElseThrow(() ->
                        new RuntimeException(
                        "Student not found: " + rollNumber));
    }

    // Get students by department
    @Override
    public List<Student> getStudentsByDepartment(
            Department department) {

        return studentRepository.findByDepartment(
                department);
    }

    // Search students by name
    @Override
    public List<Student> searchStudentsByName(
            String fullName) {

        return studentRepository
                .findByFullNameContainingIgnoreCase(
                        fullName);
    }

    // Update student details
    @Override
    public Student updateStudent(
            Long id,
            Student student) {

        Student existingStudent = getStudentById(id);

        existingStudent.setFullName(
                student.getFullName());

        existingStudent.setSemester(
                student.getSemester());

        existingStudent.setPhone(
                student.getPhone());

        existingStudent.setDepartment(
                student.getDepartment());

        return studentRepository.save(existingStudent);
    }

    // Delete student
    @Override
    public void deleteStudent(Long id) {

        Student student = getStudentById(id);

        studentRepository.delete(student);
    }

    // Check roll number exists
    @Override
    public boolean existsByRollNumber(
            String rollNumber) {

        return studentRepository
                .existsByRollNumber(rollNumber);
    }
}