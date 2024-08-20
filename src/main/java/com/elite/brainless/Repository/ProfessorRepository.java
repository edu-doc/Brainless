package com.elite.brainless.Repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elite.brainless.Model.Entity.Professor;


public interface ProfessorRepository extends JpaRepository<Professor, UUID> {

    Optional<Professor> findById(UUID id);

}
