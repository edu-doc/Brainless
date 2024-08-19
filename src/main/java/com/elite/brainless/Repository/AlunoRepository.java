package com.elite.brainless.Repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elite.brainless.Model.Entity.Aluno;


public interface AlunoRepository extends JpaRepository<Aluno, UUID> {

    Optional<Aluno> findById(UUID id);

}
