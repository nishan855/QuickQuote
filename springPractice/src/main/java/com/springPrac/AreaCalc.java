package com.springPrac;

import com.Shapes.DXFLoop;
import com.Shapes.AreaShape;
import org.kabeja.dxf.DXFCircle;
import org.kabeja.dxf.DXFEntity;
import org.kabeja.dxf.DXFLWPolyline;
import org.kabeja.dxf.DXFPolyline;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;


@Service
public class AreaCalc {


    private AreaShape sa =new AreaShape();

    public double getArea(DXFEntity ee){
        System.out.println(ee.getType());
        if(ee.getType()=="CIRCLE"){
            double area =sa.findArea((DXFCircle) ee);
            return area;
        }

        if(ee.getType()=="POLYLINE"){
            double area =sa.findArea((DXFPolyline) ee);
            return area;
        }

        if(ee.getType()=="LWPOLYLINE"){
            double area =sa.findArea((DXFLWPolyline) ee);
            return area;
        }

        if(ee.getType()=="LOOP"){
            double area =sa.findArea((DXFLoop) ee);
            return area;
        }

        return 0.0;
    }
}