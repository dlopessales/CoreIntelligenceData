package br.com.coreintelligence.web.rest;

import br.com.coreintelligence.domain.Premissa;
import br.com.coreintelligence.service.PremissaService;
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
 * REST controller for managing {@link br.com.coreintelligence.domain.Premissa}.
 */
@RestController
@RequestMapping("/api")
public class PremissaResource {

    private final Logger log = LoggerFactory.getLogger(PremissaResource.class);

    private static final String ENTITY_NAME = "premissa";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PremissaService premissaService;

    public PremissaResource(PremissaService premissaService) {
        this.premissaService = premissaService;
    }

    /**
     * {@code POST  /premissas} : Create a new premissa.
     *
     * @param premissa the premissa to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new premissa, or with status {@code 400 (Bad Request)} if the premissa has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/premissas")
    public ResponseEntity<Premissa> createPremissa(@RequestBody Premissa premissa) throws URISyntaxException {
        log.debug("REST request to save Premissa : {}", premissa);
        if (premissa.getId() != null) {
            throw new BadRequestAlertException("A new premissa cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Premissa result = premissaService.save(premissa);
        return ResponseEntity.created(new URI("/api/premissas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /premissas} : Updates an existing premissa.
     *
     * @param premissa the premissa to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated premissa,
     * or with status {@code 400 (Bad Request)} if the premissa is not valid,
     * or with status {@code 500 (Internal Server Error)} if the premissa couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/premissas")
    public ResponseEntity<Premissa> updatePremissa(@RequestBody Premissa premissa) throws URISyntaxException {
        log.debug("REST request to update Premissa : {}", premissa);
        if (premissa.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Premissa result = premissaService.save(premissa);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, premissa.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /premissas} : get all the premissas.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of premissas in body.
     */
    @GetMapping("/premissas")
    public ResponseEntity<List<Premissa>> getAllPremissas(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of Premissas");
        Page<Premissa> page = premissaService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /premissas/:id} : get the "id" premissa.
     *
     * @param id the id of the premissa to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the premissa, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/premissas/{id}")
    public ResponseEntity<Premissa> getPremissa(@PathVariable Long id) {
        log.debug("REST request to get Premissa : {}", id);
        Optional<Premissa> premissa = premissaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(premissa);
    }

    /**
     * {@code DELETE  /premissas/:id} : delete the "id" premissa.
     *
     * @param id the id of the premissa to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/premissas/{id}")
    public ResponseEntity<Void> deletePremissa(@PathVariable Long id) {
        log.debug("REST request to delete Premissa : {}", id);
        premissaService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
