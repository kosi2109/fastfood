import LoginRequire from "./client/LoginRequire";
import { useSelector } from "react-redux";

const Auth = ({ children }: any) => {
  const user = useSelector((state:any) => state.auth);
  
  if (!user ){
    return <LoginRequire/>
  }
  
  return children;
};

export default Auth;
