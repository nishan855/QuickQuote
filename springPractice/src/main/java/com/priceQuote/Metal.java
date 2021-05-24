package com.priceQuote;

/*  The Metal class contains the attributes
    of the different types of metal used by job shops
 */
public class Metal {

    private String materialType;        // Description of metal - not needed
    private double areaCost;            // cost in $ of area per inch^1
    private double cutCost;             // cost in $ of length per inch
    private double pierceCost;          // cost in $ of each pierce point
    private double setUpCost;           // cost in $ of setup

    // Constructors
    public Metal(String materialType, double areaCost, double cutCost, double pierceCost, double setUpCost ) {
        this.materialType = materialType;
        this.areaCost = areaCost;
        this.cutCost = cutCost;
        this.pierceCost = pierceCost;
        this.setUpCost = setUpCost;
    }
    public Metal(double areaCost, double cutCost, double pierceCost, double setUpCost ) {
        this.areaCost = areaCost;
        this.cutCost = cutCost;
        this.pierceCost = pierceCost;
        this.setUpCost = setUpCost;
    }

    // Getter functions
    public double getAreaCost()     { return this.areaCost; }
    public double getCutCost()      { return this.cutCost; }
    public double getPierceCost()   { return this.pierceCost; }
    public double getSetUpCost()    { return this.setUpCost; }
    public String getMaterialType() { return this.materialType; }

}
