package com.jobfinder.demo.business.impl;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobfinder.demo.business.domain.Job;
import com.jobfinder.demo.business.domain.JobRequest;

public interface JobRequestRepository extends JpaRepository<JobRequest, Long> {

	JobRequest findByUserIdAndJobadId(Long userId, Long jobadId); // restituisce la jobrequest dell'utente relativo al dato annuncio, se "null" l'utente può inviare la richiesta 
	
	List<JobRequest> findByUserIdOrderByDate(Long userId); // restituisce tutte le richieste fatte dall'utente (userId)
	
	List<JobRequest> findByStatusAndUserId(String status, Long userId); // restituisce tutte le richiste in base al suo stato("accepted"|"refused"|"noreply") fatte da un certo utente(userId)
	
	List<JobRequest> findByJobadIdOrderByDate(Long jobId); // restituisce tutte le richieste in base all'annuncio(jobId)
	
	List<JobRequest> findByJobadIdAndStatusOrderByDate(String status, Long jobId); // restituisce tutte le richieste in base all'annuncio(jobId) e allo stato della richiesta
	
}
