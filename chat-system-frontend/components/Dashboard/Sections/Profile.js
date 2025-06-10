import { motion } from "framer-motion";
import ProgressBar from "../../UI/ProgressBar";
import EditProfileModal from "./EditProfileModal";
import { useState } from "react";
import api from "../../../utils/api"; // Adjust the import path as necessary
import Swal from "sweetalert2";

const ProfileSection = ({ userData, onProfileUpdate }) => {
  const stats = [
    { label: "Enrolled Courses", value: userData?.coursesEnrolledCount || 0 },
    { label: "Completed Courses", value: userData?.completedCourses || 0 },
    { label: "Learning Points", value: userData?.points || 0 },
    { label: "Level", value: userData?.gradeLevel || "Beginner" },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleUpdateProfile = async (updatedData) => {
    try {
      const response = await api.put(`/students/${userData._id}`, updatedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully!",
        timer: 2000,
        showConfirmButton: false,
      });

      // Call the parent's update handler with the new data
      onProfileUpdate(response.data);

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      let message = "An unexpected error occurred. Please try again later.";
      if (error.response) {
        message =
          error.response.data?.error ||
          "Failed to update profile. Please try again.";
      } else if (error.request) {
        message = "No response from server. Please check your network.";
      }
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: message,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between"
      >
        <div className="flex items-center space-x-4">
          <motion.div whileHover={{ scale: 1.05 }} className="relative">
            <img
              src={
                userData?.profile ||
                "https://res.cloudinary.com/daghgdhtk/image/upload/v1746626058/doctor_profiles/ur6dxigqqvctqbe8xsyg.jpg"
              }
              alt="User"
              className="w-20 h-20 rounded-full object-cover border-4 border-indigo-100 shadow-md"
            />
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {userData?.firstName}
            </h2>
            <p className="text-gray-600">{userData?.userId.email}</p>
            <p className="text-sm text-gray-500">
              Member since{" "}
              {userData?.userId.createdAt
                ? new Date(userData.userId.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 md:mt-0 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          Edit Profile
        </button>
      </motion.div>
      {isModalOpen && (
        <EditProfileModal
          userData={userData}
          onClose={() => setIsModalOpen(false)}
          onUpdate={handleUpdateProfile}
        />
      )}
      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            whileHover={{ y: -5 }}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
          >
            <h3 className="text-sm font-medium text-gray-500">{stat.label}</h3>
            <p className="text-2xl font-bold text-indigo-600">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Your Learning Progress
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">
                Web Development
              </span>
              <span className="text-sm font-medium text-gray-500">65%</span>
            </div>
            <ProgressBar progress={65} color="indigo" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">
                Data Science
              </span>
              <span className="text-sm font-medium text-gray-500">42%</span>
            </div>
            <ProgressBar progress={42} color="purple" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">
                Mobile Development
              </span>
              <span className="text-sm font-medium text-gray-500">30%</span>
            </div>
            <ProgressBar progress={30} color="blue" />
          </div>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              whileHover={{ x: 5 }}
              className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-150"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-indigo-600">✓</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Completed lesson {item} of Web Development course
                </p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileSection;
