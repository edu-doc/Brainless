package com.elite.brainless.Model.Entity;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
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
    private String justificativa;

    @Column(nullable = false)
    private String resposta;

    @Column(nullable = false)
    private Boolean isPublica;

    @Column
    private String semestre;

    @Column
    private String turma;

    @Column
    private String atividade;

    @OneToMany(mappedBy = "questao", cascade = CascadeType.ALL)
    private List<Resposta> respostas;

    @ManyToMany(mappedBy = "questoes")
    @JsonBackReference // Lado referente da relação
    private List<Tarefa> tarefas; // Lista de tarefas que incluem esta questão

    public Questao(List<String> alternativas, String enunciado, String justificativa, String resposta, List<String> tema, Boolean isPublica, String semestre, String turma, String atividade) {
        this.alternativas = alternativas;
        this.enunciado = enunciado;
        this.justificativa = justificativa;
        this.resposta = resposta;
        this.tema = tema;
        this.isPublica = isPublica;
        LocalDate anoAtual = LocalDate.now();
        this.ano = anoAtual.getYear();
        this.semestre = semestre;
        this.turma = turma;
        this.atividade = atividade;
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
        sb.append(", justificativa=").append(justificativa);
        sb.append(", resposta=").append(resposta);
        sb.append(", semestre=").append(semestre);
        sb.append(", turma=").append(turma);
        sb.append(", atividade=").append(atividade);
        sb.append('}');
        return sb.toString();
    }

}
