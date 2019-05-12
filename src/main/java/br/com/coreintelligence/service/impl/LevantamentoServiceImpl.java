package br.com.coreintelligence.service.impl;

import br.com.coreintelligence.service.LevantamentoService;
import br.com.coreintelligence.domain.Levantamento;
import br.com.coreintelligence.repository.LevantamentoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Levantamento}.
 */
@Service
@Transactional
public class LevantamentoServiceImpl implements LevantamentoService {

    private final Logger log = LoggerFactory.getLogger(LevantamentoServiceImpl.class);

    private final LevantamentoRepository levantamentoRepository;

    public LevantamentoServiceImpl(LevantamentoRepository levantamentoRepository) {
        this.levantamentoRepository = levantamentoRepository;
    }

    /**
     * Save a levantamento.
     *
     * @param levantamento the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Levantamento save(Levantamento levantamento) {
        log.debug("Request to save Levantamento : {}", levantamento);
        return levantamentoRepository.save(levantamento);
    }

    /**
     * Get all the levantamentos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Levantamento> findAll(Pageable pageable) {
        log.debug("Request to get all Levantamentos");
        return levantamentoRepository.findAll(pageable);
    }


    /**
     * Get one levantamento by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Levantamento> findOne(Long id) {
        log.debug("Request to get Levantamento : {}", id);
        return levantamentoRepository.findById(id);
    }

    /**
     * Delete the levantamento by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Levantamento : {}", id);
        levantamentoRepository.deleteById(id);
    }
}
