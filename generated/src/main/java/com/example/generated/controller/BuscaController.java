package com.example.generated.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.generated.Pasta;
import com.example.generated.repository.PastaRepository;

@RestController
@RequestMapping("/api/busca")
public class BuscaController {
	
	@Autowired
	PastaRepository pastaRepo;

	@GetMapping("/")
	public ResponseEntity<List<Pasta>> buscaPasta(@RequestParam("termo") String termoBusca, @RequestParam("tipo") int tipoBusca) {
		List<Pasta> resultados;
		if (tipoBusca == 1) {
			resultados = pastaRepo.findByNomeAlunoContainingIgnoreCase(termoBusca);
		} else if (tipoBusca == 2) {
			resultados = pastaRepo.findByNumeroPasta(Integer.parseInt(termoBusca));
		} else {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(resultados);
	}
  
}
