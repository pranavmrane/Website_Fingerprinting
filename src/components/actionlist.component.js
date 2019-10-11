import React, { Component } from "react";
import axios from "axios";

export default class ActionList extends Component {
  // Default contructor is always required
  constructor(props) {
    super(props);

    // bind functions in class withi this keyword
    this.onChangeAction = this.onChangeAction.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

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

  // This function is called when action is entered and Submit button is pressed
  onSubmit(e) {
    e.preventDefault();

    // Collect all information to be sent to the backend server in Package variable
    const Package = {
      action: this.state.action,
      actionDate: new Date(),
      userAgent: window.navigator.userAgent,
      browserName: window.navigator.appCodeName,
      platformName: window.navigator.oscpu,
      cookiesEnabled: window.navigator.cookieEnabled,
      pluginsInstalled: window.navigator.pluginsInstalled,
      doNotTrackStatus: window.navigator.doNotTrack,
      screenWidth: window.screen.availWidth,
      screenHeight: window.screen.availHeight,
      timeZone: new Date().getTimezoneOffset(),
      browserLanguage: window.navigator.language,
      screenDepth: window.navigator.screenDepth
    };

    // Once all information is packaged, send it on backend port 5000
    axios.post("http://localhost:5000/users/add", Package).then(res => {
      this.setState({
        // Save all previous actions for user
        actionResponse: res.data.data
      });
      // console.log(res.data.data);
    });
  }

  render() {
    return (
      <div>
        <center>
          <h1>Simple Demonstration of Fingerprinting</h1>
          <h3>User tracking without Login or Cookies</h3>

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
                  Previous Activity: {x.action} | Activity Date:{" "}
                  {x.ActionDateTime}
                </p>
              </div>
            );
          })}
        </center>
      </div>
    );
  }
}
