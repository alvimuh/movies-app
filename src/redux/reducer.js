const initialState = {
  loading: true,
  Response: null,
  Search: [],
  totalResults: "",
  totalItems: 0,
  nextPage: 1,
  totalShowing: 5,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MOVIES":
      return {
        ...state,
        ...action,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: true,
      };
  }
  return state;
};

export default reducer;
