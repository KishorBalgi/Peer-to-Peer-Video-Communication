import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="glow fixed top-2 flex justify-between items-center w-1/2 left-1/2 -translate-x-1/2 my-5 px-10 py-3 rounded-full bg-secondary">
      <div>
        <h1 className="text-2xl font-bold">VidChat</h1>
      </div>
      <div>
        <ul className="flex gap-3">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
