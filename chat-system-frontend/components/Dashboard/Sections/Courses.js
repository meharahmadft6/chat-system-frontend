import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import CourseCard from "../../UI/CourseCard";
import api from "../../../utils/api";
import Swal from "sweetalert2";

const CoursesSection = ({ userData }) => {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState({});

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/courses");
        const allCourses = response.data;

        // Since enrolledCourses is not fetched, just map courses as is
        const mergedCourses = allCourses.map((course) => ({
          ...course,
          enrolled: false,
          progress: 0,
        }));

        setCourses(mergedCourses);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Failed to load courses",
          text: error.response?.data?.message || "Please try again later",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) => {
    if (filter === "All") return true;
    if (filter === "In Progress")
      return course.enrolled && course.progress > 0 && course.progress < 100;
    if (filter === "Completed")
      return course.enrolled && course.progress === 100;
    if (filter === "New") return !course.enrolled || course.progress === 0;
    return true;
  });

  const handleEnroll = async (courseId) => {
    try {
      console.log("Attempting enrollment for course:", courseId);
      console.log("User data:", userData);

      if (!userData || !userData._id) {
        throw new Error("User not logged in or missing user ID");
      }

      setEnrolling((prev) => ({ ...prev, [courseId]: true }));

      const response = await api.post(`/courses/${courseId}/enroll`, {
        studentId: userData._id,
      });

      console.log("Enrollment response:", response.data);

      // Update the specific course in state
      setCourses((prev) =>
        prev.map((course) =>
          course._id === courseId
            ? { ...course, enrolled: true, progress: 0 }
            : course
        )
      );

      Swal.fire({
        icon: "success",
        title: "Enrolled successfully!",
        timer: 1500,
      });
    } catch (error) {
      console.error("Enrollment failed:", error);

      const message =
        error?.response?.data?.error === "Already enrolled"
          ? "You're already enrolled in this course"
          : error?.response?.data?.message ||
            error.message ||
            "Please try again later";

      Swal.fire({
        icon: "error",
        title: "Enrollment failed",
        text: message,
      });
    } finally {
      setEnrolling((prev) => ({ ...prev, [courseId]: false }));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header and Filters remain the same */}

      {/* Courses Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <CourseCard
              course={course}
              onEnroll={() => handleEnroll(course._id)}
              isEnrolling={enrolling[course._id]}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CoursesSection;
