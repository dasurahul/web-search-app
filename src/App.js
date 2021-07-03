import React from "react";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";

import { Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Route path="/">
        <Home />
      </Route>
      <Route path="/search">
        <SearchPage />
      </Route>
    </div>
  );
};

export default App;
