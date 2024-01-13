import { useState } from "react";

export type UseUserFormStateReturn = ReturnType<typeof useUserFormState>

export const useUserFormState = () => {
  // стейты для input
  const [username, setUsername] = useState("");
  const onUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const [password, setPassword] = useState("");
  const onPasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  return {username, password, onPasswordChange, onUsernameChange}
};

