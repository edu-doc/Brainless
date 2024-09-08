package com.elite.brainless.Model.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elite.brainless.Model.Entity.Professor;


public interface ProfessorRepository extends JpaRepository<Professor, Long> {

    Optional<Professor> findByCpf(String cpf);

}
