package com.elite.brainless.Model.Entity;


public class Relatorio {

    private Long questaoId;
    private long totalAcertos;
    private long totalUsuarios;

    public Relatorio(Long questaoId, long totalAcertos, long totalUsuarios) {
        this.questaoId = questaoId;
        this.totalAcertos = totalAcertos;
        this.totalUsuarios = totalUsuarios;
    }

    // Getters e Setters
    public Long getQuestaoId() {
        return questaoId;
    }

    public void setQuestaoId(Long questaoId) {
        this.questaoId = questaoId;
    }

    public long getTotalAcertos() {
        return totalAcertos;
    }

    public void setTotalAcertos(long totalAcertos) {
        this.totalAcertos = totalAcertos;
    }

    public long getTotalUsuarios() {
        return totalUsuarios;
    }

    public void setTotalUsuarios(long totalUsuarios) {
        this.totalUsuarios = totalUsuarios;
    }


}
