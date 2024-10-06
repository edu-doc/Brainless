package com.elite.brainless.Controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.elite.brainless.Model.Entity.Questao;
import com.elite.brainless.Model.Entity.Resposta;
import com.elite.brainless.Model.Service.QuestaoService;
import com.elite.brainless.Model.Service.RespostaService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/questaoAluno")
@RequiredArgsConstructor
public class QuestaoAlunoController {

    @Autowired
    private final RespostaService service;
    private final QuestaoService service2;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public ResponseEntity<String> saveResposta(@RequestBody @Valid Resposta data) {
        Resposta resp = new Resposta(data.getResp(), data.isAcerto());
        
        service.createResposta(resp);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Resposta cadastrada com sucesso");
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public Optional<Questao> SearchQuest(Long id){
        Optional<Questao> questList = service2.findById(id);
        return questList;
    }

}
