package com.springPrac;

import org.springframework.context.annotation.Bean;
import org.springframework.web.multipart.MultipartFile;

public class FileData {
    String file;
    String id;
    private int piercePoints;
    private int quantity;
    private String material;
    private String process;
    private double distance;
    private double area;
    private double totalCost;

    // Constructor
    public FileData( String file,String id,String process, String material,int quantity,int piercePoints, double distance, double area, double totalCost) {
        this.file = file;
        this.id=id;
        this.process=process;
        this.material=material;
        this.quantity=quantity;
        this.piercePoints = piercePoints;
        this.distance = distance;
        this.area = area;
        this.totalCost = totalCost;

    }

    // Getter Functions
    public String getFile() {
        return file;
    }
    public int getpiercepoints() {
        return piercePoints;
    }
    public double getDistance() {
        return distance;
    }
    public double getArea() { return area; }
    public double getTotalCost() { return totalCost; }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getProcess() {
        return process;
    }

    public void setProcess(String process) {
        this.process = process;
    }

    // Setter Functions
    public void setFile(String file) {
        this.file = file;
    }
    public void setPiercePoints(int piercePoints) {
        this.piercePoints = piercePoints;
    }
    public void setDistance(double distance) {
        this.distance = distance;
    }
    public void setArea(double area) { this.area = area; }

    @Override
    public String toString() {
        return "FileData{" +
                "file='" + file + '\'' +
                ", piercePoints=" + piercePoints +
                ", quantity=" + quantity +
                ", material='" + material + '\'' +
                ", process='" + process + '\'' +
                ", distance=" + distance +
                ", area=" + area +
                ", totalCost=" + totalCost +
                '}';
    }
}
