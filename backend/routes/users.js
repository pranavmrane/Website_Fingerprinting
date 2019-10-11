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

// TODO
router.get("/:id").get((req, res) => {
  console.log("wow");
  User.find({ hashedUsername: req.params.id }, function(err, docs) {
    console.log(docs);
    return res.end(JSON.stringify(docs));
  });
});

router.route("/add").post((req, res) => {
  const thisaction = req.body.action;
  const thisactionDate = req.body.actionDate;

  // Machine Details
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

  // HashCode Deails
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

  var hash = Math.abs(encode().value(hashInput));
  const thishashedUsername = hash;
  // thishashedUsername = "FIXED1";
  // console.log("hashinput: " + hashInput);
  // console.log("hash: " + thishashedUsername);

  User.find({ hashedUsername: thishashedUsername }, function(err, docs) {
    if (docs.length) {
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
            data: docs[0].actions
          })
        )
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
            data: newUser.actions
          })
        )
        .catch(err => res.status(400).json("Error: " + err));
    }
  });
});

module.exports = router;
