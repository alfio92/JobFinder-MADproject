package com.jobfinder.demo.business.impl;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobfinder.demo.business.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {

	//List<User> getUserSendedRequestToJobAd(Long JobAdId);
	
	User findByEmail(String email);
	
}
