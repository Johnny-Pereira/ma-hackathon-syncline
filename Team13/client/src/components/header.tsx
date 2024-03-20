import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "./login-btn";
import { LogoutButton } from "./logout-btn";
import { Link } from "@tanstack/react-router";

export default function Header() {
  // get auth status and render different buttons based on isLoggedIn or not
  const { isAuthenticated } = useAuth0();

  return (
    <div className="flex justify-between sticky top-0">
      <Link to={isAuthenticated ? "/feed" : "/"}>Moody's Blind</Link>
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </div>
  );
}
