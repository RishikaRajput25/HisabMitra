// import React from 'react'

// const footer = () => {
//   return (
//     <div className='bg-white text-gray-800 text-center py-4'>
      
//     </div>
//   )
// }

// export default footer
// import React from "react";

// const Footer = () => {
//   return (
//    <>
//    <div className="relative min-h-screen">
//     <footer className="absolute w-full bottom-0 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] py-5 text-center text-gray-600">
//       <p className="text-sm">
//         © {new Date().getFullYear()} <span className="font-semibold text-gray-800">HisabMitra</span>. All rights reserved.
//       </p>
//     </footer></div></>
//   );
// };

// export default Footer;
import React from "react";

const Footer = () => {
  return (
    <footer className=" w-full bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] py-5 text-center text-gray-600 mt-auto  bottom-0 left-0">
      <p className="text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-gray-800">HisabMitra</span>. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
