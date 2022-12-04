import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import { ACTIONS } from "../App";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../features/loginstate/loginSlice";
import { setTrigger } from "../features/popuptrigger/triggerSlice";

const Login = () => {
  let navigate = useNavigate();
  const dispatcher = useDispatch();
  const { dispatch } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(e) {
    e.preventDefault();
    const response = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    console.log(data);

    if (response.status === 400 || !data) {
      alert("Login Failed");
      setEmail("");
      setPassword("");
    } else {
      dispatcher(setLogin(true));
      dispatcher(setTrigger(false));
      navigate("/notes");
    }
  }

  return (
    <div id="login_form">
      <h1 className="text-3xl font-bold mb-6">
        Cloud<span className="text-blue-500">Notes</span> Login
      </h1>
      <form method="POST">
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="name@mail.com"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="************"
            required
          />
        </div>
        <button
          type="submit"
          onClick={loginUser}
          className="text-white bg-blue-700 mb-5 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Login
        </button>
        <p
          onClick={() =>
            dispatch({ type: ACTIONS.SIGNUP, payload: dispatcher })
          }
          className="text-blue-500 cursor-pointer hover:underline"
        >
          Don't have and Account? Register
        </p>
      </form>
    </div>
  );
};

export default Login;
