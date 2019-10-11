import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ActionList from "./components/actionlist.component";

// The App function loads the component ActionList
// The default page will be avialable at localhost:3000/
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
