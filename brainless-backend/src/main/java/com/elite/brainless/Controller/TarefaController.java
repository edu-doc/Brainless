package com.elite.brainless.Controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.elite.brainless.Model.Entity.Questao;
import com.elite.brainless.Model.Entity.QuestaoResponse;
import com.elite.brainless.Model.Entity.Tarefa;
import com.elite.brainless.Model.Entity.TarefaResponse;
import com.elite.brainless.Model.Repository.QuestaoRepository;
import com.elite.brainless.Model.Repository.TarefaRepository;

@RestController
@RequestMapping("/tarefas")
public class TarefaController {

    @Autowired
    private TarefaRepository tarefaRepository;

    @Autowired
    private QuestaoRepository questaoRepository;

    @GetMapping("/{id}/questoes")
    public ResponseEntity<List<Questao>> getQuestoes(@PathVariable Long id) {
        List<Questao> questoes = tarefaRepository.findQuestoesByTarefaId(id);
        return ResponseEntity.ok(questoes);
    }

    @PostMapping
    public ResponseEntity<TarefaResponse> createTarefa(@RequestBody Tarefa tarefa) {

        // Criar e associar as questões
        List<Questao> questoesSalvas = new ArrayList<>();
        for (Questao questao : tarefa.getQuestoes()) {
            questoesSalvas.add(questaoRepository.save(questao)); // Salva a questão e adiciona à lista
        }

        // Criar uma nova instância de Tarefa
        Tarefa Novatarefa = new Tarefa();
        Novatarefa.setTitulo(tarefa.getTitulo());
        Novatarefa.setDescricao(tarefa.getDescricao());
        Novatarefa.setDataLimite(tarefa.getDataLimite());
        Novatarefa.setTipo(tarefa.getTipo());
        Novatarefa.setQuestoes(questoesSalvas);

        // Salvar a tarefa com as questões associadas
        Tarefa tarefaSalva = tarefaRepository.save(Novatarefa);

        // Converter para record
        List<QuestaoResponse> questaoRecords = questoesSalvas.stream()
            .map(q -> new QuestaoResponse(q.getId() , q.getAlternativas(), q.getEnunciado(), q.getJustificativa(), q.getResposta(), q.getTema() , q.getAno(), q.getIsPublica(), q.getSemestre(), q.getTurma(), q.getAtividade(), q.getIsSubjetiva()))
            .toList();

        TarefaResponse tarefaRecord = new TarefaResponse(
            tarefaSalva.getId(),
            tarefaSalva.getTitulo(),
            tarefaSalva.getDescricao(),
            tarefaSalva.getDataLimite(),
            tarefaSalva.getTipo(),
            questaoRecords
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(tarefaRecord);
    }
}
