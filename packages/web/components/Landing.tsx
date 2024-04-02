import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export default function Landing() {

    const { login, register } = useKindeAuth();


    return (
        <div className="flex items-center min-h-screen px-4 text-center md:px-6">
        <div className="mx-auto space-y-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Buy or Sell Your Car</h1>
            <p className="mx-auto max-w-[500px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              The best marketplace for buying and selling cars. Find your dream car or sell your current one with ease.
            </p>
          </div>
          <div className="flex flex-col gap-2 mx-auto max-w-sm">
            <button
              className="text-white inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white shadow-sm text-sm gap-1 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-950 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              onClick={() => login()}
            >
              Sign In
            </button>
            <button
              className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              onClick={() => register()}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    )
}

