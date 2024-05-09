"use client";

import { localStorageKeys } from "@/constants/localStorage";
import { User } from "@/constants/types";
import { AuthService } from "@/services/AuthService";
import { usePathname, useRouter } from "next/navigation";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextData {
  user: User;
  isFetching: boolean;
  setCurrentUser: (user: User) => void;
  logOut: () => void;
}

export const AuthContext = createContext<AuthContextData>({
  user: {} as User,
  setCurrentUser: (user: User) => {},
  isFetching: false,
  logOut: () => {},
});

let isFetchedUser = false;
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({} as User);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();

  const setCurrentUser = (newUser: User) => {
    setUser(newUser);
  };

  const lookForCurrentUser = async () => {
    const token = localStorage.getItem(localStorageKeys.authToken);

    if (token) {
      setIsFetching(true);
      const res = await AuthService.authToken(token);
      console.log("res ==", res);
      if (res.success) {
        setUser(res.user);
        if (pathname === "/login" || pathname === "/signup") {
          router.push("/");
        }
      } else if (pathname !== "/login" && pathname !== "/signup") {
        router.push("/login");
      }
      setIsFetching(false);
    } else {
      router.push("/login");
    }
  };

  const logOut = () => {
    setUser({} as User);
    localStorage.removeItem(localStorageKeys.authToken);
    router.push("/login");
  };

  useEffect(() => {
    if (isFetchedUser) {
      return;
    }
    isFetchedUser = true;
    lookForCurrentUser();
  }, []);

  const value = {
    user,
    isFetching,
    setCurrentUser,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
