import React from 'react';
import whyChooseUs from '../../assets/Intopage/WhyChooseUs.jpg';

function WhyChooseUs() {
  return (
    <section className="font-sans text-gray-800 text-center mt-0">
      <div
        className="bg-cover bg-center bg-no-repeat py-12 text-[#01062b] "
        style={{
          backgroundImage: `url(${whyChooseUs})`,
        }}
      >
        <div>
          <h2 className="text-4xl mb-2 font-bold p-4">Why Choose Us</h2>
          <h4 className="text-2xl mb-0 shadow-lg font-semibold">
            PHCET Is Your Best Accommodation Choice
          </h4>
        </div>
      </div>
      
      <div className="flex flex-wrap justify-evenly sm:items-center py-5 bg-white rounded-xl mt-[-1.5%] w-fit mx-auto ">
        <div className="text-center p-3 max-w-xs">
          <span className="material-symbols-outlined" style={{ fontSize: '48px' }}>
            night_shelter
          </span>
          <h3 className="text-xl mb-1 font-bold">Variety</h3>
          <p className="text-base mb-0">Widest variety of accommodation types</p>
        </div>

        <div className="text-center p-3 max-w-xs">
          <span className="material-symbols-outlined" style={{ fontSize: '48px' }}>
            new_releases
          </span>
          <h3 className="text-xl mb-1 font-bold">Trusted</h3>
          <p className="text-base mb-0">All accommodation personally checked by our expert team</p>
        </div>

        <div className="text-center p-3 max-w-xs">
          <span className="material-symbols-outlined" style={{ fontSize: '48px' }}>
            trending_up
          </span>
          <h3 className="text-xl mb-1 font-bold">Flexibility</h3>
          <p className="text-base mb-0">Specialising in flexible lengths of stay</p>
        </div>

        <div className="text-center p-3 max-w-xs">
          <span className="material-symbols-outlined" style={{ fontSize: '48px' }}>
            admin_panel_settings
          </span>
          <h3 className="text-xl mb-1 font-bold">No Guarantors</h3>
          <p className="text-base mb-0">No need for a guarantor to book accommodation</p>
        </div>

        <div className="text-center p-3 max-w-xs">
          <span className="material-symbols-outlined" style={{ fontSize: '48px' }}>
            vpn_lock
          </span>
          <h3 className="text-xl mb-1 font-bold">Safe</h3>
          <p className="text-base mb-0">Safe & Secure Environment</p>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
