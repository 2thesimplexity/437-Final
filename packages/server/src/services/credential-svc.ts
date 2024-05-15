import bcrypt from "bcryptjs";
import { Schema, model } from "mongoose";
import { Credential } from "../models/credential";

const credentialSchema = new Schema<Credential>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
  },
  { collection: "user_credentials" }
);

const credentialModel = model<Credential>("Credential", credentialSchema);

function create(username: string, password: string) {
  return new Promise<Credential>((resolve, reject) => {
    if (!username || !password) {
      reject("must provide username and password");
    }
    credentialModel
      .find({ username })
      .then((found: Credential[]) => {
        if (found.length) reject("username exists");
      })
      .then(() =>
        bcrypt
          .genSalt(10)
          .then((salt: string) => bcrypt.hash(password, salt))
          .then((hashedPassword: string) => {
            const creds = new credentialModel({
              username,
              hashedPassword,
            });
            creds.save().then((created: Credential) => {
              if (created) resolve(created);
            });
          })
      );
  });
}

function verify(username: string, password: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    credentialModel
      .findOne({ username })
      .then((credsOnFile) => {
        if (!credsOnFile) {
          return reject("Invalid username or password");
        }

        bcrypt.compare(
          password,
          credsOnFile.hashedPassword,
          (error, result) => {
            if (result) {
              resolve(credsOnFile.username);
            } else {
              reject("Invalid username or password");
            }
          }
        );
      })
      .catch((err) => reject(err));
  });
}

export default { create, verify };
