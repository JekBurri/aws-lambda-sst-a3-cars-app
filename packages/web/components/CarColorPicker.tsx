import { useState } from "react";

type CarColorPickerProps = {
  onColorChange: (color: string) => void;
};

const CarColorPicker = ({ onColorChange }: CarColorPickerProps) => {
  const [carColor, setCarColor] = useState("");
  const [customColor, setCustomColor] = useState(false);

  const commonColors = [
    { name: "Red", value: "#ff0000" },
    { name: "Blue", value: "#0000ff" },
    { name: "Green", value: "#008000" },
    { name: "Yellow", value: "#ffff00" },
    { name: "Black", value: "#000000" },
    { name: "White", value: "#ffffff" },
    { name: "Silver", value: "#c0c0c0" },
    { name: "Gray", value: "#808080" },
    { name: "Orange", value: "#ffa500" },
    { name: "Purple", value: "#800080" },
    { name: "Brown", value: "#a52a2a" },
    { name: "Pink", value: "#ffc0cb" },
    { name: "White", value: "#ffffff" },
  ];

  const handleColorSelect = (color: string) => {
    setCarColor(color);
    onColorChange(color);
    setCustomColor(false);
  };

  return (
    <>
      <label
        htmlFor="color"
        className="block text-sm font-medium text-gray-700 mb-1 pt-4"
      >
        Car Color
      </label>
      <div className="flex flex-col py-2 bg-gray-100 rounded-md">
        <div className="flex flex-wrap px-2">
          {commonColors.map((color, index) => (
            <button
              key={index}
              className="w-10 h-10 border border-black"
              style={{ backgroundColor: color.value }}
              onClick={() => handleColorSelect(color.name)}
            ></button>
          ))}
        </div>
        {customColor && (
          <div className="mt-2">
            <input
              type="color"
              id="custom-color"
              name="custom-color"
              className="p-2 border border-gray-300 rounded-md"
              value={carColor}
              onChange={(e) => {
                setCarColor(e.target.value);
                onColorChange(e.target.value);
              }}
              required
            />
          </div>
        )}
      </div>
    </>
  );
};

export default CarColorPicker;
