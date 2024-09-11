package com.elite.brainless.Model.Service;

import com.elite.brainless.Model.Entity.Usuario;
import com.elite.brainless.Model.Repository.UsuarioRepository;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class UsuarioServiceTest {

    @InjectMocks
    private UsuarioService us;

    @Mock
    private UsuarioRepository usuRep;

    @Test
    @DisplayName("Deve lançar exceção com usuário com cpf ja existente")
    public void deveLancarExcecaoSeCPFJaExistir() {

        Usuario usuario = new Usuario("11111111111", "teste@email.com", "usuarioteste", "123");
        Usuario usuario2 = new Usuario("11111111111", "teste2@email.com", "usuarioteste2", "123");

        when(usuRep.findByCpf("11111111111")).thenReturn(Optional.of(usuario));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> us.createUsuario(usuario2));

        assertEquals("Já existe um usuario com o mesmo CPF", exception.getMessage());
    }

}