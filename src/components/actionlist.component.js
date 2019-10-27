import React, { Component } from "react";
import axios from "axios";

export default class ActionList extends Component {
  // Default contructor is always required
  constructor(props) {
    super(props);

    // bind functions in class withi this keyword
    this.onChangeAction = this.onChangeAction.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isLocalStorageSupported = this.isLocalStorageSupported.bind(this);
    this.isSessionStorageSupported = this.isSessionStorageSupported.bind(this);
    this.getwebGLVendor = this.getwebGLVendor.bind(this);
    this.getwebGLRenderer = this.getwebGLRenderer.bind(this);
    this.supportsVideoType = this.supportsVideoType.bind(this);
    this.adBlockStatus = this.adBlockStatus.bind(this);

    // Set Default State of variables
    this.state = {
      action: "",
      actionResponse: []
    };
  }

  // Update State of action when function triggered
  onChangeAction(e) {
    this.setState({
      action: e.target.value
    });
  }

  isLocalStorageSupported(e) {
    var test = "test";
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  isSessionStorageSupported(e) {
    var storage = window.sessionStorage;
    try {
      storage.setItem("test", "test");
      storage.removeItem("test");
      return true;
    } catch (e) {
      return false;
    }
  }

  getwebGLVendor(e) {
    var canvas = document.getElementById("canvas");
    var gl = canvas.getContext("webgl");

    var debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    var vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);

    return vendor;
  }

  getwebGLRenderer(e) {
    var canvas = document.getElementById("canvas");
    var gl = canvas.getContext("webgl");

    var debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    var renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);

    return renderer;
  }

  supportsVideoType(e) {
    let video = document.createElement("video");

    let formats = [
      'video/ogg; codecs="theora"',
      'video/ogg; codecs="opus"',
      'video/mp4; codecs="avc1.42E01E"',
      'video/mp4; codecs="flac"',
      'video/webm; codecs="vp8, vorbis"',
      'video/webm; codecs="vp9,opus"',
      'application/x-mpegURL; codecs="avc1.42E01E"'
    ];

    var i;
    let text = "";
    for (i = 0; i < formats.length; i++) {
      if (video.canPlayType(formats[i]) === "probably") {
        text +=
          formats[i].split(";")[0].trim() +
          " : " +
          formats[i].split(";")[1].trim();
      }
    }

    return text;
  }

  adBlockStatus(e) {
    var height = document.getElementById("adblock-wrapper").clientHeight;
    console.log("height is", height);
    if (height > 0) {
      return "false";
    } else {
      return "true";
    }
  }

  // This function is called when action is entered and Submit button is pressed
  onSubmit(e) {
    e.preventDefault();

    // Collect all information to be sent to the backend server in Package variable
    const Package = {
      action: this.state.action,
      actionDate: new Date(),
      platformName: window.navigator.oscpu || window.navigator.platform,
      machineCores: window.navigator.hardwareConcurrency,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      screenAvailWidth: window.screen.availWidth,
      screenAvailHeight: window.screen.availHeight,
      pixelDepth: window.screen.pixelDepth,
      colorDepth: window.screen.colorDepth,
      // adblockStatus: this.adBlockStatus(),
      videoFormats: this.supportsVideoType(),
      webGLVendor: this.getwebGLVendor(),
      webGLRenderer: this.getwebGLRenderer(),
      browserLanguage: window.navigator.language,
      cookiesEnabled: window.navigator.cookieEnabled,
      localStorage: this.isLocalStorageSupported(),
      sessionStorage: this.isSessionStorageSupported(),

      browserName: window.navigator.appCodeName,
      machineRAM: window.navigator.deviceMemory || "-1",
      doNotTrackStatus:
        window.doNotTrack ||
        navigator.doNotTrack ||
        navigator.msDoNotTrack ||
        "msTrackingProtectionEnabled" in window.external,
      pluginsInstalled: window.navigator.plugins.length,
      timeZone: new Date().getTimezoneOffset(),
      canvasID: document.getElementById("canvas").toDataURL()
      // webGLID: ,
      // webGL parameters: ,
      // fontsCount:
    };

    console.log(Package);

    // Once all information is packaged, send it on backend port 5000
    axios.post("http://localhost:5000/users/add", Package).then(res => {
      this.setState({
        // Save all previous actions for user
        actionResponse: res.data.data
      });
      console.log(res.data.data);
    });
  }

  render() {
    const divStyle = {
      backgroundcolor: "transparent",
      height: "1px",
      width: "1px"
    };
    return (
      <div>
        <center>
          <h1>Simple Demonstration of Fingerprinting</h1>
          <h3>User tracking without Login or Cookies</h3>

          <div id="adblock-wrapper" style={divStyle}></div>

          <div>
            <canvas id="canvas" width={25} height={25} />
          </div>

          <form onSubmit={this.onSubmit}>
            <label>
              Enter a value between 0 and 10:
              <input
                type="text"
                value={this.state.action}
                onChange={this.onChangeAction}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>

          {/* Parse information from list of actions */}
          <p>Previous Activity for This Machine:</p>
          {this.state.actionResponse.map(x => {
            return (
              <div>
                <p>
                  Prior Selection: {x.action} | Selection on: {x.ActionDateTime}
                </p>
              </div>
            );
          })}
        </center>
      </div>
    );
  }
}
