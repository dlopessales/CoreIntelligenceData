package br.com.coreintelligence.service;

import br.com.coreintelligence.domain.Levantamento;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Levantamento}.
 */
public interface LevantamentoService {

    /**
     * Save a levantamento.
     *
     * @param levantamento the entity to save.
     * @return the persisted entity.
     */
    Levantamento save(Levantamento levantamento);

    /**
     * Get all the levantamentos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Levantamento> findAll(Pageable pageable);


    /**
     * Get the "id" levantamento.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Levantamento> findOne(Long id);

    /**
     * Delete the "id" levantamento.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
