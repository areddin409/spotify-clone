export const initialState = {
  user: null,
  playlists: [],
  playing: false,
  item: null,
  //TODO: REMOVE AFTER DEVELOPING....
  // token:
  //   'BQAZNNtxiqccdm9E9PM8_6xix_XiULuqgRmRMnpZG1WZ8EuiRhSvD5sPsyGbDie0jrkewiSP1qnQsvIAnN34c2I60lmP3b6vwhsvs3JgaOaVyMT4jCnGVXORfhJ4f5fO_AF5i0gS7OyZsnuetBOhM2EH4QpnGT',
};

const reducer = (state, action) => {
  console.log(action);

  //Action -> type, [payload]

  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.token,
      };
    case 'SET_PLAYLISTS':
      return {
        ...state,
        playlists: action.playlists,
      };
    default:
      return state;
  }
};

export default reducer;
