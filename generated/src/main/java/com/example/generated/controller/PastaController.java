package com.example.generated.controller;

import com.example.generated.Pasta;
import com.example.generated.repository.PastaRepository;
import java.lang.Exception;
import java.lang.Long;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pasta")
public class PastaController {
  @Autowired
  PastaRepository pastaRepo;

  @GetMapping("/{id}")
  public ResponseEntity<Pasta> getPasta(@PathVariable("id") Long id) {
    return ResponseEntity.of(pastaRepo.findById(id));
  }

  @GetMapping("/")
  public ResponseEntity<List<Pasta>> getAllPastas() {
      List<Pasta> pastas = pastaRepo.findAll();
      Collections.sort(pastas, Comparator.comparingLong(Pasta::getId));
      return ResponseEntity.ok(pastas);
  }

  @PostMapping("/")
  public ResponseEntity<?> createPasta(@RequestBody Pasta body) {
    try {
      Pasta savedPasta = pastaRepo.save(body);
      return ResponseEntity.ok(savedPasta);
    } catch (Exception e) {
      return ResponseEntity.internalServerError().body(e.toString());
    }
  }

  @PutMapping("/{id}")
  public ResponseEntity<Pasta> updatePasta(@RequestBody Pasta update, @PathVariable("id") Long id) {
    return pastaRepo.findById(id).map(pasta ->  {
      pasta.setNomeAluno(update.getNomeAluno());
      pasta.setNumeroPasta(update.getNumeroPasta());
      pasta.setGaveta(update.getGaveta());
      pasta.setStatus(update.getStatus());
      return ResponseEntity.ok(pastaRepo.save(pasta));
    } ).orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Pasta> deletePasta(@PathVariable("id") Long id) {
    pastaRepo.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
