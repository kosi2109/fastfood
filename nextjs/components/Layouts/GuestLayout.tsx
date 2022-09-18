import { motion } from "framer-motion";
import TopNav from "../client/navigation/TopNav";

const GuestLayout = ({ children, back }: any) => {
  return (
    <motion.div exit={{ opacity: 0 }} className="relative">
      <TopNav back={back} />
      {children}
    </motion.div>
  );
};

export default GuestLayout;
