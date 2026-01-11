import { Link } from "react-router-dom";
import Container from "../Container";
import logo1 from "/logo-square.png";
import { FaFacebook, FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1500);
  };

  return (
    <footer className=" mt-16 border-t border-lime-500/20 ">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-12">

          {/* Description */}
          <div className="space-y-5">
            <Link to="/" className="inline-block">
              <img src={logo1} alt=" Logo" className="w-26 h-20 rounded-2xl object-cover ring-2 ring-lime-500/20" />
            </Link>
            <p className=" text-sm text-gray-500 leading-relaxed">
              Elevating garments management with precision.  Track orders, monitor  production lines, and analyze growth with our all-in-one ERP solution.
            </p>
            {/* Social Media Links */}
            <div className="flex gap-4 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full  hover:bg-lime-600 hover:text-white transition-all duration-300 shadow-lg">
                <FaFacebook size={18} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-lime-600 hover:text-white transition-all duration-300 shadow-lg">
                <FaGithub size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-lime-600 hover:text-white transition-all duration-300 shadow-lg">
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className=" font-bold text-lg mb-6 border-l-4 border-lime-500 pl-3">Navigation</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/" className="hover:text-lime-500 hover:pl-2 transition-all duration-300 inline-block text-gray-500">Home Overview</Link></li>
              <li><Link to="/products" className="hover:text-lime-500 hover:pl-2 transition-all duration-300 inline-block text-gray-500">Inventory & Products</Link></li>
              <li><Link to="/dashboard" className="hover:text-lime-500 hover:pl-2 transition-all duration-300 inline-block text-gray-500">Admin Dashboard</Link></li>
              <li><Link to="/about" className="hover:text-lime-500 hover:pl-2 transition-all duration-300 inline-block text-gray-500">Our Mission</Link></li>
              <li><Link to="/contact" className="hover:text-lime-500 hover:pl-2 transition-all duration-300 inline-block text-gray-500">Help & Support</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className=" font-bold text-lg mb-6 border-l-4 border-lime-500 pl-3">Get In Touch</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3 group">
                <FaEnvelope className="text-lime-500 mt-1 group-hover:scale-110 transition" />
                <span className="text-gray-500">support@garments-tracker.com</span>
              </div>
              <div className="flex items-center gap-3 group">
                <FaPhone className="text-lime-500 group-hover:scale-110 transition" />
                <span className="text-gray-500">+880 1234 567 890</span>
              </div>
              <div className="flex items-start gap-3 group">
                <FaMapMarkerAlt className="text-lime-500 mt-1 group-hover:scale-110 transition" />
                <span className="text-gray-500 italic">Jamalpur, Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Newsletter  */}
          <div>
            <h3 className="font-bold text-lg mb-6 border-l-4 border-lime-500 pl-3">
              Stay Updated
            </h3>

            <p className="text-sm text-gray-500 mb-4">
              Subscribe for system updates & newsletters.
            </p>

            <form className="flex flex-col gap-3" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setStatus("idle");
                }}
                className=" border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-lime-500 transition"
              />

              <button
                disabled={status === "loading"}
                className="bg-lime-600 hover:bg-lime-500 text-white text-sm font-bold py-2 rounded-lg transition-all active:scale-95 shadow-lg disabled:opacity-60"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </button>
            </form>

            {/* Messages */}
            {status === "success" && (
              <p className="text-green-500 text-sm mt-3">
                ✅ Successfully subscribed!
              </p>
            )}
            {status === "error" && (
              <p className="text-red-500 text-sm mt-3">
                ❌ Please enter a valid email.
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className=" py-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} <span className="text-lime-500 font-semibold">Garments Orders Production Track system </span>. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <Link to="/privacy" className=" transition">Privacy Policy</Link>
            <Link to="/privacy" className="transition">Terms of Service</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;