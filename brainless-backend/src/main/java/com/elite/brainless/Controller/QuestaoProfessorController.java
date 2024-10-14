package com.elite.brainless.Controller;

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

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/questaoProfessor")
@RequiredArgsConstructor
public class QuestaoProfessorController {

    @Autowired
    private final QuestaoService service;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public ResponseEntity<String> saveQuestao(@RequestBody @Valid Questao data) {
        Questao questao = new Questao(data.getAlternativas(), data.getEnunciado(), data.getJustificativa(), data.getResposta(), data.getTema(), data.getIsPublica(), data.getSemestre(), data.getTurma(), data.getAtividade());
        
        service.createQuestao(questao);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Questão cadastrada com sucesso");
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PutMapping
    public ResponseEntity<String> updateQuest(@RequestBody Questao data) {
        
        Questao questao = new Questao(data.getAlternativas(), data.getEnunciado(), data.getJustificativa(), data.getResposta(), data.getTema(), data.getIsPublica(), data.getSemestre(), data.getTurma(), data.getAtividade());
        
        service.updateQuestao(data.getId(), questao);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Questão atualizada com sucesso");

    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public Optional<Questao> SearchQuest(Long id){
        Optional<Questao> questList = service.findById(id);
        return questList;
    }

}
