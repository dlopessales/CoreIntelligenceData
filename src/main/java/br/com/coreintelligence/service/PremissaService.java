package br.com.coreintelligence.service;

import br.com.coreintelligence.domain.Premissa;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Premissa}.
 */
public interface PremissaService {

    /**
     * Save a premissa.
     *
     * @param premissa the entity to save.
     * @return the persisted entity.
     */
    Premissa save(Premissa premissa);

    /**
     * Get all the premissas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Premissa> findAll(Pageable pageable);


    /**
     * Get the "id" premissa.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Premissa> findOne(Long id);

    /**
     * Delete the "id" premissa.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
