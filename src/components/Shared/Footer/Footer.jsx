import Container from "../Container";
import logo1 from "/logo-square.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-8 py-8">
      <Container>
        <div className="flex flex-col md:flex-row justify-center items-center text-center gap-10">

          <div className="flex-1">
            <h2 className="flex justify-center items-center">
              <img src={logo1} alt="logo" className="w-25 h-15 rounded-xl" />
            </h2>
            <p className="mt-3 text-gray-400 text-sm leading-relaxed">
              A smart and modern system to manage garments orders, production
              workflow, shipment schedules and real-time analytics — all in one platform.
            </p>
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-4">Useful Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-white duration-200 cursor-pointer">Home</li>
              <li className="hover:text-white duration-200 cursor-pointer">Products</li>
              <li className="hover:text-white duration-200 cursor-pointer">Dashboard</li>
              <li className="hover:text-white duration-200 cursor-pointer">About Us</li>
              <li className="hover:text-white duration-200 cursor-pointer">Contact</li>
            </ul>
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
            <p className="text-gray-400 text-sm">Email: support@garments-tracker.com</p>
            <p className="text-gray-400 text-sm mt-2">Hotline: +880 1234 567 890</p>
            <p className="text-gray-400 text-sm mt-2">
              Address: Dhaka, Bangladesh
            </p>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm mt-10 pt-6 border-t border-gray-700">
          © 2025-2026 Garments Order & Production Tracker System.
          All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
