// app/src/model.ts
import { Profile, Property } from "../../../server/src/models";

export interface Model {
  profile?: Profile;
  property?: Property;
}

export const init: Model = {};
