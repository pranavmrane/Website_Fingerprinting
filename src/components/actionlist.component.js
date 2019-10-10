import React, { Component } from "react";
import axios from "axios";

export default class ActionList extends Component {
  constructor(props) {
    super(props);

    this.onChangeAction = this.onChangeAction.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      action: ""
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
      screenHeight: window.screen.availHeight
    };

    axios
      .post("http://localhost:5000/users/add", Package)
      .then(res => console.log(res.data));

    window.location = "/users";
  }

  render() {
    return (
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
    );
  }
}
