package com.elite.brainless.Model.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.elite.brainless.Model.Entity.Aluno;
import com.elite.brainless.Model.Repository.AlunoRepository;

import jakarta.validation.Valid;



@Service
public class AlunoService {

	private final AlunoRepository alunoRepository;

    public AlunoService(AlunoRepository alunoRepo) {
        this.alunoRepository = alunoRepo;
    }

    public List<Aluno> findAll() {
        List<Aluno> alunos = alunoRepository.findAll();

        if (alunos.isEmpty()) {
            throw new RuntimeException("Nenhum aluno encontrado");
        }

        return alunos;
    }

    public Optional<Aluno> findById(Long id) {
        return alunoRepository.findById(id);
    }

    public Aluno createAluno(@Valid Aluno aluno) {

        // Verifica se já existe um aluno com o mesmo CPF
        Optional<Aluno> existingAluno = alunoRepository.findByCpf(aluno.getCpf());

        if (existingAluno.isPresent()) {
            // Se já existe um aluno com o mesmo CPF, lança uma exceção ou realiza
            // outra ação adequada
            throw new RuntimeException("Já existe um aluno com o mesmo CPF");
        }

        // Se não existir, salva o novo aluno
        return alunoRepository.save(aluno);
    }

    public void deleteById(Long id) {
        Optional<Aluno> existingAluno = alunoRepository.findById(id);

        if (existingAluno.isEmpty()) {
            throw new RuntimeException("Aluno Inexistente");
        }

        alunoRepository.deleteById(id);
    }

}