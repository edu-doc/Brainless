package com.elite.brainless.Model;

import java.util.List;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Questao {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ElementCollection
    @Column(nullable = false)
    private List<String> alternativas;

    @Column(nullable = false)
    private int ano;

    @Column(nullable = false)
    private List<String> tema;

    @Column
    private float aproveitamento;

    @Column(nullable = false)
    private String enunciado;

    @Column(nullable = false)
    private String resposta;

    public Questao() {
    }

    public Questao(UUID id, int ano, List<String> tema, float aproveitamento, String enunciado, String resposta,
            List<String> alternativas) {
        this.id = id;
        this.ano = ano;
        this.tema = tema;
        this.aproveitamento = aproveitamento;
        this.enunciado = enunciado;
        this.resposta = resposta;
        this.alternativas = alternativas;
    }

    // Getters e Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public int getAno() {
        return ano;
    }

    public void setAno(int ano) {
        this.ano = ano;
    }

    public List<String> getTema() {
        return tema;
    }

    public void setTema(List<String> tema) {
        this.tema = tema;
    }

    public float getAproveitamento() {
        return aproveitamento;
    }

    public void setAproveitamento(float aproveitamento) {
        this.aproveitamento = aproveitamento;
    }

    public String getEnunciado() {
        return enunciado;
    }

    public void setEnunciado(String enunciado) {
        this.enunciado = enunciado;
    }

    public String getResposta() {
        return resposta;
    }

    public void setResposta(String resposta) {
        this.resposta = resposta;
    }
}
