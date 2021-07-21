package com.DataLayer;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class SellerRepo {

    @Autowired
    private DynamoDBMapper mapper;


    public SellerEntity save(SellerEntity en) {
        mapper.save(en);
        return en;
    }

    public SellerEntity getEmployeeById(String id) {
        return mapper.load(SellerEntity.class,id);

    }
}