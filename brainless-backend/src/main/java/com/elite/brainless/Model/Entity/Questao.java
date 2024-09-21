package com.elite.brainless.Model.Entity;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "table_questoes")
public class Questao {

    LocalDate anoAtual = LocalDate.now();

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ElementCollection
    @Column(nullable = false)
    private List<String> alternativas;

    @Column(nullable = false)
    private int ano;

    @ElementCollection
    @Column(nullable = false)
    private List<String> tema;

    @Column
    private float aproveitamento;

    @Column(nullable = false)
    private String enunciado;

    @Column(nullable = false)
    private String resposta;

    public Questao(List<String> alternativas, String enunciado, Long id, String resposta, List<String> tema, int ano) {
        this.alternativas = alternativas;
        this.enunciado = enunciado;
        this.id = id;
        this.resposta = resposta;
        this.tema = tema;
        this.ano = anoAtual.getYear();
    }

    public Questao(Questao questao) {
        this.alternativas = getAlternativas();
        this.enunciado = getEnunciado();
        this.id = getId();
        this.resposta = getResposta();
        this.tema = getTema();
        this.ano = getAno();
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 53 * hash + Objects.hashCode(this.id);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Questao other = (Questao) obj;
        return Objects.equals(this.id, other.id);
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Questao{");
        sb.append("id=").append(id);
        sb.append(", alternativas=").append(alternativas);
        sb.append(", ano=").append(ano);
        sb.append(", tema=").append(tema);
        sb.append(", aproveitamento=").append(aproveitamento);
        sb.append(", enunciado=").append(enunciado);
        sb.append(", resposta=").append(resposta);
        sb.append('}');
        return sb.toString();
    }

}
