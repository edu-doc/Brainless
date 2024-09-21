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
import com.elite.brainless.Model.Service.UsuarioService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/cadastro")
@RequiredArgsConstructor
public class CadastroController {

    @Autowired
    private final UsuarioService service;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public ResponseEntity<String> saveUsuario(@RequestBody @Valid Usuario data) {
        Usuario usuario = new Usuario(data.getCpf(), data.getEmail(), data.getId(), data.getNome(), data.getSenha());
        
        service.createUsuario(usuario);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Usuário cadastrado com sucesso");
    }

}