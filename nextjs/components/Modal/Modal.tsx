import React from "react";
import Overlay from "./Overlay";
import { MdOutlineClose } from "react-icons/md";
import { motion } from "framer-motion";

function Modal({ title, children, onClose}: any) {
  return (
    <Overlay>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`bg-white w-full md:w-1/2 rounded-md z-100 max-h-full overflow-auto`}
      >
        <div className="border-b-2 p-2 flex justify-between items-center">
          <h2 className="font-semibold text-xl">{title}</h2>
          <button onClick={() => onClose(false)}>
            <MdOutlineClose size={25} />
          </button>
        </div>
        <div className="p-2">{children}</div>
      </motion.div>
    </Overlay>
  );
}

export default Modal;
