import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  registerSchema,
  type registerSchemaType,
} from "../../schemas/auth.schema";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// interface userData {
//   name: string;
//   email: string;
//   dateOfBirth: string;
//   gender: "male" | "female";
//   password: string;
//   rePassword: string;
// }

export default function Register() {
  const navigate = useNavigate();
  const [apiError, setapiError] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const form = useForm<registerSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      dateOfBirth: "",
      gender: "male",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  let { register, handleSubmit, formState, getValues, watch } = form;
  // console.log(formState.errors);

  function handleRegister(values: registerSchemaType) {
    // console.log(values);
    setisLoading(true);

    axios
      .post(`https://route-posts.routemisr.com/users/signup`, values)
      .then((res) => {
        // console.log(res.data)
        if (res.data.success) {
          navigate("/login");
        }
      })
      .catch((err) => {
        setapiError(err.response.data.message);
      })
      .finally(() => {
        setisLoading(true);
      });
  }

  return (
    <>
      <h1 className="text-center text-5xl font-bold">Register Now</h1>

      {apiError && (
        <p className="bg-red-500 text-white text-center rounded-sm font-bold p-2 mx-auto w-[300px]">
          {apiError}
        </p>
      )}

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="max-w-md mx-auto my-5"
      >
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register(
              "name",
              //   , {
              //   required: { value: true, message: "name is required" },
              //   minLength: {
              //     value: 3,
              //     message: "name should be more than 3 chars",
              //   },
              //   maxLength: {
              //     value: 10,
              //     message: "name should be less than 10 chars ",
              //   },
              //   // valueAsNumber:true  to make value number not a string
              // }
            )}
            type="text"
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
          />
          <label
            htmlFor="name"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Enter Your Name
          </label>
          {formState.errors.name?.message && formState.touchedFields.name && (
            <p className="text-red-500 font-bold">
              {formState.errors.name?.message}
            </p>
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register(
              "email",
              //   , {
              //   required: { value: true, message: "email is required" },
              //   pattern: {
              //     value: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
              //     message: "invalid email",
              //   },
              // }
            )}
            type="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Enter Your Email
          </label>
          {formState.errors.email?.message && formState.touchedFields.email && (
            <p className="text-red-500 font-bold">
              {formState.errors.email?.message}
            </p>
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register(
              "dateOfBirth",
              //   , {
              //   valueAsDate: false,
              //   validate: function (value) {
              //     const userDate = new Date(value).getFullYear(); //userYear
              //     const nowDate = new Date().getFullYear(); //nowYear

              //     return nowDate - userDate > 10 ? true : "invalid date";

              //     // if (nowDate - userDate > 10) {
              //     //   return true;
              //     // } else {
              //     //   return "invalid date";
              //     // }
              //   },
              // }
            )}
            type="date"
            id="dateOfBirth"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
          />
          <label
            htmlFor="dateOfBirth"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Enter Your Birthday
          </label>
          {formState.errors.dateOfBirth?.message &&
            formState.touchedFields.dateOfBirth && (
              <p className="text-red-500 font-bold">
                {formState.errors.dateOfBirth?.message}
              </p>
            )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register(
              "password",
              //   , {
              //   pattern: {
              //     value:
              //       /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
              //     message:
              //       "password must contain 1 number (0-9) password must contain 1 uppercase letters password must contain 1 lowercase letters password must contain 1 non-alpha numeric number password is 8-16 characters with no space",
              //   },
              // }
            )}
            type="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Enter Your Password
          </label>
          {formState.errors.password?.message &&
            formState.touchedFields.password && (
              <p className="text-red-500 font-bold">
                {formState.errors.password?.message}
              </p>
            )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register(
              "rePassword",
              //   , {
              //   validate: function (rePasswordValue) {
              //     if (rePasswordValue === getValues("password")) {
              //       return true;
              //     } else {
              //       return "rePassword and password not match";
              //     }
              //   },
              // }
            )}
            type="password"
            id="rePassword"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
          />
          <label
            htmlFor="rePassword"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Enter Your confirmn Password
          </label>
          {formState.errors.rePassword?.message &&
            formState.touchedFields.rePassword && (
              <p className="text-red-500 font-bold">
                {formState.errors.rePassword?.message}
              </p>
            )}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center mb-4">
            <input
              {...register("gender")}
              id="gender-option-1"
              type="radio"
              defaultValue="male"
              className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none"
            />
            <label
              htmlFor="gender-option-1"
              className="select-none ms-2 text-sm font-medium text-heading"
            >
              Male
            </label>
          </div>

          <div className="flex items-center mb-4">
            <input
              {...register("gender")}
              id="gender-option-2"
              type="radio"
              defaultValue="female"
              className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none"
            />
            <label
              htmlFor="gender-option-2"
              className="select-none ms-2 text-sm font-medium text-heading"
            >
              Female
            </label>
          </div>
          {formState.errors.gender?.message &&
            formState.touchedFields.gender && (
              <p className="text-red-500 font-bold">
                {formState.errors.gender?.message}
              </p>
            )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="text-white bg-blue-500  w-full disabled:bg-slate-900 disabled:text-white disabled:cursor-not-allowed rounded-lg cursor-pointer box-border border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
        >
          {isLoading ? "Loading..." : "Register"}
        </button>

        <div className="flex justify-center text-blue-600 underline my-2 cursor-pointer font-bold">
          <Link to="/login">Do You Have An Account? Go Login</Link>
        </div>
      </form>
    </>
  );
}
