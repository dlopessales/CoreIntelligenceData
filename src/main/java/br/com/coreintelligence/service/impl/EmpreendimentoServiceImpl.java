package br.com.coreintelligence.service.impl;

import br.com.coreintelligence.service.EmpreendimentoService;
import br.com.coreintelligence.domain.Empreendimento;
import br.com.coreintelligence.repository.EmpreendimentoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Empreendimento}.
 */
@Service
@Transactional
public class EmpreendimentoServiceImpl implements EmpreendimentoService {

    private final Logger log = LoggerFactory.getLogger(EmpreendimentoServiceImpl.class);

    private final EmpreendimentoRepository empreendimentoRepository;

    public EmpreendimentoServiceImpl(EmpreendimentoRepository empreendimentoRepository) {
        this.empreendimentoRepository = empreendimentoRepository;
    }

    /**
     * Save a empreendimento.
     *
     * @param empreendimento the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Empreendimento save(Empreendimento empreendimento) {
        log.debug("Request to save Empreendimento : {}", empreendimento);
        return empreendimentoRepository.save(empreendimento);
    }

    /**
     * Get all the empreendimentos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Empreendimento> findAll(Pageable pageable) {
        log.debug("Request to get all Empreendimentos");
        return empreendimentoRepository.findAll(pageable);
    }


    /**
     * Get one empreendimento by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Empreendimento> findOne(Long id) {
        log.debug("Request to get Empreendimento : {}", id);
        return empreendimentoRepository.findById(id);
    }

    /**
     * Delete the empreendimento by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Empreendimento : {}", id);
        empreendimentoRepository.deleteById(id);
    }
}
