import Link from "next/link";
import { useSelector } from "react-redux";
import { IRootState } from "@/types/redux";
import { logout } from "@/services/auth.services";

const NavBar = () => {
  const user = useSelector((state: IRootState) => state.user);

  return (
    <nav className="glow fixed top-2 flex justify-between items-center max-md:text-sm w-1/2 max-sm:w-11/12 left-1/2 -translate-x-1/2 my-5 px-5 py-3 rounded-full bg-secondary">
      <div>
        <Link href="/">
          <h1 className="text-2xl max-md:text-md font-bold">VidChat</h1>
        </Link>
      </div>
      <div>
        <ul className="flex gap-3 items-center">
          {/* <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li> */}
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
            <>
              <li className=" bg-primary rounded-full px-3 py-1">
                <button onClick={logout}>Logout</button>
              </li>
              <li>
                <div className="flex items-center gap-2 bg-ternary rounded-full pr-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex justify-center items-center">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12 1C8.14 1 5 4.14 5 8C5 11.86 8.14 15 12 15C15.86 15 19 11.86 19 8C19 4.14 15.86 1 12 1ZM12 17C7.03 17 2.88 20.74 2.12 21.33C2.04 21.39 1.97 21.45 1.91 21.51C1.5 21.85 1.5 22.47 1.91 22.82C2.32 23.16 2.98 23.16 3.39 22.82C3.49 22.71 7.64 18 12 18C16.36 18 20.51 22.71 20.61 22.82C21.02 23.16 21.68 23.16 22.09 22.82C22.5 22.47 22.5 21.85 22.09 21.51C21.32 20.72 16.97 17 12 17Z"
                          fill="#333333"
                        />
                      </g>
                    </svg>
                  </div>
                  <h1>{user.name}</h1>
                </div>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
