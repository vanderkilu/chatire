import { Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import MainChat from "./components/MainChat";
import { Loader, StyledLoaderContainer } from "./components/sharedStyles";
import AuthRedirect from "./components/AuthRedirect";

function App() {
  const { isLoading } = useAuth0();
  if (isLoading) {
    return (
      <StyledLoaderContainer>
        <Loader />
      </StyledLoaderContainer>
    );
  }
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <ProtectedRoute path="/auth-redirect" component={AuthRedirect} />
      <ProtectedRoute path="/chat" component={MainChat} />
    </Switch>
  );
}

export default App;
