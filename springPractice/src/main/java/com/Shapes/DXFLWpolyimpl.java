package com.Shapes;

import org.kabeja.dxf.DXFEllipse;
import org.kabeja.dxf.DXFLWPolyline;
import org.kabeja.dxf.helpers.Point;

public class DXFLWpolyimpl extends DXFLWPolyline implements ShapeInterface {

    private DXFLWPolyline del;

    public DXFLWpolyimpl(DXFLWPolyline del){
        this.del=del;
    }

    public DXFLWPolyline getDel() {
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
