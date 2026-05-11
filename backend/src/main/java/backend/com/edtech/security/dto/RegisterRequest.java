package backend.com.edtech.security.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank(message = "Name is required")
    private String fullName;

    @Email(message = "Invalid email")
    private String email;

    @NotBlank(message = "Mobile No. is required")
    private String mobile;

    @NotBlank(message = "Password is required")
    private String password;

    private String role;
}
