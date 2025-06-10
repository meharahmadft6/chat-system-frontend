import { motion } from "framer-motion";
import { FiBell, FiSearch } from "react-icons/fi";

const Header = ({ userData }) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative"
      >
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FiSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          className="w-full py-2 pl-10 pr-4 text-sm bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-200"
          placeholder="Search..."
        />
      </motion.div>

      {/* User Info */}
      <div className="flex items-center space-x-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-1 text-gray-500 rounded-full hover:bg-gray-100"
        >
          <FiBell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2"
        >
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-gray-900">
              {userData?.firstName}
            </p>
            <p className="text-xs text-gray-500">Student</p>
          </div>
          <div className="relative">
            <img
              src={
                userData?.profile ||
                "https://res.cloudinary.com/daghgdhtk/image/upload/v1746626058/doctor_profiles/ur6dxigqqvctqbe8xsyg.jpg"
              }
              alt="User"
              className="w-10 h-10 rounded-full object-cover border-2 border-indigo-200"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
