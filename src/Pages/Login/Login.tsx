import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, type loginSchemaType } from "../../schemas/auth.schema";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";

// interface userData {
//   email: string;
//   rePassword: string;
// }

export default function Login() {
  const navigate = useNavigate();
  const [apiError, setapiError] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const { userLogin, setuserLogin } = useContext(AuthContext);
  const form = useForm<loginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  let { register, handleSubmit, formState, getValues, watch } = form;
  // console.log(formState.errors);

  function handleLogin(values: loginSchemaType) {
    // console.log(values);
    setisLoading(true);

    axios
      .post(`https://route-posts.routemisr.com/users/signin`, values)
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("userToken", res.data.data.token);
          setuserLogin(res.data.data.token);

          navigate("/");
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
      <h1 className="text-center text-5xl font-bold">Login Now</h1>

      {apiError && (
        <p className="bg-red-500 text-white text-center rounded-sm font-bold p-2 mx-auto w-[300px]">
          {apiError}
        </p>
      )}

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="max-w-md mx-auto my-5"
      >
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

        <button
          type="submit"
          disabled={isLoading}
          className="text-white bg-blue-500  w-full disabled:bg-slate-900 disabled:text-white disabled:cursor-not-allowed rounded-lg cursor-pointer box-border border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
        >
          {isLoading ? "Loading..." : "Login"}
        </button>

        <div className="flex justify-center text-blue-600 underline my-2 cursor-pointer font-bold">
          <Link to="/register">Don't Have An Account? Go Register</Link>
        </div>
      </form>
    </>
  );
}
