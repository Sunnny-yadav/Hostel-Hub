import React from 'react';

const testimonials = [
  {
    initials: 'RS',
    name: 'Rahul Sharma',
    review: 'I was extremely impressed with the PHCET hostel in Rasayani. From the moment I first contacted them, the staff were always friendly and helpful. They went out of their way to make sure I was happy and comfortable. They were always available to answer my questions and resolve any issues I...',
  },
  {
    initials: 'PS',
    name: 'Priya Singh',
    review: 'My experience with PHCET hostel in Rasayani was excellent...it went so smoothly. I didn\'t face any problems. They were very helpful and suggested me a few options and we booked one in just 2 days. I\'m glad that I found this hostel otherwise I would have faced a lot of problems in finding my accommodation in Rasayani.',
  },
  {
    initials: 'AK',
    name: 'Amit Kumar',
    review: 'I booked accommodation at PHCET hostel in Rasayani for my first year. They have been really helpful and cleared all of our doubts. They helped us find the right home and also guided us throughout. The thing that I liked the most was their regular follow-up. Our family was a little worried for my...',
  },
  {
    initials: 'RJ',
    name: 'Ramesh Jain',
    review: 'From the moment I first contacted them, the staff were always friendly and helpful. They went out of their way to make sure I was happy and comfortable. They were always available to answer my questions and resolve any issues...',
  },
];

const WhatStudentsSay = () => {
  return (
    <div className="container mx-auto p-6 ">
      <h2 className="text-3xl font-bold text-center mb-4">What Students Say About Us</h2>
      <div className="text-center mb-8">
        <span className="text-yellow-500 text-2xl">★★★★★</span> 4.7 • Reviews 1270+ • Excellent
      </div>
      <div className="space-y-6 flex ">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white w-[400px] p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-gray-200 text-gray-800 font-semibold rounded-full mr-4">
                {testimonial.initials}
              </div>
              <div className="text-lg font-semibold">{testimonial.name}</div>
            </div>
            <div className="text-yellow-500 text-xl mb-2">★★★★★</div>
            <p className="text-gray-700">{testimonial.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatStudentsSay;
