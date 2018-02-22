package com.jobfinder.demo.web;

/*
 * Dati restituiti dopo il login
 */

public class Login {

	private long id;
	private String name;
	private String surname;
	private String token;
	private String image;
	
	public Login() {}
	
	public Login(long id, String name, String surname, String token, String image) {
		super();
		this.id = id;
		this.name = name;
		this.surname = surname;
		this.token = token;
		this.image = image;
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
