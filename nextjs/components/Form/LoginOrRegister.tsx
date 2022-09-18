import Link from "next/link";
import React from "react";

const LoginOrRegister = ({login = true}) => {
  return (
    <p className="mb-3">
        {login ? "You Don't have an Account ?" : "Already have an Account ?" }
      
      <Link href={login ? "/register" : "/login" }>
        <span className="text-textGreen font-semibold cursor-pointer">
          {login ? "Register" : "Login" }
        </span>
      </Link>
    </p>
  );
};

export default LoginOrRegister;
