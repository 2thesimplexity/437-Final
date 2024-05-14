"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var profile_svc_exports = {};
__export(profile_svc_exports, {
  default: () => profile_svc_default,
  get: () => get,
  getByAgentName: () => getByAgentName
});
module.exports = __toCommonJS(profile_svc_exports);
let profiles = [
  {
    id: "property1",
    listedBy: {
      name: "Bruce Wayne",
      phoneNumber: "123-456-7890"
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
          totalLotArea: "6000 sq ft"
        }
      }
    }
  },
  {
    id: "property2",
    listedBy: {
      name: "Batman",
      phoneNumber: "987-654-3210"
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
            unitArea: "1000 sq ft"
          },
          {
            location: "Unit 2",
            price: "$350,000",
            numberOfBeds: 3,
            numberOfBaths: 2,
            unitArea: "1200 sq ft"
          }
        ],
        totalLivingArea: "2200 sq ft",
        totalNumberOfBeds: 5,
        totalNumberOfBaths: 3
      }
    }
  }
];
function get(id) {
  return profiles.find((profile) => profile.id === id);
}
function getByAgentName(name) {
  return profiles.filter((profile) => profile.listedBy.name === name);
}
var profile_svc_default = { get, getByAgentName };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  get,
  getByAgentName
});
