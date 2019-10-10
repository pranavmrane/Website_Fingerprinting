const router = require("express").Router();
let User = require("../models/user.model");
let Navigator = require("navigator");
let Screen = require("screenres");
var encode = require("hashcode").hashCode;

router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const thisaction = Math.floor(Math.random() * 10);
  const thisactionDate = new Date();

  // Machine Details
  thisuserAgent = Navigator.userAgent;
  thisbrowserName = Navigator.appCodeName;
  thisplatformName = Navigator.platform;
  thiscookiesEnabled = Navigator.cookieEnabled;
  thispluginsInstalled = Navigator.plugins.length;
  thisdoNotTrackStatus = Navigator.doNotTrack;
  thisscreenWidth = Screen.get()[0];
  thisscreenHeight = Screen.get()[1];

  // HashCode Deails
  var hashInput =
    thisuserAgent +
    thisbrowserName +
    thisplatformName +
    thiscookiesEnabled +
    thispluginsInstalled +
    thisdoNotTrackStatus +
    thisscreenWidth +
    thisscreenHeight;
  var hash = encode().value(hashInput);
  const thishashedUsername = hash;
  console.log("hashinput: " + hashInput);
  console.log("hash: " + thishashedUsername);
  //   const thishashedUsername = "FIXED9";

  User.find({ hashedUsername: thishashedUsername }, function(err, docs) {
    if (docs.length) {
      //   console.log(docs);
      docs[0].actions.push({
        action: thisaction,
        ActionDateTime: thisactionDate
      });
      //   console.log(docs[0].actions);
      docs[0]
        .save()
        .then(() => res.json("Action Added for user!"))
        .catch(err => res.status(500).json("Error: " + err));
    } else {
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
            screenHeight: thisscreenHeight
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
        .then(() => res.json("User added!"))
        .catch(err => res.status(400).json("Error: " + err));
    }
  });
});

module.exports = router;
