import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { GlobalStyles } from "../GlobalStyles";
import ArtistRoute from "../ArtistRoute";
import {
  requestAccessToken,
  receiveAccessToken,
  receiveAccessTokenError,
} from "../../actions";
import { useDispatch } from "react-redux";

const DEFAULT_ARTIST_ID = "28j8lBWDdDSHSSt5oPlsX2";

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(requestAccessToken());
    fetch("/spotify_access_token")
      .then((res) => res.json())
      .then((data) => dispatch(receiveAccessToken(data.access_token)))
      .catch((err) => dispatch(receiveAccessTokenError()));
  }, []);
  return (
    <Router>
      <GlobalStyles />
      <Switch>
        <Route exact={true} path="/">
          <Redirect to={`/artists/${DEFAULT_ARTIST_ID}`} />
        </Route>
        <Route path="/artists/:id">
          <ArtistRoute />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
