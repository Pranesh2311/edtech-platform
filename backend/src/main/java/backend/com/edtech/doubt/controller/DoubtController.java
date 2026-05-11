package backend.com.edtech.doubt.controller;

import backend.com.edtech.doubt.dto.CreateDoubtDto;
import backend.com.edtech.doubt.dto.DoubtResponseDto;
import backend.com.edtech.doubt.dto.ReplyDoubtDto;
import backend.com.edtech.doubt.entity.Doubt;
import backend.com.edtech.doubt.entity.DoubtReply;
import backend.com.edtech.doubt.services.DoubtService;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doubts")
@RequiredArgsConstructor
public class DoubtController {

    private final DoubtService doubtService;

    @PostMapping
    public Doubt createDoubt(@RequestBody CreateDoubtDto dto) {
        return doubtService.createDoubt(dto);
    }

    @GetMapping
    public List<DoubtResponseDto> getAllDoubts() {

        return doubtService.getAllDoubts();
    }

    @GetMapping("/student/{studentId}")
    public List<Doubt> getStudentDoubts(
            @PathVariable
            Long studentId
    ) {

        return doubtService.getStudentDoubts(
                studentId
        );
    }

    @PostMapping("/{doubtId}/reply")
    public DoubtReply replyDoubt(
            @PathVariable
            Long doubtId,

            @RequestBody
            ReplyDoubtDto dto
    ) {

        return doubtService.replyDoubt(
                doubtId,
                dto
        );
    }

    @GetMapping("/{doubtId}/replies")
    public List<DoubtReply> getReplies(
            @PathVariable
            Long doubtId
    ) {

        return doubtService.getReplies(
                doubtId
        );
    }

    @PutMapping("/{doubtId}/solve")
    public String markSolved(
            @PathVariable
            Long doubtId
    ) {

        doubtService.markSolved(
                doubtId
        );

        return "Doubt Marked Solved";
    }
}
