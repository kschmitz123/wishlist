import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import WishList from "./pages/WishList";
import GlobalStyle from "./GlobalStyle";
import Add from "./pages/Add";
import Welcome from "./pages/Welcome";
import React from "react";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route exact path="/">
          <Welcome />
        </Route>
        <Route path="/add">
          <Add />
        </Route>
        <Route path="/wishlist/:listId">
          <WishList />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
