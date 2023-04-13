import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Products from "../../Pages/Products";

function InputLogin() {
  const localEmail = localStorage.getItem('email');
  const localPassoword = localStorage.getItem('password');
  const [showHome, setShowHome]= useState(false);
  const navigate = useNavigate();

useEffect(() => {
  if(localEmail && localPassoword){
    setShowHome(true)
  }
}, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string()
        .min(8)
        .required(),
    }),
    onSubmit: (values, { resetForm }) => {
      {
        localStorage.setItem('email', values.email)
        localStorage.setItem('password', values.password)
      }
      resetForm();
      alert('Login Berhasil')
      window.location.reload();
  }
  });
  return (
    <div>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col my-4">
            <label className="font-bold">Email</label>
            <input
              type={"email"}
              className="border-2 border-gray-300 rounded-md py-1 px-4 w-full"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              required
            />
              {formik.errors.email && (
                <p className="text-red-500">{formik.errors.email}</p>
                )}
          </div>
          <div className="flex flex-col my-4">
            <label className="font-bold">Password</label>
            <input
              type={"password"}
              className="border-2 border-gray-300 rounded-md py-1 px-4 w-full"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              required
              />
              {formik.errors.password && (
                <p className="text-red-500">{formik.errors.password}</p>
                )}
          </div>
          <div className="flex flex-col my-8 items-end">
            <a
              to="/forgotpassword"
              className="text-purple-500 mb-2 font-semibold"
              >
              Forgot Password?
            </a>
            <button type="submit" className="bg-purple-700 text-white rounded-md py-1 px-4 w-full">
              Sign In
            </button>
          </div>
          <div className="flex flex-col my-8">
            <p className="text-center">
              Don't have an account?{" "}
              <Link to="/register" className="text-purple-700 font-semibold">
                {" "}
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InputLogin;
