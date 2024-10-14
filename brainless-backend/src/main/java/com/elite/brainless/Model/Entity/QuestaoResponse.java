package com.elite.brainless.Model.Entity;

import java.util.List;

public record QuestaoResponse(Long id, List<String> alternativas, String enunciado, String justificativa,
        String resposta, List<String> tema, Integer ano, Boolean isPublica, String semestre, String turma,
        String atividade) {
    public QuestaoResponse(Questao questao) {
        this(questao.getId(), questao.getAlternativas(), questao.getEnunciado(), questao.getJustificativa(),
                questao.getResposta(), questao.getTema(), questao.getAno(), questao.getIsPublica(),
                questao.getSemestre(), questao.getTurma(), questao.getAtividade());
    }
}
