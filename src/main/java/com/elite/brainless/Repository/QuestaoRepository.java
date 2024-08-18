package com.elite.brainless.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

import com.elite.brainless.Model.Entity.Questao;

public interface QuestaoRepository extends JpaRepository<Questao, UUID> {

    // List<Questao> findByEnunciado(String enunciado);

    // Questao update(Questao questao);

}
