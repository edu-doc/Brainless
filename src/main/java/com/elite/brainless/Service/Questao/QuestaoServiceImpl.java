package com.elite.brainless.Service.Questao;

// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.elite.brainless.Model.Entity.Questao;
// import com.elite.brainless.Repository.QuestaoRepository;
import java.util.List;

@Service
public class QuestaoServiceImpl implements QuestaoService {

    @Override
    public Questao create(Questao questao) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'create'");
    }

    @Override
    public void delete(Questao questao) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }

    @Override
    public Questao update(Questao questao) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    @Override
    public List<Questao> findByEnunciado(String enunciado) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findByEnunciado'");
    }

    // @Autowired
    // private QuestaoRepository qstRepo;

    // @Override
    // public Questao create(Questao questao) {
    //     return qstRepo.save(questao);
    // }

    // @Override
    // public void delete(Questao questao) {
    //     qstRepo.delete(questao);
    // }

    // @Override
    // public Questao update(Questao questao) {
    //     return qstRepo.update(questao);
    // }

    // @Override
    // public List<Questao> findByEnunciado(String enunciado) {
    //     // TODO Auto-generated method stub
    //     throw new UnsupportedOperationException("Unimplemented method 'findByEnunciado'");
    // }

    // TODO:

    // @Override
    // public List<Questao> findByEnunciado(String enunciado) {
    // return qstRepo.;
    // }

}
