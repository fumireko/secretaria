package com.example.generated;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.lang.Long;
import java.lang.String;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(
    name = "tb_gaveta"
)
public class Gaveta {
  @Id
  @JsonProperty("id")
  @GeneratedValue(
      strategy = GenerationType.IDENTITY
  )
  @Column(
      name = "id_gaveta"
  )
  private Long id;

  @Column(
      name = "gaveta_descricao"
  )
  private String descricao;

  @OneToMany(
      mappedBy = "gaveta"
  )
  @JsonIgnoreProperties("gaveta")
  @Column(
      name = "gaveta_pastas"
  )
  private List<Pasta> pastas;

  public Gaveta() {
  }

  public Gaveta(String descricao, List<Pasta> pastas) {
    this.descricao = descricao;
    this.pastas = new ArrayList<>();
  }

  public String getDescricao() {
    return this.descricao;
  }

  public void setDescricao(String descricao) {
    this.descricao = descricao;
  }

  public List<Pasta> getPastas() {
    return this.pastas;
  }

  public void setPastas(List<Pasta> pastas) {
    this.pastas = pastas;
  }
}
