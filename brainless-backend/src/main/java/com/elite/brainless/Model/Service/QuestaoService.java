package com.elite.brainless.Model.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.elite.brainless.Model.Entity.Questao;
import com.elite.brainless.Model.Repository.QuestaoRepository;

import jakarta.validation.Valid;


@Service
public class QuestaoService {

    private final QuestaoRepository questRepository;

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

    public Optional<Questao> findByEnunciado(String enunciado) {
        return questRepository.findByEnunciado(enunciado);
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

    public Questao updateQuestao(Long id, @Valid Questao questaoAtualizada) {
        // Verifica se a questão com o ID especificado existe
        Optional<Questao> existingQuest = questRepository.findById(id);
    
        if (existingQuest.isEmpty()) {
            throw new RuntimeException("Questão não encontrada");
        }
    
        Questao questaoExistente = existingQuest.get();
    
        // Atualiza os campos da questão existente com os novos valores
        questaoExistente.setEnunciado(questaoAtualizada.getEnunciado());
        questaoExistente.setAlternativas(questaoAtualizada.getAlternativas());
        questaoExistente.setResposta(questaoAtualizada.getResposta());
        // Atualize outros campos conforme necessário
    
        // Salva a questão atualizada no repositório
        return questRepository.save(questaoExistente);
    }

}
