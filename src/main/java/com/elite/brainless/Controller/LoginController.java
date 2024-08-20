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
import com.elite.brainless.Model.dto.LoginRequestDTO;
import com.elite.brainless.Model.dto.LoginResponseDTO;
import com.elite.brainless.Repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/login")
@RequiredArgsConstructor
public class LoginController {

    @Autowired
    private final UsuarioRepository repository;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO data) {
        
        Optional<Usuario> usuarioOpt = this.repository.findByEmail(data.email());

        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.badRequest().build(); // Usuario não encontrado
      
        }

        Usuario usuario = usuarioOpt.get();

        if(usuario.getSenha().equals(data.senha())){
            return ResponseEntity.ok(new LoginResponseDTO(usuario.getNome()));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    

}
