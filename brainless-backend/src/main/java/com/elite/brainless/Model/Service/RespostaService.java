package com.elite.brainless.Model.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.elite.brainless.Model.Entity.Questao;
import com.elite.brainless.Model.Entity.Resposta;
import com.elite.brainless.Model.Entity.Usuario;
import com.elite.brainless.Model.Repository.RespostaRepository;
import com.elite.brainless.Model.Repository.UsuarioRepository;
import com.elite.brainless.Model.Repository.QuestaoRepository;

import jakarta.validation.Valid;

@Service
public class RespostaService {

    @Autowired
    private final RespostaRepository respostaRepository;
    @Autowired
    private final UsuarioRepository usuarioRepository;
    @Autowired
    private final QuestaoRepository questaoRepository;

    public RespostaService(RespostaRepository respRepo, UsuarioRepository usuarioRepo, QuestaoRepository questaoRepo) {
        this.respostaRepository = respRepo;
        this.usuarioRepository = usuarioRepo;
        this.questaoRepository = questaoRepo;
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
        
        Optional<Usuario> existingUsuario = usuarioRepository.findById(resposta.getUsuario().getId());
        Optional<Questao> existingQuestao = questaoRepository.findById(resposta.getQuestao().getId());
        Optional<Resposta> existingResposta = respostaRepository.findByUsuarioAndQuestao(resposta.getUsuario(), resposta.getQuestao());

        if (!existingUsuario.isPresent()) {
            throw new RuntimeException("Não existe um usuario com esse id");
        }

        if (!existingQuestao.isPresent()) {
            throw new RuntimeException("Não existe uma questao com esse id");
        }

        if(existingResposta.isPresent()){
            throw new RuntimeException("Já existe essa questão");
        }
    
        // Salva a nova resposta
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