package com.elite.brainless.Controller;

import java.util.Optional;

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

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/login")
@RequiredArgsConstructor
public class LoginController {

    @Autowired
    private final UsuarioService service;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public ResponseEntity<String> login(@RequestBody Usuario data) {
        
        Optional<Usuario> usuarioOpt = this.service.findByEmail(data.getEmail());

        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.badRequest().build(); // Usuario não encontrado
        }

        Usuario usuario = usuarioOpt.get();

        if(usuario.getSenha().equals(data.getSenha())){
            return ResponseEntity.ok("Login efetuado com sucesso");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

}
