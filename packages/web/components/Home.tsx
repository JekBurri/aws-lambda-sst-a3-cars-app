import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { Link } from "react-router-dom";

export default function Home() {
    const { getUser } = useKindeAuth();

    return (
        <>
            <div className="mx-auto grid items-start gap-2 lg:justify-self-start bg-gray-100 p-2 rounded-md">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold">Hi, {getUser().given_name}</h1>
                    <p className="text-gray-500 dark:text-gray-400">Your profile</p>
                </div>
                <div className="space-y-4">
                    <div className="flex space-x-4">
                        <div className="flex items-center space-x-2 text-sm transition duration-300 ease-in-out transform hover:-translate-y-1">
                            <CarIcon className="w-4 h-4 opacity-50" />
                            <span className="font-semibold">2 Listings</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm transition duration-300 ease-in-out transform hover:-translate-y-1">
                            <HeartIcon className="w-4 h-4 opacity-50" />
                            <span className="font-semibold">5 Favorites</span>
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    <button className="w-full transition duration-300 ease-in-out bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-md shadow-md transform hover:-translate-y-1">
                        Edit Profile
                    </button>
                </div>
            </div>
            <div className="mx-auto grid items-start gap-4 lg:justify-self-start">
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <button className="h-10 flex-1 bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-md shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1">
                        View My Listings
                    </button>
                    <button className="h-10 flex-1 bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-md shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1">
                        Manage My Favorites
                    </button>
                    <Link to={"/inventory"} className="flex align-middle justify-center h-10 flex-1 bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-md shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1">
                        Sell My Car
                    </Link>
                </div>
            </div>
        </>
    )
}

function CarIcon(props:any) {
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
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
            <circle cx="7" cy="17" r="2" />
            <path d="M9 17h6" />
            <circle cx="17" cy="17" r="2" />
        </svg>
    )
}

function HeartIcon(props:any) {
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
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
    )
}
