import React, { Component } from "react";
import axios from "axios";

export default class ActionList extends Component {
  constructor(props) {
    super(props);

    this.onChangeAction = this.onChangeAction.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      action: "",
      actionResponse: []
    };
  }

  onChangeAction(e) {
    this.setState({
      action: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

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

    axios.post("http://localhost:5000/users/add", Package).then(res => {
      this.setState({
        actionResponse: res.data.data
      });
      // console.log(res.data.data);
    });

    // TODO
    // var hyperlink = "/users/" + res.data[0].hashedUsername;
    // window.location = `${hyperlink}`;
    // window.location = "/users";
  }

  render() {
    // console.log("A test" + this.state.actionResponse);
    return (
      <div>
        <center>
          <h1>Simple Demonstration of Fingerprinting</h1>
          <h3>User tracking without Login or Cookies</h3>
        </center>

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
      </div>
    );
  }
}
