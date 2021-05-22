package com.springPrac;

import org.springframework.context.annotation.Bean;
import org.springframework.web.multipart.MultipartFile;

public class FileData {
    String file;
    private int piercePoints;
    private double distance;

    public FileData( String file,int piercePoints, double distance) {
        this.file = file;
        this.piercePoints = piercePoints;
        this.distance = distance;
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }

    public String getFile() {
        return file;
    }

    public void setFile(String file) {
        this.file = file;
    }

    public int getpiercepoints() {
        return piercePoints;
    }

    public void setPiercePoints(int piercePoints) {
        this.piercePoints = piercePoints;
    }


}
