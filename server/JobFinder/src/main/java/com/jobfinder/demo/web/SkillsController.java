package com.jobfinder.demo.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobfinder.demo.business.JobFinderService;
import com.jobfinder.demo.business.domain.JobRequest;
import com.jobfinder.demo.business.domain.Skill;
import com.jobfinder.demo.business.domain.SkillWrapper;

@RestController
@RequestMapping("/api/skills")
public class SkillsController {

	@Autowired
	private JobFinderService service;
	
	@GetMapping("/all")
	public Response<SkillWrapper> findAllSkills(){
		
		SkillWrapper skills = service.findAllSkills();
		Response<SkillWrapper> response = new Response(true, "all skills");
		response.setData(skills);
		return response;
		
	}
	
	@PostMapping("/postskills")
	public Response<SkillWrapper> createSkills(@RequestBody List<Skill> skills){
		
		SkillWrapper sw = new SkillWrapper();
		sw.setSkills(skills);
		System.out.println(sw.toString());
		service.createSkills(sw);
		Response<SkillWrapper> response = new Response<>(true, "skills created!");
	    response.setData(sw);
	        return response;
		
	}
	
}
