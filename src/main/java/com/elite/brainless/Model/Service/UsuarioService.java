package com.elite.brainless.Model.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.elite.brainless.Model.Entity.Usuario;
import com.elite.brainless.Model.Repository.UsuarioRepository;

import jakarta.validation.Valid;

@Service
public class UsuarioService {

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

    public Usuario createUsuario(@Valid Usuario usu) {

        // Verifica se já existe um usuario com o mesmo CPF
        Optional<Usuario> existingUsu = usuRepository.findByCpf(usu.getCpf());

        if (existingUsu.isPresent()) {
            // Se já existe um usuario com o mesmo CPF, lança uma exceção ou realiza
            // outra ação adequada
            throw new RuntimeException("Já existe um usuario com o mesmo CPF");
        }

        // Se não existir, salva o novo professor
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
