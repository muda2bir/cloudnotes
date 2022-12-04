import React, { createContext, useReducer } from "react";
import Navbar from "./components/Navbar"; // Navbar Component
import Popup from "./components/Popup"; // Main Popup
import { Routes, Route } from "react-router-dom";
import Notes from "./pages/Notes";
import Home from "./pages/Home";
import { reducer } from "./reducer/reducer";
import Logout from "./components/Logout";
import { AnimatePresence } from "framer-motion";

export const ACTIONS = {
  LOGIN: "login",
  SIGNUP: "signup",
  NOTE: "note",
  SHOWNOTE: "show-note",
};

export const AppContext = createContext();

function App() {
  let initialValue = null;
  const [state, dispatch] = useReducer(reducer, initialValue);

  let ContextValue = {
    dispatch,
  };

  return (
    <AnimatePresence mode="wait">
      <AppContext.Provider value={ContextValue}>
        <>
          <div className="container mx-auto h-screen overflow-hidden">
            <Navbar />
            <Routes>
              <Route exact path={"/"} element={<Home />} />
              <Route exact path={"/notes"} element={<Notes />} />
              <Route exact path={"/logout"} element={<Logout />}></Route>
            </Routes>
          </div>
          <Popup>{state}</Popup>
        </>
      </AppContext.Provider>
    </AnimatePresence>
  );
}

export default App;
