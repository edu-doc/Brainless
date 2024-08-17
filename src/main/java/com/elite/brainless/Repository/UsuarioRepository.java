package com.elite.brainless.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import com.elite.brainless.Model.Entity.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, UUID> {
}
