package com.elite.brainless.Model.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.elite.brainless.Model.Entity.Tarefa;
import com.elite.brainless.Model.Repository.TarefaRepository;

import jakarta.validation.Valid;

@Service
public class TarefaService {

    private final TarefaRepository tarefaRepository;

    public TarefaService(TarefaRepository tarefaRepo) {
        this.tarefaRepository = tarefaRepo;
    }

    public List<Tarefa> findAll() {
        List<Tarefa> tarefas = tarefaRepository.findAll();

        if (tarefas.isEmpty()) {
            throw new RuntimeException("Nenhum tarefa encontrado");
        }

        return tarefas;
    }

    public Optional<Tarefa> findById(Long id) {
        return tarefaRepository.findById(id);
    }

    public Tarefa createTarefa(@Valid Tarefa tarefa) {

        // Verifica se já existe uma Tarefa com mesmo nome
        Optional<Tarefa> existingTarefa = tarefaRepository.findByTitulo(tarefa.getTitulo());

        if (existingTarefa.isPresent()) {
            throw new RuntimeException("Já existe uma tarefa com esse titulo");
        }

        // Se não existir, salva a nova Tarefa
        return tarefaRepository.save(tarefa);
    }

    public void deleteById(Long id) {
        Optional<Tarefa> existingAluno = tarefaRepository.findById(id);

        if (existingAluno.isEmpty()) {
            throw new RuntimeException("Tarefa Inexistente");
        }

        tarefaRepository.deleteById(id);
    }

}
