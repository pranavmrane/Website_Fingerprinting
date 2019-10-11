import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ActionList from "./components/actionlist.component";

function App() {
  return (
    <Router>
      <div className="container">
        <br />
        <Route path="/" exact component={ActionList} />
      </div>
    </Router>
  );
}

export default App;
