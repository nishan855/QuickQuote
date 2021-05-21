package com.Shapes;

import org.kabeja.dxf.DXFEllipse;
import org.kabeja.dxf.helpers.Point;

public class DXFEllipseimpl  implements ShapeInterface {
    private DXFEllipse del;

    public DXFEllipseimpl(DXFEllipse del){
        this.del=del;
    }

    public DXFEllipse getDel() {
        return del;
    }

    @Override
    public Point startPoint() {
        Point p=del.getPointAt(del.getStartParameter());
        return p;
    }

    @Override
    public Point endPoint() {
        Point p=del.getPointAt(del.getEndParameter());
        return p;
    }
}
