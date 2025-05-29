import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaUser, FaLock } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../../../components/UI/Button";
import Input from "../../../components/UI/Input";
import api from "../../../../utils/animations";

export default function LoginPage() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await api.post("/auth/login", values);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        router.push("/profile");
      } catch (error) {
        setErrors({ submit: error.response?.data?.error || "Login failed" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-center text-indigo-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-500 text-center mb-8">
              Login to your account
            </p>

            {formik.errors.submit && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                {formik.errors.submit}
              </div>
            )}

            <form onSubmit={formik.handleSubmit}>
              <div className="space-y-4">
                <Input
                  icon={<FaUser />}
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
              </div>

              <div className="mt-6">
                <Button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all duration-300"
                >
                  {formik.isSubmitting ? "Logging in..." : "Login"}
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <div className="text-gray-500 text-center mt-6">
                Don't have an account?{" "}
                <Link href="/auth/register">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="cursor-pointer text-indigo-600"
                  >
                    Register
                  </motion.span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
