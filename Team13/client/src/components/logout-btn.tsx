import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/base";

export const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      onClick={() =>
        logout({ logoutParams: { returnTo: "http://localhost:5173" } })
      }
    >
      Sign out
    </Button>
  );
};
