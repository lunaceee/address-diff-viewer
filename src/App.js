import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashboardView from "./pages/dashboard-view";
import DiffView from "./pages/diff-view";
import "./styles/main.css";

function App() {
  return (
    <div className="app">
      <header>
        <h1>Address Diff Viewer</h1>
      </header>
      <Router>
        <Switch>
          <Route path="/diff/:url1/:url2">
            <DiffView />
          </Route>
          <Route path="/">
            <DashboardView />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
