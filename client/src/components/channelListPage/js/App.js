import React from "react";
import "../css/App.css";
import Header from "./Header";
import SearchPage from "./SearchPage";
import RecommendedVideos from "./RecommendedVideos";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Switch>
          <Route path="/search/:searchTerm">
            <div className="app__page">
              <SearchPage />
            </div>
          </Route>
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
