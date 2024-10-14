package com.elite.brainless.Model.Entity;

import java.time.LocalDate;
import java.util.List;

public record TarefaResponse(
    Long id,
    String titulo,
    String descricao,
    LocalDate dataLimite,
    String tipo,
    List<QuestaoResponse> questoes
) {}