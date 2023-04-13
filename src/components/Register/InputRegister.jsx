import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function InputRegister() {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().min(3).required(),
      lastName: Yup.string().min(3).required(),
      userName: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      {
        localStorage.setItem('firstName', values.firstName)
        localStorage.setItem('lastName', values.lastName)
        localStorage.setItem('userName', values.userName)
        localStorage.setItem('email', values.email)
        localStorage.setItem('password', values.password)
      }
      resetForm();
      alert('success membuat akun !!')
    },
  });
  return (
    <div>
      <div>
        <p className="text-1xl mb-5">START FOR FREE</p>
        <h1 className="text-4xl mb-5 font-bold">Create New Account</h1>
      </div>
      <div className="flex mb-5">
        <span>Already A Member ?</span>
        <Link to={"/"} className="ml-3 text-purple-700 font-semibold" href="#">
          Sign In
        </Link>
      </div>
      <form action="#" onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-2 gap-5  ">
          <div className="flex flex-col">
            <input
              type={"text"}
              placeholder="Firstname"
              className="border border-gray-500 py-1 px-4 rounded-md mt-3"
              name="firstName"
              onChange={formik.handleChange}
              value={formik.values.firstName}
              required
            />
            {formik.errors.firstName && (
              <p className="text-red-500">{formik.errors.firstName}</p>
            )}
          </div>
          <div className="flex flex-col">
            <input
              type={"text"}
              placeholder="Lastname"
              className="border border-gray-500 py-1 px-4 rounded-md mt-3"
              name="lastName"
              onChange={formik.handleChange}
              value={formik.values.lastName}
              required
            />
            {formik.errors.lastName && (
              <p className="text-red-500">{formik.errors.lastName}</p>
            )}
          </div>
        </div>
        <div className="mt-5 flex flex-col">
          <input
            type={"text"}
            placeholder="Username"
            className="border border-gray-500 py-1 px-4 w-full rounded-md mt-3"
            name="userName"
            onChange={formik.handleChange}
            value={formik.values.userName}
            required
          />
          {formik.errors.userName && (
            <p className="text-red-500">{formik.errors.userName}</p>
          )}
        </div>
        <div className="mt-5">
          <input
            type={"email"}
            placeholder="Enter your email"
            className="border border-gray-500 py-1 px-4 w-full rounded-md mt-3"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            required
          />
          {formik.errors.email && (
            <p className="text-red-500">{formik.errors.email}</p>
          )}
        </div>
        <div className="mt-5">
          <input
            type={"password"}
            placeholder="Password"
            className="border border-gray-500 py-1 px-4 w-full rounded-md mt-3"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            required
          />
             {formik.errors.password && (
            <p className="text-red-500">{formik.errors.password}</p>
          )}
        </div>
        <div className="mt-5">
          <input
            type={"password"}
            placeholder="Confirm Password"
            className="border border-gray-500 py-1 px-4 w-full rounded-md mt-3"
            name="confirmPassword"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            required
          />
             {formik.errors.confirmPassword && (
            <p className="text-red-500">{formik.errors.confirmPassword}</p>
          )}
        </div>
        <div className="mt-5">
          <button
            className="w-full bg-purple-700 text-center py-1 text-white rounded-md mt-3"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default InputRegister;
