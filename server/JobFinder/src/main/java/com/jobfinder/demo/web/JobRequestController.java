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
import org.springframework.web.bind.annotation.RestController;

import com.jobfinder.demo.business.JobFinderService;
import com.jobfinder.demo.business.domain.JobRequest;


@RestController
@RequestMapping("/api/jobrequests")
public class JobRequestController {

	@Autowired
	private JobFinderService service;
	
	@PostMapping("/{token}/{id}")
	public Response<JobRequest> createJobRequest(@PathVariable(value = "token") String token, @PathVariable(value = "id") Long jobid, @RequestBody JobRequest jobrequest) {
		
		service.createJobRequest(token, jobrequest);
	    Response<JobRequest> response = new Response<>(true, "jobrequest created!");
	    response.setData(jobrequest);
	        return response;
	}
	
	@PutMapping("/{token}/{id}")
	public Response<JobRequest> updateJobRequest(@PathVariable(value = "token") String token, JobRequest req) {

		JobRequest updatedjobreq = service.updateJobRequest(token, req);
		Response<JobRequest> response = new Response<>(true, "job request updated!");
	    response.setData(updatedjobreq);
	        return response;
	}
	
	@DeleteMapping("/{token}/{id}")
	public Response<Object> deleteJobRequest(@PathVariable(value = "token") String token, @PathVariable(value = "id") Long id) {
		
		  service.deleteJob(token, id);
	      Response<Object> response = new Response<>(true, "job request deleted");

	        return response;
	}
	
	@GetMapping("/{token}/{id}")
	public Response<List<JobRequest>> findJobRequestsByUserId(@PathVariable(value = "token") String token, @PathVariable(value = "id") Long id) {
		
		List<JobRequest> reqs = service.findJobRequestsByUserId(token, id);
		Response<List<JobRequest>> response = new Response<>(true, "user requests"); 
		response.setData(reqs);
		
		return response;
	}
	
	/*
	@GetMapping("/{token}/{id}")
	public Response findJobRequestsByJobId() {return null;}
	*/
}
