import { motion } from "framer-motion";
import {
  FiHome,
  FiBook,
  FiUsers,
  FiMessageSquare,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { useRouter } from "next/router";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const router = useRouter();

  const menuItems = [
    { id: "profile", icon: <FiHome size={20} />, label: "Profile" },
    { id: "courses", icon: <FiBook size={20} />, label: "Courses" },
    { id: "teachers", icon: <FiUsers size={20} />, label: "Teachers" },
    { id: "chats", icon: <FiMessageSquare size={20} />, label: "Messages" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/auth/login");
  };

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="hidden md:flex md:flex-shrink-0"
    >
      <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
        <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold text-indigo-600"
          >
            EduSphere
          </motion.div>
        </div>

        <div className="flex flex-col flex-grow px-4 py-6 overflow-y-auto">
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeTab === item.id
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </button>
              </motion.div>
            ))}
          </nav>

          <div className="mt-auto space-y-2">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 transition-all duration-200">
                <FiSettings size={20} className="mr-3" />
                Settings
              </button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-200"
              >
                <FiLogOut size={20} className="mr-3" />
                Logout
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
