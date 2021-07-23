package com.DataLayer;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@DynamoDBTable(tableName = "Test")
public class Material {
    @DynamoDBAttribute
    public String cutspd;
    @DynamoDBAttribute
    public String lead;
    @DynamoDBAttribute
    public String matCost;

    @DynamoDBHashKey(attributeName = "matname")
    public String matname;
    @DynamoDBAttribute
    public String mdensity;
    @DynamoDBAttribute
    public String msize;
    @DynamoDBAttribute
    public String mthickness;
    @DynamoDBAttribute
    public List<Proc> process;
}
