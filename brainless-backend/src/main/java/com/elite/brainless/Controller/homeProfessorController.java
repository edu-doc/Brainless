package com.elite.brainless.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.elite.brainless.Model.Entity.Questao;
import com.elite.brainless.Model.Service.QuestaoService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/homeprofessor")
@RequiredArgsConstructor
public class homeProfessorController {
    
    @Autowired
    private final QuestaoService service;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public ResponseEntity<String> login(@RequestBody Questao data) {
        
        Optional<Questao> questaoOpt = this.service.findByEnunciado(data.getEnunciado());

        if (questaoOpt.isEmpty()) {
            return ResponseEntity.badRequest().build(); // Questao não encontrado
        }

        Questao questao = questaoOpt.get();

        if(questao.getEnunciado().equals(data.getEnunciado())){
            return ResponseEntity.ok(new Questao().getEnunciado());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public List<Questao> questoes(){
        List<Questao> questList = service.findAll().stream().map(Questao::new).toList();
        return questList;
    }

    @PutMapping
    public ResponseEntity<String> updateQuest(@RequestBody Questao data) {
        
        Questao questao = new Questao(data.getAlternativas(), data.getEnunciado(), data.getId(), data.getResposta(), data.getTema(), data.getAno());
        
        service.updateQuestao(questao.getId(), questao);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Questão atualizada com sucesso");

    }



}
