package backend.com.edtech.course.controller;

import backend.com.edtech.course.dto.CourseDto;
import backend.com.edtech.course.services.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
@CrossOrigin("*")
public class CourseController {

    private final
    CourseService courseService;

    @PostMapping
    public ResponseEntity<CourseDto>
    createCourse(

            @RequestBody
            CourseDto dto
    ) {

        return ResponseEntity.ok(
                courseService.createCourse(
                        dto
                )
        );
    }

    @GetMapping
    public ResponseEntity<List<CourseDto>>
    getAllCourses() {

        return ResponseEntity.ok(
                courseService.getAllCourses()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseDto>
    getCourseById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                courseService.getCourseById(id)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<CourseDto>
    updateCourse(

            @PathVariable Long id,

            @RequestBody
            CourseDto dto
    ) {

        return ResponseEntity.ok(
                courseService.updateCourse(
                        id,
                        dto
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String>
    deleteCourse(
            @PathVariable Long id
    ) {

        courseService.deleteCourse(id);

        return ResponseEntity.ok(
                "Course Deleted"
        );
    }

    @GetMapping("/search")
    public ResponseEntity<List<CourseDto>>
    searchCourses(
            @RequestParam String keyword
    ) {

        return ResponseEntity.ok(
                courseService.searchCourses(
                        keyword
                )
        );
    }

    @PutMapping("/{id}/toggle-status")
    public ResponseEntity<String>
    toggleCourseStatus(
            @PathVariable Long id
    ) {

        courseService.toggleCourseStatus(id);

        return ResponseEntity.ok(
                "Status Updated"
        );
    }
}
