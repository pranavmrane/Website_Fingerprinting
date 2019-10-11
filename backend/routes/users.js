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
  // TODO: Additional Attributes to be added
  thisuserAgent = req.body.userAgent;
  thisbrowserName = req.body.browserName;
  thisplatformName = req.body.platformName;
  thiscookiesEnabled = req.body.cookiesEnabled;
  thispluginsInstalled = req.body.pluginsInstalled;
  thisdoNotTrackStatus = req.body.doNotTrackStatus;
  thisscreenWidth = req.body.screenWidth;
  thisscreenHeight = req.body.screenHeight;
  thistimeZone = req.body.timeZone;
  thisbrowserLanguage = req.body.browserLanguage;
  thisscreenDepth = req.body.screenDepth;

  // Generate HashCode from all attributes
  var hashInput =
    thisuserAgent +
    thisbrowserName +
    thisplatformName +
    thiscookiesEnabled +
    thispluginsInstalled +
    thisdoNotTrackStatus +
    thisscreenWidth +
    thisscreenHeight +
    thistimeZone +
    thisbrowserLanguage +
    thisscreenDepth;

  // Use hashcode library for generating hash from string
  var hash = Math.abs(encode().value(hashInput));
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
        machine: [
          {
            userAgent: thisuserAgent,
            browserName: thisbrowserName,
            platformName: thisplatformName,
            cookiesEnabled: thiscookiesEnabled,
            pluginsInstalled: thispluginsInstalled,
            doNotTrackStatus: thispluginsInstalled,
            screenWidth: thisscreenWidth,
            screenHeight: thisscreenHeight,
            timeZone: thistimeZone,
            browserLanguage: thisbrowserLanguage,
            screenDepth: thisscreenDepth
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
