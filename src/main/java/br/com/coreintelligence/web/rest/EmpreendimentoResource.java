package br.com.coreintelligence.web.rest;

import br.com.coreintelligence.domain.Empreendimento;
import br.com.coreintelligence.service.EmpreendimentoService;
import br.com.coreintelligence.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link br.com.coreintelligence.domain.Empreendimento}.
 */
@RestController
@RequestMapping("/api")
public class EmpreendimentoResource {

    private final Logger log = LoggerFactory.getLogger(EmpreendimentoResource.class);

    private static final String ENTITY_NAME = "empreendimento";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EmpreendimentoService empreendimentoService;

    public EmpreendimentoResource(EmpreendimentoService empreendimentoService) {
        this.empreendimentoService = empreendimentoService;
    }

    /**
     * {@code POST  /empreendimentos} : Create a new empreendimento.
     *
     * @param empreendimento the empreendimento to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new empreendimento, or with status {@code 400 (Bad Request)} if the empreendimento has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/empreendimentos")
    public ResponseEntity<Empreendimento> createEmpreendimento(@RequestBody Empreendimento empreendimento) throws URISyntaxException {
        log.debug("REST request to save Empreendimento : {}", empreendimento);
        if (empreendimento.getId() != null) {
            throw new BadRequestAlertException("A new empreendimento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Empreendimento result = empreendimentoService.save(empreendimento);
        return ResponseEntity.created(new URI("/api/empreendimentos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /empreendimentos} : Updates an existing empreendimento.
     *
     * @param empreendimento the empreendimento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated empreendimento,
     * or with status {@code 400 (Bad Request)} if the empreendimento is not valid,
     * or with status {@code 500 (Internal Server Error)} if the empreendimento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/empreendimentos")
    public ResponseEntity<Empreendimento> updateEmpreendimento(@RequestBody Empreendimento empreendimento) throws URISyntaxException {
        log.debug("REST request to update Empreendimento : {}", empreendimento);
        if (empreendimento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Empreendimento result = empreendimentoService.save(empreendimento);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, empreendimento.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /empreendimentos} : get all the empreendimentos.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of empreendimentos in body.
     */
    @GetMapping("/empreendimentos")
    public ResponseEntity<List<Empreendimento>> getAllEmpreendimentos(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of Empreendimentos");
        Page<Empreendimento> page = empreendimentoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /empreendimentos/:id} : get the "id" empreendimento.
     *
     * @param id the id of the empreendimento to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the empreendimento, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/empreendimentos/{id}")
    public ResponseEntity<Empreendimento> getEmpreendimento(@PathVariable Long id) {
        log.debug("REST request to get Empreendimento : {}", id);
        Optional<Empreendimento> empreendimento = empreendimentoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(empreendimento);
    }

    /**
     * {@code DELETE  /empreendimentos/:id} : delete the "id" empreendimento.
     *
     * @param id the id of the empreendimento to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/empreendimentos/{id}")
    public ResponseEntity<Void> deleteEmpreendimento(@PathVariable Long id) {
        log.debug("REST request to delete Empreendimento : {}", id);
        empreendimentoService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
