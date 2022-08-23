import Link from "next/link";
import React from "react";

function EmptyCart() {
  return (
    <div className="w-full flex items-center justify-center flex-col mt-20">
      <h1 className="font-semibold text-2xl mb-3">Empty Cart</h1>
      <Link href="/menu">
        <button className="bg-bgGreen w-full text-textWhite h-10 rounded-md">
          Shop Now
        </button>
      </Link>
    </div>
  );
}

export default EmptyCart;
