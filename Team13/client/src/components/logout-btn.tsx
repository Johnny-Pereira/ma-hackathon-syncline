import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
export const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
    variant='secondary'
      onClick={() =>
        logout({ logoutParams: { returnTo: "http://localhost:5173" } })
      }
    >
      Sign out
    </Button>
  );
};
