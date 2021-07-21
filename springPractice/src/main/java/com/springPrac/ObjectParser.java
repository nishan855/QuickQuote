package com.springPrac;

import com.Shapes.*;
import org.kabeja.dxf.*;
import org.kabeja.dxf.helpers.DXFSplineConverter;
import org.kabeja.dxf.helpers.Point;
import org.kabeja.parser.DXFParser;
import org.kabeja.parser.ParseException;
import org.kabeja.parser.Parser;
import org.kabeja.parser.ParserBuilder;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;

public class ObjectParser {

    private byte[] mp;

    public ObjectParser(byte[] mp) {
        this.mp = mp;
    }

    //get all Entities present in a dxf file
    public ArrayList<DXFEntity> getEntities() throws ParseException, IOException {
        //parser
        Parser parser = ParserBuilder.createDefaultParser();
        //getting the inputStream
        InputStream in= new ByteArrayInputStream(mp);

        //parsing the file
        parser.parse(in, DXFParser.DEFAULT_ENCODING);

        DXFDocument dxf= parser.getDocument();

        ArrayList<DXFEntity> entityList = new ArrayList<DXFEntity>();


        Iterator dl = dxf.getDXFLayerIterator();

        while(dl.hasNext()) {
            DXFLayer layer1 = (DXFLayer)dl.next();
            Iterator<String> it = (Iterator<String>) layer1.getDXFEntityTypeIterator();

            while(it.hasNext()) {
                String ent = (String) it.next();
                entityList.addAll(layer1.getDXFEntities(ent));

            }
        }
        return entityList;
    }

    //get total distance travelled
    public double getCuttingDistance(ArrayList<DXFEntity> entt)  {

        //finding length and piecre point
         double length= 0.00;

        for(int i=0;i<entt.size();i++) {
            length+=entt.get(i).getLength();
        }

    return length;
    }
    
    //get Loops
    public ArrayList<DXFEntity> getLoops(ArrayList<DXFEntity> entityList) throws Exception {

        //storing shape interface in array //we will find if the shape form loops
        ArrayList<ShapeInterface> shapes= new ArrayList<ShapeInterface>();

        //storing dxf loops //pierce points
        ArrayList<DXFEntity> loops = new ArrayList<DXFEntity>();


        for(int i=0;i<entityList.size();i++) {

            //if ellipse
            if(entityList.get(i).getType().equals("ELLIPSE")){
                DXFEllipse elp= (DXFEllipse) entityList.get(i);
                ShapeInterface si =  new DXFEllipseimpl(elp);
                shapes.add(si);

            }

            //when shape is an arc
            if(entityList.get(i).getType().equals("ARC")){
                DXFArc arc= (DXFArc) entityList.get(i);
                ShapeInterface si =  new DXFArcimpl(arc);
                shapes.add(si);

            }

            //circle is a loop on itself
            if(entityList.get(i).getType().equals("CIRCLE")){
                DXFCircle arc= (DXFCircle) entityList.get(i);

                //Add to the array of loop
                loops.add(arc);
            }

            //when shape is a line
            if(entityList.get(i).getType().equals("LINE")){
                DXFLine ln= (DXFLine) entityList.get(i);
                ShapeInterface si = new DXFLineimpl(ln);
                shapes.add(si);

            }

            //when shape is LWPolyline
            if(entityList.get(i).getType().equals("LWPOLYLINE")){
                DXFLWPolyline lwpoly= (DXFLWPolyline) entityList.get(i);

                //closed polylines are loop on itself
                if(lwpoly.isClosed()){
                    loops.add(lwpoly);
                }

                else{
                    ShapeInterface si = new DXFLWpolyimpl(lwpoly);
                    shapes.add(si);
                }
            }

            //when spline is encountered
            if(entityList.get(i).getType().equals("SPLINE")){

                DXFSpline spline= (DXFSpline) entityList.get(i);

                //convert into polyline
                DXFPolyline plc = DXFSplineConverter.toDXFPolyline(spline);

                //closed polylines are loop on itself
                if(plc.isClosed()){
                    loops.add(plc);
                }

                else{
                    ShapeInterface si = new DXFPolyimpl(plc);
                    shapes.add(si);
                }
            }


            //when polyline is encountered
            if(entityList.get(i).getType().equals("POLYLINE")){

                DXFPolyline poly= (DXFPolyline) entityList.get(i);

                //closed polylines are loop on itself
                if(poly.isClosed()){
                    loops.add(poly);
                }

                else{
                    ShapeInterface si = new DXFPolyimpl(poly);
                    shapes.add(si);

                }
            }

        }

        //adding fragments loops as well
        loops.addAll(totalFragmentloops(shapes));
        return loops;
    }

    //all loop finders
    public ArrayList<DXFEntity> totalFragmentloops(ArrayList<ShapeInterface> shapes) throws Exception {
        ArrayList <DXFEntity> allLoops= new ArrayList<DXFEntity>();

        ArrayList<ShapeInterface> sp2 = (ArrayList<ShapeInterface>) shapes.clone();
        while(sp2.size() !=0){

            ArrayList<ShapeInterface> oneloop = findLoops(sp2);
            allLoops.add(new DXFLoop(oneloop));
            sp2.removeAll(oneloop);
        }
        return allLoops;
    }


    //Single loop finder //returns one loop if formed otherwise throws exception
    public ArrayList<ShapeInterface> findLoops(ArrayList<ShapeInterface> shapes) throws Exception {

        ArrayList<ShapeInterface> loop1= new ArrayList<ShapeInterface>();

        //Add the first element
        loop1.add(shapes.get(0));
        int i=0;
        int initial_size=0;
        int finalsize=0;

        while(!isPointEqual(loop1.get(0).startPoint(),loop1.get(loop1.size()-1).endPoint())){
            Point start1= loop1.get(i).startPoint();
            Point end1 = loop1.get(i).endPoint();
            initial_size=loop1.size();

            for (int j=0;j<shapes.size();j++){
                Point start2=shapes.get(j).startPoint();
                Point end2= shapes.get(j).endPoint();

                if(isPointEqual(end1,start2)){
                    loop1.add(shapes.get(j));
                    i++;
                    break;
                }
            }
            finalsize=loop1.size();
            if(initial_size==finalsize){
                throw(new Exception("Open loop"));
            }

        }

        return loop1;
    }

    //check if two points are equal
    public boolean isPointEqual(Point p1,Point p2){
        if((Math.abs(p1.getX()-p2.getX())<0.01) &&(Math.abs(p1.getY()-p2.getY())<0.01)&& (Math.abs(p1.getZ()-p2.getZ())<0.01)){
            return true;
        }
        return false;
    }

    //get the shape with maxbounds
    public DXFEntity maxBounds(ArrayList<DXFEntity> el){
        DXFEntity maxEl=el.get(0);
        for(int i=1;i<el.size();i++){
            Double maxXDiff=Math.abs(maxEl.getBounds().getMaximumX()-maxEl.getBounds().getMinimumX());
            Double maxYDiff= Math.abs(maxEl.getBounds().getMaximumY()-maxEl.getBounds().getMinimumY());

            Double xDiff= Math.abs(el.get(i).getBounds().getMaximumX()-el.get(i).getBounds().getMinimumX());
            Double yDiff= Math.abs(el.get(i).getBounds().getMaximumY()-el.get(i).getBounds().getMinimumY());

            if(xDiff>maxXDiff&&yDiff>maxYDiff){
                maxEl=el.get(i);
            }

        }
        return maxEl;

    }

    //does the max element encloses all shapes
    public boolean isEnclosed(ArrayList<DXFEntity> el,DXFEntity e1){
        ArrayList<DXFEntity> el2 = (ArrayList<DXFEntity>) el.clone();
        el2.remove(e1);

        Bounds outer=e1.getBounds();
        for(int i=0;i<el2.size();i++){
            Bounds inner= el2.get(i).getBounds();
            if(outer.enclose(inner)==false){
                return false;
            }
        }
        return true;
    }
}

