package com.elite.brainless.Model.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.elite.brainless.Model.Entity.Questao;
import com.elite.brainless.Model.Entity.Tarefa;

public interface TarefaRepository  extends JpaRepository<Tarefa, Long>{
    
    Optional<Tarefa> findByTitulo(String titulo);

    Optional<Tarefa> findById(Long id);


    @Query("SELECT t.questoes FROM Tarefa t WHERE t.id = :tarefaId")
    List<Questao> findQuestoesByTarefaId(@Param("tarefaId") Long tarefaId);
    
    

}
