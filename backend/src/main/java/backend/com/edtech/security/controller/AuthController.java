package backend.com.edtech.security.controller;

import backend.com.edtech.batch.dto.StudentDto;
import backend.com.edtech.batch.dto.TeacherDto;
import backend.com.edtech.security.dto.AuthResponse;
import backend.com.edtech.security.dto.LoginRequest;
import backend.com.edtech.security.dto.RegisterRequest;
import backend.com.edtech.security.entity.User;
import backend.com.edtech.security.repository.UserRepository;
import backend.com.edtech.security.util.JwtUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password
        .PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    @GetMapping("/teachers")
    public List<TeacherDto> getTeachers() {

        List<User> teachers =
                userRepository.findByRole(
                        "TEACHER"
                );

        return teachers.stream()
                .map(user ->
                        TeacherDto.builder()
                                .id(user.getId())
                                .name(user.getFullName())
                                .build()
                )
                .toList();
    }

    @GetMapping("/students")
    public List<StudentDto> getStudents() {

        List<User> students =
                userRepository.findByRole(
                        "STUDENT"
                );

        return students.stream()
                .map(student ->
                        StudentDto.builder()
                                .id(student.getId())
                                .name(student.getFullName())
                                .email(student.getEmail())
                                .build()
                )
                .toList();
    }

    @PostMapping("/register")
    public String register(@Valid @RequestBody RegisterRequest request) {

        User user = new User();

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setMobile(request.getMobile());

        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user.setRole(request.getRole());

        userRepository.save(user);

        return "User Registered Successfully";
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {

        User user = userRepository
                .findByEmail(
                        request.getEmail()
                )
                .orElseThrow(() ->
                        new RuntimeException(
                                "User Not Found"
                        )
                );

        if(!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        )) {

            throw new RuntimeException(
                    "Invalid Password"
            );
        }

        String token =
                jwtUtil.generateToken(
                        user.getEmail(),
                        user.getRole()
                );

        return new AuthResponse(
                token,
                user.getRole(),
                user.getId(),
                user.getFullName(),
                user.getEmail()
        );
    }
}
