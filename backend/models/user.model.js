const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Specify collections(table) structure for Action
const ActionSchema = new Schema({
  action: String,
  ActionDate: String,
  ActionTime: String
});

// Specify collections(table) structure for Machine Information
const MachineSchema = new Schema({
  platformName: String,
  screenWidth: String,
  screenHeight: String,
  pixelDepth: String,
  colorDepth: String,
  browserLanguage: String,
  videoFormats: String,
  audioFormats: String,
  machineCores: String,
  machineRAM: String,
  browserName: String,
  timeZoneOffset: String,
  canvasID: String,
  webGLVendor: String,
  webGLRenderer: String,
  cookiesEnabled: String,
  sessionStorage: String,
  localStorage: String,
  doNotTrackStatus: String,
  pluginsInstalled: String,
  createdDateTime: String
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
