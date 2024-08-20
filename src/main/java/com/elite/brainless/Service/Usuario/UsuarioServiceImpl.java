package com.elite.brainless.Service.Usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.elite.brainless.Model.Entity.Usuario;
import com.elite.brainless.Repository.UsuarioRepository;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private UsuarioRepository userRepo;

    @Override
    public Usuario create(Usuario usuario) {
        return userRepo.save(usuario);
    }

    @Override
    public void delete(Usuario usuario) {
        userRepo.delete(usuario);
    }

}
