package com.jobfinder.demo.business.impl;

import java.util.LinkedList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobfinder.demo.business.JobFinderService;
import com.jobfinder.demo.business.domain.BusinessUser;
import com.jobfinder.demo.business.domain.Job;
import com.jobfinder.demo.business.domain.JobRequest;
import com.jobfinder.demo.business.domain.Session;
import com.jobfinder.demo.business.domain.Skill;
import com.jobfinder.demo.business.domain.SkillWrapper;
import com.jobfinder.demo.business.domain.User;
import com.jobfinder.demo.web.Utility;

@Service
@Transactional
public class JobFinderServiceImpl implements JobFinderService{

	@Autowired
	UserRepository userRepo;
	
	@Autowired
	BusinessUserRepository busUserRepo;
	
	@Autowired
	JobRepository jobRepo;
	
	@Autowired
	JobRequestRepository jobreqRepo;
	
	@Autowired
	SessionRepository sessionRepo;
	
	@Autowired
	SkillRepository skillRepo;
	
	public Session loginUser(String email, String password) {
		
		User user = userRepo.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {

            Session session = new Session();
            session.setUser(user);
            session.setToken(Utility.generateToken());
	         if(sessionRepo.findByUser(user) == null ) {
	            Session newSession = sessionRepo.save(session);
	            return newSession;
	         }
	         
        }
		return null;
	}
	
	public void logout(String token) {
		
		Session session = sessionRepo.findByToken(token);
        if (session != null) {
            sessionRepo.delete(session);
        }
	}
	
	public Session loginBusinessUser(String email, String password) {

		BusinessUser user = busUserRepo.findByEmail(email);
		System.out.println(user.toString());
        if (user != null && user.getPassword().equals(password)) {
            Session session = new Session();
            session.setBususer(user);
            session.setToken(Utility.generateToken());
            
            if(sessionRepo.findByBususer(user) == null ) {
	            Session newSession = sessionRepo.save(session);
	            return newSession;
	         }
	         
        } 
        return null;
	}
	
	
	public User createUser(User user) {
		
		User u = userRepo.findByEmail(user.getEmail());
		 if (u != null) {
	            return null;
	        }
	        userRepo.save(user);

	        return user;
	}
	
	public BusinessUser createBusinessUser(BusinessUser business) {
		
		BusinessUser u = busUserRepo.findByEmail(business.getEmail());
		 if (u != null) {
	            return null;
	        }
	        busUserRepo.save(business);
	        return business;
	}
	
	public void updateUser(String token, User user) {
		
		Session session = sessionRepo.findByToken(token);
        if (session != null) {
            User oldUser = session.getUser();
            if(user.getCurriculum() != null)
            	oldUser.setCurriculum(user.getCurriculum());
            if(user.getDescription() != null)
            	oldUser.setDescription(user.getDescription());
            if(user.getCity() != null)
            	oldUser.setCity(user.getCity());
            if(user.getSkills() != null)
            	oldUser.setSkills(user.getSkills());
            if(user.getAddress() != null)
            	oldUser.setAddress(user.getAddress());
            if(user.getProvince() != null)
            	oldUser.setProvince(user.getProvince());
            if(user.getStudy() != null)
            	oldUser.setStudy(user.getStudy());
            if(user.getImage() != null)
            	oldUser.setImage(user.getImage());
            
            userRepo.save(oldUser);
        }
		
	}
	
	public void updateBusinessUser(String token, BusinessUser business) {
		
		Session session = sessionRepo.findByToken(token);
        if (session != null) {
            BusinessUser oldUser = session.getBususer();
            
            if(business.getImage() != null)
            	oldUser.setImage(business.getImage());
            if(business.getBusinessName() != null)
            	oldUser.setBusinessName(business.getBusinessName());
            
            busUserRepo.save(oldUser);
        }
		
	}
	
	
	public Job createJob(String token, Job jobad) {
		
		Session session = sessionRepo.findByToken(token);
        if (session != null && session.getUser() == null && session.getBususer() != null) {
            jobad.setUserPostsAd(session.getBususer());
            return jobRepo.save(jobad);
        }
        return null;
	}
	
	public void updateJob(String token, Job newjobad) {
		
		Session session = sessionRepo.findByToken(token);
        if (session != null) {
            Job job = jobRepo.findOne(newjobad.getId());
            if (job != null && job.getUserPostsAd().getId() == session.getBususer().getId()) {
            	
            	jobRepo.save(job);
            	
            }
        }
        
	}
	
	public void deleteJob(String token, Long id) {
		
		 Session session = sessionRepo.findByToken(token);
	        if (session != null) {
	            jobRepo.delete(id);
	        }
		
	}
	
	public JobRequest createJobRequest(String token, JobRequest reqjob) {
		
		Session session = sessionRepo.findByToken(token);
        if (session != null && session.getBususer() == null && session.getUser() != null) {
        	
        	reqjob.setUserSendReq(session.getUser());
        	return jobreqRepo.save(reqjob);
        	
        }
		
		return null;
	}
	
	public JobRequest updateJobRequest(String token, JobRequest reqjob) {
		
		Session session = sessionRepo.findByToken(token);
        if (session != null) {
        	
        	if(reqjob.getStatus() == "accepted") {
        		
        	//	reqjob.getJobAd().setNumpositions(reqjob.getJobAd().getNumpositions() -1 );
        		if( reqjob.getJobAd().getNumpositions() == reqjob.getJobAd().getRequests().size() +1 ) reqjob.getJobAd().setExpired(true);
        		
        		this.updateJob(token, reqjob.getJobAd());
        	}
        	
        	jobreqRepo.save(reqjob);
        }
		return null;
	}
	
	public void deleteJobRequest(String token, Long id) {
		
		 Session session = sessionRepo.findByToken(token);
	        if (session != null) {
	            jobreqRepo.delete(id);
	        }	
	}

	/*
	public List<JobRequest> findJobRequestsByJobAdId(){
		// ritorna tutte le richieste inviate ad dato annuncio
		return null;
	}
	
	
	public List<User> findUserSendsJobRequest(){
		//ritorna gli utenti che hanno inviato una richiesta ad un dato annuncio
		return null;
	}
	*/
	
	public List<Job> findJobByUserPos(String token, float minLat, float minLng, float maxLat, float maxLng){
		//ritorna annunci di attività più vicini alla posizione dell'utente con limite km
		
		Session session = sessionRepo.findByToken(token);
		
		if( session != null && session.getUser() != null && session.getBususer() == null) {
			
			System.out.println("JOBS BY POS");
			return jobRepo.findJobByUserPos(false , minLat, minLng, maxLat, maxLng); // recuperare anche il businessuser dell'annuncio relativo e le richieste
			
		}
		
		return null;
	}
	
	// ritorna i dati per la home dell'utente di tipo attività commerciale / azienda (business) (annunci postate dall'utente(di business) loggato e le relative richieste prive di responso)
	public List<Job> findJobsByBusinessUserId(String token, Long id){
		
		Session session = sessionRepo.findByToken(token);
		if(session != null && session.getUser() == null && session.getBususer() != null) {
			
			List<Job> jobs = jobRepo.findByBususerIdAndExpiredOrderByInsertDate(id, false);
			for(Job job : jobs) {
				// prendo le richieste prive di risposta da parte dell'utente business
				job.setRequests(jobreqRepo.findByJobadIdOrderByDate(job.getId()));
			}
			
			return jobs;
		}	
		
		return null;
	}

	// ritorna i dati, tutte le richieste che l'utente cliente ha effettuato
	public List<JobRequest> findJobRequestsByUserId(String token, Long id) {
		
		Session session = sessionRepo.findByToken(token);
			if(session != null && session.getUser() != null && session.getBususer() == null) {
				
				List<JobRequest> reqs = jobreqRepo.findByUserIdOrderByDate(id);
				return reqs;
			}
		
		return null;
	}
	
	// ritorna i dati, tutte le richieste che l'utente dipendente ha effettuato ad annunci ancora attivi
	public List<JobRequest> findJobRequestsByUserIdJobAdActive(String token, Long id) {
			
			Session session = sessionRepo.findByToken(token);
				if(session != null && session.getUser() != null && session.getBususer() == null) {
					
					//List<JobRequest> reqs = new LinkedList<JobRequest>();				
					List<JobRequest> reqs = jobreqRepo.findByUserIdOrderByDate(id);
					
					for(JobRequest req : reqs) {
						
						if(req.getJobAd().isExpired()) reqs.remove(req);
						
					}
				
					//List<Job> jobs = jobRepo.findByExpiredOrderByInsertdate(false);
					return reqs;
				}
			
			return null;
	}
	
	
	public SkillWrapper findAllSkills(){
			
			List<Skill> skill = skillRepo.findAll();
			SkillWrapper skillsToReturn = new SkillWrapper();
			skillsToReturn.setSkills(skill);
			return skillsToReturn;
			
	}
		
	public SkillWrapper createSkills(SkillWrapper skills){
		
			List<Skill> skillsToSave = skills.getSkills(); 	
			System.out.println(skillsToSave.toString());
			skillRepo.save(skillsToSave);
			/*
			for(Skill sk : skillsToSave) {
				
				System.out.println(sk.toString());
				skillRepo.save(sk);
				
			}
			*/
			return skills;
	}
	
}
