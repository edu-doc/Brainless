package com.elite.brainless.Model.Repository;

import java.util.Optional;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.elite.brainless.Model.Entity.Questao;

public interface QuestaoRepository extends JpaRepository<Questao, Long> {

    Optional<Questao> findByEnunciado(String enunciado);

    Optional<Questao> findByTema(String tema);

    Optional<Questao> findById(Long id);

    // Novo método: busca por enunciado com 'like' (parcial)
    List<Questao> findByEnunciadoContaining(String enunciado);

    List<Questao> findByTemaContaining(String tema);
    
    // Novo método: busca por enunciado e tema com 'like' (parcial)
    List<Questao> findByEnunciadoContainingAndTemaContaining(String enunciado, String tema);
}