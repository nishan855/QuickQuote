package com.springPrac;


import java.awt.*;
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

import org.kabeja.dxf.*;
import org.kabeja.dxf.helpers.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.kabeja.parser.*;

@RestController
public class FileController {

	//mapping for request sending dxf files
	@PostMapping(value = "/")
    public String testUpload1(@RequestParam("file") MultipartFile uploadedFile[]) throws Exception {
        //parser
		Parser parser = ParserBuilder.createDefaultParser();
		//getting the inputStream
		InputStream in= new ByteArrayInputStream (uploadedFile[0].getBytes());

		//parsing the file
		parser.parse(in, DXFParser.DEFAULT_ENCODING);
		
		DXFDocument dxf= parser.getDocument();
		
		ArrayList<DXFEntity> entityList = new ArrayList<DXFEntity>();

		
		Iterator dl = dxf.getDXFLayerIterator();
		while(dl.hasNext()) {
			 DXFLayer layer1 = (DXFLayer)dl.next();
			 Iterator<String> it = (Iterator<String>) layer1.getDXFEntityTypeIterator();

			while(it.hasNext()) {
				String ent = (String) it.next();
				entityList.addAll(layer1.getDXFEntities(ent));

			}
		}

		//getting the shape with maximum area
		DXFEntity mx=maxBounds(entityList);

		//checking if other shape are enclosed in the shape
		if(!isEnclosed(entityList,mx)){
			throw new Exception("DXF file error: Overlapping or Unnested loop.");
		}

		//finding length and piere point
		double length= 0.00;
		int pierce_points=0;

		for(int i=0;i<entityList.size();i++) {

			//if ellipse
			if(entityList.get(i).getType().equals("ELLIPSE")){
				DXFEllipse elp= (DXFEllipse) entityList.get(i);
				Point start=elp.getLocalStartPoint();
				Point end = elp.getLocalEndPoint();
			}

			if(entityList.get(i).getType().equals("ARC")){
				DXFArc arc= (DXFArc) entityList.get(i);
				Point start=arc.getStartPoint();
				Point end = arc.getEndPoint();

			}

			if(entityList.get(i).getType().equals("LINE")){

				DXFLine ln= (DXFLine) entityList.get(i);
				Point start=ln.getStartPoint();
				Point end = ln.getEndPoint();
			}

			if(entityList.get(i).getType().equals("LWPOLYLINE")){

				//DXFPolyline poly= (DXFPolyline) entityList.get(i);
				//System.out.println(poly.isClosed());

			}

			if(entityList.get(i).getType().equals("POLYLINE")){

				DXFPolyline poly= (DXFPolyline) entityList.get(i);
				if(poly.isClosed()){
					pierce_points++;
				}

				else{
					int vertexCount= poly.getVertexCount();
					 Point start =poly.getVertex(0).getPoint();
					 Point end =poly.getVertex(vertexCount-1).getPoint();
				}
			}


			length+=entityList.get(i).getLength();

		}


	     System.out.println("Pierce Points: ="+ pierce_points);
	     System.out.println("Length: ="+length);
	     return ("Success");
    }

    //check if two points are equal
    public boolean isPointEqual(Point p1,Point p2){
		if(p1.getX()==p2.getX() &&p1.getY()==p2.getY() &&p1.getZ()==p2.getZ()){
			return true;
		}
		return false;
	}

	//get the shape with maxbounds
	public DXFEntity maxBounds(ArrayList<DXFEntity> el){
		DXFEntity maxEl=el.get(0);
		for(int i=1;i<el.size();i++){
			Double maxXDiff=Math.abs(maxEl.getBounds().getMaximumX()-maxEl.getBounds().getMinimumX());
			Double maxYDiff= Math.abs(maxEl.getBounds().getMaximumY()-maxEl.getBounds().getMinimumY());

			Double xDiff= Math.abs(el.get(i).getBounds().getMaximumX()-el.get(i).getBounds().getMinimumX());
			Double yDiff= Math.abs(el.get(i).getBounds().getMaximumY()-el.get(i).getBounds().getMinimumY());

			if(xDiff>maxXDiff&&yDiff>maxYDiff){
				maxEl=el.get(i);
			}

		}
        return maxEl;

	}

	//does the max element encloses all shapes
	public boolean isEnclosed(ArrayList<DXFEntity> el,DXFEntity e1){
		ArrayList<DXFEntity> el2 = (ArrayList<DXFEntity>) el.clone();
		el2.remove(e1);

		Bounds outer=e1.getBounds();
		for(int i=0;i<el2.size();i++){
			Bounds inner= el2.get(i).getBounds();
			if(outer.enclose(inner)==false){
				     return false;
			}
		}
		return true;
	}


}
