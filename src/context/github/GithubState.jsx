import { useReducer } from "react";
import GithubContext from "./githubContext";
import githubReducer from "./githubReducer";

const GithubState = ({ children }) => {
  const initialState = {
    users: [],       // search results
    user: {},        // single user details
    repos: [],       // repos of user
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // 🔄 Set Loading
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  // 🔎 Search Users
  const searchUsers = async (text) => {
    try {
      setLoading();
      const res = await fetch(`https://api.github.com/search/users?q=${text}`);
      const data = await res.json();
      dispatch({
        type: "SEARCH_USERS",
        payload: data.items || [],
      });
    } catch (error) {
      console.error("Error searching users:", error);
      dispatch({ type: "SEARCH_USERS", payload: [] });
    }
  };

  // 👤 Get Single User (full details)
  const getUser = async (username) => {
    try {
      setLoading();
      const res = await fetch(`https://api.github.com/users/${username}`);
      const data = await res.json();
      dispatch({
        type: "GET_USER",
        payload: data,
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      dispatch({ type: "GET_USER", payload: {} });
    }
  };

  // 📦 Get User Repos
  const getUserRepos = async (username) => {
    try {
      setLoading();
      const res = await fetch(
        `https://api.github.com/users/${username}/repos?sort=created&per_page=10`
      );
      const data = await res.json();
      dispatch({
        type: "GET_REPOS",
        payload: data,
      });
    } catch (error) {
      console.error("Error fetching repos:", error);
      dispatch({ type: "GET_REPOS", payload: [] });
    }
  };

  // 🗑 Clear Users
  const clearUsers = () => dispatch({ type: "CLEAR_USERS" });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        getUser,
        getUserRepos,
        clearUsers,
        setLoading, // ✅ ab available hai
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubState;
