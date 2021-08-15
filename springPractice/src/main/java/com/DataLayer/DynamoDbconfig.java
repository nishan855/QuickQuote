package com.DataLayer;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DynamoDbconfig {

    @Bean
    public DynamoDBMapper getmapper() {
        AWSStaticCredentialsProvider acp = new AWSStaticCredentialsProvider(
                new BasicAWSCredentials("YOUR ACCESS KEY", "YOUR SECRET KEY"));

        AmazonDynamoDB db= AmazonDynamoDBClientBuilder.standard()
                .withCredentials(acp)
                .withRegion(Regions.US_EAST_2).build();

        return  new DynamoDBMapper(db);


    }

}