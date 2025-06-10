// components/DashboardLayout.js
import Sidebar from "./Sidebar";
import Header from "./Header";
import { motion } from "framer-motion";

const DashboardLayout = ({ userData, activeTab, setActiveTab, children }) => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userData={userData} />

        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-white to-blue-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
