package br.com.coreintelligence.service.impl;

import br.com.coreintelligence.service.PremissaService;
import br.com.coreintelligence.domain.Premissa;
import br.com.coreintelligence.repository.PremissaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Premissa}.
 */
@Service
@Transactional
public class PremissaServiceImpl implements PremissaService {

    private final Logger log = LoggerFactory.getLogger(PremissaServiceImpl.class);

    private final PremissaRepository premissaRepository;

    public PremissaServiceImpl(PremissaRepository premissaRepository) {
        this.premissaRepository = premissaRepository;
    }

    /**
     * Save a premissa.
     *
     * @param premissa the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Premissa save(Premissa premissa) {
        log.debug("Request to save Premissa : {}", premissa);
        return premissaRepository.save(premissa);
    }

    /**
     * Get all the premissas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Premissa> findAll(Pageable pageable) {
        log.debug("Request to get all Premissas");
        return premissaRepository.findAll(pageable);
    }


    /**
     * Get one premissa by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Premissa> findOne(Long id) {
        log.debug("Request to get Premissa : {}", id);
        return premissaRepository.findById(id);
    }

    /**
     * Delete the premissa by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Premissa : {}", id);
        premissaRepository.deleteById(id);
    }
}
