package br.com.coreintelligence.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Levantamento.
 */
@Entity
@Table(name = "levantamento")
public class Levantamento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "data_criacao")
    private Instant dataCriacao;

    @Column(name = "usuario_criacao")
    private String usuarioCriacao;

    @OneToMany(mappedBy = "levantamento")
    private Set<Premissa> premissas = new HashSet<>();

    @OneToMany(mappedBy = "levantamento")
    private Set<Empreendimento> empreedimentos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Levantamento nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public Levantamento descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Instant getDataCriacao() {
        return dataCriacao;
    }

    public Levantamento dataCriacao(Instant dataCriacao) {
        this.dataCriacao = dataCriacao;
        return this;
    }

    public void setDataCriacao(Instant dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public String getUsuarioCriacao() {
        return usuarioCriacao;
    }

    public Levantamento usuarioCriacao(String usuarioCriacao) {
        this.usuarioCriacao = usuarioCriacao;
        return this;
    }

    public void setUsuarioCriacao(String usuarioCriacao) {
        this.usuarioCriacao = usuarioCriacao;
    }

    public Set<Premissa> getPremissas() {
        return premissas;
    }

    public Levantamento premissas(Set<Premissa> premissas) {
        this.premissas = premissas;
        return this;
    }

    public Levantamento addPremissas(Premissa premissa) {
        this.premissas.add(premissa);
        premissa.setLevantamento(this);
        return this;
    }

    public Levantamento removePremissas(Premissa premissa) {
        this.premissas.remove(premissa);
        premissa.setLevantamento(null);
        return this;
    }

    public void setPremissas(Set<Premissa> premissas) {
        this.premissas = premissas;
    }

    public Set<Empreendimento> getEmpreedimentos() {
        return empreedimentos;
    }

    public Levantamento empreedimentos(Set<Empreendimento> empreendimentos) {
        this.empreedimentos = empreendimentos;
        return this;
    }

    public Levantamento addEmpreedimentos(Empreendimento empreendimento) {
        this.empreedimentos.add(empreendimento);
        empreendimento.setLevantamento(this);
        return this;
    }

    public Levantamento removeEmpreedimentos(Empreendimento empreendimento) {
        this.empreedimentos.remove(empreendimento);
        empreendimento.setLevantamento(null);
        return this;
    }

    public void setEmpreedimentos(Set<Empreendimento> empreendimentos) {
        this.empreedimentos = empreendimentos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Levantamento)) {
            return false;
        }
        return id != null && id.equals(((Levantamento) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Levantamento{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", dataCriacao='" + getDataCriacao() + "'" +
            ", usuarioCriacao='" + getUsuarioCriacao() + "'" +
            "}";
    }
}
