package com.elite.brainless.Model.Entity;

import org.hibernate.validator.constraints.br.CPF;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "table_usuario")
public @Valid class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false, unique = true)
    @CPF
    private String cpf;

    @Column(nullable = false)
    @NotBlank(message = "Nome não pode estar vazio")
    private String nome;

    @Column(nullable = false, unique = true)
    @NotBlank(message = "Email não pode estar vazio")
    private String email;

    @Column(nullable = false)
    @NotBlank(message = "Senha não pode estar vazia")
    private String senha;

    @Column(nullable = false)
    private Boolean isProfessor;

    @OneToOne(mappedBy = "usuario", cascade = CascadeType.ALL)
    private Resposta resposta;

    public Usuario(String cpf,String email,String nome,String senha,Boolean isProfessor) {
        this.cpf = cpf;
        this.email = email;
        this.nome = nome;
        this.senha = senha;
        this.isProfessor = isProfessor;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Usuario{");
        sb.append("id=").append(id);
        sb.append(", cpf=").append(cpf);
        sb.append(", nome=").append(nome);
        sb.append(", email=").append(email);
        sb.append(", senha=").append(senha);
        sb.append(", isProfessor=").append(isProfessor);
        sb.append('}');
        return sb.toString();
    }

}
