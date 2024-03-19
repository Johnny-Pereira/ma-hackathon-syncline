import React from "react";
import { useAuth0 } from "@auth0/auth0-react";


//Logout button - you can use this button component and it will redirect to the login page 
const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </button>
  );
};

export default LogoutButton;