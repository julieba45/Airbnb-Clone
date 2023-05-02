import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import * as spotActions from "./store/spots"
import SpotBrowser from "./components/SpotBrowser";
import GetAllSpots from "./components/SpotBrowser/GetAllSpots";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  useEffect(() => {
    dispatch(spotActions.fetchAllSpots())
  })

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route
            path={["/", "/spots", "/spots/:id"]}
            exact
          >
            <SpotBrowser />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
