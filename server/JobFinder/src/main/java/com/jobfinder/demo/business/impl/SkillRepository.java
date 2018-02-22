package com.jobfinder.demo.business.impl;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobfinder.demo.business.domain.Skill;
import com.jobfinder.demo.business.domain.SkillWrapper;

public interface SkillRepository extends JpaRepository<Skill, Long>{

	List<Skill> findAll();
	
}
