import React from "react";

const Input = ({
  title,
  id,
  name,
  type = "text",
  handleChange,
  error = null,
}: any) => {
  return (
    <div className="flex flex-col w-full mb-2">
      <label className="mb-2 text-textGray" htmlFor={id}>
        {title}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className={`h-10 rounded-md border w-full px-2 focus:outline-textGreen 
        ${error ? "border-red" : "border-bgGreen"}
        `}
        onChange={handleChange}
        required
      />
      {error && (
        <div className="py-2 text-center text-start text-red">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default Input;
