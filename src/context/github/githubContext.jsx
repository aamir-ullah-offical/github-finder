import { createContext, useContext } from "react";

const GithubContext = createContext();

export const useGithub = () => {
  return useContext(GithubContext);
};

export default GithubContext;
