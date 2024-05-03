package com.example.generated.controller;

import com.example.generated.Gaveta;
import com.example.generated.Pasta;
import com.example.generated.repository.GavetaRepository;
import com.example.generated.repository.PastaRepository;
import java.lang.Exception;
import java.lang.Long;
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
@RequestMapping("/api/gaveta")
public class GavetaController {
  @Autowired
  GavetaRepository gavetaRepo;

  @Autowired
  PastaRepository pastaRepo;

  @GetMapping("/{id}")
  public ResponseEntity<Gaveta> getGaveta(@PathVariable("id") Long id) {
    return ResponseEntity.of(gavetaRepo.findById(id));
  }

  @GetMapping("/")
  public ResponseEntity<List<Gaveta>> getAllGavetas() {
    return ResponseEntity.ok(gavetaRepo.findAll());
  }

  @PostMapping("/")
  public ResponseEntity<?> createGaveta(@RequestBody Gaveta body) {
    try {
      Gaveta savedGaveta = gavetaRepo.save(body);
      if(savedGaveta.getPastas() != null) {
    	  for (Pasta pasta : savedGaveta.getPastas()) {
	        pasta.setGaveta(savedGaveta);
	        pastaRepo.save(pasta);
	      }  
      }
      return ResponseEntity.ok(savedGaveta);
    } catch (Exception e) {
      return ResponseEntity.internalServerError().body(e.toString());
    }
  }

  @PutMapping("/{id}")
  public ResponseEntity<Gaveta> updateGaveta(@RequestBody Gaveta update,
      @PathVariable("id") Long id) {
    return gavetaRepo.findById(id).map(gaveta ->  {
      gaveta.setDescricao(update.getDescricao());
      for (Pasta pasta : update.getPastas()) {
        pasta.setGaveta(update);
        pastaRepo.save(pasta);
      }
      gaveta.setPastas(update.getPastas());
      return ResponseEntity.ok(gavetaRepo.save(gaveta));
    } ).orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Gaveta> deleteGaveta(@PathVariable("id") Long id) {
    gavetaRepo.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
