package com.Shapes;

import org.kabeja.dxf.DXFEntity;
import org.kabeja.dxf.helpers.Point;

public interface ShapeInterface {
    public Point startPoint();
    public Point endPoint();
    public DXFEntity getDel();
}
