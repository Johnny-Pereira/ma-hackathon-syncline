import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      onClick={() => loginWithRedirect()}
      style={{
        backgroundColor: "white",
        color: "rgba(10,18,100,255)",
      }}
    >
      Login
    </Button>
  );
};
