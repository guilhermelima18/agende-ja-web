"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";

import { useStorage } from "@/hooks/use-storage";

type UserProps = {
  id: string;
  role: string;
  name: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  companyId: string;
} | null;

type AuthContextProps = {
  userLogged: UserProps;
  setUserLogged: Dispatch<SetStateAction<UserProps>>;
  handleDeleteUserLogged: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [userLogged, setUserLogged] = useState<UserProps>(null);

  const navigate = useRouter();
  const { getUserStorage, deleteUserStorage } = useStorage();

  function handleDeleteUserLogged() {
    setUserLogged(null);
    deleteUserStorage();
    navigate.push("/");
  }

  useEffect(() => {
    (async () => {
      const userStorage = await getUserStorage();
      setUserLogged(userStorage);
    })();
  }, [getUserStorage]);

  return (
    <AuthContext.Provider
      value={{ userLogged, setUserLogged, handleDeleteUserLogged }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
