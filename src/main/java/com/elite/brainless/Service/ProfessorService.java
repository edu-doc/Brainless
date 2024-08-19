package com.elite.brainless.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.elite.brainless.Model.Entity.Professor;
import com.elite.brainless.Repository.ProfessorRepository;

@Service
public class ProfessorService {

	@Autowired
	private ProfessorRepository repository;
	
	public List<Professor> findAll(){
		return repository.findAll();
		}
	
	public Professor findById(UUID id) {
		Optional<Professor> obj = repository.findById(id);
		return obj.get();
	}
}