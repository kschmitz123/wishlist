import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import WishList from "./pages/WishList";

import GlobalStyle from "./GlobalStyle";
import Add from "./pages/Add";
import Welcome from "./pages/Welcome";
import React from "react";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
