import { createContext, useReducer } from "react";

const appReducer = (state, action) => {
  switch (action.type) {
    // implement delete post action
    case "ADD_POST": {
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    }
    case "SET_POSTS": {
      return {
        ...state,
        posts: action.payload,
      };
    }
    case "SET_DARK_THEME": {
      return {
        ...state,
        darkTheme: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

const initialState = {
  posts: [],
  darkTheme: false,
};

export const AppContext = createContext(initialState);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const deletePost = (id) => {
    dispatch({
      type: "DELETE_POST",
      payload: id,
    });
  };

  const addPost = (post) => {
    dispatch({
      type: "ADD_POST",
      payload: post,
    });
  };

  const setPosts = (posts) => {
    dispatch({
      type: "SET_POSTS",
      payload: posts,
    });
  };

  const setDarkTheme = (bool) => {
    dispatch({
      type: "SET_DARK_THEME",
      payload: bool,
    });
  };

  return (
    <AppContext.Provider
      value={{
        posts: state.posts,
        darkTheme: state.darkTheme,
        deletePost,
        addPost,
        setPosts,
        setDarkTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
