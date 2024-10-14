package com.elite.brainless.Model.Repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.elite.brainless.Model.Entity.Questao;
import com.elite.brainless.Model.Entity.Resposta;
import com.elite.brainless.Model.Entity.Usuario;

public interface RespostaRepository extends JpaRepository<Resposta, Long> {

    Optional<Resposta> findByUsuarioAndQuestao(Usuario usuario_id, Questao questao_id);

}
