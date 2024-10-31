import React from 'react';
import StudentImg from '../../assets/Intopage/StudentImg.png'; 

const WeUnderstandStudent = () => {
  return (
    <section className="flex justify-between items-center p-8 w-[90%] font-sans gap-10 ">
      <div className="flex-1 pr-8">
        <h2 className="text-2xl text-gray-800 mb-4 font-bold ml-5">We understand students</h2>
        <p className="text-gray-600 leading-relaxed mb-4 p-5">
          At PHCET Hostel Rasayni, we understand the unique needs of students. Our state-of-the-art accommodation provides a comfortable and conducive environment for your academic journey. Located in Rasayni, we offer a perfect blend of modern amenities and a serene atmosphere to help you focus on your studies.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4 p-5 pt-0">
          Our hostel provides a range of facilities designed to make your stay comfortable and productive. From well-furnished rooms to high-speed internet, from spacious study areas to recreational facilities, we have everything to ensure a holistic living experience. Our experienced staff is always ready to assist you, making your transition to hostel life smooth and enjoyable.
        </p>
      </div>
      
      <div 
        className="flex-1 h-72 bg-cover bg-center rounded-lg"
        style={{ backgroundImage: `url(${StudentImg})` }}
      />
    </section>
  );
};

export default WeUnderstandStudent;
