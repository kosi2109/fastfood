import React from "react";
import { ClipLoader } from "react-spinners";

export default function FormButton({
  loading = false,
  text,
  className = "",
  type = "submit"
}: any) {
  return (
    <button type={type} className={`my-5 bg-bgGreen w-full flex items-center justify-center h-10 rounded-md text-textWhite font-bold hover:bg-textGreen ${className}`}>
      {loading ? <ClipLoader size={20} color="#ffffff" /> : text}
    </button>
  );
}
