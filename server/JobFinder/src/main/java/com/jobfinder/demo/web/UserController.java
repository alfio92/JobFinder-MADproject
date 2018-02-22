package com.jobfinder.demo.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobfinder.demo.business.JobFinderService;
import com.jobfinder.demo.business.domain.Job;
import com.jobfinder.demo.business.domain.Session;
import com.jobfinder.demo.business.domain.User;


@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	private JobFinderService service;
	
	@PostMapping("/userlogin")
	public Response login(@RequestBody User user) {
		
		Session session = service.loginUser(user.getEmail(), user.getPassword());
		if (session != null) {
            Response<Login> result = new Response<>(true, Response.DEFAULT_RESPONSE_OK.getMessage());
            Login login = new Login();
            login.setToken(session.getToken());
            login.setId(session.getUser().getid());
            login.setName(session.getUser().getName());
            login.setSurname(session.getUser().getSurname());
            login.setImage(session.getUser().getImage());
            result.setData(login);
            return result;
        } else {
            return Response.DEFAULT_RESPONSE_KO;
        }
	}
	
	@GetMapping("/userlogout/{token}")
	public Response logout(@PathVariable String token) {
		service.logout(token);
		return Response.DEFAULT_RESPONSE_OK;
	}
	
	@PostMapping("/users")
	public Response createUser(@RequestBody User user) {
		System.out.println(user.getSkills().get(0).getProfession());
		User result = service.createUser(user);
	    Response<User> response = new Response<>(true, "user created!");
	    response.setData(result);
        if (result != null) {
            response.setMessage("Ok user created");
            
        } else {
            response.setMessage("User already exist");
        }
        return response;
	}
	
	@PutMapping("/users/{token}")
	public Response updateUser(@RequestBody User user, @PathVariable String token) {

		 service.updateUser(token, user);
	        return Response.DEFAULT_RESPONSE_OK;
	}
	
	@GetMapping("/users/{token}/upload")
	public Response uploadImage(@RequestBody User user, @PathVariable String token) {

		 service.updateUser(token, user);
	        return Response.DEFAULT_RESPONSE_OK;
	}
	
}
