import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const PasswordInput = ({
  title,
  id,
  name,
  handleChange,
  forgotPassword = false,
  error = null
}: any) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="flex flex-col w-full mb-2 ">
      <div className="flex justify-between items-center">
        <label
          className="mb-2 text-textGray flex items-center"
          htmlFor="password"
        >
          {title}
        </label>
        {forgotPassword && (
          <Link href="/forgot-password" className="text-md font-semibold">
            Forgot password?
          </Link>
        )}
      </div>
      <div className="w-full relative">
        <input
          onChange={handleChange}
          type={showPassword ? "text" : "password"}
          name={name}
          id={id}
          className={`w-full h-10 rounded-md border ${(error ? 'border-red' : 'border-bgGreen')} px-2 focus-within:outline-textGreen`}
          required
        />
        <div
          onClick={() => setShowPassword(!showPassword)}
          className="flex items-center justify-center absolute top-0 right-0 w-10 h-full"
        >
          {showPassword ? (
            <AiOutlineEye size={20} />
          ) : (
            <AiOutlineEyeInvisible size={20} />
          )}
        </div>
      </div>
      {error && 
        <div className="py-2 text-center text-start text-red">
            <p>{error}</p>
        </div>
        }
    </div>
  );
};

export default PasswordInput;
