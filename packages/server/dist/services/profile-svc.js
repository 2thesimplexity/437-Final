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
  create: () => create,
  default: () => profile_svc_default,
  get: () => get,
  getByAgentName: () => getByAgentName,
  index: () => index
});
module.exports = __toCommonJS(profile_svc_exports);
var import_mongoose = require("mongoose");
const AgentSchema = new import_mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true }
});
const AreaSchema = new import_mongoose.Schema({
  totalLivingArea: { type: String, required: true },
  totalLotArea: { type: String, required: true }
});
const SingleFamilyFeaturesSchema = new import_mongoose.Schema({
  location: { type: String, required: true },
  price: { type: String, required: true },
  numberOfBeds: { type: Number, required: true },
  numberOfBaths: { type: Number, required: true },
  area: { type: AreaSchema, required: true }
});
const UnitFeaturesSchema = new import_mongoose.Schema({
  location: { type: String, required: true },
  price: { type: String, required: true },
  numberOfBeds: { type: Number, required: true },
  numberOfBaths: { type: Number, required: true },
  unitArea: { type: String, required: true }
});
const MultiFamilyFeaturesSchema = new import_mongoose.Schema({
  units: { type: [UnitFeaturesSchema], required: true },
  totalLivingArea: { type: String, required: true },
  totalNumberOfBeds: { type: Number, required: true },
  totalNumberOfBaths: { type: Number, required: true }
});
const PropertySchema = new import_mongoose.Schema({
  type: { type: String, required: true },
  features: {
    type: import_mongoose.Schema.Types.Mixed,
    required: true
  }
});
const ProfileSchema = new import_mongoose.Schema({
  id: { type: String, required: true },
  listedBy: { type: AgentSchema, required: true },
  property: { type: PropertySchema, required: true }
});
const ProfileModel = (0, import_mongoose.model)("Profile", ProfileSchema);
function index() {
  return ProfileModel.find().exec();
}
function get(id) {
  return ProfileModel.findOne({ id }).exec();
}
function getByAgentName(name) {
  return ProfileModel.find({ "listedBy.name": name }).exec();
}
function create(profile) {
  const p = new ProfileModel(profile);
  return p.save();
}
var profile_svc_default = { index, get, getByAgentName, create };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  create,
  get,
  getByAgentName,
  index
});
