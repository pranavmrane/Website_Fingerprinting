const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ActionSchema = new Schema({
  action: String,
  ActionDateTime: { type: Date }
});

const MachineSchema = new Schema({
  userAgent: String,
  browserName: String,
  platformName: String,
  cookiesEnabled: String,
  pluginsInstalled: String,
  doNotTrackStatus: String,
  screenWidth: String,
  screenHeight: String
});

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
