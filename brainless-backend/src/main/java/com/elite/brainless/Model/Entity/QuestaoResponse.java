package com.elite.brainless.Model.Entity;

import java.util.List;

public record QuestaoResponse(List<String> alternativas , String enunciado, String resposta , List<String> tema , Integer ano) {
    public QuestaoResponse(Questao questao){
        this(questao.getAlternativas(), questao.getEnunciado(), questao.getResposta(), questao.getTema() , questao.getAno());
    }
}
