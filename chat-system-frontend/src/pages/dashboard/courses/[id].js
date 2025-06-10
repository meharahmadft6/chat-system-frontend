import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import api from "../../../../utils/api";
import DashboardLayout from "../../../../components/Dashboard/DashboardLayout";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { UserContext } from "../../../../context/UserContext";
import {
  Play,
  Clock,
  Star,
  BookOpen,
  Check,
  ChevronRight,
  Video,
  FileText,
  HelpCircle,
  Award,
  Users,
  CheckCircle,
} from "lucide-react";

const CourseDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [currentMaterial, setCurrentMaterial] = useState(null);
  const [completedMaterials, setCompletedMaterials] = useState(new Set());
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const { userData } = useContext(UserContext);
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api.get(`/courses/${id}`);
        setCourse(response.data);
        setCurrentMaterial(response.data.materials[0]);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Failed to load course",
          text: error.response?.data?.message || "Please try again later",
        });
        router.push("/dashboard/courses");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCourse();
  }, [id, router]);

  const getIconForMaterial = (type) => {
    switch (type) {
      case "video":
        return Video;
      case "text":
        return FileText;
      case "quiz":
        return HelpCircle;
      default:
        return BookOpen;
    }
  };

  const handleMaterialComplete = async () => {
    try {
      const totalMaterials = course.materials.length;
      const completedCount = completedMaterials.size + 1; // Include current
      const progress = Math.round((completedCount / totalMaterials) * 100);

      await api.put(`/courses/${id}/progress`, {
        userId: localStorage.getItem("userId"),
        materialId: currentMaterial._id,
        score: 100,
        progress,
      });

      setCompletedMaterials((prev) => new Set([...prev, currentMaterial._id]));

      const currentIndex = course.materials.findIndex(
        (m) => m._id === currentMaterial._id
      );
      if (currentIndex < course.materials.length - 1) {
        setTimeout(() => {
          setCurrentMaterial(course.materials[currentIndex + 1]);
        }, 300);
      }

      const response = await api.get(`/courses/${id}`);
      setCourse(response.data);

      Swal.fire({
        icon: "success",
        title: "Great job!",
        text: "Material completed successfully",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error updating progress",
        text: error.response?.data?.message || "Please try again later",
      });
    }
  };

  const handleQuizAnswer = (questionIndex, optionIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const submitQuiz = async () => {
    try {
      await api.put(`/courses/${id}/progress`, {
        materialId: currentMaterial._id,
        userId: localStorage.getItem("userId"),
        score: 100,
        answers: selectedAnswers,
      });

      Swal.fire({
        icon: "success",
        title: "Quiz Submitted!",
        text: "Great work on completing the quiz",
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        handleMaterialComplete();
      }, 500);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error submitting quiz",
        text: error.response?.data?.message || "Please try again later",
      });
    }
  };

  const progressPercentage = course
    ? (completedMaterials.size / course.materials.length) * 100
    : 0;

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg"
          >
            Loading course details...
          </motion.p>
        </div>
      </motion.div>
    );
  }

  return (
    <DashboardLayout
      activeTab="courses"
      setActiveTab={() => {}}
      userData={userData}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50"
      >
        {/* Hero Section */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white"
        >
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative container mx-auto px-6 py-16">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:w-1/2 space-y-6"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium"
                >
                  <Award className="w-4 h-4" />
                  {course.level} Level
                </motion.div>

                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-4xl lg:text-5xl font-bold leading-tight"
                >
                  {course.title}
                </motion.h1>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-xl text-blue-100 leading-relaxed"
                >
                  {course.description}
                </motion.p>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex flex-wrap items-center gap-6 text-sm font-medium"
                >
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{course.duration} weeks</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex items-center gap-2 text-sm"
                >
                  <span className="text-blue-200">Instructors:</span>
                  <span className="font-medium">
                    {course.teachers.map((t) => t.name).join(", ")}
                  </span>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:w-1/2"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative group"
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="relative w-full h-80 object-cover rounded-2xl shadow-2xl"
                  />
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <button className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300">
                      <Play
                        className="w-8 h-8 text-blue-600 ml-1"
                        fill="currentColor"
                      />
                    </button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-white border-b border-gray-200"
        >
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Course Progress
              </span>
              <span className="text-sm font-medium text-blue-600">
                {Math.round(progressPercentage)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col xl:flex-row gap-8">
            {/* Course Materials Sidebar */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="xl:w-1/3"
            >
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden sticky top-8">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
                  <h2 className="text-xl font-bold">Course Content</h2>
                  <p className="text-blue-100 text-sm mt-1">
                    {course.materials.length} lessons
                  </p>
                </div>

                <div className="p-2">
                  <AnimatePresence>
                    {course.materials.map((material, index) => {
                      const Icon = getIconForMaterial(material.type);
                      const isCompleted = completedMaterials.has(material._id);
                      const isCurrent = currentMaterial?._id === material._id;

                      return (
                        <motion.div
                          key={material._id}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          className={`group relative m-2 rounded-xl cursor-pointer transition-all duration-300 ${
                            isCurrent
                              ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                              : "hover:bg-gray-50 hover:shadow-md"
                          }`}
                          onClick={() => setCurrentMaterial(material)}
                        >
                          <div className="flex items-center gap-4 p-4">
                            <motion.div
                              whileHover={{ rotate: 5 }}
                              className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                                isCurrent
                                  ? "bg-white/20 backdrop-blur-sm"
                                  : isCompleted
                                  ? "bg-green-100 text-green-600"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {isCompleted ? (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 500,
                                  }}
                                >
                                  <CheckCircle className="w-5 h-5" />
                                </motion.div>
                              ) : (
                                <Icon className="w-5 h-5" />
                              )}
                              {isCurrent && (
                                <motion.div
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                  className="absolute inset-0 rounded-full bg-white/30"
                                />
                              )}
                            </motion.div>

                            <div className="flex-1 min-w-0">
                              <h3
                                className={`font-medium truncate ${
                                  isCurrent ? "text-white" : "text-gray-900"
                                }`}
                              >
                                {material.title}
                              </h3>
                              <p
                                className={`text-sm truncate ${
                                  isCurrent ? "text-blue-100" : "text-gray-500"
                                }`}
                              >
                                {material.type.charAt(0).toUpperCase() +
                                  material.type.slice(1)}
                              </p>
                            </div>

                            <motion.div
                              animate={{ rotate: isCurrent ? 90 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronRight
                                className={`w-5 h-5 ${
                                  isCurrent ? "text-white" : "text-gray-400"
                                }`}
                              />
                            </motion.div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Main Content Area */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="xl:w-2/3"
            >
              <AnimatePresence mode="wait">
                {currentMaterial && (
                  <motion.div
                    key={currentMaterial._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                  >
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-8 border-b border-gray-200">
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="flex items-center gap-3 mb-4"
                      >
                        {(() => {
                          const Icon = getIconForMaterial(currentMaterial.type);
                          return <Icon className="w-6 h-6 text-blue-600" />;
                        })()}
                        <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">
                          {currentMaterial.type}
                        </span>
                      </motion.div>
                      <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl font-bold text-gray-900 mb-2"
                      >
                        {currentMaterial.title}
                      </motion.h1>
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="p-8"
                    >
                      {currentMaterial.type === "text" && (
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          className="prose prose-lg max-w-none text-black prose-headings:text-black prose-p:text-black prose-li:text-black prose-strong:text-black prose-a:text-black"
                          dangerouslySetInnerHTML={{
                            __html: currentMaterial.content,
                          }}
                        />
                      )}

                      {currentMaterial.type === "video" && (
                        <motion.div
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="space-y-6"
                        >
                          <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
                            <iframe
                              src={currentMaterial.content}
                              className="w-full h-full"
                              allowFullScreen
                            />
                          </div>
                        </motion.div>
                      )}
                      {currentMaterial.type === "pdf" && (
                        <motion.div
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="space-y-6"
                        >
                          <div className="relative aspect-[4/3] bg-white border border-gray-300 rounded-xl overflow-hidden shadow-md">
                            <iframe
                              src={currentMaterial.content}
                              className="w-full h-full"
                              allow="fullscreen"
                              title="PDF Viewer"
                            />
                          </div>
                        </motion.div>
                      )}

                      {currentMaterial.type === "quiz" && (
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          className="space-y-8"
                        >
                          {currentMaterial.quiz.questions.map(
                            (question, qIndex) => (
                              <motion.div
                                key={qIndex}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: qIndex * 0.1 }}
                                className="bg-gray-50 rounded-xl p-6"
                              >
                                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                                  Question {qIndex + 1}: {question.question}
                                </h3>
                                <div className="space-y-3">
                                  {question.options.map((option, oIndex) => (
                                    <motion.label
                                      key={oIndex}
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200 text-gray-900 ${
                                        selectedAnswers[qIndex] === oIndex
                                          ? "bg-blue-100 border-2 border-blue-500 text-blue-800"
                                          : "bg-white border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                                      }`}
                                    >
                                      <input
                                        type="radio"
                                        name={`question-${qIndex}`}
                                        value={oIndex}
                                        checked={
                                          selectedAnswers[qIndex] === oIndex
                                        }
                                        onChange={() =>
                                          handleQuizAnswer(qIndex, oIndex)
                                        }
                                        className="sr-only"
                                      />
                                      <div
                                        className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                                          selectedAnswers[qIndex] === oIndex
                                            ? "border-blue-500 bg-blue-500"
                                            : "border-gray-300"
                                        }`}
                                      >
                                        {selectedAnswers[qIndex] === oIndex && (
                                          <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-2 h-2 bg-white rounded-full"
                                          />
                                        )}
                                      </div>
                                      <span className="flex-1">{option}</span>
                                    </motion.label>
                                  ))}
                                </div>
                              </motion.div>
                            )
                          )}
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={submitQuiz}
                            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            Submit Quiz
                          </motion.button>
                        </motion.div>
                      )}

                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 pt-6 border-t border-gray-200"
                      >
                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleMaterialComplete}
                          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <Check className="w-5 h-5" />
                          Mark as Complete
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default CourseDetailPage;
