package com.elite.brainless.Controller;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
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
    public int saveUsuario(@RequestBody CadastroRequestDTO data){
        Usuario usuario = new Usuario(data);
        repository.save(usuario);
        return Response.SC_CREATED;
    }
    

}