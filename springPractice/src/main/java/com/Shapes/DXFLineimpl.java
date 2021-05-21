package com.Shapes;

import org.kabeja.dxf.DXFEllipse;
import org.kabeja.dxf.DXFLine;
import org.kabeja.dxf.helpers.Point;

public class DXFLineimpl extends DXFLine implements ShapeInterface {

    private DXFLine del;

    public DXFLineimpl(DXFLine del){
        this.del=del;
    }

    public DXFLine getDel() {
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
