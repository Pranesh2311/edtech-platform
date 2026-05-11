package backend.com.edtech.security.controller;

import backend.com.edtech.batch.dto.TeacherDto;
import backend.com.edtech.security.entity.User;
import backend.com.edtech.security.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;


}
