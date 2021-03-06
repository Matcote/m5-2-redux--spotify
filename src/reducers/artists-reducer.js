const initialState = {
  currentArtist: null,
  status: "idle",
};

export default function artistsReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_ARTIST_DATA": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_ARTIST_DATA": {
      return {
        ...state,
        currentArtist: {
          profile: action.artist,
        },
        status: "idle",
      };
    }
    case "RECEIVE_ARTIST_DATA_ERROR": {
      return {
        ...state,
        status: "error",
      };
    }
    default: {
      return state;
    }
  }
}
