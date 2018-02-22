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
import com.jobfinder.demo.business.domain.BusinessUser;
import com.jobfinder.demo.business.domain.Job;
import com.jobfinder.demo.business.domain.Session;


@RestController
@RequestMapping("/api")
public class BusinessUserController {

	@Autowired
	private JobFinderService service;
	
	@PostMapping("/businessuserlogin")
	public Response login(@RequestBody BusinessUser user) {
		System.out.println(user.getEmail());
		Session session = service.loginBusinessUser(user.getEmail(), user.getPassword());
		if (session != null) {
            Response<LoginBusiness> result = new Response<>(true, Response.DEFAULT_RESPONSE_OK.getMessage());
            LoginBusiness login = new LoginBusiness();
            login.setToken(session.getToken());
            login.setBusinesstype(session.getBususer().getBusinessType());
            login.setName(session.getBususer().getBusinessName());
            login.setImage(session.getBususer().getImage());
            result.setData(login);
            return result;
        } else {
            return Response.DEFAULT_RESPONSE_KO;
        }
	}
	
	@GetMapping("/logout/{token}")
	public Response logout(@PathVariable String token) {
		
		 service.logout(token);
	        return Response.DEFAULT_RESPONSE_OK;
	}
	
	@PostMapping("/businessusers")
	public Response createUser(@RequestBody BusinessUser bususer) {
		
		BusinessUser result = service.createBusinessUser(bususer);
	    Response<Object> response = new Response<>(true, "user created!");
	    response.setData(result);
        if (result != null) {
            response.setMessage("Ok user created");
        } else {
            response.setMessage("User already exist");
        }
        return response;
	}
	
	@PutMapping("/businessusers/{token}")
	public Response updateUser(@RequestBody BusinessUser user, @PathVariable String token) {
		
		 service.updateBusinessUser(token, user);
	        return Response.DEFAULT_RESPONSE_OK;
		
	}
	
}
