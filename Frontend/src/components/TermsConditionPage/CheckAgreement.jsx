import React, { useRef } from 'react'
import { UpdateCheckboxState } from '../../Redux/slices/TermsConditionSlice';
import { useDispatch } from 'react-redux';

function CheckAgreement(
  {
    scrollUP,
    scrollDown
  }
) {

  const dispatch = useDispatch();

  const checkboxRef = useRef(null);

  const checkboxValue = () => {
    dispatch(UpdateCheckboxState())
  }

  return (
    <>
      < div className='flex flex-col sm:flex-row sm:justify-between sm:items-center items-center '>
        <div className='checkbox flex gap-2 text-2xl font-bold ml-10'>
          <div>
            <input
              ref={checkboxRef}
              type="checkbox"
              onChange={checkboxValue}
              className="w-6 h-6 "

            />
          </div>
          <div className='text-slate-900 '> I agree terms & conditions</div>
        </div>
        <div className='flex justify-center items-center gap-2'>
          <button
            onClick={scrollDown}
            className="bg-blue-500 mt-3 mr-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex justify-end " >
            Previous
          </button>
          <button
            onClick={scrollUP}
            className="bg-blue-500 mt-3 mr-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex justify-end" >
            Next
          </button>
        </div>
      </div >
    </>
  )
}

export default CheckAgreement