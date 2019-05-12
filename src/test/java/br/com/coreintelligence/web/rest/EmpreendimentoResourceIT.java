package br.com.coreintelligence.web.rest;

import br.com.coreintelligence.CoreIntelligenceDataApp;
import br.com.coreintelligence.domain.Empreendimento;
import br.com.coreintelligence.repository.EmpreendimentoRepository;
import br.com.coreintelligence.service.EmpreendimentoService;
import br.com.coreintelligence.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static br.com.coreintelligence.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.com.coreintelligence.domain.enumeration.FaseObra;
import br.com.coreintelligence.domain.enumeration.TipoUnidade;
/**
 * Integration tests for the {@Link EmpreendimentoResource} REST controller.
 */
@SpringBootTest(classes = CoreIntelligenceDataApp.class)
public class EmpreendimentoResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_RUA = "AAAAAAAAAA";
    private static final String UPDATED_RUA = "BBBBBBBBBB";

    private static final Integer DEFAULT_NUMERO = 1;
    private static final Integer UPDATED_NUMERO = 2;

    private static final String DEFAULT_BAIRRO = "AAAAAAAAAA";
    private static final String UPDATED_BAIRRO = "BBBBBBBBBB";

    private static final String DEFAULT_CIDADE = "AAAAAAAAAA";
    private static final String UPDATED_CIDADE = "BBBBBBBBBB";

    private static final String DEFAULT_CONSTRUTORA_EMPREENDEDORA = "AAAAAAAAAA";
    private static final String UPDATED_CONSTRUTORA_EMPREENDEDORA = "BBBBBBBBBB";

    private static final Integer DEFAULT_QUANTIDADE_QUARTOS = 1;
    private static final Integer UPDATED_QUANTIDADE_QUARTOS = 2;

    private static final Instant DEFAULT_INICIO_COMERCIALIZACAO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_INICIO_COMERCIALIZACAO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_ENTREGA_UNIDADE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_ENTREGA_UNIDADE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final FaseObra DEFAULT_FASE_OBRA = FaseObra.CONSTRUCAO;
    private static final FaseObra UPDATED_FASE_OBRA = FaseObra.PRONTO;

    private static final TipoUnidade DEFAULT_TIPO_UNIDADE = TipoUnidade.LOFT;
    private static final TipoUnidade UPDATED_TIPO_UNIDADE = TipoUnidade.STUDIO;

    private static final Integer DEFAULT_QUANTIDADE_UNIDADES = 1;
    private static final Integer UPDATED_QUANTIDADE_UNIDADES = 2;

    private static final Integer DEFAULT_QUANTIDADE_UNIDADES_VENDIDAS = 1;
    private static final Integer UPDATED_QUANTIDADE_UNIDADES_VENDIDAS = 2;

    private static final Integer DEFAULT_ESTOQUE = 1;
    private static final Integer UPDATED_ESTOQUE = 2;

    private static final Long DEFAULT_PERCENTUAL_VENDIDO = 1L;
    private static final Long UPDATED_PERCENTUAL_VENDIDO = 2L;

    private static final Long DEFAULT_PRECO_MEDIO = 1L;
    private static final Long UPDATED_PRECO_MEDIO = 2L;

    private static final Long DEFAULT_AREA_UNIDADE = 1L;
    private static final Long UPDATED_AREA_UNIDADE = 2L;

    private static final String DEFAULT_FORMA_PAGAMENTO = "AAAAAAAAAA";
    private static final String UPDATED_FORMA_PAGAMENTO = "BBBBBBBBBB";

    private static final String DEFAULT_CARACTERIZACAO_AREA_LAZER = "AAAAAAAAAA";
    private static final String UPDATED_CARACTERIZACAO_AREA_LAZER = "BBBBBBBBBB";

    private static final String DEFAULT_INFRESTRUTURA_SEGURANCA = "AAAAAAAAAA";
    private static final String UPDATED_INFRESTRUTURA_SEGURANCA = "BBBBBBBBBB";

    private static final String DEFAULT_NIVEL_ACABAMENTO = "AAAAAAAAAA";
    private static final String UPDATED_NIVEL_ACABAMENTO = "BBBBBBBBBB";

    @Autowired
    private EmpreendimentoRepository empreendimentoRepository;

    @Autowired
    private EmpreendimentoService empreendimentoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restEmpreendimentoMockMvc;

    private Empreendimento empreendimento;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmpreendimentoResource empreendimentoResource = new EmpreendimentoResource(empreendimentoService);
        this.restEmpreendimentoMockMvc = MockMvcBuilders.standaloneSetup(empreendimentoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Empreendimento createEntity(EntityManager em) {
        Empreendimento empreendimento = new Empreendimento()
            .nome(DEFAULT_NOME)
            .rua(DEFAULT_RUA)
            .numero(DEFAULT_NUMERO)
            .bairro(DEFAULT_BAIRRO)
            .cidade(DEFAULT_CIDADE)
            .construtoraEmpreendedora(DEFAULT_CONSTRUTORA_EMPREENDEDORA)
            .quantidadeQuartos(DEFAULT_QUANTIDADE_QUARTOS)
            .inicioComercializacao(DEFAULT_INICIO_COMERCIALIZACAO)
            .entregaUnidade(DEFAULT_ENTREGA_UNIDADE)
            .faseObra(DEFAULT_FASE_OBRA)
            .tipoUnidade(DEFAULT_TIPO_UNIDADE)
            .quantidadeUnidades(DEFAULT_QUANTIDADE_UNIDADES)
            .quantidadeUnidadesVendidas(DEFAULT_QUANTIDADE_UNIDADES_VENDIDAS)
            .estoque(DEFAULT_ESTOQUE)
            .percentualVendido(DEFAULT_PERCENTUAL_VENDIDO)
            .precoMedio(DEFAULT_PRECO_MEDIO)
            .areaUnidade(DEFAULT_AREA_UNIDADE)
            .formaPagamento(DEFAULT_FORMA_PAGAMENTO)
            .caracterizacaoAreaLazer(DEFAULT_CARACTERIZACAO_AREA_LAZER)
            .infrestruturaSeguranca(DEFAULT_INFRESTRUTURA_SEGURANCA)
            .nivelAcabamento(DEFAULT_NIVEL_ACABAMENTO);
        return empreendimento;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Empreendimento createUpdatedEntity(EntityManager em) {
        Empreendimento empreendimento = new Empreendimento()
            .nome(UPDATED_NOME)
            .rua(UPDATED_RUA)
            .numero(UPDATED_NUMERO)
            .bairro(UPDATED_BAIRRO)
            .cidade(UPDATED_CIDADE)
            .construtoraEmpreendedora(UPDATED_CONSTRUTORA_EMPREENDEDORA)
            .quantidadeQuartos(UPDATED_QUANTIDADE_QUARTOS)
            .inicioComercializacao(UPDATED_INICIO_COMERCIALIZACAO)
            .entregaUnidade(UPDATED_ENTREGA_UNIDADE)
            .faseObra(UPDATED_FASE_OBRA)
            .tipoUnidade(UPDATED_TIPO_UNIDADE)
            .quantidadeUnidades(UPDATED_QUANTIDADE_UNIDADES)
            .quantidadeUnidadesVendidas(UPDATED_QUANTIDADE_UNIDADES_VENDIDAS)
            .estoque(UPDATED_ESTOQUE)
            .percentualVendido(UPDATED_PERCENTUAL_VENDIDO)
            .precoMedio(UPDATED_PRECO_MEDIO)
            .areaUnidade(UPDATED_AREA_UNIDADE)
            .formaPagamento(UPDATED_FORMA_PAGAMENTO)
            .caracterizacaoAreaLazer(UPDATED_CARACTERIZACAO_AREA_LAZER)
            .infrestruturaSeguranca(UPDATED_INFRESTRUTURA_SEGURANCA)
            .nivelAcabamento(UPDATED_NIVEL_ACABAMENTO);
        return empreendimento;
    }

    @BeforeEach
    public void initTest() {
        empreendimento = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmpreendimento() throws Exception {
        int databaseSizeBeforeCreate = empreendimentoRepository.findAll().size();

        // Create the Empreendimento
        restEmpreendimentoMockMvc.perform(post("/api/empreendimentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(empreendimento)))
            .andExpect(status().isCreated());

        // Validate the Empreendimento in the database
        List<Empreendimento> empreendimentoList = empreendimentoRepository.findAll();
        assertThat(empreendimentoList).hasSize(databaseSizeBeforeCreate + 1);
        Empreendimento testEmpreendimento = empreendimentoList.get(empreendimentoList.size() - 1);
        assertThat(testEmpreendimento.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testEmpreendimento.getRua()).isEqualTo(DEFAULT_RUA);
        assertThat(testEmpreendimento.getNumero()).isEqualTo(DEFAULT_NUMERO);
        assertThat(testEmpreendimento.getBairro()).isEqualTo(DEFAULT_BAIRRO);
        assertThat(testEmpreendimento.getCidade()).isEqualTo(DEFAULT_CIDADE);
        assertThat(testEmpreendimento.getConstrutoraEmpreendedora()).isEqualTo(DEFAULT_CONSTRUTORA_EMPREENDEDORA);
        assertThat(testEmpreendimento.getQuantidadeQuartos()).isEqualTo(DEFAULT_QUANTIDADE_QUARTOS);
        assertThat(testEmpreendimento.getInicioComercializacao()).isEqualTo(DEFAULT_INICIO_COMERCIALIZACAO);
        assertThat(testEmpreendimento.getEntregaUnidade()).isEqualTo(DEFAULT_ENTREGA_UNIDADE);
        assertThat(testEmpreendimento.getFaseObra()).isEqualTo(DEFAULT_FASE_OBRA);
        assertThat(testEmpreendimento.getTipoUnidade()).isEqualTo(DEFAULT_TIPO_UNIDADE);
        assertThat(testEmpreendimento.getQuantidadeUnidades()).isEqualTo(DEFAULT_QUANTIDADE_UNIDADES);
        assertThat(testEmpreendimento.getQuantidadeUnidadesVendidas()).isEqualTo(DEFAULT_QUANTIDADE_UNIDADES_VENDIDAS);
        assertThat(testEmpreendimento.getEstoque()).isEqualTo(DEFAULT_ESTOQUE);
        assertThat(testEmpreendimento.getPercentualVendido()).isEqualTo(DEFAULT_PERCENTUAL_VENDIDO);
        assertThat(testEmpreendimento.getPrecoMedio()).isEqualTo(DEFAULT_PRECO_MEDIO);
        assertThat(testEmpreendimento.getAreaUnidade()).isEqualTo(DEFAULT_AREA_UNIDADE);
        assertThat(testEmpreendimento.getFormaPagamento()).isEqualTo(DEFAULT_FORMA_PAGAMENTO);
        assertThat(testEmpreendimento.getCaracterizacaoAreaLazer()).isEqualTo(DEFAULT_CARACTERIZACAO_AREA_LAZER);
        assertThat(testEmpreendimento.getInfrestruturaSeguranca()).isEqualTo(DEFAULT_INFRESTRUTURA_SEGURANCA);
        assertThat(testEmpreendimento.getNivelAcabamento()).isEqualTo(DEFAULT_NIVEL_ACABAMENTO);
    }

    @Test
    @Transactional
    public void createEmpreendimentoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = empreendimentoRepository.findAll().size();

        // Create the Empreendimento with an existing ID
        empreendimento.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmpreendimentoMockMvc.perform(post("/api/empreendimentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(empreendimento)))
            .andExpect(status().isBadRequest());

        // Validate the Empreendimento in the database
        List<Empreendimento> empreendimentoList = empreendimentoRepository.findAll();
        assertThat(empreendimentoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllEmpreendimentos() throws Exception {
        // Initialize the database
        empreendimentoRepository.saveAndFlush(empreendimento);

        // Get all the empreendimentoList
        restEmpreendimentoMockMvc.perform(get("/api/empreendimentos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(empreendimento.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].rua").value(hasItem(DEFAULT_RUA.toString())))
            .andExpect(jsonPath("$.[*].numero").value(hasItem(DEFAULT_NUMERO)))
            .andExpect(jsonPath("$.[*].bairro").value(hasItem(DEFAULT_BAIRRO.toString())))
            .andExpect(jsonPath("$.[*].cidade").value(hasItem(DEFAULT_CIDADE.toString())))
            .andExpect(jsonPath("$.[*].construtoraEmpreendedora").value(hasItem(DEFAULT_CONSTRUTORA_EMPREENDEDORA.toString())))
            .andExpect(jsonPath("$.[*].quantidadeQuartos").value(hasItem(DEFAULT_QUANTIDADE_QUARTOS)))
            .andExpect(jsonPath("$.[*].inicioComercializacao").value(hasItem(DEFAULT_INICIO_COMERCIALIZACAO.toString())))
            .andExpect(jsonPath("$.[*].entregaUnidade").value(hasItem(DEFAULT_ENTREGA_UNIDADE.toString())))
            .andExpect(jsonPath("$.[*].faseObra").value(hasItem(DEFAULT_FASE_OBRA.toString())))
            .andExpect(jsonPath("$.[*].tipoUnidade").value(hasItem(DEFAULT_TIPO_UNIDADE.toString())))
            .andExpect(jsonPath("$.[*].quantidadeUnidades").value(hasItem(DEFAULT_QUANTIDADE_UNIDADES)))
            .andExpect(jsonPath("$.[*].quantidadeUnidadesVendidas").value(hasItem(DEFAULT_QUANTIDADE_UNIDADES_VENDIDAS)))
            .andExpect(jsonPath("$.[*].estoque").value(hasItem(DEFAULT_ESTOQUE)))
            .andExpect(jsonPath("$.[*].percentualVendido").value(hasItem(DEFAULT_PERCENTUAL_VENDIDO.intValue())))
            .andExpect(jsonPath("$.[*].precoMedio").value(hasItem(DEFAULT_PRECO_MEDIO.intValue())))
            .andExpect(jsonPath("$.[*].areaUnidade").value(hasItem(DEFAULT_AREA_UNIDADE.intValue())))
            .andExpect(jsonPath("$.[*].formaPagamento").value(hasItem(DEFAULT_FORMA_PAGAMENTO.toString())))
            .andExpect(jsonPath("$.[*].caracterizacaoAreaLazer").value(hasItem(DEFAULT_CARACTERIZACAO_AREA_LAZER.toString())))
            .andExpect(jsonPath("$.[*].infrestruturaSeguranca").value(hasItem(DEFAULT_INFRESTRUTURA_SEGURANCA.toString())))
            .andExpect(jsonPath("$.[*].nivelAcabamento").value(hasItem(DEFAULT_NIVEL_ACABAMENTO.toString())));
    }
    
    @Test
    @Transactional
    public void getEmpreendimento() throws Exception {
        // Initialize the database
        empreendimentoRepository.saveAndFlush(empreendimento);

        // Get the empreendimento
        restEmpreendimentoMockMvc.perform(get("/api/empreendimentos/{id}", empreendimento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(empreendimento.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.rua").value(DEFAULT_RUA.toString()))
            .andExpect(jsonPath("$.numero").value(DEFAULT_NUMERO))
            .andExpect(jsonPath("$.bairro").value(DEFAULT_BAIRRO.toString()))
            .andExpect(jsonPath("$.cidade").value(DEFAULT_CIDADE.toString()))
            .andExpect(jsonPath("$.construtoraEmpreendedora").value(DEFAULT_CONSTRUTORA_EMPREENDEDORA.toString()))
            .andExpect(jsonPath("$.quantidadeQuartos").value(DEFAULT_QUANTIDADE_QUARTOS))
            .andExpect(jsonPath("$.inicioComercializacao").value(DEFAULT_INICIO_COMERCIALIZACAO.toString()))
            .andExpect(jsonPath("$.entregaUnidade").value(DEFAULT_ENTREGA_UNIDADE.toString()))
            .andExpect(jsonPath("$.faseObra").value(DEFAULT_FASE_OBRA.toString()))
            .andExpect(jsonPath("$.tipoUnidade").value(DEFAULT_TIPO_UNIDADE.toString()))
            .andExpect(jsonPath("$.quantidadeUnidades").value(DEFAULT_QUANTIDADE_UNIDADES))
            .andExpect(jsonPath("$.quantidadeUnidadesVendidas").value(DEFAULT_QUANTIDADE_UNIDADES_VENDIDAS))
            .andExpect(jsonPath("$.estoque").value(DEFAULT_ESTOQUE))
            .andExpect(jsonPath("$.percentualVendido").value(DEFAULT_PERCENTUAL_VENDIDO.intValue()))
            .andExpect(jsonPath("$.precoMedio").value(DEFAULT_PRECO_MEDIO.intValue()))
            .andExpect(jsonPath("$.areaUnidade").value(DEFAULT_AREA_UNIDADE.intValue()))
            .andExpect(jsonPath("$.formaPagamento").value(DEFAULT_FORMA_PAGAMENTO.toString()))
            .andExpect(jsonPath("$.caracterizacaoAreaLazer").value(DEFAULT_CARACTERIZACAO_AREA_LAZER.toString()))
            .andExpect(jsonPath("$.infrestruturaSeguranca").value(DEFAULT_INFRESTRUTURA_SEGURANCA.toString()))
            .andExpect(jsonPath("$.nivelAcabamento").value(DEFAULT_NIVEL_ACABAMENTO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEmpreendimento() throws Exception {
        // Get the empreendimento
        restEmpreendimentoMockMvc.perform(get("/api/empreendimentos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmpreendimento() throws Exception {
        // Initialize the database
        empreendimentoService.save(empreendimento);

        int databaseSizeBeforeUpdate = empreendimentoRepository.findAll().size();

        // Update the empreendimento
        Empreendimento updatedEmpreendimento = empreendimentoRepository.findById(empreendimento.getId()).get();
        // Disconnect from session so that the updates on updatedEmpreendimento are not directly saved in db
        em.detach(updatedEmpreendimento);
        updatedEmpreendimento
            .nome(UPDATED_NOME)
            .rua(UPDATED_RUA)
            .numero(UPDATED_NUMERO)
            .bairro(UPDATED_BAIRRO)
            .cidade(UPDATED_CIDADE)
            .construtoraEmpreendedora(UPDATED_CONSTRUTORA_EMPREENDEDORA)
            .quantidadeQuartos(UPDATED_QUANTIDADE_QUARTOS)
            .inicioComercializacao(UPDATED_INICIO_COMERCIALIZACAO)
            .entregaUnidade(UPDATED_ENTREGA_UNIDADE)
            .faseObra(UPDATED_FASE_OBRA)
            .tipoUnidade(UPDATED_TIPO_UNIDADE)
            .quantidadeUnidades(UPDATED_QUANTIDADE_UNIDADES)
            .quantidadeUnidadesVendidas(UPDATED_QUANTIDADE_UNIDADES_VENDIDAS)
            .estoque(UPDATED_ESTOQUE)
            .percentualVendido(UPDATED_PERCENTUAL_VENDIDO)
            .precoMedio(UPDATED_PRECO_MEDIO)
            .areaUnidade(UPDATED_AREA_UNIDADE)
            .formaPagamento(UPDATED_FORMA_PAGAMENTO)
            .caracterizacaoAreaLazer(UPDATED_CARACTERIZACAO_AREA_LAZER)
            .infrestruturaSeguranca(UPDATED_INFRESTRUTURA_SEGURANCA)
            .nivelAcabamento(UPDATED_NIVEL_ACABAMENTO);

        restEmpreendimentoMockMvc.perform(put("/api/empreendimentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmpreendimento)))
            .andExpect(status().isOk());

        // Validate the Empreendimento in the database
        List<Empreendimento> empreendimentoList = empreendimentoRepository.findAll();
        assertThat(empreendimentoList).hasSize(databaseSizeBeforeUpdate);
        Empreendimento testEmpreendimento = empreendimentoList.get(empreendimentoList.size() - 1);
        assertThat(testEmpreendimento.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testEmpreendimento.getRua()).isEqualTo(UPDATED_RUA);
        assertThat(testEmpreendimento.getNumero()).isEqualTo(UPDATED_NUMERO);
        assertThat(testEmpreendimento.getBairro()).isEqualTo(UPDATED_BAIRRO);
        assertThat(testEmpreendimento.getCidade()).isEqualTo(UPDATED_CIDADE);
        assertThat(testEmpreendimento.getConstrutoraEmpreendedora()).isEqualTo(UPDATED_CONSTRUTORA_EMPREENDEDORA);
        assertThat(testEmpreendimento.getQuantidadeQuartos()).isEqualTo(UPDATED_QUANTIDADE_QUARTOS);
        assertThat(testEmpreendimento.getInicioComercializacao()).isEqualTo(UPDATED_INICIO_COMERCIALIZACAO);
        assertThat(testEmpreendimento.getEntregaUnidade()).isEqualTo(UPDATED_ENTREGA_UNIDADE);
        assertThat(testEmpreendimento.getFaseObra()).isEqualTo(UPDATED_FASE_OBRA);
        assertThat(testEmpreendimento.getTipoUnidade()).isEqualTo(UPDATED_TIPO_UNIDADE);
        assertThat(testEmpreendimento.getQuantidadeUnidades()).isEqualTo(UPDATED_QUANTIDADE_UNIDADES);
        assertThat(testEmpreendimento.getQuantidadeUnidadesVendidas()).isEqualTo(UPDATED_QUANTIDADE_UNIDADES_VENDIDAS);
        assertThat(testEmpreendimento.getEstoque()).isEqualTo(UPDATED_ESTOQUE);
        assertThat(testEmpreendimento.getPercentualVendido()).isEqualTo(UPDATED_PERCENTUAL_VENDIDO);
        assertThat(testEmpreendimento.getPrecoMedio()).isEqualTo(UPDATED_PRECO_MEDIO);
        assertThat(testEmpreendimento.getAreaUnidade()).isEqualTo(UPDATED_AREA_UNIDADE);
        assertThat(testEmpreendimento.getFormaPagamento()).isEqualTo(UPDATED_FORMA_PAGAMENTO);
        assertThat(testEmpreendimento.getCaracterizacaoAreaLazer()).isEqualTo(UPDATED_CARACTERIZACAO_AREA_LAZER);
        assertThat(testEmpreendimento.getInfrestruturaSeguranca()).isEqualTo(UPDATED_INFRESTRUTURA_SEGURANCA);
        assertThat(testEmpreendimento.getNivelAcabamento()).isEqualTo(UPDATED_NIVEL_ACABAMENTO);
    }

    @Test
    @Transactional
    public void updateNonExistingEmpreendimento() throws Exception {
        int databaseSizeBeforeUpdate = empreendimentoRepository.findAll().size();

        // Create the Empreendimento

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEmpreendimentoMockMvc.perform(put("/api/empreendimentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(empreendimento)))
            .andExpect(status().isBadRequest());

        // Validate the Empreendimento in the database
        List<Empreendimento> empreendimentoList = empreendimentoRepository.findAll();
        assertThat(empreendimentoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEmpreendimento() throws Exception {
        // Initialize the database
        empreendimentoService.save(empreendimento);

        int databaseSizeBeforeDelete = empreendimentoRepository.findAll().size();

        // Delete the empreendimento
        restEmpreendimentoMockMvc.perform(delete("/api/empreendimentos/{id}", empreendimento.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Empreendimento> empreendimentoList = empreendimentoRepository.findAll();
        assertThat(empreendimentoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Empreendimento.class);
        Empreendimento empreendimento1 = new Empreendimento();
        empreendimento1.setId(1L);
        Empreendimento empreendimento2 = new Empreendimento();
        empreendimento2.setId(empreendimento1.getId());
        assertThat(empreendimento1).isEqualTo(empreendimento2);
        empreendimento2.setId(2L);
        assertThat(empreendimento1).isNotEqualTo(empreendimento2);
        empreendimento1.setId(null);
        assertThat(empreendimento1).isNotEqualTo(empreendimento2);
    }
}
