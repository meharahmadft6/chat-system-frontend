import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaBook,
  FaGraduationCap,
} from "react-icons/fa";
import Button from "../UI/Button";
import Input from "../UI/Input";
import api from "../../utils/api";

const StudentRegisterForm = ({ onSuccess }) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      gradeLevel: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("Required"),
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      gradeLevel: Yup.number()
        .min(1, "Must be at least 1")
        .max(12, "Must be at most 12")
        .required("Required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await api.post("/auth/register", {
          role: "student",
          username: values.username,
          email: values.email,
          password: values.password,
          studentData: {
            firstName: values.firstName,
            lastName: values.lastName,
            gradeLevel: values.gradeLevel,
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
            <div className="bg-blue-100 p-3 rounded-full">
              <FaUserGraduate className="text-blue-600 text-2xl" />
            </div>
            <h2 className="ml-3 text-2xl font-bold text-blue-900">
              Student Registration
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
                icon={<FaGraduationCap />}
                id="gradeLevel"
                name="gradeLevel"
                type="number"
                placeholder="Grade Level (1-12)"
                min="1"
                max="12"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.gradeLevel}
                error={formik.touched.gradeLevel && formik.errors.gradeLevel}
              />
            </div>

            <div className="mt-6">
              <Button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300"
              >
                {formik.isSubmitting ? "Registering..." : "Register"}
              </Button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <p className="text-gray-500">
              Already have an account?{" "}
              <Link href="/auth/login">
                <a className="text-blue-600 hover:underline">Login</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentRegisterForm;
