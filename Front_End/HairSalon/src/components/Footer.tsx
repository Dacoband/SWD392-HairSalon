import React from 'react';
import './Footer.scss';

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="footerBackground1" />
      <div className="footerBackground2" />
      <div className="footerText1">Hair salon</div>
      <div className="footerText2">
        Welcome, a premier destination for men's grooming, where style meets
        sophistication. Our expert barbers are dedicated to delivering precision
        haircuts, tailored to your individual style and preferences. Whether
        you're looking for a classic cut, modern trend, or a clean shave, we
        provide a comfortable and relaxing environment to ensure you leave
        feeling confident and refreshed. Experience the art of men's grooming
        with us!
      </div>
      <img
        className="logo"
        src="https://via.placeholder.com/402x39"
        alt="Hair salon logo"
      />
    </div>
  );
};

export default Footer;

// const Footer = () => {
//   return (
//     <div className="bg-gradient-to-br from-blue-700  to-pink-500 p-5">
//       <h2 className="text-white">Footer</h2>
//     </div>
//   );
// };

// export default Footer;
