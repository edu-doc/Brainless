package com.elite.brainless.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.elite.brainless.Model.Entity.Usuario;
import com.elite.brainless.Model.dto.CadastroRequestDTO;
import com.elite.brainless.Repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/cadastro")
@RequiredArgsConstructor
public class CadastroController {

    @Autowired
    private final UsuarioRepository repository;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public ResponseEntity<String> saveUsuario(@RequestBody CadastroRequestDTO data) {
        Usuario usuario = new Usuario(data);
        // if (usuario.getNome().isEmpty() || usuario.getEmail().isEmpty() ||
        // usuario.getSenha().isEmpty()) {
        // return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        // .body("Preencha todos os campos");
        // }
        repository.save(usuario);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Usuário cadastrado com sucesso");
    }

}