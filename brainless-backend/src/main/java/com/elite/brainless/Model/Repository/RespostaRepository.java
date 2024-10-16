package com.elite.brainless.Model.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.elite.brainless.Model.Entity.Questao;
import com.elite.brainless.Model.Entity.Resposta;
import com.elite.brainless.Model.Entity.Usuario;

public interface RespostaRepository extends JpaRepository<Resposta, Long> {

    Optional<Resposta> findByUsuarioAndQuestao(Usuario usuario_id, Questao questao_id);

    @Query("SELECT COUNT(r) FROM Resposta r WHERE r.questao.id = :questaoId")
    long countRespostasByQuestaoId(@Param("questaoId") Long questaoId);



    @Query("SELECT COUNT(DISTINCT r.usuario) FROM Resposta r WHERE r.questao.id = :questaoId AND r.acerto = true")
    long countDistinctUsuariosAcertosByQuestaoId(@Param("questaoId") Long questaoId);






}
