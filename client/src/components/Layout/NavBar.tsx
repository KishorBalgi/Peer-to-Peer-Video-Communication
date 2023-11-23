import Link from "next/link";
import { useSelector } from "react-redux";
import { IRootState } from "@/types/redux";
import Button from "../Utils/Button";
import { logout } from "@/services/auth.services";

const NavBar = () => {
  const user = useSelector((state: IRootState) => state.user);

  return (
    <nav className="glow fixed top-2 flex justify-between items-center w-1/2 left-1/2 -translate-x-1/2 my-5 px-5 py-3 rounded-full bg-secondary">
      <div>
        <h1 className="text-2xl font-bold">VidChat</h1>
      </div>
      <div>
        <ul className="flex gap-3 items-center">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          {user.id == "" ? (
            <>
              <li className=" bg-primary  rounded-full px-3 py-1">
                <Link href="/auth/login">Login</Link>
              </li>
              <li className="bg-white text-black rounded-full px-3 py-1">
                <Link href="/auth/signup">Signup</Link>
              </li>
            </>
          ) : (
            <li className=" bg-primary  rounded-full px-3 py-1">
              <button onClick={logout}>Logout</button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
