package com.elite.brainless.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.elite.brainless.Model.Entity.QuestaoResponse;
import com.elite.brainless.Model.Service.QuestaoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/aluno")
@RequiredArgsConstructor
public class HomeAlunoController {
    
    @Autowired
    private final QuestaoService service;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public List<QuestaoResponse> questoes(){
        List<QuestaoResponse> questList = service.findAll().stream().map(QuestaoResponse::new).toList();
        return questList;
    }



}
