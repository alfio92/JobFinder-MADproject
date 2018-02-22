package com.jobfinder.demo.business.impl;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobfinder.demo.business.domain.BusinessUser;
import com.jobfinder.demo.business.domain.Session;
import com.jobfinder.demo.business.domain.User;

public interface SessionRepository extends JpaRepository<Session, Long>{

	Session findByToken(String token);
	
	Session findByUser(User user);
	
	Session findByBususer(BusinessUser user);
}
