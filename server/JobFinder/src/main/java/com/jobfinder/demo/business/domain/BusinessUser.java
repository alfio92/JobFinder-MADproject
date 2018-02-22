package com.jobfinder.demo.business.domain;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="businessusers")
public class BusinessUser implements java.io.Serializable{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idbusinessuser")
	private long id;
	
	@Column(name = "name", nullable = false, length = 128)
	private String name;
	
	@Column(name = "surname", nullable = false, length = 128)
	private String surname;
	
	@Column(name = "gender", nullable = false, length = 6)
	private String gender;
	
	@Column(name = "birthdate", nullable = false, length = 12)
	private String birthdate;
	
	@Column(name = "telnumber", nullable = false, length = 13)
	private String telnum;
	
	@Column(name = "email", nullable = false, length = 255)
	private String email;
	
	@Column(name = "password", nullable = false, length = 255)
	private String password;
	
	@Column(name = "businessdescription", length = 1024)
	private String businessDescription;
	
	@Column(name = "businessname", nullable = false, length = 255)
	private String businessName;
	
	@Column(name = "businesstype", nullable = false, length = 128)
	private String businessType;
	
	@Column(name = "businesscity", nullable = false, length = 128)
	private String businessCity;
	
	@Column(name = "businessprov", nullable = false, length = 2)
	private String businessProv;
	
	@Column(name = "businessaddress", nullable = false, length = 255)
	private String businessAddress;
	
	@Column(name = "image", nullable = false, length = 255)
	private String image;
	
	@Column(name = "lat", nullable = false)
	private float lat;
	
	@Column(name = "lng", nullable = false)
	private float lng;
	
	@JsonIgnore
	@OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, mappedBy = "bususer", fetch = FetchType.LAZY)
	private List<Job> busJobAds;
	
	public BusinessUser() {}
	
	public BusinessUser(String email, String password) {
		this.email = email;
		this.password = password;
	}
	
	public BusinessUser(String name, String surname, String gender, String birthdate, String telnum,
			String email, String password, String businessDescription, String businessName, String businessType,
			String businessCity, String businessProv, String businessAddress, String image, float lat, float lng) {
		super();
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.birthdate = birthdate;
		this.telnum = telnum;
		this.email = email;
		this.password = password;
		this.businessDescription = businessDescription;
		this.businessName = businessName;
		this.businessType = businessType;
		this.businessCity = businessCity;
		this.businessProv = businessProv;
		this.businessAddress = businessAddress;
		this.image = image;
		this.lat = lat;
		this.lng = lng;
	}
	
	public BusinessUser(long id, String name, String surname, String gender, String birthdate, String telnum,
			String email, String password, String businessDescription, String businessName, String businessType,
			String businessCity, String businessProv, String businessAddress, String image, float lat, float lng) {
		super();
		this.id = id;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.birthdate = birthdate;
		this.telnum = telnum;
		this.email = email;
		this.password = password;
		this.businessDescription = businessDescription;
		this.businessName = businessName;
		this.businessType = businessType;
		this.businessCity = businessCity;
		this.businessProv = businessProv;
		this.businessAddress = businessAddress;
		this.image = image;
		this.lat = lat;
		this.lng = lng;
	}

	public BusinessUser(long id, String name, String surname, String gender, String birthdate, String telnum,
			String email, String password, String businessDescription, String businessName, String businessType,
			String businessCity, String businessProv, String businessAddress, String image, float lat, float lng,
			List<Job> busJobAds) {
		super();
		this.id = id;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.birthdate = birthdate;
		this.telnum = telnum;
		this.email = email;
		this.password = password;
		this.businessDescription = businessDescription;
		this.businessName = businessName;
		this.businessType = businessType;
		this.businessCity = businessCity;
		this.businessProv = businessProv;
		this.businessAddress = businessAddress;
		this.image = image;
		this.lat = lat;
		this.lng = lng;
		this.busJobAds = busJobAds;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
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

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(String birthdate) {
		this.birthdate = birthdate;
	}

	public String getTelnum() {
		return telnum;
	}

	public void setTelnum(String telnum) {
		this.telnum = telnum;
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

	public String getBusinessDescription() {
		return businessDescription;
	}

	public void setBusinessDescription(String businessDescription) {
		this.businessDescription = businessDescription;
	}

	public String getBusinessName() {
		return businessName;
	}

	public void setBusinessName(String businessName) {
		this.businessName = businessName;
	}

	public String getBusinessType() {
		return businessType;
	}

	public void setBusinessType(String businessType) {
		this.businessType = businessType;
	}

	public String getBusinessCity() {
		return businessCity;
	}

	public void setBusinessCity(String businessCity) {
		this.businessCity = businessCity;
	}

	public String getBusinessProv() {
		return businessProv;
	}

	public void setBusinessProv(String businessProv) {
		this.businessProv = businessProv;
	}

	public String getBusinessAddress() {
		return businessAddress;
	}

	public void setBusinessAddress(String businessAddress) {
		this.businessAddress = businessAddress;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public float getLat() {
		return lat;
	}

	public void setLat(float lat) {
		this.lat = lat;
	}

	public float getLng() {
		return lng;
	}

	public void setLng(float lng) {
		this.lng = lng;
	}

	public List<Job> getBusJobAds() {
		return busJobAds;
	}

	public void setBusJobAds(List<Job> busJobAds) {
		this.busJobAds = busJobAds;
	}

	@Override
	public String toString() {
		return "BusinessUser [id=" + id + ", name=" + name + ", surname=" + surname + ", gender=" + gender
				+ ", birthdate=" + birthdate + ", telnum=" + telnum + ", email=" + email + ", password=" + password
				+ ", businessDescription=" + businessDescription + ", businessName=" + businessName + ", businessType="
				+ businessType + ", businessCity=" + businessCity + ", businessProv=" + businessProv
				+ ", businessAddress=" + businessAddress + ", image=" + image + ", lat=" + lat + ", lng=" + lng
				+ ", busJobAds=" + busJobAds + "]";
	}
	
}
