package com.example.generated;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.lang.Integer;
import java.lang.Long;
import java.lang.String;

@Entity
@Table(
    name = "tb_pasta"
)
public class Pasta {
  @Id
  @JsonProperty("id")
  @GeneratedValue(
      strategy = GenerationType.IDENTITY
  )
  @Column(
      name = "id_pasta"
  )
  private Long id;

  @Column(
      name = "pasta_nomeAluno"
  )
  private String nomeAluno;

  @Column(
      name = "pasta_numeroPasta"
  )
  private Integer numeroPasta;

  @ManyToOne
  @JsonIgnoreProperties("pastas")
  @JoinColumn(
      name = "fk_gaveta"
  )
  private Gaveta gaveta;

  @Column(
      name = "pasta_status"
  )
  private String status;

  public Pasta() {
  }

  public Pasta(String nomeAluno, Integer numeroPasta, Gaveta gaveta, String status) {
    this.nomeAluno = nomeAluno;
    this.numeroPasta = numeroPasta;
    this.gaveta = gaveta;
    this.status = status;
  }
  
  public Long getId() {
	return id;
}
  
  public void setId(Long id) {
	this.id = id;
  }

  public String getNomeAluno() {
    return this.nomeAluno;
  }

  public void setNomeAluno(String nomeAluno) {
    this.nomeAluno = nomeAluno;
  }

  public Integer getNumeroPasta() {
    return this.numeroPasta;
  }

  public void setNumeroPasta(Integer numeroPasta) {
    this.numeroPasta = numeroPasta;
  }

  public Gaveta getGaveta() {
    return this.gaveta;
  }

  public void setGaveta(Gaveta gaveta) {
    this.gaveta = gaveta;
  }

  public String getStatus() {
    return this.status;
  }

  public void setStatus(String status) {
    this.status = status;
  }
}
