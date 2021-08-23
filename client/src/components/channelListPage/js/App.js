import React from "react";
import "../css/App.css";
import Header from "./Header";
import RecommendedVideos from "./RecommendedVideos";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Switch> 
          <Route path="/">
            <div className="app__page">
              <RecommendedVideos />
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
