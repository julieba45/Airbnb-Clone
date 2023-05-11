import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
// import * as spotActions from "./store/spots"
import GetAllSpots from "./components/SpotBrowser/GetAllSpots";
import GetDetailsSpot from "./components/SpotBrowser/GetDetailsSpot";
import CreateSpot from "./components/CreateSpot";
import GetAllCurrentSpots from "./components/ManageCurrentSpots";
import UpdateSpot from "./components/EditSpots";
import "./index.css"


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  // useEffect(() => {
  //   dispatch(spotActions.fetchAllSpots())
  // })

  return (
    <>
    <div className="global-container">
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path={["/", "/spots"]}>
            <GetAllSpots />
          </Route>
          <Route exact path="/spots/new">
          <CreateSpot />
          </Route>
          <Route exact path="/spots/current">
            <GetAllCurrentSpots />
          </Route>
          <Route exact path="/spots/:id">
            <GetDetailsSpot />
          </Route>
          <Route exact path="/spots/:id/edit" render={(props) => <UpdateSpot {...props} spot={props.location.state.spot} />} />

        </Switch>
      )}
      </div>
    </>
  );
}

export default App;
