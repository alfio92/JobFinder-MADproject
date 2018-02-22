package com.jobfinder.demo.business.domain;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jobfinder.demo.web.Utility;

@Entity
@Table(name="jobads")
public class Job implements java.io.Serializable {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idjobad")
	private Long id;
	
	@Column(name = "jobtype", nullable = false, length = 128)
	private String jobType;
	
	@Column(name = "numpositions", nullable = false, length = 128)
	private int numpositions;
	
	@Column(name = "cash", nullable = false)
	private int cash;
	
	@Column(name = "initperiod", nullable = false, length = 24)
	private String initPeriod;
	
	@Column(name = "endperiod", nullable = false, length = 24)
	private String endPeriod;
	
	@Column(name = "initday", nullable = false, length = 24)
	private String initDay;
	
	@Column(name = "endday", nullable = false, length = 24)
	private String endDay;
	
	@Column(name = "inittime", nullable = false, length = 24)
	private String initTime;
	
	@Column(name = "endtime", nullable = false, length = 24)
	private String endTime;
	
	@Column(name = "extra", nullable = false)
	private boolean extra;
	
	@Column(name = "insertdate", nullable = false)
	private Date insertDate;
	
	@Column(name = "description", nullable = false, length = 1024)
	private String description;
	
	@Column(name = "expired", nullable = false)
	private boolean expired;
	
    @ManyToOne
    @JoinColumn(name = "businessuser_idbusinessuser", nullable = false)
	private BusinessUser bususer;

	@OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, mappedBy = "jobad", fetch = FetchType.LAZY)
	private List<JobRequest> requests;
	
	public Job() {}

	public Job(Long id, String jobType, int numpositions, int cash, String initPeriod, String endPeriod,
			   String initDay, String endDay, String initTime, String endTime, boolean extra, String insertDate,
			   String description, boolean expired, BusinessUser userPostsAd) {
		super();
		this.id = id;
		this.jobType = jobType;
		this.numpositions = numpositions;
		this.cash = cash;
		this.initPeriod = initPeriod;
		this.endPeriod = endPeriod;
		this.initDay = initDay;
		this.endDay = endDay;
		this.initTime = initTime;
		this.endTime = endTime;
		this.extra = extra;
		this.insertDate = Utility.dateConverter(insertDate);
		this.description = description;
		this.expired = expired;
		this.bususer = userPostsAd;
	}
	
	public Job(Long id, String jobType, int numpositions, int cash, String initPeriod, String endPeriod, String initDay,
			String endDay, String initTime, String endTime, boolean extra, String insertDate, String description,
			boolean expired, BusinessUser userPostsAd, List<JobRequest> requests) {
		super();
		this.id = id;
		this.jobType = jobType;
		this.numpositions = numpositions;
		this.cash = cash;
		this.initPeriod = initPeriod;
		this.endPeriod = endPeriod;
		this.initDay = initDay;
		this.endDay = endDay;
		this.initTime = initTime;
		this.endTime = endTime;
		this.extra = extra;
		this.insertDate = Utility.dateConverter(insertDate);
		this.description = description;
		this.expired = expired;
		this.bususer = userPostsAd;
		this.requests = requests;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getJobType() {
		return jobType;
	}

	public void setJobType(String jobType) {
		this.jobType = jobType;
	}

	public int getNumpositions() {
		return numpositions;
	}

	public void setNumpositions(int numpositions) {
		this.numpositions = numpositions;
	}

	public int getCash() {
		return cash;
	}

	public void setCash(int cash) {
		this.cash = cash;
	}
	
	public BusinessUser getUserPostsAd() {
		return bususer;
	}

	public List<JobRequest> getRequests() {
		return requests;
	}

	public void setRequests(List<JobRequest> requests) {
		this.requests = requests;
	}

	public void setUserPostsAd(BusinessUser userPostsAd) {
		this.bususer = userPostsAd;
	}

	public String getInitPeriod() {
		return initPeriod;
	}

	public void setInitPeriod(String initPeriod) {
		this.initPeriod = initPeriod;
	}

	public String getEndPeriod() {
		return endPeriod;
	}

	public void setEndPeriod(String endPeriod) {
		this.endPeriod = endPeriod;
	}

	public String getInitDay() {
		return initDay;
	}

	public void setInitDay(String initDay) {
		this.initDay = initDay;
	}

	public String getEndDay() {
		return endDay;
	}

	public void setEndDay(String endDay) {
		this.endDay = endDay;
	}

	public String getInitTime() {
		return initTime;
	}

	public void setInitTime(String initTime) {
		this.initTime = initTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public boolean isExtra() {
		return extra;
	}

	public void setExtra(boolean extra) {
		this.extra = extra;
	}

	public Date getInsertDate() {
		return insertDate;
	}

	public void setInsertDate(String insertDate) {
		this.insertDate = Utility.dateConverter(insertDate);
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public boolean isExpired() {
		return expired;
	}

	public void setExpired(boolean expired) {
		this.expired = expired;
	}
	
}
