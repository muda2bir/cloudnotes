import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLogin } from "../features/loginstate/loginSlice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  let navigate = useNavigate();
  let dispatcher = useDispatch();

  const logoutUser = async () => {
    try {
      const response = await fetch("/logout", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      dispatcher(setLogin(false));
      navigate("/", { replace: true });

      if (response.status !== 200) throw new Error(response.error);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    logoutUser();
  }, []);
  return <h1>User Logout Successful!!</h1>;
};

export default Logout;
