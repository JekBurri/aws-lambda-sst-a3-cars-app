import axios from "axios";
import { useEffect, useState } from "react";

export default function Cars() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get('/api/cars')
      .then(response => {
        console.log(response.data.cars)
        setCars(response.data.cars);
      })
      .catch(error => {
        console.error('Error fetching cars:', error);
      });
  }, []);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {cars && cars.length > 0 && cars.map((car:any, i:number) => (
        <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="aspect-div overflow-hidden">
            <img
              alt={car.Model}
              className="object-cover w-full h-full aspect-none"
              src={car.imageSrc || "/mazda3.png"}
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">{car.Make} {car.Model}</h3>
            <p className="text-sm text-gray-600">Year: {car.Year}</p>
            <p className="text-base font-semibold text-gray-800">${car.Price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
