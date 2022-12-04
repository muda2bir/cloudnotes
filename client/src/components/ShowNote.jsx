import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setReducerValue } from "../features/forceUpdate/forceUpdateSlice";
import { setTrigger } from "../features/popuptrigger/triggerSlice";

const ShowNote = ({ note, noteID }) => {
  let dispatcher = useDispatch();
  const [title, setTitle] = useState(note.title);
  const [noteContent, setNoteContent] = useState(note.note);

  const updateNote = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/updatenotes", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          noteContent,
          noteID,
        }),
      });

      const data = await response.json();

      if (response.status === 422 || !data) {
        alert("Updation Failed");
      }

      dispatcher(setTrigger(false));
      dispatcher(setReducerValue());
    } catch (error) {
      alert("Something went wrong!!");
    }
  };

  const deleteNote = async (e) => {
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

      dispatcher(setTrigger(false));
      dispatcher(setReducerValue());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="show-note">
      <form>
        <div className="mb-6">
          <input
            type="text"
            id="large-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block p-1 font-bold text-3xl w-full text-gray-900 bg-transparent border-b border-gray-300 sm:text-md focus:outline-none"
            placeholder="Title........."
          />
        </div>
        <div className="w-full bg-gray-50 rounded-lg border border-gray-300">
          <div className="py-2 px-4 bg-white rounded-t-lg border-b border-gray-300">
            <textarea
              id="note"
              rows="4"
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              className="px-0 w-full h-40 text-lg text-gray-900 bg-white border-0 focus:outline-none resize-none"
              placeholder="Write a Note..."
              required
            ></textarea>
          </div>
          <div className="flex justify-end items-center py-2 px-3 gap-3">
            <button
              onClick={deleteNote}
              className="inline-flex items-center py-2 px-4 text-xs font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-red-800"
            >
              Delete Note
            </button>
            <button
              onClick={updateNote}
              className="inline-flex items-center py-2 px-4 text-xs font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-green-800"
            >
              Update Note
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ShowNote;
