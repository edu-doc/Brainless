package com.elite.brainless.Model.Entity;


public record RespostaResponse(String resposta, boolean acerto, boolean isSubjetiva, Long idUsu, Long idQuest) {
    public RespostaResponse(Resposta resp){
        this(resp.getResp(), resp.isAcerto(), resp.isSubjetiva(), resp.getUsuario().getId(), resp.getQuestao().getId());
    }
}

