import { useSelector, useDispatch } from "react-redux";
import { setTrigger } from "../features/popuptrigger/triggerSlice";
import { motion } from "framer-motion";

const popupVariants = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
  },
  exit: {
    scale: 0,
  },
};

function Popup({ children }) {
  const trigger = useSelector((state) => state.trigger.value);
  const dispatcher = useDispatch();

  const popupClose = (e) => {
    if (e.target.id === "popup") {
      dispatcher(setTrigger(false));
    }
  };

  return trigger ? (
    <div
      className="popup fixed top-0 left-0 w-full h-screen bg-[#00000033] flex items-center justify-center"
      id="popup"
      onClick={(e) => popupClose(e)}
    >
      <motion.div
        variants={popupVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="popup-inner relative p-8 w-full max-w-screen-sm bg-[#fff] rounded"
      >
        <span
          className="close-btn absolute top-3 right-3 cursor-pointer"
          onClick={() => dispatcher(setTrigger(false))}
        >
          <i className="fa-solid fa-xmark"></i>
        </span>
        {children}
      </motion.div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
