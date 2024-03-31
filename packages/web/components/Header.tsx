import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export default function Header() {
  const { getUser, logout } = useKindeAuth();

  return (
    <div className="flex flex-col h-20 w-full shrink-0 border-b items-center px-4 md:px-6 mb-12">
      <div className="flex items-center w-full gap-4 py-2">
        <button className="flex items-center h-10 text-lg font-semibold md:ml-[-10px]">
          <FlagIcon className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </button>
        <nav className="ml-auto flex flex-1 items-center gap-4">
          <button className="font-medium text-sm tracking-wide hover:underline">
            Home
          </button>
          <button className="font-medium text-sm tracking-wide hover:underline">
            Inventory
          </button>
          <button className="font-medium text-sm tracking-wide hover:underline">
            Finance
          </button>
          <button className="font-medium text-sm tracking-wide hover:underline">
            Service
          </button>
          <button className="font-medium text-sm tracking-wide hover:underline">
            Contact
          </button>
        </nav>
        <div className="flex items-center gap-2 ml-auto">
          <div className="flex flex-col">
            <p className="text-center text-md">{getUser().given_name}</p>
            <button
              className="text-xs text-right underline"
              onClick={() => logout()}
            >
                Log out
            </button>

          </div>
          <div className="h-8 w-8">
            <img
              alt="Avatar"
              className="rounded-full border overflow-hidden ring-1 ring-gray-200 dark:ring-gray-800"
              height={12}
              src="/vite.svg"
              style={{
                aspectRatio: "32/32",
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
