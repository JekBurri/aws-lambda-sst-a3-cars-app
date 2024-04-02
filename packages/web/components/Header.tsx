import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { Link } from "react-router-dom";


export default function Header() {
  const { getUser, logout } = useKindeAuth();

  return (
    <div className="flex h-auto w-full shrink-0 border-b items-center px-4 md:px-6 mb-12 sm:h-20">
      <div className="flex flex-col items-center w-full gap-4 py-2 sm:flex-row sm:justify-center sm:align-middle">
        <button className="flex items-center h-10 text-lg font-semibold md:ml-[-10px]">
          <FlagIcon className="h-6 w-6" />
          <span className="">BuynRide</span>
        </button>
        <nav className="m-auto flex flex-1 items-center gap-4 sm:ml-auto">
          <Link to={"/"} className="font-medium text-sm tracking-wide hover:underline">
            Home
          </Link>
          <Link to={"/inventory"} className="font-medium text-sm tracking-wide hover:underline">
            Inventory
          </Link>
          <Link to={"/finance"} className="font-medium text-sm tracking-wide hover:underline">
            Finance
          </Link>
          <Link to={"/service"} className="font-medium text-sm tracking-wide hover:underline">
            Service
          </Link>
          <Link to={"/contact"} className="font-medium text-sm tracking-wide hover:underline">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-2 m-auto sm:ml-auto">
          <div className="flex flex-col">
            <p className="text-center font-bold text-lg">{getUser().given_name}</p>
            <button
              className="text-xs text-right underline"
              onClick={() => logout()}
            >
                Log out
            </button>

          </div>
          <div className="h-14 w-14">
            <img
              alt="Avatar"
              className="rounded-full border overflow-hidden"
              height={20}
              src="/profile.png"
              style={{
                aspectRatio: "64/64",
                objectFit: "cover",
              }}
              
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FlagIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  );
}
