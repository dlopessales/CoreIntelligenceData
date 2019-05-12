package br.com.coreintelligence.service;

import br.com.coreintelligence.domain.Empreendimento;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Empreendimento}.
 */
public interface EmpreendimentoService {

    /**
     * Save a empreendimento.
     *
     * @param empreendimento the entity to save.
     * @return the persisted entity.
     */
    Empreendimento save(Empreendimento empreendimento);

    /**
     * Get all the empreendimentos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Empreendimento> findAll(Pageable pageable);


    /**
     * Get the "id" empreendimento.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Empreendimento> findOne(Long id);

    /**
     * Delete the "id" empreendimento.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
