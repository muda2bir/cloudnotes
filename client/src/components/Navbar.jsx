import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import { ACTIONS } from "../App";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  let login = useSelector((state) => state.login.value);
  let userName = useSelector((state) => state.userName.value);
  let dispatcher = useDispatch();
  let navigate = useNavigate();
  let { dispatch } = useContext(AppContext);

  return (
    <>
      <nav className="navbar flex items-center justify-between py-4">
        <h1
          className="text-4xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Cloud<span className="text-blue-500">Notes</span>
        </h1>
        <ul className="flex items-center gap-4">
          {!login ? (
            <>
              <li>
                <button
                  onClick={() =>
                    dispatch({ type: ACTIONS.LOGIN, payload: dispatcher })
                  }
                  className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                >
                  Login
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    dispatch({ type: ACTIONS.SIGNUP, payload: dispatcher })
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Signup
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5">
                  {userName}
                </button>
              </li>
              <li>
                <Link to={"/logout"}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Logout
                  </button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
