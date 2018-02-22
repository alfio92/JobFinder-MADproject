package com.jobfinder.demo.business.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jobfinder.demo.web.Utility;

@Entity
@Table(name="jobrequests")
public class JobRequest implements java.io.Serializable{
	/*
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idbusinessuser")
	private int id;
	*/
	
	@Embeddable
	public static class Id implements Serializable{
		
		@Column(name="user_iduser")
		private Long userId;
		
		@Column(name="jobad_idjobad")
		private Long jobId;
		
		public Id() {}

		public Id(Long userId, Long jobId) {
			super();
			this.userId = userId;
			this.jobId = jobId;
		}

		public Long getUserId() {
			return userId;
		}

		public void setUserId(Long userId) {
			this.userId = userId;
		}

		public Long getJobId() {
			return jobId;
		}

		public void setJobId(Long jobId) {
			this.jobId = jobId;
		}

		@Override
		public int hashCode() {
			final int prime = 31;
			int result = 1;
			result = prime * result + ((jobId == null) ? 0 : jobId.hashCode());
			result = prime * result + ((userId == null) ? 0 : userId.hashCode());
			return result;
		}

		@Override
		public boolean equals(Object obj) {
			if (this == obj)
				return true;
			if (obj == null)
				return false;
			if (getClass() != obj.getClass())
				return false;
			Id other = (Id) obj;
			if (jobId == null) {
				if (other.jobId != null)
					return false;
			} else if (!jobId.equals(other.jobId))
				return false;
			if (userId == null) {
				if (other.userId != null)
					return false;
			} else if (!userId.equals(other.userId))
				return false;
			return true;
		}
		
	}
	
	@EmbeddedId
	private Id id = new Id();
	
	@Column(name = "requestdate", nullable = false)
	private Date date;
	
	@Column(name = "status", nullable = false, length = 16)
	private String status;
	
	@JsonIgnore
    @ManyToOne
    /*
    @JoinTable( name=""
    			joinColumns= { @JoinColumn = ( name = "") },
    			inverseJoinColumns{ @JoinColumn = ( name="" )
    		  }) */
    @JoinColumn(name = "user_iduser", insertable=false, updatable = false)
	private User user;
	
	@JsonIgnore
    @ManyToOne
    @JoinColumn(name = "jobad_idjobad", insertable=false, updatable = false)
	private Job jobad;
	
	public JobRequest() {}
	
	public JobRequest(Id id, String date, String status) {
		super();
		this.id = id;
		this.date = Utility.dateConverter(date);
		this.status = status;
	}
	
	public JobRequest(Id id, String date, String status, User userSendReq) {
		super();
		this.id = id;
		this.date = Utility.dateConverter(date);
		this.status = status;
		this.user = userSendReq;
	}

	public JobRequest(Id id, String date, String status, User userSendReq, Job jobAd) {
		super();
		this.id = id;
		this.date = Utility.dateConverter(date);
		this.status = status;
		this.user = userSendReq;
		this.jobad = jobAd;
	}
/*
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
*/
	
	public Date getDate() {
		return date;
	}

	public Id getId() {
		return id;
	}

	public void setId(Id id) {
		this.id = id;
	}

	public void setDate(String date) {
		this.date = Utility.dateConverter(date);
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	public User getUserSendReq() {
		return user;
	}

	public void setUserSendReq(User userSendReq) {
		this.user = userSendReq;
	}

	public Job getJobAd() {
		return jobad;
	}

	public void setJobAd(Job jobAd) {
		this.jobad = jobAd;
	}
	
}
