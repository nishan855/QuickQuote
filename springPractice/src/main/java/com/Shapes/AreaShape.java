package com.Shapes;


import org.kabeja.dxf.DXFCircle;
import org.kabeja.dxf.DXFLWPolyline;
import org.kabeja.dxf.DXFPolyline;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;


    public class AreaShape {

        //find area of circle
        public double findArea(DXFCircle cir){
            return(22/7* cir.getRadius()* cir.getRadius());
        }

        //overloading method for area of polyline
        public double findArea(DXFPolyline pl){
            double length = pl.getBounds().getMaximumX() -pl.getBounds().getMinimumX();
            double width = pl.getBounds().getMaximumX()- pl.getBounds().getMinimumY();

            double area = length* width;
            return area;
        }

        //overloading method for area of LWpolyline
        public double findArea(DXFLWPolyline pl){
            double length = pl.getBounds().getMaximumX() -pl.getBounds().getMinimumX();
            double width = pl.getBounds().getMaximumX()- pl.getBounds().getMinimumY();

            double area = length* width;
            return area;
        }

        //overloading the same method for DXFLoops
        public double findArea(DXFLoop pl){
            double length = pl.getBounds().getMaximumX() -pl.getBounds().getMinimumX();
            double width = pl.getBounds().getMaximumX()- pl.getBounds().getMinimumY();

            double area = length* width;
            return area;
        }
    }

