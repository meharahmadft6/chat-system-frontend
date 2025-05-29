import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaChalkboardTeacher,
  FaBook,
} from "react-icons/fa";
import Button from "../UI/Button";
import Input from "../UI/Input";
import api from "../../utils/api";

const TeacherRegisterForm = ({ onSuccess }) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      subjectSpecialty: "",
      yearsOfExperience: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("Required"),
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      subjectSpecialty: Yup.string().required("Required"),
      yearsOfExperience: Yup.number()
        .min(0, "Cannot be negative")
        .required("Required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await api.post("/auth/register", {
          role: "teacher",
          username: values.username,
          email: values.email,
          password: values.password,
          teacherData: {
            firstName: values.firstName,
            lastName: values.lastName,
            subjectSpecialty: values.subjectSpecialty,
            yearsOfExperience: values.yearsOfExperience,
          },
        });
        onSuccess(response.data);
      } catch (error) {
        setErrors({
          submit: error.response?.data?.error || "Registration failed",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-purple-100 p-3 rounded-full">
              <FaChalkboardTeacher className="text-purple-600 text-2xl" />
            </div>
            <h2 className="ml-3 text-2xl font-bold text-purple-900">
              Teacher Registration
            </h2>
          </div>

          {formik.errors.submit && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {formik.errors.submit}
            </div>
          )}

          <form onSubmit={formik.handleSubmit}>
            <div className="space-y-4">
              <Input
                icon={<FaUser />}
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                error={formik.touched.username && formik.errors.username}
              />

              <Input
                icon={<FaEnvelope />}
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={formik.touched.email && formik.errors.email}
              />

              <Input
                icon={<FaLock />}
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                error={formik.touched.password && formik.errors.password}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  icon={<FaUser />}
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                  error={formik.touched.firstName && formik.errors.firstName}
                />

                <Input
                  icon={<FaUser />}
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  error={formik.touched.lastName && formik.errors.lastName}
                />
              </div>

              <Input
                icon={<FaBook />}
                id="subjectSpecialty"
                name="subjectSpecialty"
                type="text"
                placeholder="Subject Specialty"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.subjectSpecialty}
                error={
                  formik.touched.subjectSpecialty &&
                  formik.errors.subjectSpecialty
                }
              />

              <Input
                icon={<FaChalkboardTeacher />}
                id="yearsOfExperience"
                name="yearsOfExperience"
                type="number"
                placeholder="Years of Experience"
                min="0"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.yearsOfExperience}
                error={
                  formik.touched.yearsOfExperience &&
                  formik.errors.yearsOfExperience
                }
              />
            </div>

            <div className="mt-6">
              <Button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all duration-300"
              >
                {formik.isSubmitting ? "Registering..." : "Register"}
              </Button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <p className="text-gray-500">
              Already have an account?{" "}
              <Link href="/auth/login">
                <a className="text-purple-600 hover:underline">Login</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TeacherRegisterForm;
