package com.jobfinder.demo.business;

import java.util.List;

import com.jobfinder.demo.business.domain.BusinessUser;
import com.jobfinder.demo.business.domain.Job;
import com.jobfinder.demo.business.domain.JobRequest;
import com.jobfinder.demo.business.domain.Session;
import com.jobfinder.demo.business.domain.Skill;
import com.jobfinder.demo.business.domain.SkillWrapper;
import com.jobfinder.demo.business.domain.User;
import com.jobfinder.demo.web.Response;

public interface JobFinderService {
	
	Session loginUser(String email, String password); // Session??? restituisce dati dell'utente che ha eseguito il login
	
	Session loginBusinessUser(String email, String password);
	
	void logout(String token);
	
	User createUser(User user);
	
	void updateUser(String token, User user);
	
	BusinessUser createBusinessUser(BusinessUser business);
	
	void updateBusinessUser(String token, BusinessUser user);
	
	Job createJob(String token, Job jobad);
	
	void updateJob(String token, Job jobad);
	
	void deleteJob(String token, Long id);
	
	JobRequest createJobRequest(String token, JobRequest reqjob);
	
	JobRequest updateJobRequest(String token, JobRequest reqjob);
	
	void deleteJobRequest(String token, Long id);

//	List<JobRequest> findJobRequestsByJobAdId();// ritorna tutte le richieste inviate ad dato annuncio
	
	List<JobRequest> findJobRequestsByUserId(String token, Long id); //ritorna tutte le richieste inviate da un utente
		
//	List<User> findUserSendsJobRequest(); //ritorna gli utenti che hanno inviato una richiesta ad un dato annuncio
	
	List<Job> findJobByUserPos(String token, float minLat, float minLng, float maxLat, float maxLng); //ritorna annunci di attività più vicini alla posizione dell'utente con limite km
	
	SkillWrapper findAllSkills();
	
	SkillWrapper createSkills(SkillWrapper skills);
}
