import React, { useState } from "react";
import cookingVideo from '../../../assets/dashboard/cooking.mp4'

const MealForm = () => {
  const [mealOptions, setMealOptions] = useState({
    Meal1: "",
    Meal2: "",
    Meal3: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setMealOptions((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset the form
    setMealOptions({
      Meal: "",
      Meal: "",
      Meal: "",
    });

  };

  const handleCancel = () => {
    setMealOptions({
      Meal: "",
      Meal: "",
      Meal: "",
    });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 py-10">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={cookingVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Meal Form */}
      <div className="relative z-10 max-w-lg w-full bg-white bg-opacity-50 p-8 rounded-2xl shadow-lg shadow-gray-700 backdrop-blur-lg">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Add Meal Options
        </h2>
        <p className="text-gray-700 text-center mb-8">
          Please enter the details of the meals to be served.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="Meal1"
              placeholder="Meal Option1 "
              value={mealOptions.Meal1}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray- Option 500 transition-all ease-in-out duration-200"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="Meal2"
              placeholder="Meal Option2 "
              value={mealOptions.Meal2}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray- Option 500 transition-all ease-in-out duration-200"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="Meal3"
              placeholder="Meal Option3 "
              value={mealOptions.Meal3}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray- Option 500 transition-all ease-in-out duration-200"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-8">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              Submit
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="w-full bg-gray-500 text-white py-3 rounded-lg shadow-md hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 ml-4"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MealForm;
