package com.elite.brainless.Model.Entity;


public record RespostaResponse(String resposta, boolean acerto, Long idUsu, Long idQuest) {
    public RespostaResponse(Resposta resp){
        this(resp.getResp(), resp.isAcerto(), resp.getUsuario().getId(), resp.getQuestao().getId());
    }
}

