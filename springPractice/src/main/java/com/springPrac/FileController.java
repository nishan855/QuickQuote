package com.springPrac;


import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Iterator;


import com.Shapes.*;
import com.priceQuote.Job;
import com.priceQuote.ParamDXF;	// Eric Keng
import com.priceQuote.PriceQuote;
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

		ArrayList<FileData> parsedData = new ArrayList<>();
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


			/*          **********	 	BEGIN changes by Eric Keng	 	**********          */
			double area = 37.00; // Need to learn to get this value!

			// Holds the parameters for the current DXF file
			ParamDXF currDXF = new ParamDXF(area, length, peirce_points);
			double totalPrice = 0.00;	// total price for metalType[7] will be stored in the File

			// For now, showing the price calculation for all 8 metal types
			for( int metalIndex = 0; metalIndex < 8; metalIndex++ ){
				// Initializing a Job object that will store all the information for the current job
				Job currJob = new Job( currDXF, metalIndex );

				// Getting a price quote based off the current job
				totalPrice = PriceQuote.priceQuote( currJob );

				// Print totalPrice and the name of the metal type
				String currency = NumberFormat.getCurrencyInstance().format( totalPrice );
				System.out.print("Cost to cut \"" + currJob.getMetalType().getMaterialType() + "\": ");
				System.out.println( currency );
			}
			System.out.println( );
			/*          **********	 	END changes by Eric Keng	 	**********          */

			parsedData.add(new FileData(uploadedFile[i].getName(),peirce_points,length,area,totalPrice));

		}

	return (parsedData);
	}
}