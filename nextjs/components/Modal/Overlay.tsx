import React from "react";

function Overlay({ children }: any) {
  return (
    <div
      className={`fixed bg-slate-900/25 transition-all top-0 left-0 flex items-center justify-center w-screen h-screen z-100`}
    >
      {children}
    </div>
  );
}

export default Overlay;
