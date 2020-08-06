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

  const abbreviateNumber = function (num, fixed) {
    if (num === null) {
      return null;
    } // terminate early
    if (num === 0) {
      return "0";
    } // terminate early
    fixed = !fixed || fixed < 0 ? 0 : fixed; // number of decimal places to show
    var b = num.toPrecision(2).split("e"), // get power
      k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
      c =
        k < 1
          ? num.toFixed(0 + fixed)
          : (num / Math.pow(10, k * 3)).toFixed(1 + fixed), // divide by power
      d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
      e = d + ["", "K", "M", "B", "T"][k]; // append power
    return e;
  };

  return (
    <Wrapper>
      {currentArtist === null ? (
        "Loading..."
      ) : (
        <>
          <Header>
            <img
              src={currentArtist.profile.images[0].url}
              alt={currentArtist.profile.name}
            />
            <h2>{currentArtist.profile.name}</h2>
            <h3>
              {abbreviateNumber(currentArtist.profile.followers.total)}{" "}
              followers
            </h3>
          </Header>
          <Tags>
            <h2>Tags</h2>
            <p>
              {currentArtist.profile.genres.map((str) => {
                return <span>{str + " "}</span>;
              })}
            </p>
          </Tags>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 375px;
  height: 812px;
  background-color: #0b0f14;
`;
const Header = styled.div`
  position: absolute;
  width: 268px;
  height: 215px;
  left: 54px;
  top: 59px;
  display: flex;
  align-items: center;
  flex-direction: column;
  img {
    position: absolute;
    width: 175px;
    height: 175px;

    border-radius: 190.5px;
  }
  h2 {
    position: absolute;
    width: 268px;
    height: 59px;
    text-align: center;
    top: 60px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 48px;
    line-height: 59px;
    /* identical to box height */

    /* White */

    color: #ffffff;
    /* Triple shadow */

    text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.75), 0px 4px 4px rgba(0, 0, 0, 0.5),
      4px 8px 25px #000000;
  }
  h3 {
    position: absolute;
    width: 93px;
    height: 17px;
    top: 200px;
    text-align: center;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    /* identical to box height */

    text-transform: lowercase;

    color: #ff4fd8;
  }
`;

const Tags = styled.div`
  position: absolute;
  width: 253px;
  height: 79px;
  left: 61px;
  top: 478px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    position: relative;
    width: 48px;
    height: 26px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 21px;
    line-height: 26px;
    /* identical to box height */

    text-transform: lowercase;

    /* White */

    color: #ffffff;
  }
  p {
    span {
      display: inline-block;
      padding: 8px 14px;
      border-radius: 4px;
      color: white;
      margin: 0 15px;
      background: rgba(75, 75, 75, 0.4);
    }
  }
`;

export default ArtistRoute;
