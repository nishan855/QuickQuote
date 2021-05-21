package com.Shapes;

import com.Shapes.ShapeInterface;
import org.kabeja.dxf.DXFEllipse;
import org.kabeja.dxf.DXFPolyline;
import org.kabeja.dxf.helpers.Point;

public class DXFPolyimpl extends DXFPolyline implements ShapeInterface {
    private DXFPolyline del;

    public DXFPolyimpl(DXFPolyline del){
        this.del=del;
    }

    public DXFPolyline getDel() {
        return del;
    }

    @Override
    public Point startPoint() {
        int vertexCount= del.getVertexCount();
        Point start =del.getVertex(0).getPoint();
        return start;
    }

    @Override
    public Point endPoint() {
        int vertexCount= del.getVertexCount();
        Point end =del.getVertex(vertexCount-1).getPoint();
        return end;
    }
}
