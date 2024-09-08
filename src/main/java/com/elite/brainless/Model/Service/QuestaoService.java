package com.elite.brainless.Model.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.elite.brainless.Model.Entity.Questao;
import com.elite.brainless.Model.Repository.QuestaoRepository;

import jakarta.validation.Valid;


@Service
public class QuestaoService {

    private final QuestaoRepository questRepository;

	@Autowired
    public QuestaoService(QuestaoRepository questRepo) {
        this.questRepository = questRepo;
    }

    public List<Questao> findAll() {
        List<Questao> questoes = questRepository.findAll();

        if (questoes.isEmpty()) {
            throw new RuntimeException("Nenhuma questão encontrado");
        }

        return questoes;
    }

    public Optional<Questao> findById(Long id) {
        return questRepository.findById(id);
    }

    public Questao createQuestao(@Valid Questao quest) {

        // Verifica se já existe um questao com o mesmo Enunciado
        Optional<Questao> existingQuest = questRepository.findByEnunciado(quest.getEnunciado());

        if (existingQuest.isPresent()) {
            // Se já existe uma questao com o mesmo enunciado, lança uma exceção ou realiza
            // outra ação adequada
            throw new RuntimeException("Já existe uma questão com o mesmo enunciado");
        }

        // Se não existir, salva o novo questao
        return questRepository.save(quest);
    }

    public void deleteById(Long id) {
        Optional<Questao> existingQuest = questRepository.findById(id);

        if (existingQuest.isEmpty()) {
            throw new RuntimeException("Questão Inexistente");
        }

        questRepository.deleteById(id);
    }

}
