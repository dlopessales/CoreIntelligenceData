package br.com.coreintelligence.repository;

import br.com.coreintelligence.domain.Premissa;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Premissa entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PremissaRepository extends JpaRepository<Premissa, Long> {

}
