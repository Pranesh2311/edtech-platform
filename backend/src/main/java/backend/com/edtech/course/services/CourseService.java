package backend.com.edtech.course.services;

import backend.com.edtech.course.dto.CourseDto;

import java.util.List;

public interface CourseService {

    CourseDto createCourse(
            CourseDto dto
    );

    List<CourseDto> getAllCourses();

    CourseDto getCourseById(
            Long id
    );

    CourseDto updateCourse(
            Long id,
            CourseDto dto
    );

    void deleteCourse(Long id);

    List<CourseDto> searchCourses(
            String keyword
    );

    void toggleCourseStatus(
            Long id
    );
}
