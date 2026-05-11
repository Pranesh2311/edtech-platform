package backend.com.edtech.course.services.impl;

import backend.com.edtech.course.dto.CourseDto;
import backend.com.edtech.course.entity.Course;
import backend.com.edtech.course.repository.CourseRepository;
import backend.com.edtech.course.services.CourseService;
import backend.com.edtech.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class CourseServiceImpl
        implements CourseService {

    private final
    CourseRepository courseRepository;

    @Override
    public CourseDto createCourse(
            CourseDto dto
    ) {

        Course course =
                Course.builder()

                        .title(dto.getTitle())

                        .description(
                                dto.getDescription()
                        )

                        .thumbnail(
                                dto.getThumbnail()
                        )

                        .price(
                                dto.getPrice()
                        )

                        .durationInMonths(
                                dto.getDurationInMonths()
                        )

                        .active(true)

                        .build();

        return mapToDto(
                courseRepository.save(course)
        );
    }

    @Override
    public List<CourseDto> getAllCourses() {

        return courseRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    @Override
    public CourseDto getCourseById(
            Long id
    ) {

        return mapToDto(
                courseRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Course not found"
                                )
                        )
        );
    }

    @Override
    public CourseDto updateCourse(
            Long id,
            CourseDto dto
    ) {

        Course course =
                courseRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Course not found"
                                )
                        );

        course.setTitle(
                dto.getTitle()
        );

        course.setDescription(
                dto.getDescription()
        );

        course.setThumbnail(
                dto.getThumbnail()
        );

        course.setPrice(
                dto.getPrice()
        );

        course.setDurationInMonths(
                dto.getDurationInMonths()
        );

        return mapToDto(
                courseRepository.save(course)
        );
    }

    @Override
    public void deleteCourse(
            Long id
    ) {

        courseRepository.deleteById(id);
    }

    @Override
    public List<CourseDto>
    searchCourses(
            String keyword
    ) {

        return courseRepository
                .findByTitleContainingIgnoreCase(
                        keyword
                )
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    @Override
    public void toggleCourseStatus(
            Long id
    ) {

        Course course =
                courseRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Course not found"
                                )
                        );

        course.setActive(
                !course.getActive()
        );

        courseRepository.save(course);
    }

    private CourseDto mapToDto(
            Course course
    ) {

        return CourseDto.builder()

                .id(course.getId())

                .title(course.getTitle())

                .description(
                        course.getDescription()
                )

                .thumbnail(
                        course.getThumbnail()
                )

                .price(
                        course.getPrice()
                )

                .durationInMonths(
                        course.getDurationInMonths()
                )

                .active(
                        course.getActive()
                )

                .batchCount(
                        course.getBatches() != null
                                ? course.getBatches().size()
                                : 0
                )

                .build();
    }
}
