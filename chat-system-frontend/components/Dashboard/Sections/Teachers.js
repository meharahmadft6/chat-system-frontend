import { motion } from "framer-motion";

const teachers = [
  {
    id: 1,
    name: "Sarah Johnson",
    subject: "Web Development",
    avatar: "/images/teachers/teacher1.jpg",
    rating: 4.8,
    courses: 12,
    online: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    subject: "Data Science",
    avatar: "/images/teachers/teacher2.jpg",
    rating: 4.6,
    courses: 8,
    online: false,
  },
  {
    id: 3,
    name: "David Wilson",
    subject: "Mobile Development",
    avatar: "/images/teachers/teacher3.jpg",
    rating: 4.9,
    courses: 15,
    online: true,
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    subject: "UI/UX Design",
    avatar: "/images/teachers/teacher4.jpg",
    rating: 4.7,
    courses: 10,
    online: false,
  },
];

const TeachersSection = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Your Teachers</h2>
          <p className="text-gray-600">Connect with your instructors</p>
        </div>
        <button className="mt-4 md:mt-0 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200">
          Find New Teachers
        </button>
      </motion.div>

      {/* Teachers Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {teachers.map((teacher, index) => (
          <motion.div
            key={teacher.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center"
          >
            <div className="relative mb-4">
              <img
                src={teacher.avatar}
                alt={teacher.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-indigo-100"
              />
              {teacher.online && (
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <h3 className="text-lg font-bold text-gray-800">{teacher.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{teacher.subject}</p>
            <div className="flex items-center mb-3">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(teacher.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs text-gray-500 ml-1">
                {teacher.rating}
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              {teacher.courses} courses
            </p>
            <button className="px-4 py-2 text-sm bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors duration-200">
              Message
            </button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TeachersSection;
