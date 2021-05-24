package com.priceQuote;

/*  The Job class the parameters of a DXF file (paramDXF)
    and the type of metal used for the job (metalType)
 */
public class Job {

    ParamDXF paramDXF;
    Metal metalType;

    // Constructors
    public Job(ParamDXF paramDXF, int metalTypeIndex ) {
        this.paramDXF = paramDXF;
        /*  For now metalTypeIndex just picks from this hardcoded list.
            In the future we will have an ArrayList of MetalTypes that can be modified
        */
        Metal metalTypes [] = new Metal[8];
        metalTypes[0] = new Metal(".03 aluminum", 0.3, 0.12, 1.0, 20);
        metalTypes[1] = new Metal(".06 aluminum", 0.5, 0.18, 1.0, 20);
        metalTypes[2] = new Metal(".125 aluminum", 0.875, 0.25, 1.0, 22);
        metalTypes[3] = new Metal(".25 aluminum", 1.5, 0.28, 1.0, 28);
        metalTypes[4] = new Metal(".03 steel", 1.25, 0.4, 1.0, 30);
        metalTypes[5] = new Metal(".06 steel", 1.37, 0.42, 1.0, 31);
        metalTypes[6] = new Metal(".125 steel", 2.25, 0.48, 1.0, 32);
        metalTypes[7] = new Metal(".25 steel", 3, 0.52, 1.0, 38);

        this.metalType = metalTypes[metalTypeIndex];
    }

    // Getter Functions
    public Metal getMetalType(){ return this.metalType; }

}
