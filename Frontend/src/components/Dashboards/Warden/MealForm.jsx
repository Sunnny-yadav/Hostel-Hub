import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { hideAddMealForm, ShowToastMsg } from '../../../Redux/slices/TermsConditionSlice'
import { SubmitMeal } from '../../../Redux/slices/MealSlice'

const MealForm = () => {

    const dispatch = useDispatch();

    const [mealOptions, setMealOptions] = useState({
        option1: '',
        option2: '',
        option3: ''
    });

    const Remove_MealForm = ()=>{
        dispatch(hideAddMealForm());
    }
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setMealOptions((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(SubmitMeal(mealOptions));

        // Reset the form
        setMealOptions({
            option1: '',
            option2: '',
            option3: ''
        });

        dispatch(hideAddMealForm());

        dispatch(ShowToastMsg());

        setTimeout(() => {
            dispatch(ShowToastMsg())
        }, 2500);
    };

    return (
        <>

            <div className=' min-w-fit relative mt-28 p-6 bg-white rounded-lg shadow-lg'>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-3xl font-semibold text-blue-700 text-center">Add Meal Options</h2>

                    <div>
                        <input
                            type="text"
                            name="option1"
                            placeholder="Meal Option 1"
                            autoComplete='off'
                            value={mealOptions.option1}
                            onChange={handleChange}
                            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-gray-600"
                            style={{ color: '#2c3e50' }}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="option2"
                            placeholder="Meal Option 2"
                            autoComplete='off'
                            value={mealOptions.option2}
                            onChange={handleChange}
                            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-gray-600"
                            style={{ color: '#2c3e50' }}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="option3"
                            placeholder="Meal Option 3"
                            autoComplete='off'
                            value={mealOptions.option3}
                            onChange={handleChange}
                            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-gray-600"
                            style={{ color: '#2c3e50' }}
                            required
                        />
                    </div>
                    <div className='flex justify-between items-center'>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                        >
                            Submit
                        </button>
                        <button
                            className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                            onClick={Remove_MealForm}
                        >
                            Back
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default MealForm;
