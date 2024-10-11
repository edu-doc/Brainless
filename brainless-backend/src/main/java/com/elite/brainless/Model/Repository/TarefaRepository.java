package com.elite.brainless.Model.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elite.brainless.Model.Entity.Tarefa;

public interface TarefaRepository  extends JpaRepository<Tarefa, Long>{
    
    Optional<Tarefa> findByTitulo(String titulo);

    Optional<Tarefa> findById(Long id);

}
