package br.com.coreintelligence.repository;

import br.com.coreintelligence.domain.Empreendimento;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Empreendimento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmpreendimentoRepository extends JpaRepository<Empreendimento, Long> {

}
