import {
  createContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { jwtDecode } from "jwt-decode";

type AuthContextType = {
  userLogin: null | string;
  setuserLogin: Dispatch<SetStateAction<null | string>>;
  userId: string | null;
};

export const AuthContext = createContext<AuthContextType>({
  userLogin: null,
  setuserLogin: () => {},
  userId: null,
});

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [userLogin, setuserLogin] = useState(function () {
    return localStorage.getItem("userToken");
  });
  const [userId, setuserId] = useState("");

  // useEffect(() => {
  //   if (localStorage.getItem("userToken")) {
  //     setuserLogin(localStorage.getItem("userToken"));
  //   }
  // }, []);

  useEffect(() => {
    if (userLogin !== null) {
      const { user }: { user: string } = jwtDecode(
        localStorage.getItem("userToken"),
      );
      setuserId(user);
    } else {
      setuserId("");
    }
  }, [userLogin]);

  return (
    <AuthContext.Provider value={{ userLogin, setuserLogin, userId }}>
      {children}
    </AuthContext.Provider>
  );
}
