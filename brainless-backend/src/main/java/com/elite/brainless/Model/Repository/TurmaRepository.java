package com.elite.brainless.Model.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elite.brainless.Model.Entity.Turma;

public interface TurmaRepository extends JpaRepository<Turma, Long>{

    Optional<Turma> findByNome(String nome);

    Optional<Turma> findById(Long id);

}
