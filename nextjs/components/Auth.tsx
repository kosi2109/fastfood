import { AppState, defaultUser } from "../context/AppProvider";
import LoginRequire from "./LoginRequire";

const Auth = ({ children }: any) => {
  const {user} = AppState();
    
  if (user !== defaultUser){
      return children;
  }

  return <LoginRequire/>
};

export default Auth;
