import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
// import * as spotsActions from "./store/spots";
import Navigation from "./components/Navigation";
import AllSpots from "./components/Spots/AllSpots";
import SpotDetails from "./components/Spots/SpotDetails";
import CreateSpotForm from "./components/Spots/CreateSpotForm";
import CurrentUserSpots from "./components/Spots/CurrentUserSpots";
import EditSpotForm from "./components/Spots/EditSpotForm";
import CreateSpotReviewForm from "./components/Reviews/CreateSpotReviewForm";
import UserBookings from "./components/Bookings/UserBookings";
import SearchResults from "./components/Spots/SearchResults";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    // Added dispatch to fetch all & user spots.
    // dispatch(spotsActions.getAllSpotsThunk())
    // dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
    // dispatch(spotsActions.getUserSpotsThunk()).then(() => dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true)))
    // dispatch(spotsActions.getUserSpotsThunk())
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
        <Route exact path='/spots/search/:searchTerm'>
          <SearchResults />
        </Route>
        <Route exact path='/bookings/current'>
          <UserBookings />
        </Route>
        <Route exact path='/spots/:spotId/edit'>
          <EditSpotForm />
        </Route>
        <Route exact path='/spots/:spotId'>
          <SpotDetails />
        </Route>
        <Route exact path='/spots/:spotId/reviews/new'>
          <CreateSpotReviewForm />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
