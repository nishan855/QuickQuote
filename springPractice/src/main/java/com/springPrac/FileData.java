package com.springPrac;

import org.springframework.context.annotation.Bean;
import org.springframework.web.multipart.MultipartFile;

public class FileData {
    String file;
    private int piercePoints;
    private double distance;
    private double area;
    private double totalCost;

    // Constructor
    public FileData( String file,int piercePoints, double distance, double area, double totalCost) {
        this.file = file;
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


}
