import { motion } from "framer-motion";
import Link from "next/link";
import Header from "../../components/Layout/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl font-bold text-indigo-900 mb-6">
            Welcome to EduConnect
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Connecting students and teachers for a better learning experience
          </p>

          <div className="flex justify-center gap-8">
            <Link href="/auth/login">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer px-8 py-3 bg-indigo-600 text-white rounded-lg shadow-lg font-medium text-lg"
              >
                Login
              </motion.div>
            </Link>

            <Link href="/auth/register">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer px-8 py-3 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg shadow-lg font-medium text-lg"
              >
                Register
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
