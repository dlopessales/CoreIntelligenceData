package br.com.coreintelligence.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import br.com.coreintelligence.domain.enumeration.FaseObra;

import br.com.coreintelligence.domain.enumeration.TipoUnidade;

/**
 * A Empreendimento.
 */
@Entity
@Table(name = "empreendimento")
public class Empreendimento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "rua")
    private String rua;

    @Column(name = "numero")
    private Integer numero;

    @Column(name = "bairro")
    private String bairro;

    @Column(name = "cidade")
    private String cidade;

    @Column(name = "construtora_empreendedora")
    private String construtoraEmpreendedora;

    @Column(name = "quantidade_quartos")
    private Integer quantidadeQuartos;

    @Column(name = "inicio_comercializacao")
    private Instant inicioComercializacao;

    @Column(name = "entrega_unidade")
    private Instant entregaUnidade;

    @Enumerated(EnumType.STRING)
    @Column(name = "fase_obra")
    private FaseObra faseObra;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_unidade")
    private TipoUnidade tipoUnidade;

    @Column(name = "quantidade_unidades")
    private Integer quantidadeUnidades;

    @Column(name = "quantidade_unidades_vendidas")
    private Integer quantidadeUnidadesVendidas;

    @Column(name = "estoque")
    private Integer estoque;

    @Column(name = "percentual_vendido")
    private Long percentualVendido;

    @Column(name = "preco_medio")
    private Long precoMedio;

    @Column(name = "area_unidade")
    private Long areaUnidade;

    @Column(name = "forma_pagamento")
    private String formaPagamento;

    @Column(name = "caracterizacao_area_lazer")
    private String caracterizacaoAreaLazer;

    @Column(name = "infrestrutura_seguranca")
    private String infrestruturaSeguranca;

    @Column(name = "nivel_acabamento")
    private String nivelAcabamento;

    @ManyToOne
    @JsonIgnoreProperties("empreendimentos")
    private Levantamento levantamento;

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

    public Empreendimento nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getRua() {
        return rua;
    }

    public Empreendimento rua(String rua) {
        this.rua = rua;
        return this;
    }

    public void setRua(String rua) {
        this.rua = rua;
    }

    public Integer getNumero() {
        return numero;
    }

    public Empreendimento numero(Integer numero) {
        this.numero = numero;
        return this;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public String getBairro() {
        return bairro;
    }

    public Empreendimento bairro(String bairro) {
        this.bairro = bairro;
        return this;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCidade() {
        return cidade;
    }

    public Empreendimento cidade(String cidade) {
        this.cidade = cidade;
        return this;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getConstrutoraEmpreendedora() {
        return construtoraEmpreendedora;
    }

    public Empreendimento construtoraEmpreendedora(String construtoraEmpreendedora) {
        this.construtoraEmpreendedora = construtoraEmpreendedora;
        return this;
    }

    public void setConstrutoraEmpreendedora(String construtoraEmpreendedora) {
        this.construtoraEmpreendedora = construtoraEmpreendedora;
    }

    public Integer getQuantidadeQuartos() {
        return quantidadeQuartos;
    }

    public Empreendimento quantidadeQuartos(Integer quantidadeQuartos) {
        this.quantidadeQuartos = quantidadeQuartos;
        return this;
    }

    public void setQuantidadeQuartos(Integer quantidadeQuartos) {
        this.quantidadeQuartos = quantidadeQuartos;
    }

    public Instant getInicioComercializacao() {
        return inicioComercializacao;
    }

    public Empreendimento inicioComercializacao(Instant inicioComercializacao) {
        this.inicioComercializacao = inicioComercializacao;
        return this;
    }

    public void setInicioComercializacao(Instant inicioComercializacao) {
        this.inicioComercializacao = inicioComercializacao;
    }

    public Instant getEntregaUnidade() {
        return entregaUnidade;
    }

    public Empreendimento entregaUnidade(Instant entregaUnidade) {
        this.entregaUnidade = entregaUnidade;
        return this;
    }

    public void setEntregaUnidade(Instant entregaUnidade) {
        this.entregaUnidade = entregaUnidade;
    }

    public FaseObra getFaseObra() {
        return faseObra;
    }

    public Empreendimento faseObra(FaseObra faseObra) {
        this.faseObra = faseObra;
        return this;
    }

    public void setFaseObra(FaseObra faseObra) {
        this.faseObra = faseObra;
    }

    public TipoUnidade getTipoUnidade() {
        return tipoUnidade;
    }

    public Empreendimento tipoUnidade(TipoUnidade tipoUnidade) {
        this.tipoUnidade = tipoUnidade;
        return this;
    }

    public void setTipoUnidade(TipoUnidade tipoUnidade) {
        this.tipoUnidade = tipoUnidade;
    }

    public Integer getQuantidadeUnidades() {
        return quantidadeUnidades;
    }

    public Empreendimento quantidadeUnidades(Integer quantidadeUnidades) {
        this.quantidadeUnidades = quantidadeUnidades;
        return this;
    }

    public void setQuantidadeUnidades(Integer quantidadeUnidades) {
        this.quantidadeUnidades = quantidadeUnidades;
    }

    public Integer getQuantidadeUnidadesVendidas() {
        return quantidadeUnidadesVendidas;
    }

    public Empreendimento quantidadeUnidadesVendidas(Integer quantidadeUnidadesVendidas) {
        this.quantidadeUnidadesVendidas = quantidadeUnidadesVendidas;
        return this;
    }

    public void setQuantidadeUnidadesVendidas(Integer quantidadeUnidadesVendidas) {
        this.quantidadeUnidadesVendidas = quantidadeUnidadesVendidas;
    }

    public Integer getEstoque() {
        return estoque;
    }

    public Empreendimento estoque(Integer estoque) {
        this.estoque = estoque;
        return this;
    }

    public void setEstoque(Integer estoque) {
        this.estoque = estoque;
    }

    public Long getPercentualVendido() {
        return percentualVendido;
    }

    public Empreendimento percentualVendido(Long percentualVendido) {
        this.percentualVendido = percentualVendido;
        return this;
    }

    public void setPercentualVendido(Long percentualVendido) {
        this.percentualVendido = percentualVendido;
    }

    public Long getPrecoMedio() {
        return precoMedio;
    }

    public Empreendimento precoMedio(Long precoMedio) {
        this.precoMedio = precoMedio;
        return this;
    }

    public void setPrecoMedio(Long precoMedio) {
        this.precoMedio = precoMedio;
    }

    public Long getAreaUnidade() {
        return areaUnidade;
    }

    public Empreendimento areaUnidade(Long areaUnidade) {
        this.areaUnidade = areaUnidade;
        return this;
    }

    public void setAreaUnidade(Long areaUnidade) {
        this.areaUnidade = areaUnidade;
    }

    public String getFormaPagamento() {
        return formaPagamento;
    }

    public Empreendimento formaPagamento(String formaPagamento) {
        this.formaPagamento = formaPagamento;
        return this;
    }

    public void setFormaPagamento(String formaPagamento) {
        this.formaPagamento = formaPagamento;
    }

    public String getCaracterizacaoAreaLazer() {
        return caracterizacaoAreaLazer;
    }

    public Empreendimento caracterizacaoAreaLazer(String caracterizacaoAreaLazer) {
        this.caracterizacaoAreaLazer = caracterizacaoAreaLazer;
        return this;
    }

    public void setCaracterizacaoAreaLazer(String caracterizacaoAreaLazer) {
        this.caracterizacaoAreaLazer = caracterizacaoAreaLazer;
    }

    public String getInfrestruturaSeguranca() {
        return infrestruturaSeguranca;
    }

    public Empreendimento infrestruturaSeguranca(String infrestruturaSeguranca) {
        this.infrestruturaSeguranca = infrestruturaSeguranca;
        return this;
    }

    public void setInfrestruturaSeguranca(String infrestruturaSeguranca) {
        this.infrestruturaSeguranca = infrestruturaSeguranca;
    }

    public String getNivelAcabamento() {
        return nivelAcabamento;
    }

    public Empreendimento nivelAcabamento(String nivelAcabamento) {
        this.nivelAcabamento = nivelAcabamento;
        return this;
    }

    public void setNivelAcabamento(String nivelAcabamento) {
        this.nivelAcabamento = nivelAcabamento;
    }

    public Levantamento getLevantamento() {
        return levantamento;
    }

    public Empreendimento levantamento(Levantamento levantamento) {
        this.levantamento = levantamento;
        return this;
    }

    public void setLevantamento(Levantamento levantamento) {
        this.levantamento = levantamento;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Empreendimento)) {
            return false;
        }
        return id != null && id.equals(((Empreendimento) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Empreendimento{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", rua='" + getRua() + "'" +
            ", numero=" + getNumero() +
            ", bairro='" + getBairro() + "'" +
            ", cidade='" + getCidade() + "'" +
            ", construtoraEmpreendedora='" + getConstrutoraEmpreendedora() + "'" +
            ", quantidadeQuartos=" + getQuantidadeQuartos() +
            ", inicioComercializacao='" + getInicioComercializacao() + "'" +
            ", entregaUnidade='" + getEntregaUnidade() + "'" +
            ", faseObra='" + getFaseObra() + "'" +
            ", tipoUnidade='" + getTipoUnidade() + "'" +
            ", quantidadeUnidades=" + getQuantidadeUnidades() +
            ", quantidadeUnidadesVendidas=" + getQuantidadeUnidadesVendidas() +
            ", estoque=" + getEstoque() +
            ", percentualVendido=" + getPercentualVendido() +
            ", precoMedio=" + getPrecoMedio() +
            ", areaUnidade=" + getAreaUnidade() +
            ", formaPagamento='" + getFormaPagamento() + "'" +
            ", caracterizacaoAreaLazer='" + getCaracterizacaoAreaLazer() + "'" +
            ", infrestruturaSeguranca='" + getInfrestruturaSeguranca() + "'" +
            ", nivelAcabamento='" + getNivelAcabamento() + "'" +
            "}";
    }
}
