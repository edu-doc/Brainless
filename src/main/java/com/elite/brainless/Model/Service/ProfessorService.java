package com.elite.brainless.Model.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.elite.brainless.Model.Entity.Professor;
import com.elite.brainless.Model.Repository.ProfessorRepository;

import jakarta.validation.Valid;

@Service
public class ProfessorService {

	private final ProfessorRepository profRepository;

	@Autowired
    public ProfessorService(ProfessorRepository profRepo) {
        this.profRepository = profRepo;
    }

    public List<Professor> findAll() {
        List<Professor> professores = profRepository.findAll();

        if (professores.isEmpty()) {
            throw new RuntimeException("Nenhum professor encontrado");
        }

        return professores;
    }

    public Optional<Professor> findById(Long id) {
        return profRepository.findById(id);
    }

    public Professor createProfessor(@Valid Professor prof) {

        // Verifica se já existe um professor com o mesmo CPF
        Optional<Professor> existingProf = profRepository.findByCpf(prof.getCpf());

        if (existingProf.isPresent()) {
            // Se já existe um professor com o mesmo CPF, lança uma exceção ou realiza
            // outra ação adequada
            throw new RuntimeException("Já existe um professor com o mesmo CPF");
        }

        // Se não existir, salva o novo professor
        return profRepository.save(prof);
    }

    public void deleteById(Long id) {
        Optional<Professor> existingProf = profRepository.findById(id);

        if (existingProf.isEmpty()) {
            throw new RuntimeException("Professor Inexistente");
        }

        profRepository.deleteById(id);
    }

}