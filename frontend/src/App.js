import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/Spots/AllSpots";
import SpotDetails from "./components/Spots/SpotDetails";
import CreateSpotForm from "./components/Spots/CreateSpotForm";
import CurrentUserSpots from "./components/Spots/CurrentUserSpots";
import EditSpotForm from "./components/Spots/EditSpotForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <>
      <Navigation isLoaded={isLoaded} />
      <Switch>
        <Route exact path='/'>
          <AllSpots />
        </Route>
        <Route exact path='/spots/new'>
          <CreateSpotForm />
        </Route>
        <Route exact path='/spots/current'>
          <CurrentUserSpots />
        </Route>
        <Route exact path='/spots/:spotId/edit'>
          <EditSpotForm />
        </Route>
        <Route exact path='/spots/:spotId'>
          <SpotDetails />
        </Route>
      </Switch>
    </>
  );
}

export default App;
