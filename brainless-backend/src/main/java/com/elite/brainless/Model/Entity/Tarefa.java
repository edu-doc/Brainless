package com.elite.brainless.Model.Entity;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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
@Table(name = "table_tarefa")
public class Tarefa {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titulo;
    private String descricao;
    private LocalDate dataLimite;
    private String tipo;

    // @ManyToOne
    // @JoinColumn(name = "turma_id", nullable = false)
    // private Turma turma; // Referência à turma associada

    @ManyToMany
    @JoinTable(
        name = "tarefa_questao",
        joinColumns = @JoinColumn(name = "tarefa_id"),
        inverseJoinColumns = @JoinColumn(name = "questao_id")
    )
    @JsonManagedReference // Lado gerenciador da relação
    private List<Questao> questoes; // Lista de questões associadas à tarefa

}
