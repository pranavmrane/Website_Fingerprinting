const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Specify collections(table) structure for Action
const ActionSchema = new Schema({
  action: String,
  ActionDateTime: { type: Date }
});

// Specify collections(table) structure for Machine Information
const MachineSchema = new Schema({
  userAgent: String,
  browserName: String,
  platformName: String,
  cookiesEnabled: String,
  pluginsInstalled: String,
  doNotTrackStatus: String,
  screenWidth: String,
  screenHeight: String,
  timeZone: String,
  browserLanguage: String,
  screenDepth: String
});

// Specify collections(table) structure for User Information
// Machine and Action are nested in User
const UserSchema = new Schema(
  {
    hashedUsername: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    machine: [MachineSchema],
    actions: [ActionSchema]
  },
  {
    timestamps: true
  }
);
const User = mongoose.model("user", UserSchema);

module.exports = User;
