const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Specify collections(table) structure for Action
const ActionSchema = new Schema({
  action: String,
  ActionDateTime: { type: Date }
});

// Specify collections(table) structure for Machine Information
const MachineSchema = new Schema({
  platformName: String,
  screenWidth: String,
  screenHeight: String,
  screenAvailWidth: String,
  screenAvailHeight: String,
  pixelDepth: String,
  colorDepth: String,
  webGLVendor: String,
  webGLRenderer: String,
  browserLanguage: String,
  cookiesEnabled: String,
  sessionStorage: String,
  videoFormats: String,
  localStorage: String,
  machineCores: String,
  browserName: String,
  machineRAM: String,
  doNotTrackStatus: String,
  pluginsInstalled: String,
  timeZone: String,
  canvasID: String
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
    sameMachine_diffBrowser_yesVPN: {
      type: String
    },
    sameMachine_sameBrowser_yesVPN: {
      type: String
    },
    sameMachine_diffBrowser_noVPN: {
      type: String
    },
    sameMachine_sameBrowser_noVPN: {
      type: String
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
