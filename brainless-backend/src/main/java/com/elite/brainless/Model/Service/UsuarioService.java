package com.elite.brainless.Model.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.elite.brainless.Model.Entity.Usuario;
import com.elite.brainless.Model.Repository.UsuarioRepository;
import com.elite.brainless.exception.MultipleErrorsException;

@Service
public class UsuarioService {

    @Autowired
    private final UsuarioRepository usuRepository;

    public UsuarioService(UsuarioRepository usuRepo) {
        this.usuRepository = usuRepo;
    }

    public List<Usuario> findAll() {
        List<Usuario> usuarios = usuRepository.findAll();

        if (usuarios.isEmpty()) {
            throw new RuntimeException("Nenhum usuario encontrado");
        }

        return usuarios;
    }

    public Optional<Usuario> findById(Long id) {
        return usuRepository.findById(id);
    }

    public Optional<Usuario> findByEmail(String email) {
        return usuRepository.findByEmail(email);
    }

    public Usuario createUsuario(Usuario usu) {

        MultipleErrorsException errors = new MultipleErrorsException();

        // Verifica se já existe um usuario com o mesmo CPF
        Optional<Usuario> existingUsu = usuRepository.findByCpf(usu.getCpf());
        Optional<Usuario> existingUsu2 = usuRepository.findByEmail(usu.getEmail());
        // Se já existe um usuario com o mesmo CPF, lança uma exceção ou realiza
        // outra ação adequada

        if (existingUsu.isPresent()) {
            errors.addError("cpf","Já existe um usuário com o mesmo CPF.");
        }

        if (existingUsu2.isPresent()) {
            errors.addError("email","Já existe um usuário com o mesmo E-mail.");
        }

        // Se houver erros, lança a exceção
        if (!errors.getErrors().isEmpty()) {
            throw errors;
        }

        // Se não existir, salva o novo usuario
        System.out.println("Cadastro realizado com sucesso.");
        return usuRepository.save(usu);
    }

    public void deleteById(Long id) {
        Optional<Usuario> existingUsu = usuRepository.findById(id);

        if (existingUsu.isEmpty()) {
            throw new RuntimeException("Usuario Inexistente");
        }

        usuRepository.deleteById(id);
    }

}
