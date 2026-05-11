package backend.com.edtech.doubt.repository;

import backend.com.edtech.doubt.entity.DoubtReply;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DoubtReplyRepository extends JpaRepository<DoubtReply, Long> {

    List<DoubtReply> findByDoubtId(Long doubtId);
}
