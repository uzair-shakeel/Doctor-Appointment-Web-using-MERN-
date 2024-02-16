import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/authContext";
import { BASE_URL } from "../config";

const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const logInHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (response.ok) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            user: result.data,
            token: result.token,
            role: result.role,
          },
        });
        // console.log(result);
        toast.success(result.message);
        navigate("/home");
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error("Server not responding");
    }
  };

  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[470px] mx-auto rounded-lg  md:p-10">
        <h3 className="text-Color font-semibold text-[22px] pb-5 ">
          Login <span className="text-HeadingColor">Here</span>
        </h3>
        <form action="" onSubmit={logInHandler}>
          <div className="my-4">
            <input
              type="email"
              placeholder="Enter Your Email"
              name="email"
              value={formData.email}
              onChange={handleInput}
              required
              className="w-full px-4 py-3 focus:outline-none border-b border-solid focus:border-b-Color"
            />
          </div>
          <div className="my-4">
            <input
              type="password"
              placeholder="Enter Your Pssword"
              name="password"
              value={formData.password}
              onChange={handleInput}
              required
              className="w-full px-4 py-3 focus:outline-none border-b border-solid focus:border-b-Color"
            />
          </div>

          <div>
            <button className="btn w-full rounded-md">Login</button>
          </div>

          <p className="text-center paragraph">
            Don't have an account?{" "}
            <Link to="/signup" className="font-semibold text-TextColor">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
