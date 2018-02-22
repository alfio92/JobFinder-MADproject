package com.jobfinder.demo.business.impl;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.jobfinder.demo.business.domain.BusinessUser;
import com.jobfinder.demo.business.domain.Job;
import com.jobfinder.demo.business.domain.JobRequest;

public interface JobRepository extends JpaRepository<Job, Long>{
	
	List<Job> findByBususerIdAndExpiredOrderByInsertDate(Long busUserId, boolean expired); // trova tutti gli annunci postati da un utente (busUserId)
	
	List<Job> findByExpiredOrderByInsertDate(boolean expired);
	
	@Query(value = "SELECT jobads.*, businessusers.* FROM jobads LEFT JOIN businessusers ON jobads.businessuser_idbusinessuser=businessusers.idbusinessuser WHERE jobads.expired = :expired AND businessusers.lat >= :minlat AND businessusers.lng >= :minlng AND businessusers.lat <= :maxlat AND businessusers.lng <= :maxlng ORDER BY jobads.insertdate", nativeQuery = true) 
	List<Job> findJobByUserPos(@Param("expired")boolean expired, @Param("minlat")float minLat, @Param("minlng")float minLng, @Param("maxlat")float maxLat, @Param("maxlng")float maxLng);
	
	/*
	List<JobRequest> findById(Long jobId); // trova tutte le richieste per un annuncio (jobId)
	BusinessUser findByBususerId(Long jobId); // trova l'utente che ha postato un dato annuncio (jobId) 
	*/
}
