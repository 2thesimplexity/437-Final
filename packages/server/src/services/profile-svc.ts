import { Schema, model } from "mongoose";
import { Profile, Agent, Area, SingleFamilyFeatures, UnitFeatures, MultiFamilyFeatures, Property } from "../models/profile";

const AgentSchema = new Schema<Agent>({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true }
});

const AreaSchema = new Schema<Area>({
  totalLivingArea: { type: String, required: true },
  totalLotArea: { type: String, required: true }
});

const SingleFamilyFeaturesSchema = new Schema<SingleFamilyFeatures>({
  location: { type: String, required: true },
  price: { type: String, required: true },
  numberOfBeds: { type: Number, required: true },
  numberOfBaths: { type: Number, required: true },
  area: { type: AreaSchema, required: true }
});

const UnitFeaturesSchema = new Schema<UnitFeatures>({
  location: { type: String, required: true },
  price: { type: String, required: true },
  numberOfBeds: { type: Number, required: true },
  numberOfBaths: { type: Number, required: true },
  unitArea: { type: String, required: true }
});

const MultiFamilyFeaturesSchema = new Schema<MultiFamilyFeatures>({
  units: { type: [UnitFeaturesSchema], required: true },
  totalLivingArea: { type: String, required: true },
  totalNumberOfBeds: { type: Number, required: true },
  totalNumberOfBaths: { type: Number, required: true }
});

const PropertySchema = new Schema<Property>({
  type: { type: String, required: true },
  features: {
    type: Schema.Types.Mixed,
    required: true
  }
});

const ProfileSchema = new Schema<Profile>({
  id: { type: String, required: true },
  listedBy: { type: AgentSchema, required: true },
  property: { type: PropertySchema, required: true }
});

const ProfileModel = model<Profile>("Profile", ProfileSchema);

export function index(): Promise<Profile[]> {
  return ProfileModel.find().exec();
}

export function get(id: string): Promise<Profile | null> {
  return ProfileModel.findOne({ id }).exec();
}

export function getByAgentName(name: string): Promise<Profile[]> {
  return ProfileModel.find({ "listedBy.name": name }).exec();
}

export function create(profile: Profile): Promise<Profile> {
  const p = new ProfileModel(profile);
  return p.save();
}

function update(id: string, profile: Profile): Promise<Profile> {
  return ProfileModel.findOne({ id })
    .then((found) => {
      if (!found) throw `${id} Not Found`;
      else return ProfileModel.findByIdAndUpdate(found._id, profile, { new: true });
    })
    .then((updated) => {
      if (!updated) throw `${id} not updated`;
      else return updated as Profile;
    });
}


export default { index, get, getByAgentName, create, update };
