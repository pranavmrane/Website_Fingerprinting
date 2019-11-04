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
  // Action Details Read from Request Information
  const thisaction = req.body.action;
  const thisactionDate = req.body.actionDate;
  thiscookiesEnabled = req.body.cookiesEnabled;
  thissessionStorage = req.body.sessionStorage;
  thislocalStorage = req.body.localStorage;
  thisdoNotTrackStatus = req.body.doNotTrackStatus;
  thispluginsInstalled = req.body.pluginsInstalled;

  // Machine Details Read from Request Information
  // TODO: Additional Attributes to be addeds
  thisplatformName = req.body.platformName;
  thisscreenWidth = req.body.screenWidth;
  thisscreenHeight = req.body.screenHeight;
  thisscreenAvailWidth = req.body.screenAvailWidth;
  thisscreenAvailHeight = req.body.screenAvailHeight;
  thispixelDepth = req.body.pixelDepth;
  thiscolorDepth = req.body.colorDepth;
  thisbrowserLanguage = req.body.browserLanguage;
  thisaudioFormats = req.body.audioFormats;
  thisvideoFormats = req.body.videoFormats;
  thismachineCores = req.body.machineCores;
  thismachineRAM = req.body.machineRAM;
  thisbrowserName = req.body.browserName;
  thistimeZone = req.body.timeZone;
  thiscanvasID = Math.abs(encode().value(req.body.canvasID));
  thiswebGLVendor = req.body.webGLVendor;
  thiswebGLRenderer = req.body.webGLRenderer;
  // console.log("thiscanvasID: " + thiscanvasID);

  // Generate HashCode from all attributes
  var hashInput =
    thisplatformName +
    thisscreenWidth +
    thisscreenHeight +
    thisscreenAvailWidth +
    thisscreenAvailHeight +
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
    thiswebGLRenderer;

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
        ActionDateTime: thisactionDate,
        cookiesEnabled: thiscookiesEnabled,
        sessionStorage: thissessionStorage,
        localStorage: thislocalStorage,
        doNotTrackStatus: thisdoNotTrackStatus,
        pluginsInstalled: thispluginsInstalled
      });
      docs[0]
        .save()
        .then(() =>
          res.json({
            success: "true",
            msg: "Action Added to User",
            // Return all actions past and present to client as res
            data: docs[0].actions
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
            screenAvailWidth: thisscreenAvailWidth,
            screenAvailHeight: thisscreenAvailHeight,
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
            createdDateTime: thisactionDate
          }
        ],
        actions: [
          {
            action: thisaction,
            ActionDateTime: thisactionDate,
            cookiesEnabled: thiscookiesEnabled,
            sessionStorage: thissessionStorage,
            localStorage: thislocalStorage,
            doNotTrackStatus: thisdoNotTrackStatus,
            pluginsInstalled: thispluginsInstalled
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
            data: newUser.actions
          })
        )
        .catch(err => res.status(400).json("Error: " + err));
    }
  });
});

module.exports = router;
