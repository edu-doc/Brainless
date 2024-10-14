package com.elite.brainless.Model.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.elite.brainless.Model.Entity.Turma;
import com.elite.brainless.Model.Repository.TurmaRepository;

import jakarta.validation.Valid;

@Service
public class TurmaService {

    private final TurmaRepository turmaRepository;

    public TurmaService(TurmaRepository turmaRepo) {
        this.turmaRepository = turmaRepo;
    }

    public List<Turma> findAll() {
        List<Turma> turmas = turmaRepository.findAll();

        if (turmas.isEmpty()) {
            throw new RuntimeException("Nenhum aluno encontrado");
        }

        return turmas;
    }

    public Optional<Turma> findById(Long id) {
        return turmaRepository.findById(id);
    }

    public Turma createTurma(@Valid Turma turma) {

        // Verifica se já existe uma turma com mesmo nome
        Optional<Turma> existingTurma = turmaRepository.findByNome(turma.getNome());

        if (existingTurma.isPresent()) {
            throw new RuntimeException("Já existe uma turma com esse nome");
        }

        // Se não existir, salva a nova turma
        return turmaRepository.save(turma);
    }

    public void deleteById(Long id) {
        Optional<Turma> existingAluno = turmaRepository.findById(id);

        if (existingAluno.isEmpty()) {
            throw new RuntimeException("Turma Inexistente");
        }

        turmaRepository.deleteById(id);
    }

}
