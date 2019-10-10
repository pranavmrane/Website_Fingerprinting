import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// import CreateUser from "./components/create-user.component";
// import EditExercise from "./components/edit-exercise.component";
import ActionList from "./components/actionlist.component";

function App() {
  return (
    <Router>
      <div className="container">
        <br />
        <Route path="/" exact component={ActionList} />
        {/* <Route path="/edit/:id" exact component={EditExercise} />
        <Route path="/user" exact component={CreateUser} /> */}
      </div>
    </Router>
  );
}

export default App;
