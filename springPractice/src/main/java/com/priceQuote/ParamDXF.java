package com.priceQuote;

public class ParamDXF {
    double area;
    double length;
    int pierces;

    // Constructors
    public ParamDXF(double area, double length, int pierces) {
        this.area = area;
        this.length = length;
        this.pierces = pierces;
    }

    // Getter Functions
    public double getArea (){ return this.area; }
    public double getLength (){ return this.length; }
    public double getPierces (){ return this.pierces; }
}
