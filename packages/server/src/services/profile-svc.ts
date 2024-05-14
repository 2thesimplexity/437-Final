import { Profile } from "../models/profile";

let profiles: Profile[] = [
  {
    id: "property1",
    listedBy: {
      name: "Bruce Wayne",
      phoneNumber: "123-456-7890",
    },
    property: {
      type: "Single Family",
      features: {
        location: "123 Main St, Springfield, USA",
        price: "$500,000",
        numberOfBeds: 4,
        numberOfBaths: 3,
        area: {
          totalLivingArea: "2500 sq ft",
          totalLotArea: "6000 sq ft",
        },
      },
    },
  },
  {
    id: "property2",
    listedBy: {
      name: "Batman",
      phoneNumber: "987-654-3210",
    },
    property: {
      type: "Multi-Family",
      features: {
        units: [
          {
            location: "Unit 1",
            price: "$300,000",
            numberOfBeds: 2,
            numberOfBaths: 1,
            unitArea: "1000 sq ft",
          },
          {
            location: "Unit 2",
            price: "$350,000",
            numberOfBeds: 3,
            numberOfBaths: 2,
            unitArea: "1200 sq ft",
          },
        ],
        totalLivingArea: "2200 sq ft",
        totalNumberOfBeds: 5,
        totalNumberOfBaths: 3,
      },
    },
  },
];

export function get(id: string): Profile | undefined {
  return profiles.find(profile => profile.id === id);
}

export function getByAgentName(name: string): Profile[] {
  return profiles.filter(profile => profile.listedBy.name === name);
}

export default { get, getByAgentName };
