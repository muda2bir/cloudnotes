import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../App";
import { ACTIONS } from "../App";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../features/loginstate/loginSlice";
import { setTrigger } from "../features/popuptrigger/triggerSlice";
import { setReducerValue } from "../features/forceUpdate/forceUpdateSlice";
import { setUserName } from "../features/userName/userNameSlice";
import { motion } from "framer-motion";

const pageVariants = {
  hidden: {
    x: "100vw",
  },
  visible: {
    x: 0,
  },
  exit: {
    x: "-100vw",
  },
};

const Notes = () => {
  let reducerValue = useSelector((state) => state.forceUpdate.value);
  const [notes, setNotes] = useState([]);
  let { dispatch } = useContext(AppContext);
  let dispatcher = useDispatch();
  let navigate = useNavigate();

  const notesAPI = "/notes";
  const getUserNotes = async () => {
    try {
      const response = await fetch(notesAPI, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      setNotes(data.notes);
      dispatcher(setUserName(data.name));

      if (response.status !== 200 || !data) {
        navigate("/");
        alert("Something went wrong!!");
      } else {
        navigate("/notes");
        dispatcher(setLogin(true));
      }
    } catch (err) {
      navigate("/");
      dispatch({ type: ACTIONS.LOGIN, payload: dispatcher });
    }
  };

  const deleteNote = async (e, noteID) => {
    e.preventDefault();
    try {
      const response = await fetch("/deletenotes", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          noteID,
        }),
      });

      const data = response.json();

      if (response.status === 422 || !data) {
        alert("Deletion Failed!!");
      }

      dispatcher(setReducerValue());
      dispatcher(setTrigger(false));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserNotes();
  }, [reducerValue]);

  return (
    <>
      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="p-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-8">
          <div
            onClick={() =>
              dispatch({ type: ACTIONS.NOTE, payload: dispatcher })
            }
            className="p-4 bg-gray-300 rounded-md flex items-center justify-center text-6xl h-44 md:h-48 lg:h-52 cursor-pointer text-gray-500 hover:shadow-lg"
          >
            <i className="fa-solid fa-plus"></i>
          </div>

          {notes.map((note) => {
            let noteID = note._id;
            return (
              <div key={noteID}>
                <div
                  className="p-3 mb-2 bg-white outline outline-1 relative outline-gray-300 rounded-md h-44 md:h-48 lg:h-52 cursor-pointer hover:shadow-lg"
                  onClick={() =>
                    dispatch({
                      type: ACTIONS.SHOWNOTE,
                      payload: { note, dispatcher, noteID },
                    })
                  }
                >
                  <h3 className="font-bold border-solid border-b-2 border-gray-300 p-1">
                    {note.title.slice(0, 30)}...
                  </h3>
                  <p className="p-2">{note.note.slice(0, 88)}...</p>
                </div>
                <button
                  onClick={(e) => deleteNote(e, noteID)}
                  className="inline-flex items-center py-2 px-4 text-xs font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-red-800"
                >
                  <i className="fa-solid fa-trash hover:scale-110 mr-2"></i>
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </motion.div>
    </>
  );
};

export default Notes;
