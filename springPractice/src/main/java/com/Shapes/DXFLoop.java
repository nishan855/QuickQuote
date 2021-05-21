package com.Shapes;

import org.kabeja.dxf.Bounds;
import org.kabeja.dxf.DXFEntity;

import java.util.ArrayList;

public class DXFLoop extends DXFEntity {
    private ArrayList<ShapeInterface> shp;

    public DXFLoop(ArrayList<ShapeInterface> shp) {
        this.shp=shp;
    }

    public ArrayList<DXFEntity> getDXFEntities(){
        ArrayList<DXFEntity> entities=new ArrayList<DXFEntity>();
        for(int i=0;i< shp.size();i++){
            entities.add(shp.get(i).getDel());
        }
        return entities;
    }

    @Override
    public Bounds getBounds() {
        ArrayList <DXFEntity> ent=getDXFEntities();
        Bounds bnd= new Bounds();
           double maxX= ent.get(0).getBounds().getMaximumX();
           double minX= ent.get(0).getBounds().getMinimumX();
           double maxY= ent.get(0).getBounds().getMaximumY();
           double minY= ent.get(0).getBounds().getMinimumY();

        for(int i=1;i<ent.size();i++){
            maxX = Math.max(ent.get(i).getBounds().getMaximumX(),maxX);
            minX = Math.min(ent.get(i).getBounds().getMinimumX(),minX);
            maxY = Math.max(ent.get(i).getBounds().getMaximumY(),maxY);
            minY = Math.min(ent.get(i).getBounds().getMinimumY(),minY);

        }
        bnd.setMaximumX(maxX);
        bnd.setMinimumX(minX);
        bnd.setMaximumY(maxY);
        bnd.setMinimumY(minY);
        return bnd;
    }

    @Override
    public String getType() {
        return null;
    }

    @Override
    public double getLength() {
        return 0;
    }
}
