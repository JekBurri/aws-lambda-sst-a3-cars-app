import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import CarColorPicker from "./CarColorPicker";
import "react-loading-skeleton/dist/skeleton.css";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import Swal from "sweetalert2";

export default function Cars() {
  const { isAuthenticated, getUser } = useKindeAuth();

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); // State to toggle form display
  // FORM FIELDS
  const [carYear, setCarYear] = useState("");
  const [carMake, setCarMake] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carColor, setCarColor] = useState("");

  // const [selectedColor, setSelectedColor] = useState("");
  const handleColorChange = (color:string) => {
    setCarColor(color);
  };

  const [carPrice, setCarPrice] = useState("");
  const [carTrim, setCarTrim] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | ArrayBuffer | null>(null);
  


  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: any) => {
    if(isAuthenticated) {
      e.preventDefault();
      console.log("Form submitted");
      // Create an object containing the data to send in the POST request
      const formData = {
          Make: carMake,
          Model: carModel,
          Year: carYear,
          Color: carColor,
          Price: carPrice,
          ImageUrl: '', // Replace with the S3 URL of the uploaded image
          UserId: getUser().id // Replace 'userId' with the actual user ID
      };
      // Send the POST request with the formData object
      axios.post(`${import.meta.env.VITE_APP_API_URL}/cars`, formData)
        .then(response => {
          console.log("POST request successful", response.data);
          Swal.fire({
            title: "Car listing added successfully",
            icon: "success",
            showConfirmButton: false, 
          });
          setShowForm(false);
          setTimeout(() => window.location.reload(), 1500);
        })
        .catch(error => {
          console.error("Error making POST request:", error);
        });
    } else {
      alert("You must be logged in to add a car listing");
    }
};


  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_API_URL}/cars`)
      .then((response) => {
        console.log(response.data.cars);
        setCars(response.data.cars);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
        setLoading(false); // Also set loading to false in case of error
      });
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center mb-4">
        <button
          className="bg-gray-400 text-white p-2 rounded-md shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
          onClick={() => setShowForm(!showForm)} // Toggle form display
        >
          {showForm ? "Close Form" : "New Listing"}
        </button>
      </div>
      {showForm && (
        <div className="border p-4 mb-4">
          <h2 className="text-lg font-semibold mb-2">New Car Listing</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4">
              <label
                htmlFor="make"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Car Make
              </label>
              <input
                type="text"
                id="make"
                name="make"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                placeholder="Mazda"
                value={carMake}
                onChange={(e) => setCarMake(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col mb-4">
              <label
                htmlFor="model"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Car Model
              </label>
              <input
                type="text"
                id="model"
                name="model"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                placeholder="CX-5"
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col mb-4">
              <label
                htmlFor="trim"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Car Trim
              </label>
              <input
                type="text"
                id="trim"
                name="trim"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                placeholder="GT"
                value={carTrim}
                onChange={(e) => setCarTrim(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col mb-4">
              <div className="flex flex-col mr-4 w-1/2">
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Car Year
                </label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  placeholder="2000"
                  min="2000" // Set appropriate minimum year
                  max={new Date().getFullYear()} // Set maximum year as current year
                  value={carYear}
                  onChange={(e) => setCarYear(e.target.value)}
                  required
                />
              </div>
              {/* <div className="flex flex-col w-1/2">
                <label
                  htmlFor="color"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Car Color
                </label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  value={carColor}
                  onChange={(e) => setCarColor(e.target.value)}
                  required
                />
              </div> */}
               <CarColorPicker onColorChange={handleColorChange} />
                <p>Selected Color: {carColor}</p>
            </div>
            <div className="flex flex-row mb-4">
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Car Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  placeholder="Enter car price"
                  min="0" // Set appropriate minimum price
                  value={carPrice}
                  onChange={(e) => setCarPrice(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex flex-row mb-4">
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Upload Car Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
              {uploadedImage && (
                <div className="flex align-middle justify-center self-center mt-6 ml-6">
                  <img
                    src={uploadedImage as string}
                    alt="Uploaded Car"
                    className="max-w-full h-12"
                  />
                </div>
              )}
            </div>
            <button
              type="submit"
              className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600 transition duration-300 ease-in-out w-full"
            >
              Add Listing
            </button>
          </form>
        </div>
      )}

      {loading ? (
        // Show loading state if loading is true
        <Skeleton
          height={300}
          count={4}
          containerClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6"
          inline={true}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {cars &&
            cars.length > 0 &&
            cars.map((car: any, i: number) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="aspect-div overflow-hidden">
                  <img
                    alt={car.Model}
                    className="object-cover w-full h-full aspect-none"
                    src={car.ImageSrc || "/mazda3.png"}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {car.Make} {car.Model}
                  </h3>
                  <p className="text-sm text-gray-600">Year: {car.Year}</p>
                  <p className="text-base font-semibold text-gray-800">
                    ${car.Price}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
