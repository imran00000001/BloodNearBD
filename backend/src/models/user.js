const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  profileImg: {
    type: String,
    require: true,
  },
  coverImg: {
    type: String,
  },
  phone: {
    type: String,
    default: "",
  },
  blood: {
    type: String,
    require: true,
  },
  districts: {
    type: String,
    require: true,
  },
  upuzilla: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Donor", "Volunteer", "Guest"],
  },
  roleStatus: {
    type: String,
    enum: [
      "no request",
      "pending request for donor",
      "pending request for volunteer",
      "Approved",
    ],
  },
  status: {
    type: String,
    enum: ["Active", "Blocked"],
  },
  lastDonationDate: {
    type: Date,
    default: null,
  },
  pushSubscriptions: {
    type: [
      {
        endpoint: String,
        keys: {
          p256dh: String,
          auth: String,
        },
      },
    ],
    default: [],
  },
});

const user = model("users", userSchema);

module.exports = user;
