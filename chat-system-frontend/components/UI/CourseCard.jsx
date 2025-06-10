import { motion } from "framer-motion";
import Link from "next/link";

const CourseCard = ({ course, onEnroll, isEnrolling }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white :bg-gray-800 rounded-xl shadow-sm border border-gray-200 :border-gray-700 overflow-hidden"
    >
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-40 object-fit"
      />

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span className="px-2 py-1 text-xs bg-indigo-100 :bg-indigo-900 text-indigo-800 :text-indigo-200 rounded-full">
            {course.category}
          </span>
          <span className="text-xs text-gray-500 :text-gray-400">
            {course.duration} weeks • {course.level}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-800 :text-white mb-1">
          {course.title}
        </h3>

        <p className="text-sm text-gray-600 :text-gray-300 mb-3">
          {course.teachers?.map((t) => t.name).join(", ")}
        </p>

        {/* Progress bar - only show if enrolled */}
        {course.enrolled && (
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600 :text-gray-400">Progress</span>
              <span className="text-gray-800 :text-gray-200">
                {course.progress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 :bg-gray-700 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <Link
            href={`/dashboard/courses/${course._id}`}
            className="text-indigo-600 :text-indigo-400 hover:underline text-sm"
          >
            View Details
          </Link>

          {course.enrolled ? (
            <Link
              href={`/dashboard/courses/${course._id}/continue`}
              className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
            >
              {course.progress === 100 ? "Review" : "Continue"}
            </Link>
          ) : (
            <button
              onClick={onEnroll}
              disabled={isEnrolling}
              className={`px-3 py-1 text-white text-sm rounded transition-colors ${
                isEnrolling
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {isEnrolling ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-1 h-4 w-4 text-white inline"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Enrolling...
                </>
              ) : (
                "Enroll Now"
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
