import React, { useContext } from "react";
import FirstPage from "./pages/FirstPage";
import SecondPage from "./pages/SecondPage";
import ThirdPage from "./pages/ThirdPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { GlobalContext } from "./contexts/GlobalContext";

export default function App() {
  const { newUser, setNewUser } = useContext(GlobalContext);
  return (
    <Router>
      <div className=" min-h-screen w-full flex flex-col items-center pb-20">
        <Switch>
          <Route exact path="/" render={() => <FirstPage />} />
          <Route path="/second-page" render={() => <SecondPage />} />
          {/* success dialog */}
          <Route path="/third-page" component={ThirdPage} />
        </Switch>
      </div>
      {/* welcome dialog */}
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={newUser}
        onClose={() => {
          setNewUser(false);
        }}
      >
        <Alert
          onClose={() => {
            setNewUser(false);
          }}
          severity="info"
        >
          {`Looks like you're new here, Welcome :)`}
        </Alert>
      </Snackbar>
    </Router>
  );
}
