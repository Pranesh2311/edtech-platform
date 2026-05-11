package backend.com.edtech.course.repository;

import backend.com.edtech.course.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course,Long> {

    List<Course> findByTitleContainingIgnoreCase(String keyword);
}
