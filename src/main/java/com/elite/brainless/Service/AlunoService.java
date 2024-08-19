package com.elite.brainless.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.elite.brainless.Model.Entity.Aluno;
import com.elite.brainless.Repository.AlunoRepository;



@Service
public class AlunoService {

	@Autowired
	private AlunoRepository repository;
	
	public List<Aluno> findAll(){
		return repository.findAll();
		}
	
	public Aluno findById(UUID id) {
		Optional<Aluno> obj = repository.findById(id);
		return obj.get();
	}
}