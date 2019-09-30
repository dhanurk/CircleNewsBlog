const initialState = {
  blogs: [],
  blog: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    // case "POST_LOADING":
    //   return {
    //     ...state,
    //     loading: true
    //   };
    case "GET_BLOGS":
      return {
        ...state,
        blogs: action.payload
      };
    case "ADD_POST":
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case "GET_COMMENTS":
      return {
        ...state,
        blog: action.payload
      };

    default:
      return state;
  }
};
