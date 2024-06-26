import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import Swal from "sweetalert2";

type Car = {
  CarId: string;
  Color: string;
  Make: string;
  Model: string;
  Price: number;
  Year: number;
  ImageSrc: string;
  UserId: string;
};

export default function Home() {
  const { isAuthenticated, getUser } = useKindeAuth();
  const [userListings, setUserListings] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = (id: string) => {
    console.log("deleting car with id: ", id);
    if (isAuthenticated) {
      Swal.fire({
        title: "Are you sure you want to delete your vehicle listing?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post(`${import.meta.env.VITE_APP_API_URL}/cars/delete`, {
              CarId: id,
            })
            .then((response) => {
              console.log(response.data);

              axios
                .get(
                  `${import.meta.env.VITE_APP_API_URL}/cars?userId=${
                    getUser().id
                  }`
                )
                .then((response) => {
                  setUserListings(response.data.cars);
                  setLoading(false); // Set loading to false once data is fetched
                })
                .catch((error) => {
                  console.error("Error fetching user listings:", error);
                  setLoading(false); // Set loading to false in case of an error
                });
            })
            .catch((error) => {
              console.error("Error deleting user listing:", error);
            });

          Swal.fire({
            title: "Deleted!",
            text: "Your vehicle listing has been deleted.",
            icon: "success",
          });
        }
      });
    } else {
      console.log("User not authenticated");
    }
  };

  const handleEdit = () => {};

  useEffect(() => {
    if (getUser()) {
      // Simulate loading delay for demonstration purposes
      setTimeout(() => {
        // Fetch user listings based on user ID
        axios
          .get(
            `${import.meta.env.VITE_APP_API_URL}/cars?userId=${getUser().id}`
          )
          .then((response) => {
            setUserListings(response.data.cars);
            setLoading(false); // Set loading to false once data is fetched
          })
          .catch((error) => {
            console.error("Error fetching user listings:", error);
            setLoading(false); // Set loading to false in case of an error
          });
      }, 2000); // Simulate a 2-second loading delay
    }
  }, [getUser]);

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
              {userListings ? (
                <span className="font-semibold">
                  {userListings.length || 0} Listings
                </span>
              ) : (
                <span className="font-semibold">0 Listings</span>
              )}
            </div>
            <div className="flex items-center space-x-2 text-sm transition duration-300 ease-in-out transform hover:-translate-y-1">
              <HeartIcon className="w-4 h-4 opacity-50" />
              <span className="font-semibold">5 Favorites</span>
            </div>
          </div>
        </div>
        {/* <div className="space-y-4">
          <button className="w-full transition duration-300 ease-in-out bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-md shadow-md transform hover:-translate-y-1">
            Edit Profile
          </button>
        </div> */}
      </div>
      <div className="mx-auto items-start gap-4 lg:justify-self-start">
        <div className="">
          <h2 className="text-2xl font-bold p-2">My Listings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading && (
              <>
                <Skeleton height={200} />
                <Skeleton height={200} />
                <Skeleton height={200} />
                <Skeleton height={200} />
                <Skeleton height={200} />
                <Skeleton height={200} />
                <Skeleton height={200} />
                <Skeleton height={200} />
              </>
            )}

            {!loading &&
              userListings &&
              userListings.map((listing, index) => (
                <div
                  key={index}
                  className="border p-4 rounded-md bg-white shadow-md"
                >
                  <div className="aspect-div overflow-hidden">
                    <img
                      alt={listing.Model}
                      className="object-cover w-full h-full aspect-none"
                      src={listing.ImageSrc || "/mazda3.png"}
                    />
                  </div>
                  <p className="font-bold">
                    {listing.Year} {listing.Make} {listing.Model}
                  </p>
                  <p className="font-bold text-lg">${listing.Price}</p>
                  <div className="flex justify-center align-middle gap-4">
                    <button
                      onClick={handleEdit}
                      className="px-2 bg-gray-500 rounded-md text-white border-black border"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(listing.CarId)}
                      className="px-2 bg-red-500 rounded-md text-white border-black border"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

function CarIcon(props: any) {
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
  );
}

function HeartIcon(props: any) {
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
  );
}
