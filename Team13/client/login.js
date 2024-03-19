import React from "react";
import { useAuth0 } from "@auth0/auth0-react";


//Login button - you can use this button component and it will redirect to the login page 
const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;