package com.jobfinder.demo.business.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.LinkedList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.beans.factory.annotation.Autowired;

@Entity
@Table(name="users")
public class User implements java.io.Serializable {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "iduser")
	private long id;
	
	@Column(name = "name", nullable = false, length = 255)
	private String name;
	
	@Column(name = "surname", nullable = false, length = 255)
	private String surname;
	
	@Column(name = "birthdate", nullable = false, length = 12)
	private String birthdate;
	
	@Column(name = "gender", nullable = false, length = 6)
	private String gender;
	
	@Column(name = "city", nullable = false, length = 128)
	private String city;
	
	@Column(name = "province", nullable = false, length = 2)
	private String province;
	
	@Column(name = "address", nullable = false, length = 128)
	private String address;
	
	@Column(name = "telnumber", nullable = false, length = 13)
	private String telnumber;
	
	@Column(name = "email", nullable = false, length = 255)
	private String email;
	
	@Column(name = "password", nullable = false, length = 32)
	private String password;
	
	@Column(name = "study", nullable = false, length = 32)
	private String study;
	
	@Column(name = "description", nullable = false, length = 1024)
	private String description;
	
	@Column(name = "curriculum", nullable = false, length = 1024)
	private String curriculum;
	
	@Column(name = "image", nullable = false, length = 255)
	private String image;
	
	@ManyToMany(cascade = { CascadeType.MERGE }, fetch=FetchType.EAGER)
	@JoinTable(
			name = "user_has_skill",
			joinColumns = { @JoinColumn(name = "user_iduser")}, //owner
			inverseJoinColumns = { @JoinColumn(name = "skill_idskill") }
	)
	private List<Skill> skills;
	
	@JsonIgnore
	@OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, mappedBy = "user", fetch = FetchType.LAZY)
	private List<JobRequest> userReqs;
	
	public User() {}
	
	public User(String name, String surname, String birthday, String gender, String city, String province,
			String address, String telnumber, String email, String password, String study, String description,
			List<Skill> skills, String curriculum, String image) {
		
		super();
		this.name = name;
		this.surname = surname;
		this.birthdate = birthday;
		this.gender = gender;
		this.city = city;
		this.province = province;
		this.address = address;
		this.telnumber = telnumber;
		this.email = email;
		this.password = password;
		this.study = study;
		this.description = description;
		this.skills = skills;
		this.curriculum = curriculum;
		this.image = image;
		
	}

	public User(long id, String name, String surname, String birthday, String gender, String city, String province,
			String address, String telnumber, String email, String password, String study, String description,
			String curriculum, String image, List<Skill> skills, List<JobRequest> userReqs) {
		super();
		this.id = id;
		this.name = name;
		this.surname = surname;
		this.birthdate = birthday;
		this.gender = gender;
		this.city = city;
		this.province = province;
		this.address = address;
		this.telnumber = telnumber;
		this.email = email;
		this.password = password;
		this.study = study;
		this.description = description;
		this.curriculum = curriculum;
		this.image = image;
		this.skills = skills;
		this.userReqs = userReqs;
	}
	
	public User(long id, String name, String surname, String birthday, String gender, String city, String province,
			String address, String telnumber, String email, String password, String study, String description,
			String curriculum, String image) {
		super();
		this.id = id;
		this.name = name;
		this.surname = surname;
		this.birthdate = birthday;
		this.gender = gender;
		this.city = city;
		this.province = province;
		this.address = address;
		this.telnumber = telnumber;
		this.email = email;
		this.password = password;
		this.study = study;
		this.description = description;
		this.curriculum = curriculum;
		this.image = image;
		this.skills = new LinkedList<Skill>();
		this.userReqs = new LinkedList<JobRequest>();
	}

	public long getid() {
		return id;
	}

	public void setid(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(String birthday) {
		this.birthdate = birthday;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getTelnumber() {
		return telnumber;
	}

	public void setTelnumber(String telnumber) {
		this.telnumber = telnumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getStudy() {
		return study;
	}

	public void setStudy(String study) {
		this.study = study;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<Skill> getSkills() {
		return skills;
	}

	public void setSkills(List<Skill> skills) {
		this.skills = skills;
	}

	public String getCurriculum() {
		return curriculum;
	}

	public void setCurriculum(String curriculum) {
		this.curriculum = curriculum;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public List<JobRequest> getUserReqs() {
		return userReqs;
	}

	public void setUserReqs(List<JobRequest> userReqs) {
		this.userReqs = userReqs;
	}
	
}
