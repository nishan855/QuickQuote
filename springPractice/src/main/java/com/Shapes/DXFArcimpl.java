package com.Shapes;

import org.kabeja.dxf.DXFArc;
import org.kabeja.dxf.DXFEllipse;
import org.kabeja.dxf.helpers.Point;

public class DXFArcimpl implements ShapeInterface  {

    private DXFArc del;



    public DXFArcimpl(DXFArc del){
        this.del=del;
    }

    public DXFArc getDel() {
        return del;
    }
    @Override
    public Point startPoint() {
        Point start=del.getStartPoint();
        return start;

    }

    @Override
    public Point endPoint() {
        Point end = del.getEndPoint();
        return end;
    }
}
