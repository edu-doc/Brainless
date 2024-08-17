package com.elite.brainless.Model;

import jakarta.persistence.Column;

public class Cadastro {

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String cpf;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String senha;

    @Column(nullable = false)
    private TipoUsuario tipoUsuario;

    public Cadastro() {
    }

    public Cadastro(String name, String cpf, String email, String senha, TipoUsuario tipoUsuario) {
        this.nome = name;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
        this.tipoUsuario = tipoUsuario;
    }

}
