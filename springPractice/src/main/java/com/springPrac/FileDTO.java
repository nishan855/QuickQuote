package com.springPrac;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.lang.NonNull;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import java.nio.Buffer;

public class FileDTO  {
    private MultipartFile mp;
    private String material;
    private String leadtime;
    private String process;



    private String quantity;

    public FileDTO(MultipartFile mp,String material,String leadtime, String process, String quantity) {
        this.mp=mp;
        this.material = material;
        this.leadtime = leadtime;
        this.process = process;
        this.quantity = quantity;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public String getProcess() {
        return process;
    }

    public void setProcess(String process) {
        this.process = process;
    }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        material = material;
    }

    public String getLeadtime() {
        return leadtime;
    }

    public void setLeadtime(String leadtime) {
        this.leadtime = leadtime;
    }

    @Override
    public String toString() {
        return "FileDTO{" +
                "mp=" + mp.getOriginalFilename() +
                ", material='" + material + '\'' +
                ", leadtime='" + leadtime + '\'' +
                ", process='" + process + '\'' +
                ", quantity='" + quantity + '\'' +
                '}';
    }
}
