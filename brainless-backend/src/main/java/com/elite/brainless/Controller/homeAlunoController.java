package com.elite.brainless.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.elite.brainless.Model.Entity.Questao;
import com.elite.brainless.Model.Service.QuestaoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/homealuno")
@RequiredArgsConstructor
public class homeAlunoController {
    
    @Autowired
    private final QuestaoService service;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public List<Questao> questoes(){
        List<Questao> questList = service.findAll().stream().map(Questao::new).toList();
        return questList;
    }



}
