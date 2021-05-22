package com.springPrac;


import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;


import com.Shapes.*;
import org.kabeja.dxf.*;
import org.kabeja.dxf.helpers.DXFSplineConverter;
import org.kabeja.dxf.helpers.DXFUtils;
import org.kabeja.dxf.helpers.Point;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.kabeja.parser.*;
@CrossOrigin
@RestController
public class FileController {


	//mapping for request sending dxf files
	@PostMapping(value = "/")
	public ArrayList<FileData> testUpload1(@RequestParam("file") MultipartFile uploadedFile[]) throws Exception {

		ArrayList<FileData> parsedData = new ArrayList<FileData>();
		for (int i=0;i<uploadedFile.length;i++) {
			//parse shapes out of the file
			ObjectParser op = new ObjectParser(uploadedFile[i]);

			//get all entities on the files
			ArrayList<DXFEntity> entities = op.getEntities();


			// find all loops
			ArrayList<DXFEntity> loops = op.getLoops(entities);

			//check for errors
			//getting the shape with maximum area
			DXFEntity mx = op.maxBounds(loops);

//		//checking if other shape are enclosed in the shape
			if (!op.isEnclosed(loops, mx)) {
				throw new Exception("DXF file error: Overlapping or Unnested loop.");
			}

			int peirce_points = loops.size();

			//get pierce distance
			double length = op.getCuttingDistance(entities);

			parsedData.add(new FileData(uploadedFile[i].getName(),peirce_points,length));

		}

	return (parsedData);
	}

	}