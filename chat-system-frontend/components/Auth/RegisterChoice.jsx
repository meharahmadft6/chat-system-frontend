import { motion } from "framer-motion";
import Link from "next/link";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";

export default function RegisterChoice() {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-900 mb-2">
          Join EduConnect
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Select your role to continue
        </p>

        <div className="space-y-4">
          <Link href="/auth/register?role=student">
            <motion.div
              whileHover={{ y: -5 }}
              className="block group cursor-pointer"
            >
              <div className="bg-blue-50 hover:bg-blue-100 p-6 rounded-xl transition-all duration-300 border-2 border-blue-100 group-hover:border-blue-300">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FaUserGraduate className="text-blue-600 text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-blue-900">Student</h3>
                    <p className="text-sm text-blue-600">Join as a learner</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>

          <Link href="/auth/register?role=teacher">
            <motion.div
              whileHover={{ y: -5 }}
              className="block group cursor-pointer"
            >
              <div className="bg-purple-50 hover:bg-purple-100 p-6 rounded-xl transition-all duration-300 border-2 border-purple-100 group-hover:border-purple-300">
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <FaChalkboardTeacher className="text-purple-600 text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-purple-900">
                      Teacher
                    </h3>
                    <p className="text-sm text-purple-600">
                      Join as an educator
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-500">
            Already have an account?{" "}
            <Link href="/auth/login">
              <span className="text-indigo-600 hover:underline cursor-pointer">
                Login
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
