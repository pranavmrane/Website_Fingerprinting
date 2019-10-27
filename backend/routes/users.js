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

  // Machine Details Read from Request Information
  // TODO: Additional Attributes to be addeds
  thisplatformName = req.body.platformName;
  thismachineCores = req.body.machineCores;
  thisscreenWidth = req.body.screenWidth;
  thisscreenHeight = req.body.screenHeight;
  thisscreenAvailWidth = req.body.screenAvailWidth;
  thisscreenAvailHeight = req.body.screenAvailHeight;
  thispixelDepth = req.body.pixelDepth;
  thiscolorDepth = req.body.colorDepth;
  thisvideoFormats = req.body.videoFormats;
  thiswebGLVendor = req.body.webGLVendor;
  thiswebGLRenderer = req.body.webGLRenderer;
  thisbrowserLanguage = req.body.browserLanguage;
  thiscookiesEnabled = req.body.cookiesEnabled;
  thislocalStorage = req.body.localStorage;
  thissessionStorage = req.body.sessionStorage;
  thisbrowserName = req.body.browserName;
  thismachineRAM = req.body.machineRAM;
  thisdoNotTrackStatus = req.body.doNotTrackStatus;
  thispluginsInstalled = req.body.pluginsInstalled;
  thistimeZone = req.body.timeZone;
  thiscanvasID = req.body.canvasID;
  // console.log("thiscanvasID: " + thiscanvasID);

  // Generate HashCode from all attributes
  var hashInput =
    thisplatformName +
    thismachineCores +
    thisscreenWidth +
    thisscreenHeight +
    thisscreenAvailWidth +
    thisscreenAvailHeight +
    thispixelDepth +
    thiscolorDepth +
    thisvideoFormats +
    thiswebGLVendor +
    thiswebGLRenderer +
    thisbrowserLanguage +
    thiscookiesEnabled +
    thislocalStorage +
    thissessionStorage;

  // Use hashcode library for generating hash from string
  var hash = Math.abs(encode().value(hashInput));
  const thishashedUsername = hash;
  const this_sameMachine_diffBrowser_yesVPN = hash;
  const this_sameMachine_sameBrowser_yesVPN = Math.abs(
    encode().value(
      hashInput +
        thisbrowserName +
        thismachineRAM +
        thisdoNotTrackStatus +
        thispluginsInstalled +
        thiscanvasID
    )
  );
  const this_sameMachine_diffBrowser_noVPN = Math.abs(
    encode().value(hashInput + thistimeZone)
  );
  const this_sameMachine_sameBrowser_noVPN = Math.abs(
    encode().value(
      hashInput +
        thisbrowserName +
        thismachineRAM +
        thisdoNotTrackStatus +
        thispluginsInstalled +
        thistimeZone +
        thiscanvasID
    )
  );

  // console.log("hashinput: " + hashInput);
  // console.log("hash: " + thishashedUsername);

  // Check if a patricular user is already present using hash as key
  User.find({ hashedUsername: thishashedUsername }, function(err, docs) {
    // User Found
    if (docs.length) {
      // Add Latest action to specific user
      docs[0].actions.push({
        action: thisaction,
        ActionDateTime: thisactionDate
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
        sameMachine_diffBrowser_yesVPN: this_sameMachine_diffBrowser_yesVPN,
        sameMachine_sameBrowser_yesVPN: this_sameMachine_sameBrowser_yesVPN,
        sameMachine_diffBrowser_noVPN: this_sameMachine_diffBrowser_noVPN,
        sameMachine_sameBrowser_noVPN: this_sameMachine_sameBrowser_noVPN,
        machine: [
          {
            platformName: thisplatformName,
            machineCores: thismachineCores,
            screenWidth: thisscreenWidth,
            screenHeight: thisscreenHeight,
            screenAvailWidth: thisscreenAvailWidth,
            screenAvailHeight: thisscreenAvailHeight,
            pixelDepth: thispixelDepth,
            colorDepth: thiscolorDepth,
            videoFormats: thisvideoFormats,
            webGLVendor: thiswebGLVendor,
            webGLRenderer: thiswebGLRenderer,
            browserLanguage: thisbrowserLanguage,
            cookiesEnabled: thiscookiesEnabled,
            localStorage: thislocalStorage,
            sessionStorage: thissessionStorage,
            browserName: thisbrowserName,
            machineRAM: thismachineRAM,
            doNotTrackStatus: thisdoNotTrackStatus,
            pluginsInstalled: thispluginsInstalled,
            timeZone: thistimeZone,
            canvasID: thiscanvasID
          }
        ],
        actions: [
          {
            action: thisaction,
            ActionDateTime: thisactionDate
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
