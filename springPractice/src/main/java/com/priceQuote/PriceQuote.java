package com.priceQuote;

/*  Very simple price quote that takes the parameters
    of a Job and generates a price.
 */
public class PriceQuote {

    public static double priceQuote( Job currJob ){

        double totalPrice = 0.00;

        totalPrice += currJob.metalType.getAreaCost() * currJob.paramDXF.getArea();
        totalPrice += currJob.metalType.getCutCost() * currJob.paramDXF.getLength();
        totalPrice += currJob.metalType.getPierceCost() * currJob.paramDXF.getPierces();
        totalPrice += currJob.metalType.getSetUpCost();

        return totalPrice;
    }

}
