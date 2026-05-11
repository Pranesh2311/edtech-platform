package backend.com.edtech.doubt.services;

import backend.com.edtech.doubt.dto.CreateDoubtDto;
import backend.com.edtech.doubt.dto.DoubtResponseDto;
import backend.com.edtech.doubt.dto.ReplyDoubtDto;
import backend.com.edtech.doubt.entity.Doubt;
import backend.com.edtech.doubt.entity.DoubtReply;

import java.util.List;

public interface DoubtService {

    Doubt createDoubt(CreateDoubtDto dto);

    List<DoubtResponseDto> getAllDoubts();

    List<Doubt> getStudentDoubts(Long studentId);

    DoubtReply replyDoubt(Long doubtId, ReplyDoubtDto dto);

    List<DoubtReply> getReplies(Long doubtId);

    void markSolved(Long doubtId);
}
