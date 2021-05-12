package com.springPrac;


import java.awt.PageAttributes.MediaType;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

import javax.sound.sampled.Line;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.kabeja.dxf.Bounds;
import org.kabeja.dxf.DXFConstants;
import org.kabeja.dxf.DXFDocument;
import org.kabeja.dxf.DXFEntity;
import org.kabeja.dxf.DXFLayer;
import org.kabeja.dxf.DXFLine;
import org.kabeja.dxf.DXFPolyline;
import org.kabeja.parser.*;

@RestController
@CrossOrigin
public class FileController {
	
	@PostMapping(value = "/")
    public String testUpload1(@RequestParam("file") MultipartFile uploadedFile[]) throws IllegalStateException, IOException, ParseException {

		Parser parser = ParserBuilder.createDefaultParser();
		
		InputStream in= new ByteArrayInputStream (uploadedFile[0].getBytes());
		
		parser.parse(in, DXFParser.DEFAULT_ENCODING);
		
		DXFDocument dxf= parser.getDocument();
		
		List<DXFEntity> entityList = null;
		
		Iterator dl = dxf.getDXFLayerIterator();
		
		while(dl.hasNext()) {
			DXFLayer layer1 = (DXFLayer)dl.next();
			Iterator<String> it = (Iterator<String>) layer1.getDXFEntityTypeIterator();
			while(it.hasNext()) {
				
				String ent = (String) it.next();
				System.out.println(ent);
				entityList = (List<DXFEntity>) layer1.getDXFEntities(ent);
			}
			}
		
		for(int i=0;i<entityList.size();i++) {
		    System.out.println("This is a "+ entityList.get(i).getType());
		    System.out.println("ID : "+ entityList.get(i).getID());
			double len =entityList.get(i).getLength();
			
			System.out.println("length of line: "+len);
		}
	
   
        return ("Success");
    }
}
