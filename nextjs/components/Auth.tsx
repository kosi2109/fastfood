import { AppState, defaultUser } from "../context/AppProvider";
import Loading from "./Loading";
import LoginRequire from "./LoginRequire";

const Auth = ({ children }: any) => {
  const {user , loading} = AppState();
  if(loading){
    return <Loading/>
  }
  if (user !== defaultUser){
      return children;
  }

  return <LoginRequire/>
};

export default Auth;
