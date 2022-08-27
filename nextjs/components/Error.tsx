import { NextPage } from "next";

interface Props {
  error: string;
}

const Error: NextPage<Props> = ({error}) => {
  
  return (
    <div className="w-full text-start text-red py-2">
      <p>{error}</p>
    </div>
  );
};

export default Error;
