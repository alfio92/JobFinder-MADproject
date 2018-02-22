package com.jobfinder.demo.business.domain;

import java.util.LinkedList;
import java.util.List;

public class SkillWrapper {

	private List<Skill> skills;
	
	public SkillWrapper() {
		this.skills = new LinkedList<Skill>();
	}
	
	public List<Skill> getSkills() {
		return skills;
	}

	public void setSkills(List<Skill> skills) {
		this.skills = skills;
	}

	@Override
	public String toString() {
		return "SkillWrapper [skills=" + skills.toString() + "]";
	}
	
}
