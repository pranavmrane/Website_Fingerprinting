const router = require("express").Router();
let User = require("../models/user.model");
var encode = require("hashcode").hashCode;

// Specify the actions after get request for localhost:5000/users/
// Retuns all users in database
router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

// Specify the actions after post request for localhost:5000/users/add
// This function will save user request information and return all past requests for user
router.route("/add").post((req, res) => {
  const systemDateTime = new Date().toLocaleString();

  // Action Details Read from Request Information
  const thisaction = req.body.action;
  const thisactionDate = req.body.actionDate;
  const thisactionTime = req.body.actionTime;

  // Machine Details Read from Request Information
  thisplatformName = req.body.platformName;
  thisscreenWidth = req.body.screenWidth;
  thisscreenHeight = req.body.screenHeight;
  thispixelDepth = req.body.pixelDepth;
  thiscolorDepth = req.body.colorDepth;
  thisbrowserLanguage = req.body.browserLanguage;
  thisvideoFormats = req.body.videoFormats;
  thisaudioFormats = req.body.audioFormats;
  thismachineCores = req.body.machineCores;
  thismachineRAM = req.body.machineRAM;
  thisbrowserName = req.body.browserName;
  thistimeZone = req.body.timeZone;
  thiscanvasID = Math.abs(encode().value(req.body.canvasID));
  thiswebGLVendor = req.body.webGLVendor;
  thiswebGLRenderer = req.body.webGLRenderer;
  thiscookiesEnabled = req.body.cookiesEnabled;
  thissessionStorage = req.body.sessionStorage;
  thislocalStorage = req.body.localStorage;
  thisdoNotTrackStatus = req.body.doNotTrackStatus;
  thispluginsInstalled = req.body.pluginsInstalled;
  // console.log("thiscanvasID: " + thiscanvasID);

  // Generate HashCode from all attributes
  var hashInput =
    thisplatformName +
    thisscreenWidth +
    thisscreenHeight +
    thispixelDepth +
    thiscolorDepth +
    thisbrowserLanguage +
    thisaudioFormats +
    thisvideoFormats +
    thismachineCores +
    thismachineRAM +
    thisbrowserName +
    thistimeZone +
    thiscanvasID +
    thiswebGLVendor +
    thiswebGLRenderer +
    thiscookiesEnabled +
    thissessionStorage +
    thislocalStorage +
    thisdoNotTrackStatus +
    thispluginsInstalled;

  // Use hashcode library for generating hash from string
  var hash = Math.abs(encode().value(hashInput));

  // Generate Additonal Hashes for Changing conditions
  const thishashedUsername = hash;

  // console.log("hashinput: " + hashInput);
  // console.log("hash: " + thishashedUsername);

  // Check if a patricular user is already present using hash as key
  User.find({ hashedUsername: thishashedUsername }, function(err, docs) {
    // User Found
    if (docs.length) {
      // Add Latest action to specific user
      docs[0].actions.push({
        action: thisaction,
        ActionDate: thisactionDate,
        ActionTime: thisactionTime
      });
      docs[0]
        .save()
        .then(() =>
          res.json({
            success: "true",
            msg: "Action Added to User",
            // Return all actions past and present to client as res
            actionList: docs[0].actions,
            userIdentifier: thishashedUsername
          })
        )
        .catch(err => res.status(500).json("Error: " + err));
    }

    // New user needs to be created as hash not found
    else {
      const newUser = new User({
        hashedUsername: thishashedUsername,
        machine: [
          {
            platformName: thisplatformName,
            screenWidth: thisscreenWidth,
            screenHeight: thisscreenHeight,
            pixelDepth: thispixelDepth,
            colorDepth: thiscolorDepth,
            browserLanguage: thisbrowserLanguage,
            audioFormats: thisaudioFormats,
            videoFormats: thisvideoFormats,
            machineCores: thismachineCores,
            machineRAM: thismachineRAM,
            browserName: thisbrowserName,
            timeZone: thistimeZone,
            canvasID: thiscanvasID,
            webGLVendor: thiswebGLVendor,
            webGLRenderer: thiswebGLRenderer,
            cookiesEnabled: thiscookiesEnabled,
            sessionStorage: thissessionStorage,
            localStorage: thislocalStorage,
            doNotTrackStatus: thisdoNotTrackStatus,
            pluginsInstalled: thispluginsInstalled,
            createdDateTime: systemDateTime
          }
        ],
        actions: [
          {
            action: thisaction,
            ActionDate: thisactionDate,
            ActionTime: thisactionTime
          }
        ]
      });

      newUser
        .save()
        .then(() =>
          res.json({
            success: "true",
            msg: "New User added!",
            // Return newly added action to client
            actionList: newUser.actions,
            userIdentifier: thishashedUsername
          })
        )
        .catch(err => res.status(400).json("Error: " + err));
    }
  });
});

module.exports = router;
