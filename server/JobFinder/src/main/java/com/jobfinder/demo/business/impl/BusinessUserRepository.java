package com.jobfinder.demo.business.impl;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobfinder.demo.business.domain.BusinessUser;
import com.jobfinder.demo.business.domain.JobRequest;

public interface BusinessUserRepository extends JpaRepository<BusinessUser, Long>{

	BusinessUser findByEmail(String email);
	
}
