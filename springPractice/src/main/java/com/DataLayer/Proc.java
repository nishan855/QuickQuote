package com.DataLayer;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@DynamoDBTable(tableName = "Test")
public class Proc {

    @DynamoDBAttribute
    public String inch;
    @DynamoDBAttribute
    public String kurf;
    @DynamoDBAttribute
    public String pierce;
    @DynamoDBHashKey(attributeName = "procname")
    public String procname;
    @DynamoDBAttribute
    public String setup;
}
