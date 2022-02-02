import React, { useContext } from "react";
import { UserContext } from "./UserContex";

export const LoginScreen = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div>
      <h1>Login Screen</h1>
      <hr />
      <button
        className="btn btn-primary"
        onClick={() =>
          setUser({
            id: 123,
            name: "Jorge",
          })
        }
      >
        Login
      </button>
    </div>
  );
};
