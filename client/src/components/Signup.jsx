import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import { ACTIONS } from "../App";
import { useDispatch } from "react-redux";
import { setTrigger } from "../features/popuptrigger/triggerSlice";
import { setLogin } from "../features/loginstate/loginSlice";

const Signup = () => {
  const dispatcher = useDispatch();
  let navigate = useNavigate();
  const { dispatch } = useContext(AppContext);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  async function registerUser(e) {
    e.preventDefault();
    let { name, email, password, confirm_password } = user;

    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          confirm_password,
        }),
      });

      const data = await response.json();

      if (response.status === 422 || !data) {
        alert("Registration Failed");
        navigate("/");
      } else {
        dispatcher(setLogin(true));
        dispatcher(setTrigger(false));
        navigate("/notes");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="signup_form">
      <h1 className="text-3xl font-bold mb-6">
        Cloud<span className="text-blue-500">Notes</span> Register
      </h1>

      <form>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your full name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleInput}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Ramesh Kumar"
            required
          />
        </div>
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
            name="email"
            value={user.email}
            onChange={handleInput}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="ramesh@company.com"
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
            name="password"
            value={user.password}
            onChange={handleInput}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="************"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="repeat-password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Confirm password
          </label>
          <input
            type="password"
            id="repeat-password"
            name="confirm_password"
            value={user.confirm_password}
            onChange={handleInput}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="************"
            required
          />
        </div>

        <button
          type="submit"
          onClick={registerUser}
          className="text-white mb-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Register new account
        </button>
        <p
          onClick={() => dispatch({ type: ACTIONS.LOGIN, payload: dispatcher })}
          className="text-blue-500 cursor-pointer hover:underline"
        >
          Already have and Account? Login
        </p>
      </form>
    </div>
  );
};

export default Signup;
