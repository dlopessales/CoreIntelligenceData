package br.com.coreintelligence.web.rest;

import br.com.coreintelligence.domain.Levantamento;
import br.com.coreintelligence.service.LevantamentoService;
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
 * REST controller for managing {@link br.com.coreintelligence.domain.Levantamento}.
 */
@RestController
@RequestMapping("/api")
public class LevantamentoResource {

    private final Logger log = LoggerFactory.getLogger(LevantamentoResource.class);

    private static final String ENTITY_NAME = "levantamento";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LevantamentoService levantamentoService;

    public LevantamentoResource(LevantamentoService levantamentoService) {
        this.levantamentoService = levantamentoService;
    }

    /**
     * {@code POST  /levantamentos} : Create a new levantamento.
     *
     * @param levantamento the levantamento to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new levantamento, or with status {@code 400 (Bad Request)} if the levantamento has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/levantamentos")
    public ResponseEntity<Levantamento> createLevantamento(@RequestBody Levantamento levantamento) throws URISyntaxException {
        log.debug("REST request to save Levantamento : {}", levantamento);
        if (levantamento.getId() != null) {
            throw new BadRequestAlertException("A new levantamento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Levantamento result = levantamentoService.save(levantamento);
        return ResponseEntity.created(new URI("/api/levantamentos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /levantamentos} : Updates an existing levantamento.
     *
     * @param levantamento the levantamento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated levantamento,
     * or with status {@code 400 (Bad Request)} if the levantamento is not valid,
     * or with status {@code 500 (Internal Server Error)} if the levantamento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/levantamentos")
    public ResponseEntity<Levantamento> updateLevantamento(@RequestBody Levantamento levantamento) throws URISyntaxException {
        log.debug("REST request to update Levantamento : {}", levantamento);
        if (levantamento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Levantamento result = levantamentoService.save(levantamento);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, levantamento.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /levantamentos} : get all the levantamentos.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of levantamentos in body.
     */
    @GetMapping("/levantamentos")
    public ResponseEntity<List<Levantamento>> getAllLevantamentos(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of Levantamentos");
        Page<Levantamento> page = levantamentoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /levantamentos/:id} : get the "id" levantamento.
     *
     * @param id the id of the levantamento to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the levantamento, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/levantamentos/{id}")
    public ResponseEntity<Levantamento> getLevantamento(@PathVariable Long id) {
        log.debug("REST request to get Levantamento : {}", id);
        Optional<Levantamento> levantamento = levantamentoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(levantamento);
    }

    /**
     * {@code DELETE  /levantamentos/:id} : delete the "id" levantamento.
     *
     * @param id the id of the levantamento to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/levantamentos/{id}")
    public ResponseEntity<Void> deleteLevantamento(@PathVariable Long id) {
        log.debug("REST request to delete Levantamento : {}", id);
        levantamentoService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
