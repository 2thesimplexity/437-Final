export interface Agent {
    name: string;
    phoneNumber: string;
  }
  
  export interface Area {
    totalLivingArea: string;
    totalLotArea: string;
  }
  
  export interface SingleFamilyFeatures {
    location: string;
    price: string;
    numberOfBeds: number;
    numberOfBaths: number;
    area: Area;
  }
  
  export interface UnitFeatures {
    location: string;
    price: string;
    numberOfBeds: number;
    numberOfBaths: number;
    unitArea: string;
  }
  
  export interface MultiFamilyFeatures {
    units: UnitFeatures[];
    address: string
    totalLivingArea: string;
    totalLotArea: string;
    totalNumberOfBeds: number;
    totalNumberOfBaths: number;

  }
  
  export interface Property {
    type: "Single Family" | "Multi-Family";
    features: SingleFamilyFeatures | MultiFamilyFeatures;
  }
  
  export interface Profile {
    id: string;
    listedBy: Agent;
    property: Property;
  }
  