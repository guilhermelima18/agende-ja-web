import { useCallback } from "react";

export function useStorage() {
  const getUserStorage = useCallback(async () => {
    const userStorage = localStorage.getItem("@agende-ja-web:user");

    if (userStorage) {
      return JSON.parse(userStorage);
    }

    return null;
  }, []);

  const deleteUserStorage = useCallback(async () => {
    localStorage.removeItem("@agende-ja-web:user");
  }, []);

  return {
    getUserStorage,
    deleteUserStorage,
  };
}
