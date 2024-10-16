package com.elite.brainless.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
    @GetMapping
    public List<QuestaoResponse> questoes(@RequestParam(required = false) String enunciado, @RequestParam(required = false) String tema){
        // List<QuestaoResponse> questList = service.findAll().stream().map(QuestaoResponse::new).toList();

        System.out.println(tema + " " + enunciado);

        List<QuestaoResponse> questList;

        if (enunciado != null && tema != null) {
            questList = service.findByEnunciadoContainingAndTemaContaining(enunciado, tema).stream().map(QuestaoResponse::new).toList();
        } else if (enunciado != null && tema == null) {
            questList = service.findByEnunciadoContaining(enunciado).stream().map(QuestaoResponse::new).toList();
        } else if (tema != null && enunciado == null) {
            questList = service.findByTemaContaining(tema).stream().map(QuestaoResponse::new).toList();
        } else {
            questList = service.findAll().stream().map(QuestaoResponse::new).toList();
        }

        return questList;
    }


    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @DeleteMapping
    public ResponseEntity<String> DeleteQuest(Long id){
        
        service.deleteById(id);
        
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Questão deletada com sucesso");
    }

}
