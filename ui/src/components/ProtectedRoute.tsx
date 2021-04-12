import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";

const ProtectedRoute: React.FC<{
  component: React.FC;
  path: string;
}> = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <div>Loading</div>,
    })}
    {...args}
  />
);

export default ProtectedRoute;
