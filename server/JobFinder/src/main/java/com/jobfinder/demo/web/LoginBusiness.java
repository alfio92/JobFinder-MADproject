package com.jobfinder.demo.web;

public class LoginBusiness {
	
	private long id;
	private String businesstype;
	private String name;
	private String token;
	private String image;
	
	public LoginBusiness() {}
	
	public LoginBusiness(long id, String businesstype, String name, String token, String image) {
		super();
		this.id = id;
		this.businesstype = businesstype;
		this.name = name;
		this.token = token;
		this.image = image;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getBusinesstype() {
		return businesstype;
	}

	public void setBusinesstype(String businesstype) {
		this.businesstype = businesstype;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
	
	
}
