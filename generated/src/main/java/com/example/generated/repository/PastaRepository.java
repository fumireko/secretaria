package com.example.generated.repository;

import com.example.generated.Pasta;
import java.lang.Long;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PastaRepository extends JpaRepository<Pasta, Long> {
  Optional<Pasta> findById(Long id);

  List<Pasta> findAll();

  Pasta save(Pasta pasta);

  void deleteById(Long id);

List<Pasta> findByNomeAlunoContainingIgnoreCase(String termoBusca);

List<Pasta> findByNumeroPasta(int int1);
}
