package com.elite.brainless.Model.Entity;

import java.util.List;

public record QuestaoResponse(Long id ,List<String> alternativas , String enunciado, String resposta , List<String> tema , Integer ano, Boolean isPublica) {
    public QuestaoResponse(Questao questao){
        this(questao.getId() , questao.getAlternativas(), questao.getEnunciado(), questao.getResposta(), questao.getTema() , questao.getAno(), questao.getIsPublica());
    }
}
