import { Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import MainChat from "./components/MainChat";

function App() {
  const { isLoading } = useAuth0();
  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/chat" component={MainChat} />
      {/* <ProtectedRoute path="/chat" component={MainChat} /> */}
    </Switch>
  );
}

export default App;
