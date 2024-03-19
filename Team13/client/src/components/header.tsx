import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "./login-btn";
import { LogoutButton } from "./logout-btn";

export default function Header() {
  // get auth status and render different buttons based on isLoggedIn or not
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <h1>Moody's Blind</h1>
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </div>
  );
}
