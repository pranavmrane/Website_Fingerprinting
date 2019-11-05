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
    this.supportsAudioType = this.supportsAudioType.bind(this);
    this.supportsVideoType = this.supportsVideoType.bind(this);
    this.getCanvasRender = this.getCanvasRender.bind(this);
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

  // Test if local Storage can be used
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

  // Test if Session Storage can be used
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

  // Get webGL vendor i.e. GPU Manufacturer
  getwebGLVendor(e) {
    var canvas = document.createElement("canvas");
    var gl = canvas.getContext("webgl");

    var debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    var vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);

    return vendor;
  }

  // Get webGL vendor i.e. GPU Chipset
  getwebGLRenderer(e) {
    var canvas = document.createElement("canvas");
    var gl = canvas.getContext("webgl");

    var debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    var renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);

    return renderer;
  }

  getCanvasRender(e) {
    var canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.fillRect(0, 0, 20, 20);
    var txt = "Browser Fingerprinting";
    context.textBaseline = "top";
    // The most common type
    context.font = "14px 'Arial'";
    context.textBaseline = "alphabetic";
    context.fillStyle = "#f60";
    context.fillRect(125, 1, 62, 20);
    // Some tricks for color mixing to increase the difference in rendering
    context.fillStyle = "#069";
    context.fillText(txt, 2, 15);
    context.fillStyle = "rgba(102, 204, 0, 0.7)";
    context.fillText(txt, 4, 17);

    return canvas.toDataURL();
  }

  // Identify Which Chipsets are supported
  supportsAudioType(e) {
    let video = document.createElement("audio");

    let formats = [
      'audio/aac; codecs="aac"',
      'audio/x-aiff; codecs="aif"',
      'audio/mpeg; codecs="mp3"',
      'audio/mp4; codecs="mp4a.40.2"',
      'audio/ogg; codecs="flac"',
      'audio/ogg; codecs="vorbis"',
      'audio/ogg; codecs="opus"',
      'audio/wav; codecs="1"',
      'audio/webm; codecs="vorbis"',
      'audio/webm; codecs="opus"'
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

  // Identify Which Chipsets are supported
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

  // This function is called when action is entered and Submit button is pressed
  onSubmit(e) {
    e.preventDefault();

    // Collect all information to be sent to the backend server in Package variable
    const Package = {
      // Values that user is not expected to change
      platformName: window.navigator.platform || "-1",
      screenWidth: window.screen.width || "-1",
      screenHeight: window.screen.height || "-1",
      screenAvailWidth: window.screen.availWidth || "-1",
      screenAvailHeight: window.screen.availHeight || "-1",
      pixelDepth: window.screen.pixelDepth || "-1",
      colorDepth: window.screen.colorDepth || "-1",
      browserLanguage: window.navigator.language || "-1",
      videoFormats: this.supportsVideoType(),
      audioFormats: this.supportsAudioType(),
      machineCores: window.navigator.hardwareConcurrency || "-1",
      machineRAM: window.navigator.deviceMemory || "-1",
      browserName: window.navigator.appCodeName || "-1",
      timeZone: new Date().getTimezoneOffset(),
      canvasID: this.getCanvasRender(),
      webGLVendor: this.getwebGLVendor(),
      webGLRenderer: this.getwebGLRenderer(),

      // Values that user can change without major impact to browsing experience
      action: this.state.action,
      actionDate: new Date(),
      cookiesEnabled: window.navigator.cookieEnabled || "-1",
      sessionStorage: this.isSessionStorageSupported(),
      localStorage: this.isLocalStorageSupported(),
      // doNotTrack status works differently on different browsers
      doNotTrackStatus:
        window.doNotTrack ||
        navigator.doNotTrack ||
        navigator.msDoNotTrack ||
        "-1",
      pluginsInstalled: window.navigator.plugins.length || "-1"
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
    return (
      <div>
        <center>
          <h1>Demonstration of Browser Fingerprinting</h1>
          <h2>User tracking without Login or Cookies</h2>
          <h4>Secure Coding Project - Michael Peechatt and Pranav Rane</h4>

          <form id="input_form" onSubmit={this.onSubmit}>
            <label>
              Enter a Number :
              <input
                type="text"
                id="input_text"
                value={this.state.action}
                onChange={this.onChangeAction}
              />
            </label>
            <input type="submit" id="input_submit" value="Submit" />
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
