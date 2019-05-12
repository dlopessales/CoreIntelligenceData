package br.com.coreintelligence.web.rest;

import br.com.coreintelligence.CoreIntelligenceDataApp;
import br.com.coreintelligence.domain.Premissa;
import br.com.coreintelligence.repository.PremissaRepository;
import br.com.coreintelligence.service.PremissaService;
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
import java.util.List;

import static br.com.coreintelligence.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link PremissaResource} REST controller.
 */
@SpringBootTest(classes = CoreIntelligenceDataApp.class)
public class PremissaResourceIT {

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    @Autowired
    private PremissaRepository premissaRepository;

    @Autowired
    private PremissaService premissaService;

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

    private MockMvc restPremissaMockMvc;

    private Premissa premissa;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PremissaResource premissaResource = new PremissaResource(premissaService);
        this.restPremissaMockMvc = MockMvcBuilders.standaloneSetup(premissaResource)
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
    public static Premissa createEntity(EntityManager em) {
        Premissa premissa = new Premissa()
            .descricao(DEFAULT_DESCRICAO);
        return premissa;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Premissa createUpdatedEntity(EntityManager em) {
        Premissa premissa = new Premissa()
            .descricao(UPDATED_DESCRICAO);
        return premissa;
    }

    @BeforeEach
    public void initTest() {
        premissa = createEntity(em);
    }

    @Test
    @Transactional
    public void createPremissa() throws Exception {
        int databaseSizeBeforeCreate = premissaRepository.findAll().size();

        // Create the Premissa
        restPremissaMockMvc.perform(post("/api/premissas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(premissa)))
            .andExpect(status().isCreated());

        // Validate the Premissa in the database
        List<Premissa> premissaList = premissaRepository.findAll();
        assertThat(premissaList).hasSize(databaseSizeBeforeCreate + 1);
        Premissa testPremissa = premissaList.get(premissaList.size() - 1);
        assertThat(testPremissa.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
    }

    @Test
    @Transactional
    public void createPremissaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = premissaRepository.findAll().size();

        // Create the Premissa with an existing ID
        premissa.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPremissaMockMvc.perform(post("/api/premissas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(premissa)))
            .andExpect(status().isBadRequest());

        // Validate the Premissa in the database
        List<Premissa> premissaList = premissaRepository.findAll();
        assertThat(premissaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPremissas() throws Exception {
        // Initialize the database
        premissaRepository.saveAndFlush(premissa);

        // Get all the premissaList
        restPremissaMockMvc.perform(get("/api/premissas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(premissa.getId().intValue())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO.toString())));
    }
    
    @Test
    @Transactional
    public void getPremissa() throws Exception {
        // Initialize the database
        premissaRepository.saveAndFlush(premissa);

        // Get the premissa
        restPremissaMockMvc.perform(get("/api/premissas/{id}", premissa.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(premissa.getId().intValue()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPremissa() throws Exception {
        // Get the premissa
        restPremissaMockMvc.perform(get("/api/premissas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePremissa() throws Exception {
        // Initialize the database
        premissaService.save(premissa);

        int databaseSizeBeforeUpdate = premissaRepository.findAll().size();

        // Update the premissa
        Premissa updatedPremissa = premissaRepository.findById(premissa.getId()).get();
        // Disconnect from session so that the updates on updatedPremissa are not directly saved in db
        em.detach(updatedPremissa);
        updatedPremissa
            .descricao(UPDATED_DESCRICAO);

        restPremissaMockMvc.perform(put("/api/premissas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPremissa)))
            .andExpect(status().isOk());

        // Validate the Premissa in the database
        List<Premissa> premissaList = premissaRepository.findAll();
        assertThat(premissaList).hasSize(databaseSizeBeforeUpdate);
        Premissa testPremissa = premissaList.get(premissaList.size() - 1);
        assertThat(testPremissa.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
    }

    @Test
    @Transactional
    public void updateNonExistingPremissa() throws Exception {
        int databaseSizeBeforeUpdate = premissaRepository.findAll().size();

        // Create the Premissa

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPremissaMockMvc.perform(put("/api/premissas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(premissa)))
            .andExpect(status().isBadRequest());

        // Validate the Premissa in the database
        List<Premissa> premissaList = premissaRepository.findAll();
        assertThat(premissaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePremissa() throws Exception {
        // Initialize the database
        premissaService.save(premissa);

        int databaseSizeBeforeDelete = premissaRepository.findAll().size();

        // Delete the premissa
        restPremissaMockMvc.perform(delete("/api/premissas/{id}", premissa.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Premissa> premissaList = premissaRepository.findAll();
        assertThat(premissaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Premissa.class);
        Premissa premissa1 = new Premissa();
        premissa1.setId(1L);
        Premissa premissa2 = new Premissa();
        premissa2.setId(premissa1.getId());
        assertThat(premissa1).isEqualTo(premissa2);
        premissa2.setId(2L);
        assertThat(premissa1).isNotEqualTo(premissa2);
        premissa1.setId(null);
        assertThat(premissa1).isNotEqualTo(premissa2);
    }
}
