import React, { useContext, useEffect, useState } from "react";
import * as AuthSession from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = React.createContext({} as AuthContextData);

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthContextData {
  user: User;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

interface AuthorizationsResponse {
  params: {
    access_token: string;
  };
  type: string;
}

const USER_STORAGE_KEY = "@gofinances/user";

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkIfUserIsAlreadyLogged() {
      setIsLoading(true);

      const getUserSaved = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (getUserSaved) {
        setUser(JSON.parse(getUserSaved));
      }

      setIsLoading(false);
    }
    checkIfUserIsAlreadyLogged();
  }, []);

  async function signInWithGoogle() {
    try {
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationsResponse;

      if (type === "success") {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );

        const userInfo = await response.json();
        const userObject = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture,
        };

        setUser(userObject);

        AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userObject));
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function signOut() {
    setUser({} as User);
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
  }

  return (
    <AuthContext.Provider
      value={{
        signInWithGoogle,
        signOut,
        isLoading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
