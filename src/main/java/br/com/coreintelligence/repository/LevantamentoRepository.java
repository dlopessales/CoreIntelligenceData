package br.com.coreintelligence.repository;

import br.com.coreintelligence.domain.Levantamento;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Levantamento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LevantamentoRepository extends JpaRepository<Levantamento, Long> {

}
