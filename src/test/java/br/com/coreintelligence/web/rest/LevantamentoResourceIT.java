package br.com.coreintelligence.web.rest;

import br.com.coreintelligence.CoreIntelligenceDataApp;
import br.com.coreintelligence.domain.Levantamento;
import br.com.coreintelligence.repository.LevantamentoRepository;
import br.com.coreintelligence.service.LevantamentoService;
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

/**
 * Integration tests for the {@Link LevantamentoResource} REST controller.
 */
@SpringBootTest(classes = CoreIntelligenceDataApp.class)
public class LevantamentoResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATA_CRIACAO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_CRIACAO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_USUARIO_CRIACAO = "AAAAAAAAAA";
    private static final String UPDATED_USUARIO_CRIACAO = "BBBBBBBBBB";

    @Autowired
    private LevantamentoRepository levantamentoRepository;

    @Autowired
    private LevantamentoService levantamentoService;

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

    private MockMvc restLevantamentoMockMvc;

    private Levantamento levantamento;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LevantamentoResource levantamentoResource = new LevantamentoResource(levantamentoService);
        this.restLevantamentoMockMvc = MockMvcBuilders.standaloneSetup(levantamentoResource)
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
    public static Levantamento createEntity(EntityManager em) {
        Levantamento levantamento = new Levantamento()
            .nome(DEFAULT_NOME)
            .descricao(DEFAULT_DESCRICAO)
            .dataCriacao(DEFAULT_DATA_CRIACAO)
            .usuarioCriacao(DEFAULT_USUARIO_CRIACAO);
        return levantamento;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Levantamento createUpdatedEntity(EntityManager em) {
        Levantamento levantamento = new Levantamento()
            .nome(UPDATED_NOME)
            .descricao(UPDATED_DESCRICAO)
            .dataCriacao(UPDATED_DATA_CRIACAO)
            .usuarioCriacao(UPDATED_USUARIO_CRIACAO);
        return levantamento;
    }

    @BeforeEach
    public void initTest() {
        levantamento = createEntity(em);
    }

    @Test
    @Transactional
    public void createLevantamento() throws Exception {
        int databaseSizeBeforeCreate = levantamentoRepository.findAll().size();

        // Create the Levantamento
        restLevantamentoMockMvc.perform(post("/api/levantamentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(levantamento)))
            .andExpect(status().isCreated());

        // Validate the Levantamento in the database
        List<Levantamento> levantamentoList = levantamentoRepository.findAll();
        assertThat(levantamentoList).hasSize(databaseSizeBeforeCreate + 1);
        Levantamento testLevantamento = levantamentoList.get(levantamentoList.size() - 1);
        assertThat(testLevantamento.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testLevantamento.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testLevantamento.getDataCriacao()).isEqualTo(DEFAULT_DATA_CRIACAO);
        assertThat(testLevantamento.getUsuarioCriacao()).isEqualTo(DEFAULT_USUARIO_CRIACAO);
    }

    @Test
    @Transactional
    public void createLevantamentoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = levantamentoRepository.findAll().size();

        // Create the Levantamento with an existing ID
        levantamento.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLevantamentoMockMvc.perform(post("/api/levantamentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(levantamento)))
            .andExpect(status().isBadRequest());

        // Validate the Levantamento in the database
        List<Levantamento> levantamentoList = levantamentoRepository.findAll();
        assertThat(levantamentoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllLevantamentos() throws Exception {
        // Initialize the database
        levantamentoRepository.saveAndFlush(levantamento);

        // Get all the levantamentoList
        restLevantamentoMockMvc.perform(get("/api/levantamentos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(levantamento.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO.toString())))
            .andExpect(jsonPath("$.[*].dataCriacao").value(hasItem(DEFAULT_DATA_CRIACAO.toString())))
            .andExpect(jsonPath("$.[*].usuarioCriacao").value(hasItem(DEFAULT_USUARIO_CRIACAO.toString())));
    }
    
    @Test
    @Transactional
    public void getLevantamento() throws Exception {
        // Initialize the database
        levantamentoRepository.saveAndFlush(levantamento);

        // Get the levantamento
        restLevantamentoMockMvc.perform(get("/api/levantamentos/{id}", levantamento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(levantamento.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO.toString()))
            .andExpect(jsonPath("$.dataCriacao").value(DEFAULT_DATA_CRIACAO.toString()))
            .andExpect(jsonPath("$.usuarioCriacao").value(DEFAULT_USUARIO_CRIACAO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingLevantamento() throws Exception {
        // Get the levantamento
        restLevantamentoMockMvc.perform(get("/api/levantamentos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLevantamento() throws Exception {
        // Initialize the database
        levantamentoService.save(levantamento);

        int databaseSizeBeforeUpdate = levantamentoRepository.findAll().size();

        // Update the levantamento
        Levantamento updatedLevantamento = levantamentoRepository.findById(levantamento.getId()).get();
        // Disconnect from session so that the updates on updatedLevantamento are not directly saved in db
        em.detach(updatedLevantamento);
        updatedLevantamento
            .nome(UPDATED_NOME)
            .descricao(UPDATED_DESCRICAO)
            .dataCriacao(UPDATED_DATA_CRIACAO)
            .usuarioCriacao(UPDATED_USUARIO_CRIACAO);

        restLevantamentoMockMvc.perform(put("/api/levantamentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLevantamento)))
            .andExpect(status().isOk());

        // Validate the Levantamento in the database
        List<Levantamento> levantamentoList = levantamentoRepository.findAll();
        assertThat(levantamentoList).hasSize(databaseSizeBeforeUpdate);
        Levantamento testLevantamento = levantamentoList.get(levantamentoList.size() - 1);
        assertThat(testLevantamento.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testLevantamento.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testLevantamento.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testLevantamento.getUsuarioCriacao()).isEqualTo(UPDATED_USUARIO_CRIACAO);
    }

    @Test
    @Transactional
    public void updateNonExistingLevantamento() throws Exception {
        int databaseSizeBeforeUpdate = levantamentoRepository.findAll().size();

        // Create the Levantamento

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLevantamentoMockMvc.perform(put("/api/levantamentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(levantamento)))
            .andExpect(status().isBadRequest());

        // Validate the Levantamento in the database
        List<Levantamento> levantamentoList = levantamentoRepository.findAll();
        assertThat(levantamentoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLevantamento() throws Exception {
        // Initialize the database
        levantamentoService.save(levantamento);

        int databaseSizeBeforeDelete = levantamentoRepository.findAll().size();

        // Delete the levantamento
        restLevantamentoMockMvc.perform(delete("/api/levantamentos/{id}", levantamento.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Levantamento> levantamentoList = levantamentoRepository.findAll();
        assertThat(levantamentoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Levantamento.class);
        Levantamento levantamento1 = new Levantamento();
        levantamento1.setId(1L);
        Levantamento levantamento2 = new Levantamento();
        levantamento2.setId(levantamento1.getId());
        assertThat(levantamento1).isEqualTo(levantamento2);
        levantamento2.setId(2L);
        assertThat(levantamento1).isNotEqualTo(levantamento2);
        levantamento1.setId(null);
        assertThat(levantamento1).isNotEqualTo(levantamento2);
    }
}
