package com.elite.brainless.Model.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "table_professores")
public class Professor extends Usuario {

    public Professor() {
        super();
    }

}