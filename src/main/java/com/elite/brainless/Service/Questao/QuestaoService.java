package com.elite.brainless.Service.Questao;

import com.elite.brainless.Model.Entity.Questao;
import java.util.List;

public interface QuestaoService {

    Questao create(Questao questao);

    void delete(Questao questao);

    Questao update(Questao questao);

    List<Questao> findByEnunciado(String enunciado);

}
