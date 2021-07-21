package com.PriceCalc;

public class QuotingData {
    private Double materialCost;
    private Double setupCost;
    private Double pierceCost;
    private Double  cutCust;

    public QuotingData(double materialCost, Double setupCost, Double pierceCost, Double cutCust) {
        this.materialCost = materialCost;
        this.setupCost = setupCost;
        this.pierceCost = pierceCost;
        this.cutCust = cutCust;
    }

    public Double getMaterialCost() {
        return materialCost;
    }

    public Double getSetupCost() {
        return setupCost;
    }

    public Double getPierceCost() {
        return pierceCost;
    }

    public Double getCutCust() {
        return cutCust;
    }

    public void setMaterialCost(Double materialCost) {
        this.materialCost = materialCost;
    }

    public void setSetupCost(Double setupCost) {
        this.setupCost = setupCost;
    }

    public void setPierceCost(Double pierceCost) {
        this.pierceCost = pierceCost;
    }

    public void setCutCust(Double cutCust) {
        this.cutCust = cutCust;
    }

    @Override
    public String toString() {
        return "QuotingData{" +
                "materialCost=" + materialCost +
                ", setupCost=" + setupCost +
                ", pierceCost=" + pierceCost +
                ", cutCust=" + cutCust +
                '}';
    }
}

