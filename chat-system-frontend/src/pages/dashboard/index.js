import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Sidebar from "../../../components/Dashboard/Sidebar";
import ProfileSection from "../../../components/Dashboard/Sections/Profile";
import CoursesSection from "../../../components/Dashboard/Sections/Courses";
import TeachersSection from "../../../components/Dashboard/Sections/Teachers";
import DashboardLayout from "../../../components/Dashboard/DashboardLayout";
import ChatsSection from "../../../components/Dashboard/Sections/Chats";
import Header from "../../../components/Dashboard/Header";
import Loader from "../../../components/UI/Loader";
import { getStudentById } from "../../../utils/student.api";

const Dashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        router.push("/auth/login");
        return;
      }

      try {
        const data = await getStudentById(userId);
        setUserData(data);
        console.log("User data:", data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching student:", error);
      }
    };

    fetchUserData();
  }, [router]);
  const handleProfileUpdate = (updatedData) => {
    setUserData((prev) => ({
      ...prev,
      ...updatedData,
    }));
  };
  const renderSection = () => {
    switch (activeTab) {
      case "profile":
        return (
          <ProfileSection
            userData={userData}
            onProfileUpdate={handleProfileUpdate}
          />
        );
      case "courses":
        return <CoursesSection userData={userData} />;
      case "teachers":
        return <TeachersSection />;
      case "chats":
        return <ChatsSection />;
      default:
        return <ProfileSection userData={userData} />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <DashboardLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      userData={userData}
    >
      {renderSection()}
    </DashboardLayout>
  );
};

export default Dashboard;
