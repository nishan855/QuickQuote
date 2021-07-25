package com.springPrac;


import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Iterator;


import com.DataLayer.DynamoDbconfig;
import com.DataLayer.SellerEntity;
import com.DataLayer.SellerRepo;
import com.PriceCalc.Price;
import com.PriceCalc.QuotingData;
import com.Shapes.*;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.tomcat.util.json.JSONParser;
import org.kabeja.dxf.*;
import org.kabeja.dxf.helpers.DXFSplineConverter;
import org.kabeja.dxf.helpers.DXFUtils;
import org.kabeja.dxf.helpers.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.kabeja.parser.*;
@CrossOrigin
@RestController
public class FileController {
	@Autowired
	private AreaCalc af;

	DynamoDBMapper mapper =new DynamoDbconfig().getmapper();
	private final Price pp = new Price();

	//mapping for request sending dxf files
	@PostMapping(value = "/")
	public ArrayList<FileData> testUpload1(@RequestParam("files") MultipartFile[] uploadedFile,@RequestParam("quantity") String[] quantity,
										   @RequestParam("process") String[] process,@RequestParam("material") String[] material,
										   @RequestParam("lead") String[] lead,@RequestParam("id") String sellerId

	) throws Exception {

		ArrayList<FileDTO> fileDTO = new ArrayList<FileDTO>();
		ArrayList<FileData> parsedData= new ArrayList<FileData>();



       //loading sellere entity from aws
		SellerEntity quotingParams=mapper.load(SellerEntity.class,sellerId);


		for (int i=0;i<uploadedFile.length;i++) {
            fileDTO.add(new FileDTO(uploadedFile[i],material[i],lead[i],process[i],quantity[i]));
	   }


		for (int i=0;i<uploadedFile.length;i++) {
			byte[] mp =uploadedFile[i].getBytes();

			//getting price parameters
		    QuotingData qd =pp.getQuoteData(quotingParams,fileDTO.get(i));

//			//parse shapes out of the file
			ObjectParser op = new ObjectParser(mp);

//			//get all entities on the files
			ArrayList<DXFEntity> entities = op.getEntities();
//

//			// find all loops
			ArrayList<DXFEntity> loops = op.getLoops(entities);

//			//check for errors
			//getting the shape with maximum area
			DXFEntity mx = op.maxBounds(loops);

		//checking if other shape are enclosed in the shape
			if (!op.isEnclosed(loops, mx)) {
				throw new Exception("DXF file error: Overlapping or Unnested loop.");
			}
			int peirce_points = loops.size();

			//get pierce distance
			double length = op.getCuttingDistance(entities);

			double area=af.getArea(mx);

			Double totalPrice =(Integer.parseInt(quantity[i]))*pp.getPriceQuote(qd,length,area,peirce_points);

            Double tot= new BigDecimal(totalPrice).setScale(2, RoundingMode.UP).doubleValue();

			parsedData.add(new FileData(uploadedFile[i].getOriginalFilename(),sellerId,process[i],material[i],Integer.parseInt(quantity[i]),peirce_points,length,area,tot));

 }

	return (parsedData);
	}
}