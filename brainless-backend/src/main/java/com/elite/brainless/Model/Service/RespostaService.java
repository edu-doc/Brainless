package com.elite.brainless.Model.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.elite.brainless.Model.Entity.Resposta;
import com.elite.brainless.Model.Repository.RespostaRepository;

import jakarta.validation.Valid;


@Service
public class RespostaService {

    private final RespostaRepository respostaRepository;

    public RespostaService(RespostaRepository respostaRepo) {
        this.respostaRepository = respostaRepo;
    }

    public List<Resposta> findAll() {
        List<Resposta> respostas = respostaRepository.findAll();

        if (respostas.isEmpty()) {
            throw new RuntimeException("Nenhuma resposta encontrado");
        }

        return respostas;
    }

    public Optional<Resposta> findById(Long id) {
        return respostaRepository.findById(id);
    }

    public Resposta createResposta(@Valid Resposta resposta) {

        // Verifica se já existe uma resposta com o mesmo Id
        Optional<Resposta> existingResposta = respostaRepository.findById(resposta.getId());

        if (existingResposta.isPresent()) {
            // Se já existe uma resposta com o mesmo id, lança uma exceção ou realiza
            // outra ação adequada
            throw new RuntimeException("Já existe uma resposta com o mesmo id");
        }

        // Se não existir, salva o novo questao
        return respostaRepository.save(resposta);
    }

    public void deleteById(Long id) {
        Optional<Resposta> existingResposta = respostaRepository.findById(id);

        if (existingResposta.isEmpty()) {
            throw new RuntimeException("Resposta Inexistente");
        }

        respostaRepository.deleteById(id);
    }

    public Resposta updateResposta(Long id, @Valid Resposta respostaAtualizada) {
        // Verifica se a resposta com o ID especificado existe
        Optional<Resposta> existingResposta = respostaRepository.findById(id);
    
        if (existingResposta.isEmpty()) {
            throw new RuntimeException("Resposta não encontrada");
        }
    
        Resposta respostaExistente = existingResposta.get();
    
        // Atualiza os campos da resposta existente com os novos valores
        respostaExistente.setResp(respostaAtualizada.getResp());
        // Atualize outros campos conforme necessário
    
        // Salva a questão atualizada no repositório
        return respostaRepository.save(respostaExistente);
    }

}
