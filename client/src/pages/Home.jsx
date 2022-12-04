import React, { useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../features/loginstate/loginSlice";
import { setUserName } from "../features/userName/userNameSlice";
import { motion } from "framer-motion";

const Home = () => {
  let login = useSelector((state) => state.login.value);
  let dispatcher = useDispatch();
  let navigate = useNavigate();

  const pageVariants = login
    ? {
        hidden: {
          x: "-100vw",
        },
        visible: {
          x: 0,
        },
        exit: {
          x: "-100vw",
        },
      }
    : {
        hidden: {
          opacity: 0,
        },
        visible: {
          opacity: 1,
        },
        exit: {
          opacity: 0,
        },
      };

  const authenticateUser = async () => {
    try {
      const response = await fetch("/home", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      dispatcher(setUserName(data.name));

      if (response.status !== 200 || !data) {
        navigate("/");
      } else {
        dispatcher(setLogin(true));
      }
    } catch (err) {
      navigate("/");
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <>
      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="text-center h-4/5 flex flex-col justify-center"
      >
        <h1 className="text-3xl font-bold mb-3">Write Your Notes on </h1>
        <h1 className="text-8xl font-bold mb-9">
          Cloud
          <span className="text-blue-500">Notes</span>!
        </h1>
        <Link to={"/notes"}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Note
          </button>
        </Link>
      </motion.div>
    </>
  );
};

export default Home;
