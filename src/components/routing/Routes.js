import React from "react";
import { Switch } from "react-router-dom";
import Site from "../sites/Site";
import Cabinet from "../cabinets/Cabinet";
import Users from "../users/Users";
import Items from "../items/Items";
import Lockers from "../lockers/Lockers";
import Login from "../auth/Login";
import SignUp from "../auth/SignUp";
import NotFound from "../layout/NotFound";
import Profile from "../profile/Profile";
import Tasks from "../tasks/Tasks";
import Reports from "../reports/Reports";
import Page from "./Page";
import PrivatePage from "./PrivatePage";

const Routes = () => {
  return (
    <section>
      <Switch>
        <Page exact path="/login" component={Login} title="Login" />
        <Page exact path="/register" component={SignUp} title="Sign Up" />
        <PrivatePage
          exact
          path="/profile"
          component={Profile}
          title="Profile"
        />
        <PrivatePage exact path="/sites/:id" component={Site} title="Site" />
        <PrivatePage
          exact
          path="/cabinets/:id"
          component={Cabinet}
          title="Cabinet"
        />
        <PrivatePage
          exact
          path="/users"
          component={Users}
          title="Manage Users"
        />
        <PrivatePage
          exact
          path="/items"
          component={Items}
          title="Items Dashboard"
        />
        <PrivatePage
          exact
          path="/lockers"
          component={Lockers}
          title="Lockers"
        />
        <PrivatePage exact path="/tasks" component={Tasks} title="Tasks" />
        <PrivatePage
          exact
          path="/reports"
          component={Reports}
          title="Reports"
        />
        <Page component={NotFound} title="Not Found" />
      </Switch>
    </section>
  );
};

export default Routes;
