package com.elite.brainless.Controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.elite.brainless.Model.Entity.Questao;
import com.elite.brainless.Model.Entity.Resposta;
import com.elite.brainless.Model.Entity.RespostaResponse;
import com.elite.brainless.Model.Service.QuestaoService;
import com.elite.brainless.Model.Service.RespostaService;
import com.elite.brainless.Model.Service.UsuarioService;
import com.elite.brainless.Model.Entity.Usuario;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/questaoAluno")
@RequiredArgsConstructor
public class QuestaoAlunoController {

    private final RespostaService service;
    private final QuestaoService service2;
    private final UsuarioService usuSec;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public ResponseEntity<String> saveResposta(@RequestBody @Valid RespostaResponse data) {
        
        System.out.println("ID DO USUARIO CHEGANDO: " + data.idUsu());

        System.out.println(data.toString());

        if (data.idUsu() == null) {
            throw new IllegalArgumentException("ID de usuario nao pode ser nulo");
        }

        // Verificação correta de Optional
        Usuario usu = usuSec.findById(data.idUsu())
                .orElseThrow(() -> new IllegalArgumentException("Usuario nao encontrado"));

        Questao quest = service2.findById(data.idQuest())
                .orElseThrow(() -> new IllegalArgumentException("Questao nao encontrada"));

        Resposta resp = new Resposta(data.resposta(), data.acerto(), usu, quest);

        service.createResposta(resp);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Resposta cadastrada com sucesso");
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public Optional<Questao> searchQuestaoById(@RequestParam Long id) {
        return service2.findById(id);
    }
}
