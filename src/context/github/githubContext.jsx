import { createContext, useContext } from "react";

const GithubContext = createContext();

// ✅ custom hook for cleaner usage
export const useGithub = () => {
  return useContext(GithubContext);
};

export default GithubContext;
