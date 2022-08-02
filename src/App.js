import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Routes from "./components/routing/Routes";
import "./App.scss";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import PrivatePage from "./components/routing/PrivatePage";
import Toast from "./components/layout/Toast";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <>
          <Toast />
          <Switch>
            <PrivatePage
              exact
              path="/"
              component={Dashboard}
              title="MRO Management"
            />
            <Route component={Routes} />
          </Switch>
        </>
      </Router>
    </Provider>
  );
};

export default App;
