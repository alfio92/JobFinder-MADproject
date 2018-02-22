package com.jobfinder.demo.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jobfinder.demo.business.JobFinderService;
import com.jobfinder.demo.business.domain.Job;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

	@Autowired
	private JobFinderService service;
	
	@PostMapping("/{token}")
	public Response<Job> createJob(@PathVariable(value = "token") String token, @RequestBody Job jobad) {
		 	
		System.out.println(jobad.getInsertDate());
		service.createJob(token, jobad);
	    Response<Job> response = new Response<>(true, "jobad created!");
	    response.setData(jobad);
	        return response;
	}
	
	@PutMapping("/{token}/{id}")
	public Response updateJob(@PathVariable(value = "token") String token, @PathVariable(value = "id") Long id, @RequestBody Job jobad) {
		
		service.updateJob(token, jobad);
	    return Response.DEFAULT_RESPONSE_OK;
	}
	
	@DeleteMapping("/{token}/{id}")
	public Response<Object> deleteJob(@PathVariable(value = "token") String token, @PathVariable(value = "id") Long id) {
		
		  service.deleteJob(token, id);
	      Response<Object> response = new Response<>(true, "jobad deleted");

	        return response;
	}
	
	@GetMapping("/{token}")
	public Response<List<Job>> findJobByUserPos(@PathVariable(value = "token") String token, /* @PathVariable(value = "id") Long id */ @RequestParam(value="lat") float lat, @RequestParam(value="lng") float lng, @RequestParam(value="limit") float distanceLimit) {
		 
		float latMax = (distanceLimit/133) + lat;
		float lngMax = (distanceLimit/133) + lng;
		float latMin = lat - (distanceLimit/133);
		float lngMin = lng - (distanceLimit/133);
		
		System.out.println("userlat " + lat + " userlng " + lng + " latmax " + latMax + " lngMax " + lngMax + " latmin " + latMin + " lngmin " + lngMin);
		
		List<Job> jobads = service.findJobByUserPos(token, latMin, lngMin, latMax, lngMax);
	//	System.out.println(jobads.get(0).toString());
		Response<List<Job>> response = new Response<>(true, "nearest jobads detected");
		response.setData(jobads);
		
		return response;
	}
	
}
