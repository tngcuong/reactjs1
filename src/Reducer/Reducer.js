import {
  GET_ALL_POSTS,
  GET_CURRENT_USER,
  DELETE_A_POSTS,
  UPDATE_A_POSTS,
  CREATE_A_POSTS,
} from "./constants";

export const itinialState = {
  user: null,
  posts: [],
};

export default function reducer(state, action) {
  switch (action.type) {
    case GET_CURRENT_USER:
      return { ...state, user: action.payload };
    case GET_ALL_POSTS:
      return { ...state, posts: action.payload };
    case CREATE_A_POSTS:
      return { ...state, posts: [action.payload, ...state.posts] };
    case UPDATE_A_POSTS:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return {
              ...post,
              content: action.payload.content,
            };
          }
          return post;
        }),
      };
    case DELETE_A_POSTS:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload._id),
      };
  }
}
