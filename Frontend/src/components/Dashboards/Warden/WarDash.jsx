import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MealForm from './MealForm';
import { useDispatch, useSelector } from 'react-redux';
import { ShowMealForm } from '../../../Redux/slices/TermsConditionSlice';
import ToastMessage from '../../ToastMessage';
import { loaditems } from '../../../Redux/slices/MealSlice'


function WarDash() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAddMealClicked = useSelector((state) => state.TermCondition.ViewMealForm);
  const ToastMsg = useSelector((state) => state.TermCondition.ToastMsg);
  const FoodItems = useSelector((state) => state.Meal.FoodArray || []);


  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("items")) || [];

    if (items.length > 0) {
      dispatch(loaditems(items));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(FoodItems));
  }, [FoodItems]);

  const view_Compalints = () => {
    navigate('/MyComplaints');
  };

  const show_Meal_Form = () => {
    dispatch(ShowMealForm());
  };

  return (
    <div className="bg-blue-200 min-h-screen bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: `url("https://img.freepik.com/vector-premium/presentacion-antecedentes-geometricos-abstractos_626925-728.jpg?w=1060")` }}>
      <nav className="bg-white shadow-lg px-2 py-4">
        <div className="flex justify-between items-center mx-10">
          <h1 className="text-3xl font-bold text-blue-700">PHCET Warden Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-gradient-to-r from-green-500 to-green-600 text-white font-medium py-2 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-green-700 transition duration-300 ease-in-out transform hover:scale-105" onClick={view_Compalints}>
              View Complaints
            </button>
            <button className="bg-gradient-to-r from-red-500 to-red-600 text-white font-medium py-2 px-4 rounded-lg shadow-lg hover:from-red-600 hover:to-red-700 transition duration-300 ease-in-out transform hover:scale-105" onClick={show_Meal_Form}>
              Add Meal
            </button>
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* <div className={` ${isAddMealClicked ? "flex" : ""} justify-around items-center`}> */}
      <div className=" flex justify-around items-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto mt-20">
          <h2 className="text-4xl font-semibold text-blue-700 mb-6">Warden Profile</h2>
          <div className="space-y-4">
            <div className="flex justify-between gap-11 items-center">
              <span className="text-blue-600 text-lg">Name:</span>
              <span className="text-blue-900 text-lg font-medium">Manish</span>
            </div>
            <div className="flex justify-between gap-11 items-center">
              <span className="text-blue-600 text-lg">Email:</span>
              <span className="text-blue-900 text-lg font-medium">Manish@123gmail.com</span>
            </div>
            <div className="flex justify-between gap-11 items-center">
              <span className="text-blue-600 text-lg">Phone:</span>
              <span className="text-blue-900 text-lg font-medium">98456237</span>
            </div>
            <div className="flex justify-between gap-11 items-center">
              <span className="text-blue-600 text-lg">City:</span>
              <span className="text-blue-900 text-lg font-medium">Khopoli</span>
            </div>
            <div className="flex justify-between gap-11 items-center">
              <span className="text-blue-600 text-lg">State:</span>
              <span className="text-blue-900 text-lg font-medium">Maharashtra</span>
            </div>
            <div className="flex justify-between gap-11 items-center">
              <span className="text-blue-600 text-lg">Pincode:</span>
              <span className="text-blue-900 text-lg font-medium">410213</span>
            </div>
          </div>
        </div>
        {ToastMsg && <ToastMessage ToastMessage={"Meal Added Successfully"} />}
        {
          isAddMealClicked ?
            <div>
              <div className={`transition-all duration-500 ease-in-out transform mr-56 ${isAddMealClicked ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
                {isAddMealClicked && <MealForm />}
              </div>
            </div>
            : <div className="bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 rounded-3xl p-8 shadow-lg w-fit mx-auto mt-20">
              <h2 className="text-2xl font-bold text-blue-700 text-center mb-6 font-poppins">
                Meal Preference Count
              </h2>

              {FoodItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-3 px-4 bg-white shadow-md rounded-lg mb-4 hover:bg-blue-50 transition duration-300">
                  <label className="text-lg font-medium mr-4 text-gray-800 font-poppins tracking-wide" htmlFor={item.option}>
                    {item.option || "Unnamed Option"}
                  </label>

                  <div className="text-2xl text-blue-600 font-semibold font-serif">
                    {item.count !== undefined ? item.count : 0}
                  </div>
                </div>
              ))}
            </div>


        }



      </div>
    </div>
  );
}

export default WarDash;
