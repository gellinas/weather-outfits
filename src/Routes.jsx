import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing.jsx";
import Weekly from "./pages/Weekly/Weekly.jsx";
import Daily from "./pages/Daily/Daily.jsx";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Landing} exact />
        <Route path="/weekly" component={Weekly} />
        <Route path="/daily" component={Daily} />
      </Switch>
    </Router>
  );
}

export default Routes;
