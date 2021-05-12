package com.springPrac;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class springController {
    @RequestMapping("/home")
    @ResponseBody
	public String func() {
    	
		return ("Hello from spring boot.");
	}
}
