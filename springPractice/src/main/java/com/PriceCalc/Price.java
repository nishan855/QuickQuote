package com.PriceCalc;

import com.DataLayer.SellerEntity;
import com.springPrac.FileDTO;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

@Service
public class Price {

    @Bean
    public Price pp(){
        return new Price();
    }

    public QuotingData getQuoteData(SellerEntity se, FileDTO fileData){
        QuotingData qd =new QuotingData(0D,0D,0D,0D);
        for (int i=0; i<se.material.size();i++){
            if(fileData.getMaterial().equalsIgnoreCase(se.material.get(i).matname)){
                for(int j=0;j<se.material.get(i).process.size();j++){
                if(fileData.getProcess().equalsIgnoreCase(se.material.get(i).process.get(j).procname)){
                    qd.setMaterialCost(Double.parseDouble(se.material.get(i).matCost));
                    qd.setCutCust(Double.parseDouble(se.material.get(i).process.get(j).inch));
                    qd.setSetupCost(Double.parseDouble(se.material.get(i).process.get(j).setup));
                    qd.setPierceCost(Double.parseDouble(se.material.get(i).process.get(j).pierce));

                } }
            }
        }
         return qd;
    }

    public double getPriceQuote (QuotingData qd,Double dist, Double area,int pierce){
        double price=0D;
        price = qd.getMaterialCost()*area+qd.getPierceCost()*pierce+qd.getCutCust()*dist+qd.getSetupCost();
        return price;
    }

}
