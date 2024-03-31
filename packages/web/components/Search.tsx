import React from 'react';
export default function Search() {

    return(
        <div className="flex-1 w-full mb-12">
        <div className="mx-auto max-w-2xl rounded-lg bg-gray-100 border dark:border-gray-850">
          <div className="grid w-full grid-cols-2 items-stretch border-b last:border-0">
            <input
              className="flex w-full border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1 h-10 font-body border-0 border-r-0 rounded-lg rounded-r-none dark:bg-gray-850"
              placeholder="Search inventory"
              type="search"
            />
            {/* @ts-ignore */}
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 m-0 rounded-l-none">
              <SearchIcon className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </div>
    )
}

function SearchIcon(props:any) {
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
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    )
  }