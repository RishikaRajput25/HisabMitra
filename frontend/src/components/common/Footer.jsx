

const Footer = () => {
  return (
    <footer className=" w-full bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] py-5 text-center text-gray-600 mt-auto  bottom-0 left-0">
      <p className="text-sm">
        <i class="fa-regular fa-copyright"></i> {new Date().getFullYear()}{" "}
        <span className="font-semibold text-gray-800">HisabMitra</span>. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
