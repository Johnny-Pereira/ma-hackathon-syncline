import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "./login-btn";
import { LogoutButton } from "./logout-btn";
import { Link } from "@tanstack/react-router";

export default function Header() {
  // get auth status and render different buttons based on isLoggedIn or not
  const { isAuthenticated } = useAuth0();

  return (
    <div className="flex justify-between sticky top-0 bg-blue-800 h-20 px-4 py-2 items-center" style={{ backgroundColor: "rgba(10,18,100,255)"}}>
      <Link to={isAuthenticated ? "/feed" : "/"}>
        <h1 className="font-america text-xl font-extrabold text-white">
          MOODYS<span className="font-thin">BLIND</span>
        </h1>
      </Link>
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </div>
  );
}
