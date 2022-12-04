import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setTrigger } from "../features/popuptrigger/triggerSlice";
import { setReducerValue } from "../features/forceUpdate/forceUpdateSlice";

const Note = () => {
  let dispatcher = useDispatch();
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const saveNote = async function (e) {
    e.preventDefault();
    try {
      const response = await fetch("/savenote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          note,
        }),
      });

      const data = await response.json();

      if (response.status === 422 || !data) {
        alert("Something went wrong!!");
      }

      dispatcher(setTrigger(false));
      dispatcher(setReducerValue());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="note">
      <form method="POST">
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
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="px-0 w-full h-40 text-lg text-gray-900 bg-white border-0 focus:outline-none resize-none"
              placeholder="Write a Note..."
              required
            ></textarea>
          </div>
          <div className="flex justify-end items-center py-2 px-3 gap-3">
            <button
              onClick={() => dispatcher(setTrigger(false))}
              className="inline-flex items-center py-2 px-4 text-xs font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-red-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={saveNote}
              className="inline-flex items-center py-2 px-4 text-xs font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-green-800"
            >
              Save Note
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Note;
