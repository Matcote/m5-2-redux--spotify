import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchArtistProfile } from "../../helpers/api-helpers";
import {
  requestArtistData,
  receiveArtistData,
  receiveArtistDataError,
} from "../../actions";
import styled from "styled-components";

const ArtistRoute = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.token);
  const artistId = useParams().id;

  React.useEffect(() => {
    if (accessToken === null) {
      return;
    }
    dispatch(requestArtistData());
    fetchArtistProfile(accessToken, artistId)
      .then((data) => dispatch(receiveArtistData(data)))
      .catch((err) => dispatch(receiveArtistDataError()));
  }, [accessToken]);

  let currentArtist = useSelector((state) => state.artists.currentArtist);
  console.log(currentArtist);

  return (
    <Wrapper>
      {currentArtist === null ? (
        "Loading..."
      ) : (
        <>
          <img
            src={currentArtist.profile.images[0].url}
            alt={currentArtist.profile.name}
          />
          <h2>{currentArtist.profile.name}</h2>
          <h3>{currentArtist.profile.followers.total} followers</h3>
          <h2>Tags</h2>
          <p>
            {currentArtist.profile.genres.map((str) => {
              return <span>{str + " "}</span>;
            })}
          </p>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 20px;
  background: white;
  border: 1px solid black;
`;

export default ArtistRoute;
