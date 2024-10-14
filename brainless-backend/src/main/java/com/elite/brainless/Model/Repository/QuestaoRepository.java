package com.elite.brainless.Model.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elite.brainless.Model.Entity.Questao;

public interface QuestaoRepository extends JpaRepository<Questao, Long> {

    Optional<Questao> findByEnunciado(String enunciado);

    Optional<Questao> findById(Long id);

}