import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import WishList from "./pages/WishList";
import GlobalStyle, { theme } from "./GlobalStyle";
import Add from "./pages/Add";
import Welcome from "./pages/Welcome";
import React from "react";
import { ThemeProvider } from "styled-components";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Router>
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
    </ThemeProvider>
  );
}

export default App;
