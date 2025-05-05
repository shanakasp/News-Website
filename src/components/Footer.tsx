import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      {/* Section 1: Logo + Social Icons */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <img src="/logo.png" alt="Logo" className="h-16 w-auto" />
        </div>

        {/* Right: Social Icons */}
        <div className="flex gap-8 text-white text-3xl">
          <a href="#" aria-label="Facebook" className="hover:text-gray-300">
            <FaFacebookF />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-gray-300">
            <FaTwitter />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-gray-300">
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* Section 2: Center Text Links */}
      <div className="mt-16">
        <div className="flex justify-center gap-12 text-base flex-wrap">
          <a href="#" className="hover:text-gray-300">
            About
          </a>
          <a href="#" className="hover:text-gray-300">
            Services
          </a>
          <a href="#" className="hover:text-gray-300">
            Careers
          </a>
          <a href="#" className="hover:text-gray-300">
            Contact
          </a>
          <a href="#" className="hover:text-gray-300">
            Support
          </a>
        </div>
      </div>

      {/* Section 3: Bottom Ash Color Texts */}
      <div className="mt-16 bg-gray-800 text-gray-400 text-sm py-5 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span>&copy; Samanyoluhaber.</span>
          <span>© 2025 — Copyright</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
