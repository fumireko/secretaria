package com.example.generated.repository;

import com.example.generated.Gaveta;
import java.lang.Long;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GavetaRepository extends JpaRepository<Gaveta, Long> {
  Optional<Gaveta> findById(Long id);

  List<Gaveta> findAll();

  Gaveta save(Gaveta gaveta);

  void deleteById(Long id);
}
