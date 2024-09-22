package com.elite.brainless.Controller;

import java.util.List;

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
import com.elite.brainless.Model.Entity.QuestaoResponse;
import com.elite.brainless.Model.Service.QuestaoService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/professor")
@RequiredArgsConstructor
public class HomeProfessorController {
    
    @Autowired
    private final QuestaoService service;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public ResponseEntity<String> questaoSave(@RequestBody Questao data) {
        
        Questao questao = new Questao(data.getAlternativas(), data.getEnunciado(), data.getResposta(), data.getTema());
        
        service.createQuestao(questao);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Questão cadastrada com sucesso");
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public List<QuestaoResponse> questoes(){
        List<QuestaoResponse> questList = service.findAll().stream().map(QuestaoResponse::new).toList();
        return questList;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PutMapping
    public ResponseEntity<String> updateQuest(@RequestBody Questao data) {
        
        Questao questao = new Questao(data.getAlternativas(), data.getEnunciado(), data.getResposta(), data.getTema());
        
        service.updateQuestao(questao.getId(), questao);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Questão atualizada com sucesso");

    }



}
