package com.jobfinder.demo.business.domain;

import java.util.LinkedList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "skills")
public class Skill implements java.io.Serializable{


	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idskill")
	private Long id;
	
	@Column(name = "profession", nullable = false, length = 64)
	private String profession;
	
	@ManyToMany(mappedBy = "skills")
	private List<User> users = new LinkedList<>();
	
	public Skill() {}
	
	public Skill(Long id, String profession) {
		super();
		this.id = id;
		this.profession = profession;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getProfession() {
		return profession;
	}

	public void setProfession(String profession) {
		this.profession = profession;
	}

	@Override
	public String toString() {
		return "Skill [id=" + id + ", profession=" + profession + ", users=" +/* users */""+ "]";
	}
	
	
	
}
