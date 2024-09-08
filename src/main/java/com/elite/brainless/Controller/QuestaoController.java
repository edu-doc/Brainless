package com.elite.brainless.Controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.elite.brainless.Model.Entity.Questao;
import com.elite.brainless.Model.Repository.QuestaoRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/questao")
@RequiredArgsConstructor
public class QuestaoController {
    
    @Autowired
    private final QuestaoRepository repository;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public ResponseEntity<String> login(@RequestBody Questao data) {
        
        Optional<Questao> questaoOpt = this.repository.findByEnunciado(data.getEnunciado());

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

}
