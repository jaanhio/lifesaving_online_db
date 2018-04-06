import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import AppliedRoutes from "./components/AppliedRoutes";

export default ({ childProps }) => {
  return (
    <Switch>
      {/*<AppliedRoutes path="/" exact component={Dashboard} props={childProps} />
  <AppliedRoutes path="/login" exact component={LoginPage} props={childProps} />*/}
      <Route path="/login" component={LoginPage} />
      <Route exact path="/" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
};
