package com.jobfinder.demo.web;

import java.security.SecureRandom;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Utility {

	 protected static SecureRandom random = new SecureRandom();

	    public static String generateToken() {
	        long longToken = Math.abs(random.nextLong());
	        return Long.toString(longToken, 200);

	    }

	    
	    public static Date dateConverter(String dateToConvert) {
	    	
	    	  SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yy");
	          Date date = new Date();
	          try {

	              date = formatter.parse(dateToConvert);
	              System.out.println(date);
	              System.out.println(formatter.format(date));
	              

	          } catch (ParseException e) {
	              e.printStackTrace();
	          }
	          
	          return date;
	    }
}
