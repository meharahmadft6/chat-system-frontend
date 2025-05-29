import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "../utils/api";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaSignOutAlt } from "react-icons/fa";
import Button from "../../components/UI/Button";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/auth/profile");
        setProfile(response.data);
      } catch (error) {
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/auth/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-indigo-900">
                {profile.firstName} {profile.lastName}'s Profile
              </h1>
              <Button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </Button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <FaUser className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Username
                  </h3>
                  <p className="text-lg font-medium">
                    {profile.userId?.username || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <FaEnvelope className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="text-lg font-medium">
                    {profile.userId?.email || "N/A"}
                  </p>
                </div>
              </div>

              {profile.gradeLevel && (
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FaUser className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Grade Level
                    </h3>
                    <p className="text-lg font-medium">{profile.gradeLevel}</p>
                  </div>
                </div>
              )}

              {profile.subjectSpecialty && (
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FaUser className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Subject Specialty
                    </h3>
                    <p className="text-lg font-medium">
                      {profile.subjectSpecialty}
                    </p>
                  </div>
                </div>
              )}

              {profile.yearsOfExperience && (
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FaUser className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Years of Experience
                    </h3>
                    <p className="text-lg font-medium">
                      {profile.yearsOfExperience}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
